export function HowItWorks() {
  return (
    <div className="max-w-[760px] mx-auto px-6 pt-20">
      <h2 className="text-[13px] font-bold tracking-widest uppercase text-white/40">
        How it works
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { n: "1", title: "Have both skills", desc: "Remix skill + skill to remix" },
          { n: "2", title: "Call remix", desc: "“make me a remix”" },
          { n: "3", title: "Call target skill", desc: "Get remixed version back" },
        ].map(s => (
          <div key={s.n} className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <div className="w-6 h-6 rounded-full bg-orange-500 text-black grid place-items-center text-xs font-bold">
              {s.n}
            </div>
            <div className="mt-3 text-sm font-semibold">{s.title}</div>
            <div className="text-xs leading-5 text-white/60 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
