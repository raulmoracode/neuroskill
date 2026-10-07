import { Check, Copy, Github } from "lucide-react";
import { useState } from "react";

export function CopyBlock({
  code,
  repoUrl,
  variant = "primary",
}: {
  code: string;
  repoUrl?: string;
  variant?: "primary" | "secondary";
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="copy-line">
      <code className="copy-code">{code}</code>
      <button
        type="button"
        className={`copy-button${variant === "secondary" ? " copy-button--secondary" : ""}`}
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? <Check /> : <Copy />}
      </button>
      {repoUrl && (
        <a
          className="link-button"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          title="GitHub"
        >
          <Github />
        </a>
      )}
    </div>
  );
}
