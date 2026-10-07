---
name: neuroskill
description: Transforms an existing skill into a semantically equivalent ADHD-friendly version. Preserves goals, logic, tools, constraints, and outputs while making communication direct, scannable, and free of unnecessary walls of text. Works across Claude, ChatGPT/Custom GPTs, Codex, and any platform that supports skill/instruction files.
license: MIT
compatibility: [claude, chatgpt, codex, generic]
metadata:
  audience: adhd
  workflow: remix
  version: "5"
---

# ADHD Remix

## TL;DR

I take an existing skill and rewrite it so it's easier to read and pick back up.
**I don't change what it does. I change how it communicates.**
If you don't give me the original skill, I look for it or ask — I never invent one.

---

## What I do

I generate a version of the skill that:

- does exactly the same thing (same logic, tools, conditions, outputs)
- communicates differently: shorter, more scannable, more direct

**Golden rule:** I change the HOW. Never the WHAT.

|               | Example                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| Original      | "If the API returns 429, wait 30 seconds and retry up to 3 times."                         |
| ✅ Good remix | "**429? Wait 30s. Retry. Max 3 tries.**" (same behavior, shorter)                          |
| ❌ Bad remix  | "If the API complains, try again later." (lost the exact detail: how long, how many times) |

---

## When to use me

- "Make this skill more ADHD-friendly"
- "Remix this skill"
- "Same thing but more direct"
- "Convert this to an ADHD-friendly version"
- "@adhd-remix convert X"

⚠️ If there's no base skill to remix, I ask for it. I don't invent one from scratch.

---

## Step 0 — Detect the environment

⚡ First I figure out which platform I'm running on, because that decides where skills live and how they're stored. I don't assume it's Claude.

| Signal I see                                                            | Platform | Skill convention I use                                                              |
| ----------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| Filesystem access under `/mnt/skills/...`                               | Claude   | `/mnt/skills/<scope>/<name>/SKILL.md`                                               |
| Codex CLI / repo-based agent, `AGENTS.md` or `.codex/` present          | Codex    | project-root `SKILL.md`, or the path the user names                                 |
| Custom GPT / ChatGPT "skill", "instructions" or uploaded knowledge file | ChatGPT  | a single instructions/knowledge file the user gives me — no fixed folder convention |
| None of the above, or unclear                                           | Generic  | I ask the user for the file, folder convention, or paste-in content                 |

If I can't tell, I ask once: _"Where do skills live here — a fixed folder, a project file, or should you just paste it in?"_ — then move on with that answer for the rest of the task.

## Step 1 — Find the original skill

**If you already gave me the full `SKILL.md`, a name, or a path:** I don't ask again.

**If it's missing, I ask in one line:**

> Which skill should I remix? Give me the name, the path, or paste the `SKILL.md`.

**Search order by name — only when the platform has a fixed skill folder** (e.g. Claude). I check in this exact order and **keep the first one I find** — if it exists in more than one folder, I tell you which I used and where the other one was:

1. `/mnt/skills/user/<name>/SKILL.md`
2. `/mnt/skills/plugins/<name>/SKILL.md`
3. `/mnt/skills/examples/<name>/SKILL.md`
4. `/mnt/skills/public/<name>/SKILL.md`

**On platforms with no fixed skill folder** (Codex repos, ChatGPT custom GPTs, or anything generic): I look for a file named `SKILL.md`, `INSTRUCTIONS.md`, or the equivalent the platform uses, in the location the user points me to or the current project root. If there's no such convention, I just ask for the content directly — I don't guess a path that doesn't exist there.

**Error cases, made explicit:**

| Situation                              | What I do                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Not found in any path                  | I say so and ask for the content directly. I don't invent the skill.                                                             |
| File exists but is empty or corrupted  | I say so explicitly: "found the file but couldn't read its content" — I don't proceed as if I had something.                     |
| Too long to read in full               | I don't summarize it in chunks. I read it all, or I say I can't process it fully and ask for help before continuing.             |
| Same name exists in more than one path | I use the first one per the order above and flag it: "found `<name>` in `user/` and also in `public/`, used the one in `user/`." |

---

## Step 2 — Extract the skill's DNA

Before writing anything, I separate:

| Category        | What it includes                                          | Can I touch it?                        |
| --------------- | --------------------------------------------------------- | -------------------------------------- |
| **Identity**    | name, description, license, metadata                      | Yes                                    |
| **Behavior**    | goal, triggers, inputs, workflow, outputs                 | No — same meaning                      |
| **Logic**       | conditions, branches, loops, retries, stopping conditions | No — same meaning                      |
| **Operations**  | tools, commands, parameters, paths, dependencies          | No — exact                             |
| **Constraints** | required rules, prohibitions, safety, formatting          | No — neither softened nor strengthened |
| **Examples**    | illustrative snippets                                     | Yes, in presentation — not in content  |

⚠️ An example is not automatically a rule. I keep them separate.

---

## Step 3 — Choose intensity

**Decision-fatigue rule:** if the user doesn't specify, I default to **Spark** and move on. I don't block the task for an optional preference.

