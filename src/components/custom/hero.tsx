import { Github } from "lucide-react"
import { CopyBlock } from "@/components/custom"
import { Button } from "@/components/ui"
import { siteConfig } from "@/config"

export function Hero() {
  return (
    <div className="max-w-[760px] mx-auto px-6 pt-16 sm:pt-24">
      <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[44px] sm:text-[64px]">
        Same skill.
        <br />
        <span className="font-normal text-orange-500">Clearer.</span>
      </h1>
      <p className="mt-5 text-[17px] leading-7 text-white/60 max-w-[480px]">
        Paste any Claude skill. Get the same skill.
        <br />
        <span className="text-white font-medium">Short, scannable, ADHD-friendly.</span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          onClick={() => document.getElementById("see")?.scrollIntoView({ behavior: "smooth" })}
          className="rounded-lg bg-orange-500 hover:bg-orange-600 text-black h-10 px-6 font-medium"
        >
          See example
        </Button>
        <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="rounded-lg h-10 px-6 bg-transparent border border-white/20 text-white hover:bg-white/10"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Button>
        </a>
      </div>

      <div className="mt-4">
        <CopyBlock code={siteConfig.installCommand} />
      </div>
    </div>
  )
}
