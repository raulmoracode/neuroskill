import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui"

export function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 p-1.5 pl-4 overflow-hidden">
      <div className="flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <code className="font-mono text-sm text-white whitespace-nowrap block pr-2 select-all">
          {code}
        </code>
      </div>
      <Button
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="rounded-lg h-8 px-4 bg-orange-500 text-black hover:bg-orange-600 shrink-0"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}
