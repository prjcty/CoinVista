import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Dashboard from "@/components/dashboard"
import InvestmentPlans from "@/components/investment-plans"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <Hero />
      <Dashboard />
      <InvestmentPlans />
      <Footer />
    </main>
  )
}
