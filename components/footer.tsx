export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-950">
                CV
              </div>
              <span className="font-bold text-lg">CoinVista</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your trusted crypto investment platform for secure and profitable returns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  Deposit
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  Withdraw
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://t.me/ZyaraT_CoinVista"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+4QRm9GWn3QE0OTk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Join Our Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">
                TRON Wallet:
                <br />
                <code className="text-cyan-400 text-xs break-all">TPebgMwRreHYtjTYSApny8mxGbyk3p9Rfu</code>
              </li>
              <li className="text-slate-400 text-xs">Min Deposit: 7 USDT</li>
              <li className="text-slate-400 text-xs">Min Withdraw: 5 USDT</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">&copy; 2025 CoinVista. All rights reserved.</p>
            <div className="flex gap-4">
              <a
                href="https://t.me/ZyaraT_CoinVista"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Telegram
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
