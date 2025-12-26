"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-950">
              CV
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CoinVista
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#dashboard" className="text-sm text-slate-300 hover:text-cyan-400 transition">
              Dashboard
            </Link>
            <Link href="#plans" className="text-sm text-slate-300 hover:text-cyan-400 transition">
              Investment Plans
            </Link>
            <Link href="/deposit" className="text-sm text-slate-300 hover:text-cyan-400 transition">
              Deposit
            </Link>
            <Link href="/withdraw" className="text-sm text-slate-300 hover:text-cyan-400 transition">
              Withdraw
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 hover:text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#dashboard" className="block text-sm text-slate-300 hover:text-cyan-400 py-2">
              Dashboard
            </Link>
            <Link href="#plans" className="block text-sm text-slate-300 hover:text-cyan-400 py-2">
              Investment Plans
            </Link>
            <Link href="/deposit" className="block text-sm text-slate-300 hover:text-cyan-400 py-2">
              Deposit
            </Link>
            <Link href="/withdraw" className="block text-sm text-slate-300 hover:text-cyan-400 py-2">
              Withdraw
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
