"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

interface WithdrawRequest {
  id: string
  amount: number
  timestamp: string
  status: "pending" | "approved" | "rejected"
}

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [withdrawals, setWithdrawals] = useState<WithdrawRequest[]>([])

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAmount || !walletAddress) {
      alert("Please enter amount and wallet address")
      return
    }

    const amount = Number.parseFloat(withdrawAmount)
    if (amount < 5) {
      alert("Minimum withdrawal is 5 USDT")
      return
    }

    const newWithdrawal: WithdrawRequest = {
      id: Date.now().toString(),
      amount: amount,
      timestamp: new Date().toLocaleString(),
      status: "pending",
    }

    setWithdrawals([newWithdrawal, ...withdrawals])
    setWithdrawAmount("")
    setWalletAddress("")
    alert("Withdrawal request submitted!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Withdraw Funds
          </span>
        </h1>
        <p className="text-slate-400 mb-12">Withdraw your earnings to your TRON wallet</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Withdraw Form */}
          <div className="border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-6">Request Withdrawal</h2>

            {/* Important Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-400 font-semibold mb-2">ℹ️ Withdrawal Info:</p>
              <p className="text-sm text-slate-300">
                Minimum withdrawal: <span className="text-cyan-400 font-semibold">5 USDT</span>
              </p>
              <p className="text-xs text-slate-400 mt-2">Processing time: 24-48 hours</p>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Withdrawal Amount (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    step="0.01"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount (minimum 5 USDT)"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                  <span className="absolute right-4 top-3 text-slate-400">USDT</span>
                </div>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-sm font-semibold mb-2">TRON Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your TRON wallet address (T...)"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
              >
                Request Withdrawal
              </button>
            </form>
          </div>

          {/* Withdrawal History */}
          <div className="border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-6">Withdrawal History</h2>

            <div className="space-y-4">
              {withdrawals.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No withdrawals yet</p>
              ) : (
                withdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-400/50 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-white">${withdrawal.amount} USDT</div>
                        <div className="text-xs text-slate-400">{withdrawal.timestamp}</div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          withdrawal.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : withdrawal.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
