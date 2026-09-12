import { DemoToggle, Hero, HowItWorks, InstallSection } from "@/components/custom"
import { Footer, Navbar } from "@/components/layout"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      <Navbar />
      <Hero />
      <DemoToggle />
      <HowItWorks />
      <InstallSection />
      <Footer />
    </div>
  )
}
