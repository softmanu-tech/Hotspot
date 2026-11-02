# login

> Codittle project. This file is the entry point for any AI agent working
> here. The machine-maintained facts (env, bnk.run, BP, artifacts) live in
> [`_ctx/project.yml`](_ctx/project.yml); read that first.

## What this is
- **Nature:** remote-shell-routine
- **Client / Release:** hotspot
- **Project id:** p_mvzg9gty_slm2kfqo

## How Codittle works (orientation)
Codittle organises work as **Bank -> Release Stream -> Project**. Source for this
project lives in `<BP>.BP/` folders as bare jBASE filenames (no extension).
Codittle syncs/deploys over SSH and records every version in
`.codittle/versions.json` (gitignored, machine-only). Tracked files carry a
sync state (OUTDATED / AHEAD / CONFLICT) reconciled via *Resync*. Deploy writes
each file to its recorded remote path, and the deploy dialog flags a file whose
path belongs to a different server than the one connected. The
**committed** context layer is `CLAUDE.md` + `_ctx/`. Never commit
`.codittle/`, and never `git push` -- these project repos are local-only,
like Codittle's own. See [`_ctx/runbook.md`](_ctx/runbook.md) for the
day-to-day workflow.

## Where to look
- [`_ctx/project.yml`](_ctx/project.yml) -- env, bnk.run, BP, classified
  artifacts and last deploy (the block between the CTX_AUTO markers is
  auto-maintained; everything above it is yours to edit).
- [`_ctx/runbook.md`](_ctx/runbook.md) -- how to operate this project.
- [`_ctx/worklog.md`](_ctx/worklog.md) -- dated history of what was done.

## Collective intelligence (standing doctrine)
This machine keeps a searchable memory of every past project and Claude session
(local, sanitized, never uploaded). Two rules apply to every task here:

1. **Read before you fight.** Before debugging an unfamiliar error or working out
   how something behaves, search that memory with the distinctive part of the
   error text -- the same problem has often already been solved on another
   project. If the request is anchored to a server ("on server .y"), pull that
   environment's dossier first; its facts carry an observed date, so you can say
   when one needs re-verifying rather than trusting it blindly.
2. **Write after you win.** The moment a fix is PROVEN (clean compile, remote socket
   success, test green, deploy landed, user confirms) record the conclusion:
   symptom, cause, fix, and what was tried that did NOT work. Never record
   speculation, and never while still debugging. A few high-value records per
   session, not a running commentary.

Record lessons **abstractly** -- never a bank, host, user or site name; describe
the condition instead (version, config trait). Anything identifying is stripped
automatically, and environment-specific state belongs in a separate,
environment-scoped record rather than in the lesson text.

When the IDE is running, these are the `library_search` / `library_env` /
`library_digest` / `library_record` tools on the `codittle-ide` MCP server.
When they are not available, this section still applies to `_ctx/knowledge.md`:
consult it first, extend it rather than re-deriving.

## External tools (optional -- use only if present)
Companion tools may be installed on this machine, advisably under
`~/Desktop/DevTools/`. If they are **not** present, they are not required:
everything you need is already in this repo's context layer, so proceed without
them.
- **Amethyst** (`http://127.0.0.1:8765`) -- fleet health / env status.
  Lead with what needs attention; it already polls, so don't loop.
- **Opal** (`http://127.0.0.1:8766`) -- read-only renderer for this very
  context layer.
- **external shell toolkit** -- SSH source fetch / grep / record CLIs over a shared,
  DPAPI-sealed env store.

## Safety
Read-only by default. Confirm before deploying or running anything on PROD.
Connection passwords are sealed (AES/DPAPI) in the store -- never dump
credentials, and pull only the data a task needs. Never edit or upload insert
files (`I_*`) -- they are immutable source-of-truth on the remote. Stay
release-agnostic: don't hardcode a customer/site's names, BP/routine names,
host IPs or install paths -- use neutral placeholders.
