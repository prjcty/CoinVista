"use client"

import { useState, useEffect } from "react"

interface UserData {
  balance: number
  referralBonus: number
  dailyClaims: number
  totalEarnings: number
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData>({
    balance: 103.5, // 100 invested + 3 new user bonus
    referralBonus: 45.2,
    dailyClaims: 1.0, // 5 days × 0.2 USDT
    totalEarnings: 148.7,
  })

  const [nextClaimTime, setNextClaimTime] = useState<string>("23:59:59")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setNextClaimTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClaimDaily = () => {
    setUserData((prev) => ({
      ...prev,
      balance: prev.balance + 0.2,
      dailyClaims: prev.dailyClaims + 0.2,
      totalEarnings: prev.totalEarnings + 0.2,
    }))
  }

  return (
    <section id="dashboard" className="py-20 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Your Dashboard
          </span>
        </h2>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Balance", value: userData.balance.toFixed(2), color: "cyan" },
            { label: "Daily Claims", value: userData.dailyClaims.toFixed(2), color: "blue" },
            { label: "Referral Bonus", value: userData.referralBonus.toFixed(2), color: "teal" },
            { label: "Total Earnings", value: userData.totalEarnings.toFixed(2), color: "purple" },
          ].map((card, idx) => (
            <div
              key={idx}
              className="group border border-slate-700/50 rounded-xl p-6 bg-slate-900/50 hover:border-cyan-400/50 hover:bg-slate-900/80 transition"
            >
              <div className={`text-sm font-semibold text-${card.color}-400 mb-2`}>{card.label}</div>
              <div className="text-3xl font-bold text-white mb-2">${card.value}</div>
              <div className="text-xs text-slate-500">USDT</div>
            </div>
          ))}
        </div>

        {/* Daily Claim Section */}
        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Daily Claim</h3>
              <p className="text-slate-400">Claim 0.2 USDT daily for 5 consecutive days</p>
              <div className="mt-4 text-sm text-slate-500">
                Next claim in: <span className="font-mono font-bold text-cyan-400">{nextClaimTime}</span>
              </div>
            </div>
            <button
              onClick={handleClaimDaily}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105 whitespace-nowrap"
            >
              Claim Now
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Deposit", icon: "📥", href: "/deposit", color: "from-cyan-500 to-blue-600" },
            { label: "Withdraw", icon: "📤", href: "/withdraw", color: "from-teal-500 to-cyan-600" },
            { label: "Contact Us", icon: "💬", href: "#contact", color: "from-blue-500 to-purple-600" },
          ].map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className={`border border-slate-700/50 rounded-xl p-6 hover:border-cyan-400/50 transition group bg-slate-900/50 hover:bg-slate-900/80`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-semibold text-white group-hover:text-cyan-400 transition">{action.label}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
