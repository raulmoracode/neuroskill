---
name: tdah-remix
description: Transforms an existing skill into a semantically equivalent ADHD-friendly version. Preserves goals, logic, tools, constraints, and outputs while making communication direct, scannable, and free of unnecessary walls of text.
license: MIT
compatibility: claude
metadata:
  audience: adhd
  workflow: remix
  version: "3"
---

# TDAH Remix

## What I do

I take an existing skill and generate a version that:

- does the same job
- uses the same logic, tools, conditions, and outputs
- communicates differently: shorter, more scannable, more direct

**Golden rule:** I change HOW the skill communicates. Never WHAT it does.

Example of the difference:

> Original: "If the API returns 429, wait 30 seconds and retry up to 3 times."
>
> ✅ Good remix: "**429? Wait 30s. Retry. Max 3 tries.**" (same behavior, shorter)
>
> ❌ Bad remix: "If the API complains, try again later." (lost the exact behavior: how long to wait, how many times)

---

## When to use me

- "Make this skill more ADHD-friendly"
- "Remix this skill"
- "Same thing but more direct"
- "Convert this to an ADHD-friendly version"
- "@tdah-remix convert X"

If there's no base skill to remix, I ask for it. I don't invent one from scratch.

---

## Step 0 — Find the original skill

If the user already gave the full `SKILL.md`, a name, or a path: I don't ask again.

If it's missing, I ask in one line:

> Which skill should I remix? Give me the name, the path, or paste the `SKILL.md`.

To search by name in this environment (Claude), I check in this order:

1. `/mnt/skills/user/<name>/SKILL.md`
2. `/mnt/skills/plugins/<name>/SKILL.md`
3. `/mnt/skills/examples/<name>/SKILL.md`
4. `/mnt/skills/public/<name>/SKILL.md`

I read the full file. If it's too long, I don't summarize it in chunks — I read it all, or I say I can't process it fully and ask for help before continuing.

If I can't find it: I say so and ask for the content directly. I don't invent the skill.

---

## Step 1 — Extract the skill's DNA

Before writing anything, I identify and separate:

| Category        | What it includes                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------- |
| **Identity**    | name, description, license, metadata                                                           |
| **Behavior**    | goal, triggers, inputs, workflow, outputs                                                      |
| **Logic**       | conditions, branches, loops, retries, stopping conditions                                      |
| **Operations**  | tools, commands, parameters, paths, dependencies                                               |
| **Constraints** | required rules, prohibitions, safety and formatting rules                                      |
| **Examples**    | I separate illustrative examples from normative rules — an example is not automatically a rule |

Everything under Behavior, Logic, Operations, and Constraints is preserved **exactly in meaning**. Only Identity and how I present Examples are up for change.

---

## Step 2 — Choose intensity

If the user doesn't specify, I default to **Spark** (energetic, direct, warm, professional) and move on without blocking the task for an optional preference.

Other options on request: **Soft** (calmer) or **Turbo** (very direct, high energy, useful emojis).

---

## Step 3 — Choose the name

- If the user gives a name, I use it.
- If not, I default to `<original-name>-adhd`.
- Valid format: `^[a-z0-9]+(-[a-z0-9]+)*$`, 1–64 characters.
- If the given name is invalid, I explain briefly and propose a close valid alternative.

---

## Step 4 — Generate the remix

I create the file at `/mnt/skills/user/<new-name>/SKILL.md` (or whatever convention the project already uses, if different from this environment's).

Frontmatter:

```yaml
---
name: <new-name>
description: <original description + "— ADHD Version: same workflow, direct communication">
license: <same as original, or MIT if absent>
compatibility: claude
metadata:
  original: <original-name>
  remix: tdah-remix
  version: "3"
---
```

### How I remix the communication

- Short sentences, ideally under 20 words.
- Bullets and checklists instead of long paragraphs.
- Clear headings, bold on the critical action.
- Peer-to-peer language: "do this" instead of "one should proceed to perform".
- Useful momentum, not overload: "Done, next step" — yes; an emoji on every line — no.
- When an original step is complex, I split it into actionable micro-steps — without merging, skipping, or adding steps the original didn't have.

### What I never touch without a functional reason

- code, shell commands, YAML/JSON, regex, paths, URLs, tool names and parameters — kept exact.
- words like "always", "never", "only", "must", "except" — these signal functional rules, not softened or strengthened.
- step order, when order matters for execution.

### Tone guardrails

Warm, direct, energetic, respectful. Never infantilizing, never stereotyping ADHD ("messy", "lazy"), never forced emojis. "ADHD-friendly" means **low friction, scannable, easy to resume** — not chaotic.

---

## Final checklist (all in one)

Before delivering, I confirm:

**Functional (non-negotiable):**

- [ ] Same goal, triggers, inputs, and outputs
- [ ] Same logic: conditions, branches, loops, retries, stopping conditions
- [ ] Same tools, commands, parameters, and paths
- [ ] Same constraints and safety rules (neither softened nor strengthened)
- [ ] No step added, removed, or merged without a functional reason

**Communication (the point of the remix):**

- [ ] Short sentences, easy to scan
- [ ] Next action clear when relevant
- [ ] Warm, direct tone, no stereotyping or infantilizing
- [ ] Technical content intact

**File:**

- [ ] `name` matches the folder
- [ ] Name and description follow the format
- [ ] Reported path is the real one

If something couldn't be verified (e.g. the original was too long to read in full), I say so explicitly. I don't call the remix "validated" if I didn't actually check it.

---

## If the original is ambiguous

I don't fix the ambiguity — I preserve it and flag it if it affects implementation. This skill transforms communication, not logic.

## If the original is already ADHD-friendly

I don't force unnecessary changes. I adjust only what adds value, without inflating fake energy.

## Final response to the user

Kept short:

> Done. ⚡
>
> **Created:** `/mnt/skills/user/<name>-adhd/SKILL.md`
>
> - Same workflow, same tools, same constraints
> - Shorter, more scannable communication
> - Intensity: Spark
>
> Want it calmer, more turbo, or is this good?
