export const siteConfig = {
  installCommand:
    "curl -fsSL https://raw.githubusercontent.com/raulmoracode/neuroskill/main/public/adhd-remix.md -o ~/Downloads/adhd-remix.md",
  githubUrl: "https://github.com/raulmoracode/neuroskill",
} as const;

export type SiteConfig = typeof siteConfig;
