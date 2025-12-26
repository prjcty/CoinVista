"use client"

import { useState } from "react"
import Link from "next/link"

interface DepositProof {
  id: string
  userId: string
  amount: number
  timestamp: string
  proofImage: string
  status: "pending" | "approved" | "rejected"
  walletAddress: string
}

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<DepositProof[]>([
    {
      id: "1",
      userId: "user123",
      amount: 10,
      timestamp: "2024-01-20 10:30 AM",
      proofImage: "/deposit-proof.jpg",
      status: "pending",
      walletAddress: "TQvY7z...",
    },
    {
      id: "2",
      userId: "user456",
      amount: 50,
      timestamp: "2024-01-19 03:45 PM",
      proofImage: "/deposit-proof.jpg",
      status: "pending",
      walletAddress: "TJX8k9...",
    },
  ])

  const [selectedDeposit, setSelectedDeposit] = useState<DepositProof | null>(null)

  const updateDepositStatus = (id: string, newStatus: "approved" | "rejected") => {
    setDeposits(deposits.map((d) => (d.id === id ? { ...d, status: newStatus } : d)))
    setSelectedDeposit(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin: Manage Deposits
          </span>
        </h1>
        <p className="text-slate-400 mb-12">Review and verify user deposit proofs</p>

        {/* Deposits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-900/50 hover:border-cyan-400/50 transition cursor-pointer"
              onClick={() => setSelectedDeposit(deposit)}
            >
              {/* Deposit Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={deposit.proofImage || "/placeholder.svg"}
                  alt="Deposit proof"
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              {/* Deposit Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-white text-lg">${deposit.amount}</div>
                    <div className="text-xs text-slate-400">{deposit.timestamp}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      deposit.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : deposit.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                  </span>
                </div>

                <div className="text-sm text-slate-400 truncate">User: {deposit.userId}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedDeposit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Deposit Details</h2>
                <button onClick={() => setSelectedDeposit(null)} className="text-slate-400 hover:text-white transition">
                  ✕
                </button>
              </div>

              {/* Image */}
              <img
                src={selectedDeposit.proofImage || "/placeholder.svg"}
                alt="Deposit proof"
                className="w-full max-h-96 object-contain rounded-lg mb-6"
              />

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Amount</div>
                  <div className="text-2xl font-bold text-cyan-400">${selectedDeposit.amount}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">User ID</div>
                  <div className="text-lg font-semibold">{selectedDeposit.userId}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Status</div>
                  <div className="text-lg font-semibold capitalize">{selectedDeposit.status}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Timestamp</div>
                  <div className="text-sm">{selectedDeposit.timestamp}</div>
                </div>
              </div>

              {/* Actions */}
              {selectedDeposit.status === "pending" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => updateDepositStatus(selectedDeposit.id, "approved")}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold text-white hover:shadow-lg transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateDepositStatus(selectedDeposit.id, "rejected")}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white hover:shadow-lg transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
