import { useState } from "react"

export function DemoToggle() {
  const [mode, setMode] = useState<"before" | "after">("after")

  return (
    <div id="see" className="max-w-[760px] mx-auto px-6 pt-16">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex p-1 rounded-full bg-zinc-900 border border-white/10">
          <button
            type="button"
            onClick={() => setMode("before")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mode === "before" ? "bg-white shadow-sm text-black border border-white" : "text-white/60"}`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setMode("after")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mode === "after" ? "bg-orange-500 text-black shadow-sm" : "text-white/60"}`}
          >
            After
          </button>
        </div>
        <span className="text-xs ml-1 font-medium text-orange-500">
          {mode === "before" ? "42 words" : "6 words"}
        </span>
      </div>

      <div className="rounded-[24px] border border-white/10 overflow-hidden bg-zinc-900">
        {mode === "before" ? (
          <div className="p-6 sm:p-8">
            <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-3">
              Original
            </div>
            <p className="text-[15px] leading-7 text-white/70">
              If the API returns 429, wait 30 seconds and retry up to 3 times. Make sure to handle
              exponential backoff and respect the Retry-After header if present in the response.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">
              Remix
            </div>
            <div className="font-mono text-[18px] sm:text-[20px] font-semibold tracking-tight leading-7">
              429? Wait 30s. Retry. Max 3 tries.
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex gap-2.5 text-white">
                <span className="text-white/40">—</span> Same waits, same retries
              </div>
              <div className="flex gap-2.5 text-white">
                <span className="text-white/40">—</span> Same{" "}
                <span className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded border border-white/10 text-white">
                  Retry-After
                </span>{" "}
                header
              </div>
              <div className="flex gap-2.5 text-white">
                <span className="text-white/40">—</span> Only shorter
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["Keeps", "logic & tools"],
          ["Keeps", "always / never"],
          ["Changes", "words → bullets"],
        ].map(([a, b]) => (
          <div key={a + b} className="rounded-2xl border border-white/10 bg-zinc-900 py-3">
            <div className="text-[11px] font-bold tracking-widest uppercase text-orange-500">
              {a}
            </div>
            <div className="text-xs font-medium text-white/80 mt-0.5">{b}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
