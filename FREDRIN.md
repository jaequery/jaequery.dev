# FREDRIN.md

Configuration and working guidelines for this project on **Fredrin** — the
desktop kanban for running many AI-coding tickets in parallel. This file is
committed to the repo, fully customizable, and read by every Worker at the start
of a session. Edit it to fit your team; run **Reset to defaults** from the
Context tab to restore this template.

## What a ticket is

A **ticket** is one unit of work that runs through a single AI agent session (a
**Worker**) in its own branch and **worktree**. Throughput comes from running
many tickets in parallel — one ticket, one Worker. Tickets are GitHub-shaped: a
ticket has a branch, optionally a PR, and CI status flowing back to the board.
Merging the PR auto-completes the ticket.

Fredrin owns the worktree's lifecycle for you: it is created when the ticket
starts building and torn down — best-effort, from the desktop app — when the
ticket's PR merges **or when you delete the ticket** (deleting cleans up every
worktree the ticket ever produced). **Archiving** a completed ticket only hides
the card; it leaves the worktree on disk. If the desktop app isn't running when
a worktree is meant to be removed, it simply lingers until the next cleanup or a
manual `git worktree remove`.

## Kanban workflow

Tickets move left-to-right across the board, driven by **deterministic signals**
— no model discipline required:

1. **Backlog** — captured, not yet started. Human presses Run → spawns a session.
2. **Running** — a Worker is actively working (session just started).
3. **Blocked** — human-marked; the Worker needs input before continuing.
4. **Review** — the session ended; a human glances at the diff and ships or sends back.
5. **Completed** — the human clicked Complete (or the PR merged).

The board column is driven by Claude Code's lifecycle hooks (SessionStart →
Running, Stop/SessionEnd → Review) plus one explicit human action for Completed.
You do not need to call any CLI to move the ticket — running your work is enough.

## Talking to Fredrin in plain language

Fredrin is the platform you are running inside, and it has its own vocabulary.
When the user speaks colloquially, map their words to these concepts and act
through the `fredrin` CLI — don't make them learn Fredrin's terms first. This is
**Fredrin platform vocabulary**: it is identical in every project, so it lives
here in FREDRIN.md, not in your project's own `CONTEXT.md` glossary (see
**Team guidelines** for that split).

### The two CLIs — know which one you have

There are two `fredrin` commands. They are different programs; pick by where you are.

Both are **strictly noun-verb: `fredrin <noun> <verb> [opts]`** — every command
names the resource it acts on (`tickets get <id>`, `projects list`, `ticket finish`),
and a noun AND a verb are both required, so intent is never ambiguous. The old flat
verbs (`get`, `create`, `start`, …) and short noun spellings (`goal`/`term`/`reap`)
have been **removed** — they exit with a pointer to the canonical form. Run
`fredrin --help` (or `./.fredrin/fredrin` with no args) for the live verb map.

- **Global `fredrin`** — on `$PATH` in every Fredrin desktop terminal (rewritten
  at each app launch, so it is never stale). Works with **no ticket bound**: list
  projects and tickets, create tickets, dispatch Workers, drive terminals. This is
  the entry point when a user opens a plain terminal and asks for something. Run
  `fredrin --help` to see exactly which verbs this app build offers — and the
  session preamble lists the currently-available global verbs (it is regenerated
  every session, so it is always current).
- **Per-ticket `./.fredrin/fredrin`** — exists only **inside a ticket's worktree**
  and carries a scoped token for *that* ticket. Reads and mutates the current
  ticket via the `ticket` noun (`ticket get`, `ticket update-plan`, `ticket check`,
  `ticket finish`, …). Documented in full under **The `./.fredrin/fredrin` CLI** below.

Inside a ticket worktree both are available; in a plain project terminal only the
global `fredrin` is.

### Nouns — what the user's words mean

