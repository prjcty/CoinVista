export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="slide-up space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Grow Your Crypto Wealth
              </span>
              <br />
              <span className="text-slate-100">With CoinVista</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Join thousands of investors earning daily rewards through our transparent and secure investment platform.
              Start with as little as 7 USDT.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#plans"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
              >
                Start Investing
              </a>
              <a
                href="#"
                className="px-8 py-3 border border-cyan-400/50 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-400/10 transition"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-400/50 transition">
                <div className="text-2xl font-bold text-cyan-400">12,500+</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-400/50 transition">
                <div className="text-2xl font-bold text-blue-400">$2.5M+</div>
                <div className="text-sm text-slate-400">Total Invested</div>
              </div>
              <div className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-400/50 transition">
                <div className="text-2xl font-bold text-teal-400">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Graphic */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <div className="w-72 h-72 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-3xl glow-pulse"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
