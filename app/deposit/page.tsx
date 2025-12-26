"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

interface DepositProof {
  id: string
  amount: number
  timestamp: string
  proofImage: string
  status: "pending" | "approved" | "rejected"
}

export default function DepositPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [proofImage, setProofImage] = useState<string | null>(null)
  const [deposits, setDeposits] = useState<DepositProof[]>([
    {
      id: "1",
      amount: 10,
      timestamp: "2024-01-20 10:30 AM",
      proofImage: "/deposit-proof.jpg",
      status: "approved",
    },
  ])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setProofImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!depositAmount || !proofImage) {
      alert("Please enter amount and upload proof image")
      return
    }

    const newDeposit: DepositProof = {
      id: Date.now().toString(),
      amount: Number.parseFloat(depositAmount),
      timestamp: new Date().toLocaleString(),
      proofImage: proofImage,
      status: "pending",
    }

    setDeposits([newDeposit, ...deposits])
    setDepositAmount("")
    setProofImage(null)
    setSelectedFile(null)
    alert("Deposit proof submitted! Admin will verify shortly.")
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
            Deposit Funds
          </span>
        </h1>
        <p className="text-slate-400 mb-12">Add funds to your CoinVista account via TRON (TRC20) network</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Deposit Form */}
          <div className="border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-6">Submit Deposit</h2>

            {/* Important Info */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-cyan-400 font-semibold mb-2">⚠️ Important:</p>
              <p className="text-sm text-slate-300">
                Send exactly the amount you want to deposit to: <br />
                <code className="text-cyan-400 text-xs break-all font-mono mt-2 block">
                  TPebgMwRreHYtjTYSApny8mxGbyk3p9Rfu
                </code>
              </p>
              <p className="text-xs text-slate-400 mt-2">Min: 7 USDT | For Investment Plans: 10 USDT</p>
            </div>

            <form onSubmit={handleDeposit} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Deposit Amount (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="7"
                    step="0.01"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount (minimum 7 USDT)"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                  <span className="absolute right-4 top-3 text-slate-400">USDT</span>
                </div>
              </div>

              {/* Upload Proof */}
              <div>
                <label className="block text-sm font-semibold mb-2">Upload Deposit Proof (Screenshot/Image)</label>
                <div className="border-2 border-dashed border-slate-600/50 rounded-lg p-6 hover:border-cyan-400/50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="proof-upload"
                  />
                  <label htmlFor="proof-upload" className="cursor-pointer">
                    {proofImage ? (
                      <div className="text-center">
                        <img
                          src={proofImage || "/placeholder.svg"}
                          alt="Proof"
                          className="max-h-32 mx-auto mb-2 rounded"
                        />
                        <p className="text-sm text-cyan-400">Click to change image</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg
                          className="w-8 h-8 mx-auto mb-2 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-slate-400">Click or drag to upload deposit screenshot</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
              >
                Submit Deposit Proof
              </button>
            </form>
          </div>

          {/* Deposit History */}
          <div className="border border-slate-700/50 rounded-2xl p-8 bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-6">Deposit History</h2>

            <div className="space-y-4">
              {deposits.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No deposits yet</p>
              ) : (
                deposits.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-400/50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white">${deposit.amount} USDT</div>
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
                    {deposit.proofImage && (
                      <img
                        src={deposit.proofImage || "/placeholder.svg"}
                        alt="Proof"
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
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
