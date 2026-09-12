export const siteConfig = {
  installCommand:
    "mkdir -p ~/.claude/skills/tdah-remix && curl -fsSL https://raw.githubusercontent.com/raulmoracode/neuroskill/main/SKILL.md -o ~/.claude/skills/tdah-remix/SKILL.md",
  githubUrl: "https://github.com/raulmoracode/neuroskill",
} as const;

export type SiteConfig = typeof siteConfig;