| User says | Means in Fredrin | NOT |
|---|---|---|
| task, card, todo, issue, story | a **Ticket** | a GitHub issue — unless they say "GitHub issue" |
| repo, codebase, app, project | a **Project** | — |
| the AI, the agent, claude, the bot | a **Worker** (one Ticket = one Worker) | — |
| job, run, build | **executing a Ticket** (spawning its Worker) | a CI job |
| my board, my kanban, the columns | the **Tasks board** | — |
| org, team, account | a **Workspace** | — |
| dev server, localhost, the app running | a **Server** | — |
| goal, milestone, objective, epic, workstream, group of tickets | a **Goal** (a named, colored grouping of tickets in a project) | a Project (the repo) or a GitHub milestone |

### Intent → action

| The user wants to… | Do this |
|---|---|
| create a ticket / make a task / file an issue | `fredrin tickets create '{"title":"…"}'` (lands in the Backlog) |
| group tickets / track a milestone / make a goal | `fredrin goals create '{"name":"…"}'`, then `fredrin goals assign <goal> <ticket…>` (the goal groups them; tickets stay flat on the board) |
| run it / run a job / build the ticket / start it | `fredrin tickets start <id>` (verb aliases: `build`, `run`) |
| run the app / start the dev server / spin up localhost | `fredrin servers start <id>` (or `--all` for every server); list with `fredrin servers list`, stop with `fredrin servers stop`. These live in the **Servers** tab |
| what's on my board / list my tickets | `fredrin tickets list` |
| show one ticket | `fredrin tickets get <id>` |
| what projects do I have | `fredrin projects list` |
| open a terminal / split panes | `fredrin terminals …` |
| ship it / send to review / open a PR / it's done | inside the ticket worktree: `./.fredrin/fredrin ticket finish` (records an already-open PR instead with `./.fredrin/fredrin ticket ship`) |

The set of global verbs grows over time (e.g. server controls land later). When
this table and the session preamble's live verb list disagree, trust the
preamble and `fredrin --help` — they reflect what this build actually ships.

### Hard disambiguation rules

- **ticket / task / card / issue / todo → always a Fredrin Ticket** via the CLI,
  unless the user explicitly says "GitHub issue."
- **ship / finish → open a PR and move the ticket to Review — NEVER merge or
  deploy.** Merging is the human's gate; you never cross it.
- **job / run / build → start a Worker on a Ticket**, not a CI run.
- **"start" / "run" is ambiguous — read the object.** "start / run *the ticket /
  task / build*" → dispatch a Worker (`fredrin tickets start <id>`). "start / run *the app
  / dev server / localhost*" → a **Server** via `fredrin servers start`, shown in
  the **Servers** tab. Never conflate the two.
- **goal / milestone / objective → a Fredrin Goal.** When the user wants related
  tickets grouped (or names a milestone), create the Goal with `fredrin goals
  create` and file the work into it with `fredrin goals assign` — don't fake it
  with labels or a parent ticket. A Goal groups many tickets and a ticket can be
  in many Goals; the board stays flat.

### Recognizing work that should become a ticket

Stay alert for work that should become a ticket — recognize the intent **even when
the user never says "ticket"**: a feature request, a bug report, a "we should…" or
"can you add…", any task / card / todo / issue / story.

But **trigger conservatively, and only ever offer — never auto-create.** Suggest a
ticket only when the work is a **distinct unit of work that would run as its own
Worker** *and* is **concretely scoped** (detailed enough to write a clear title)
*and* isn't already covered by the current ticket. These are **not** triggers:
questions, brainstorming, debugging the task at hand, or anything still vague —
when in doubt, ask instead of assuming.

When the bar is met, propose it and **confirm the title with the user before**
running `fredrin tickets create '{"title":"…"}'` (one ticket per distinct piece of work).
It lands in the Backlog for the human to run.

### When you create a ticket, transfer your context into it

