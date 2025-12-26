"use client"

import { useState, useEffect } from "react"

interface Plan {
  id: number
  name: string
  duration: number // days
  investment: number // USDT
  dailyReturn: number // percentage
  totalReturn: number
  daysRemaining: number
}

const PLANS: Plan[] = [
  { id: 1, name: "Starter", duration: 30, investment: 100, dailyReturn: 0.8, totalReturn: 24, daysRemaining: 15 },
  { id: 2, name: "Silver", duration: 60, investment: 500, dailyReturn: 1.2, totalReturn: 72, daysRemaining: 32 },
  { id: 3, name: "Gold", duration: 90, investment: 1000, dailyReturn: 1.5, totalReturn: 135, daysRemaining: 45 },
  { id: 4, name: "Platinum", duration: 180, investment: 5000, dailyReturn: 2.0, totalReturn: 540, daysRemaining: 90 },
]

function CountdownTimer({ daysRemaining }: { daysRemaining: number }) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00:00")

  useEffect(() => {
    const timer = setInterval(() => {
      const totalSeconds = daysRemaining * 24 * 3600
      const now = new Date()
      const endTime = new Date(now.getTime() + totalSeconds * 1000)

      const diff = endTime.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft(
        `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [daysRemaining])

  return <span className="font-mono font-bold text-cyan-400">{timeLeft}</span>
}

export default function InvestmentPlans() {
  return (
    <section id="plans" className="py-20 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Investment Plans
          </span>
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Choose your investment plan and start earning daily returns. Minimum deposit: 7 USDT, Required for packages:
          10 USDT
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>

              <div className="relative bg-slate-900 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition h-full flex flex-col">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full">
                    <span className="text-sm font-semibold text-cyan-400">{plan.duration} Days</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-1">Investment</div>
                  <div className="text-3xl font-bold text-white">${plan.investment}</div>
                  <div className="text-xs text-slate-500">USDT</div>
                </div>

                {/* Daily Return */}
                <div className="mb-6 pb-6 border-b border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-1">Daily Return</div>
                  <div className="text-2xl font-bold text-cyan-400">{plan.dailyReturn}%</div>
                  <div className="text-xs text-slate-500">per day</div>
                </div>

                {/* Total Return */}
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-1">Total Return</div>
                  <div className="text-xl font-bold text-green-400">${plan.totalReturn}</div>
                  <div className="text-xs text-slate-500">after completion</div>
                </div>

                {/* Countdown Timer */}
                <div className="mb-6 pb-6 border-b border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-2">Time Remaining</div>
                  <CountdownTimer daysRemaining={plan.daysRemaining} />
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                      style={{ width: `${((plan.duration - plan.daysRemaining) / plan.duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    {Math.round(((plan.duration - plan.daysRemaining) / plan.duration) * 100)}% Complete
                  </div>
                </div>

                {/* CTA Button */}
                <button className="mt-auto w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105">
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
