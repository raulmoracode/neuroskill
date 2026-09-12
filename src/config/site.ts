export const siteConfig = {
  installCommand:
    "curl -fsSL https://raw.githubusercontent.com/raulmoracode/neuroskill/public/SKILL.md -o ~/.claude/skills/tdah-remix/SKILL.md",
  githubUrl: "https://github.com/raulmoracode/neuroskill",
} as const;

export type SiteConfig = typeof siteConfig;