**The planner is the smartest model in the pipeline — never assume the build
agent is.** When you generate a ticket (a decompose subtask, a spawned
follow-up), you hold context a later, possibly weaker Worker will not: repo
knowledge, grilled decisions, the chat so far. Don't record only the *ask* —
transfer that context into the ticket so a lesser agent can execute it without
re-deriving it or searching the whole repo. Every generated ticket ships with a
full plan (`fredrin tickets create '{"title":…,"description":…,"plan":…}'`): the
five-section plan (`## Outcome`, `## Acceptance checks`, `## Touchpoints`,
`## Constraints`, `## Open questions`) naming exact touchpoints (repo-relative
paths), the constraints and patterns to follow, verbatim copy/values the builder
would otherwise invent, and runnable acceptance checks. State every decision you
skipped as an explicit assumption, and put every unknown under `## Open
questions` — never omit it, and never ship an empty plan.

## The `./.fredrin/fredrin` CLI

This is the **per-ticket** CLI from the two above — it lives in the current
ticket's worktree and acts on that ticket. (For the global, ticket-free
`fredrin`, see **Talking to Fredrin in plain language**.) Each session's worktree
gets a `./.fredrin/fredrin` wrapper (git-ignored; it carries a scoped API token).
Use it to read or mutate the current ticket. Every command is `ticket <verb>`
(plus `plan <verb>` for the plan); the old bare verbs were removed, so `ticket get`
is the only form (a bare `get` exits with a pointer to it):

- `./.fredrin/fredrin ticket get` — fetch the current ticket
- `./.fredrin/fredrin ticket update-plan <<'PLAN'` … `PLAN` — save the implementation plan
  from **stdin** (preferred; no JSON escaping, no temp file). Use markdown with a
  `## Action items` GFM checklist (`- [ ]` / `- [x]`). Do NOT `jq` a temp file or
  hand-build `'{"plan":"..."}'` — a blocked or partial temp-file write makes jq
  slurp stale content and saves the wrong plan.
- `./.fredrin/fredrin ticket check <n>` / `ticket uncheck <n>` — flip ONE action item by its
  1-based position in the plan without re-sending the whole plan. Cheap and atomic,
  so during **Build** flip each item the moment you finish it — progress then
  updates in real time. (Also: `plan check <n>` / `plan uncheck <n>`.)
- `./.fredrin/fredrin ticket update '{"plan":"..."}'` — same effect as `update-plan` via
  inline JSON (only if you cannot use a heredoc)
- `./.fredrin/fredrin ticket update '{"description":"..."}'` — PATCH ticket fields
- `./.fredrin/fredrin ticket comment '{"body":"..."}'` — post a comment
- `./.fredrin/fredrin ticket context [--budget N]` — relevance-scoped Memory pointer pack (JSON)
  for this ticket: the concepts and decisions it actually touches. Run it at session start.
- `./.fredrin/fredrin ticket context-classify [--notes "..."]` — **advisory** significance gate:
  reads this ticket's local diff and advises whether the change warrants its own ADR
  (`routine` → no ADR, `significant` → write one). Never blocks the build.
- `./.fredrin/fredrin ticket screenshot <url>` — capture a screenshot of `url`, upload it, and
  attach it to this ticket as an artifact (no `url` → captures the PR preview). Run this
  the moment the user asks to "take a screenshot of …" or "upload a screenshot" — the
  server does the Playwright capture + S3 upload + attach; you never touch either directly.
- `./.fredrin/fredrin ticket upload <file> [--label text] [--kind before|after] [--pair key]` —
  attach a LOCAL file (screenshot, screen recording, HTML mockup, log) to this ticket as
  an artifact. For before/after evidence, upload the pre-change capture with `--kind
  before` and the post-change capture with `--kind after`, reusing the same `--pair`
  slug per screen so the board shows them side by side.
- `./.fredrin/fredrin ticket finish '{"checks":[{"command":"pnpm typecheck","exitCode":0}],"summary":"..."}'` — **your final act.** Records your
  acceptance-check results and, only if every check is green, pushes the branch, opens the PR
  (reusing one if it already exists), and moves the ticket to Review — all in one call. On a red
  check it records the failure (needs-work) and opens no PR. It only ever opens a PR — never merges,
  never pushes to the base branch. **Each check is `{"command":"<the command you ran>","exitCode":<its real exit code>}`** —
  `exitCode` 0 = pass, any non-zero = fail (the fields are `command` and `exitCode`, NOT `name`/`passed`; a missing
  `exitCode` is read as failed). Pass `"checks":[]` when the ticket's build steps did not ask
  for verification — `finish` then records nothing and goes straight to push + PR.
