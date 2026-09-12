export function Footer() {
  return (
    <div className="max-w-[760px] mx-auto px-6 pt-16 pb-10">
      <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-white/40">
        <span>
          made for brains that scan. — by{" "}
          <a
            href="https://raulmoracode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 underline decoration-orange-500/30 underline-offset-4"
          >
            raulmoracode
          </a>
        </span>
        <a href="/SKILL.md" className="hover:text-white shrink-0">
          Read the skill →
        </a>
      </div>
    </div>
  )
}