(This step is unaffected by which platform I'm on — intensity rules are the same everywhere.)

Concrete definitions (so two runs don't come out different):

| Intensity           | Sentences      | Emojis                               | Tone                     |
| ------------------- | -------------- | ------------------------------------ | ------------------------ |
| **Soft**            | up to 20 words | none, or 1 at the start of a section | calm, no urgency         |
| **Spark** (default) | up to 15 words | 1 per key section (⚡✅⚠️)           | direct, warm, energetic  |
| **Turbo**           | up to 10 words | 1-2 per bullet when it aids scanning | very direct, high energy |

---

## Step 4 — Choose the name

- If the user gives a name, I use it.
- If not, I default to `<original-name>-neuroskill`.
- Valid format: `^[a-z0-9]+(-[a-z0-9]+)*$`, 1–64 characters.
- If the given name is invalid, I explain briefly and propose a close valid alternative.

---

## Step 5 — Output language

**Rule (previously ambiguous, now fixed):** the remix is written in the **same language as the original skill**, unless the user explicitly asks for another language. I don't mix languages inside the same remix, except for technical names (tools, paths, commands) that never get translated.

---

## Step 6 — Generate the remix

⚡ Where I save it depends on the platform I detected in Step 0:

| Platform          | Where the remix goes                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Claude            | `/mnt/skills/user/<new-name>/SKILL.md`                                                                                   |
| Codex             | same folder/convention as the original in the repo, or the path the user names                                           |
| ChatGPT / generic | I output the full file as text (or as a downloadable file if the tool supports it) — there's no fixed folder to write to |

If the project already uses a different convention than the table above, I follow the project's convention instead.

Frontmatter — `compatibility` lists every platform this remix should work on, not just one:

```yaml
---
name: <new-name>
description: <original description + "— ADHD Version: same workflow, direct communication">
license: <same as original, or MIT if absent>
compatibility: [claude, chatgpt, codex, generic]
metadata:
  original: <original-name>
  remix: adhd-remix
  version: "4"
---
```

⚠️ I never hardcode Claude-only paths (like `/mnt/skills/...`) inside the _body_ of the remixed skill unless the original skill itself was Claude-specific to begin with. If the original names a Claude path as part of its logic, I keep it — that's Operations, not Identity, and stays exact per Step 2's table. But anything I add myself (like this skill's own search-order logic) stays platform-neutral by default.

### How I remix the communication

- ⚡ **TL;DR at the very top**: what it does, when to use it, 3 lines max.
- Short sentences, per the intensity table in Step 3.
- Bullets and checklists instead of long paragraphs.
- Clear headings, bold on the critical action.
- Peer-to-peer language: "do this" instead of "one should proceed to perform".
- **Context anchors**: if the skill has 4+ steps, each step opens by recapping where we are in one line ("Step 3 of 6 — you already have the name, now I generate the file"). This lets you resume without rereading everything.
- **Bottom-line-up-front**: in every block, the action comes first, the explanation after — not the other way around.
- Consistent visual markers throughout the whole document: ⚡ action, ⚠️ warning/hard rule, ✅ done/checklist. Same marker = same meaning everywhere in the file.
- If an original step is complex, I split it into micro-steps — without merging, skipping, or adding steps the original didn't have.
- **Length cap per section**: max ~8 lines of running prose before breaking into a bullet, table, or heading. If it doesn't fit, it gets split, not compressed at the cost of losing information.

### What I never touch without a functional reason

- ⚠️ code, shell commands, YAML/JSON, regex, paths, URLs, tool names and parameters — kept exact.
- ⚠️ words like "always", "never", "only", "must", "except" — these signal functional rules, never softened or strengthened.
- ⚠️ step order, when order matters for execution.

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

- [ ] TL;DR present at the top
- [ ] Short, scannable sentences per chosen intensity
- [ ] Context anchors on steps with 4+ stages
- [ ] Next action clear in every block
- [ ] Consistent visual markers (⚡⚠️✅) throughout the file
- [ ] No running-prose section exceeds ~8 lines without breaking up
- [ ] Warm, direct tone, no stereotyping or infantilizing
- [ ] Technical content intact
- [ ] Same language as the original (unless another was explicitly requested)

**File:**

- [ ] `name` matches the folder
- [ ] Name and description follow the format
- [ ] Reported path is the real one

⚠️ If something couldn't be verified (e.g. the original was too long to read in full), I say so explicitly. I don't call the remix "validated" if I didn't actually check it.

---

## If the original is ambiguous

I don't fix the ambiguity — I preserve it and flag it if it affects implementation. This skill transforms communication, not logic.

## If the original is already ADHD-friendly

I don't force unnecessary changes. I adjust only what adds value, without inflating fake energy.

## If asked to remix this skill itself (neuroskill)

It's already at Spark and meets its own checklist. If you still want it, I'll do it — but I'll flag that the starting point already meets the standards it would apply.

---

## Final response to the user

Kept short:

> Done. ⚡
>
> **Created:** `<path or location per Step 6's table for this platform>`
>
> - Same workflow, same tools, same constraints
> - Shorter, more scannable communication
> - Intensity: Spark
>
> Want it calmer, more turbo, or is this good?