- `./.fredrin/fredrin ticket ship '{...}'` — record an already-open PR URL (board moves to Review). Prefer
  `ticket finish`, which calls this for you once the build is green.
- `./.fredrin/fredrin ticket error '{"reason":"...","where":"..."}'` — surface a build failure

Do not echo or log the contents of `./.fredrin/fredrin` — it holds a credential.

## Building a ticket

When you start a Build, treat the plan's **acceptance checks** as the contract —
its definition of done, and a live checklist, not a list flipped (if ever) at the
very end:

- **Review them upfront.** Before writing any code, read every acceptance check
  from the plan (`./.fredrin/fredrin ticket get`) and, for each, restate the concrete
  pass/fail signal you will drive it to — the command to run, the HTTP response,
  the UI state to observe. Build toward verifiable outcomes, not vibes.
- **Validate with evidence, tick as you go.** The moment you finish an item,
  confirm it is actually met by running its command or observing its state — real
  evidence, never self-graded prose — then immediately `./.fredrin/fredrin ticket check <n>`
  it (`<n>` is its 1-based position in plan order). Do this one item at a time as
  you go, never batched at the end, so the board shows real-time progress. Only
  ever check an item you have positively verified.
- **Verify, then finish — in one breath.** Your LAST action is `./.fredrin/fredrin ticket finish`.
  When the ticket's **Additional build steps** ask for verification (typecheck &
  lint, tests, QA review, …), run those checks and pass their results — real exit
  codes, never assumed. When the ticket requested no verification, pass
  `"checks":[]` — do not run or invent checks the human didn't ask for. A
  finished build with **no PR** is the failure to avoid: on a green (or
  check-free) result `finish` pushes the branch, opens the PR, and moves the
  ticket to Review; on any red check it records the failure (needs-work) and
  opens no PR — fix the cause and run it again. See **Ending the session** below.
- **Crossing a client/server boundary? Run `pnpm build`.** If your change touches a
  `"use client"` file (or adds an import into one), `typecheck`+`lint`+`test` are
  insufficient — they never run `next build`, so a client chunk pulling a node-graph
  value passes them but breaks the production build (and blocks every deploy). Run
  `pnpm build` as an extra acceptance check. See `AGENTS.md` → *Client/server import
  boundary*.

## Non-code deliverables — post them on the ticket

Not every ticket is a code change. When the task is to produce a **content
deliverable** — a blog post, an HN post, a tweet, a social caption, marketing
copy, a document, a research write-up, or a generated image — the human reads it
**in the ticket's Artifacts panel**, not by opening a loose file in the worktree.
Post it the moment it's ready with the `upload` primitive above:

    ./.fredrin/fredrin ticket upload draft.md --label "Blog post draft"

A `.md`, `.txt`, image, PDF, or `.html` renders inline (markdown is shown
formatted, so no external reader is needed). For a short snippet a
`./.fredrin/fredrin ticket comment` works too. Keep writing the file in the worktree —
just don't make that the only place the deliverable lives.

If the ticket is **purely** a content deliverable with no code change, you don't
need a PR: upload the artifact, post a one-line recap comment, and end your turn.
The board moves to Review for the human to glance and Complete — `finish` is for
code changes and has nothing to PR here.

## Ending the session

The board column moves to Review automatically when your session ends (the Stop
hook) — but a finished build with **no PR** is the exact failure to avoid, so make
opening a PR part of finishing. First clear the **pre-PR checklist** below
(resolve merge conflicts, then write to Claude memory) — see **Shipping (when the
work is done)** — then:

