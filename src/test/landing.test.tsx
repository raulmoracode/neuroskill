import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { site } from "@/config/site";

const writeText = vi.fn();

beforeEach(() => {
  writeText.mockReset();
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("landing", () => {
  it("renders the hero headline", () => {
    render(<App />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toContain("Same skill.");
    expect(heading.textContent).toContain("Shorter read.");
  });

  it("shows the install and usage commands", () => {
    render(<App />);

    expect(screen.getByText(site.installCommand)).toBeDefined();
    expect(screen.getByText(site.usageCommand)).toBeDefined();
  });

  it("copies a command and confirms it", async () => {
    render(<App />);

    const button = screen.getAllByRole("button", {
      name: "Copy to clipboard",
    })[0];
    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledWith(site.installCommand);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Copied" })).toBeDefined();
    });
  });

  it("links to the repository", () => {
    render(<App />);

    const link = screen.getByRole("link", { name: "View on GitHub" });

    expect(link.getAttribute("href")).toBe(site.githubUrl);
  });
});
