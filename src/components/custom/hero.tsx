import { site } from "@/config/site";
import { CopyBlock } from "./copy-block";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title">
        Same skill.
        <br />
        Shorter read.
      </h1>
      <p className="hero-copy">
        Neuroskill remixes any skill into an ADHD-friendly version.
        <br />
        Same logic, tools and constraints. Just a shorter read.
      </p>
      <div className="hero-command">
        <CopyBlock code={site.installCommand} repoUrl={site.githubUrl} />
        <CopyBlock code={site.usageCommand} variant="secondary" />
      </div>
      <a
        className="site-credit"
        href={site.authorUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        raulmoracode
      </a>
    </section>
  );
}