- **Work is done** → run `./.fredrin/fredrin ticket finish` with your acceptance-check results
  (`"checks":[]` when the ticket requested no verification). If every check is
  green it pushes the branch, opens the PR, and moves the ticket to Review in
  one call; if any check is red it records the failure (needs-work) and opens no PR.
- **Build failed** → call `./.fredrin/fredrin ticket error` to surface the failure.
- Never call `finish`/`ship` and `error` in the same session.

## Shipping (when the work is done)

### Before you push — pre-PR checklist

Run this gate **before** you open the PR (before `finish`/`ship` or the manual
push), every time. Both steps are required:

1. **Resolve merge conflicts.** Bring in the base branch and make sure the branch
   merges cleanly — `git fetch origin` then rebase (or merge) `origin/$BASE` into
   your working branch and resolve every conflict, so the PR has **no merge
   conflicts** against its target. Don't push a branch that will land red.
2. **Write to Claude memory.** Before pushing, capture this ticket's non-obvious
   learnings as a Claude memory entry (the persistent file-based memory under
   `~/.claude/.../memory/` — one fact per file, plus a one-line pointer in
   `MEMORY.md`), following the memory rules in your global instructions. Record
   what a future Worker would need and couldn't re-derive from the code or git
   history — not what the repo already documents.

Only once **both** steps are done do you push up the PR.

Prefer the one-call finisher — it makes opening a PR deterministic instead of a
multi-step sequence you might skip:

    ./.fredrin/fredrin ticket finish '{"checks":[{"command":"pnpm typecheck","exitCode":0}],"summary":"..."}'

`finish` records your verification and, **only on a fully green result**, runs the
steps below for you (push → open/reuse PR → record it → Review). Commit everything
first (it refuses on a dirty tree). Run the acceptance checks yourself — and pass
their real exit codes — only when the ticket's build steps asked for verification;
otherwise pass `"checks":[]`.

If you must do it by hand (e.g. `finish` reports a problem it can't resolve), run
this exact sequence — no improvisation, no skipping steps:

1. **Detect the default branch** into `$BASE`
   (`gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`, falling
   back to `git symbolic-ref refs/remotes/origin/HEAD` /
   `git remote show origin`). If none resolve, `./.fredrin/fredrin ticket error` with
   `where:"detect-base"` and stop.
2. **Commit** all changes with a clear conventional message (subject ≤ 72 chars,
   imperative; body explains *why*). Project Context changes go in their own
   commits prefixed `context:`.
3. **Push** the working branch: `git push -u origin HEAD`. On rejection,
   `./.fredrin/fredrin ticket error` with `where:"push"` and stop.
4. **Open the PR** — prefer
   `gh pr create --base "$BASE" --title "..." --body "..."`. End the body with
   `Closes ticket: <the current ticket's identifier>` (see the session preamble
   or `./.fredrin/fredrin ticket get`).
5. **Record it**:
   `./.fredrin/fredrin ticket ship '{"prUrl":"...","summary":"...","branch":"...","targetBranch":"..."}'`.

Hard rules:

- Never merge the PR yourself; never push to the base branch. `finish` opens a PR
  and nothing more — it never merges or releases.
- Never change the ticket's status with `ticket update` — `finish` / `ship` /
  `error` are the status-recording calls; the board column moves from hooks, not
  from explicit finish calls.
- Never call `finish`/`ship` and `error` in the same session.
- If the ticket already has a PR for this branch, `finish` reuses it; only branch
  fresh from `$BASE` with a new name when you truly need a separate PR.

## Team guidelines

Customize this section for your project — coding standards, review expectations,
definition of done, branch naming, and anything every Worker should know before
touching code. Durable knowledge about **your own app's domain** (its glossary,
decisions, conventions) belongs in your Project Context files (`CONTEXT.md`,
`AGENTS.md`, `docs/adr/`), not here. The one exception is **Fredrin platform
vocabulary** — what a Ticket / Worker / Project is and how to drive the `fredrin`
CLI: that is the same in every project, so it lives in this file (see **Talking to
Fredrin in plain language** above), not in your per-project `CONTEXT.md`.
