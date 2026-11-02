# Runbook -- login

How to operate this project. Auto-scaffolded by Codittle; edit freely.

## Environment
The live env / bnk.run / BP are in [`project.yml`](project.yml) (auto-maintained
between the CTX_AUTO markers). Don't duplicate them here -- link to them.

## Common tasks
- **Bring in a routine:** use Codittle's *Transfer* (remote browser) or *Sync
  from BP*, or, if the external shell toolkit is installed, `fetch_t24_sources.py --env <env>
  -r <ROUTINE> --dest .`. Each fetch is anchored locally under its `<BP>.BP/`
  and tracked in `.codittle/versions.json`.
- **Edit + Deploy:** Codittle *Commit-and-Deploy* (SFTP push + version bump). On
  classic runtime/jBASE the host then compiles each routine (`BASIC <dir> <name>` +
  `CATALOG`); read the compile output for errors.
- **Stay in sync:** a tracked file shows **OUTDATED** (remote is newer),
  **AHEAD** (you have local edits), or **CONFLICT** (both changed). Use *Resync*
  to open a diff and reconcile -- don't blind-overwrite.
- **Check where a deploy lands:** each file goes to its RECORDED remote path.
  When that path belongs to a different server than the one connected (a file
  pulled from another environment), the deploy dialog says whose path it is,
  leaves it unticked, and offers the connected server's folder of the same
  name. Don't tick it back without knowing why it points elsewhere.
- **Remote folders:** a mount no BP can live at (a system folder such as
  `/tmp`, or a relative path) is marked in *Remote folders*. The first mount
  doubles as the compile home, so fix or remove a bad one rather than leave it.
- **Inspect a VERSION's hooks:** read the version record (INPUT.ROUTINE /
  VALIDATION.RTN / AUTH.ROUTINE / ...).

## Cautions
- Never deploy to **PROD** without explicit confirmation.
- `.codittle/` is local-only metadata -- never commit it, never push the repo.
- **Insert files (`I_*`) are immutable** source-of-truth on the remote -- never
  edit or upload them.
- **Binary artifacts** (`.ear` / `.zip` / `.jar` / compiled objects) sync as
  exact bytes and open as a binary card -- they are NOT text; never open, edit,
  or text-save them (that would overwrite the bytes with nothing).
- **Stay release-agnostic / source-free:** never bake a customer or site's
  specifics into code, comments, or examples -- no bank/environment/server
  names, no specific BP or routine names, no host IPs or install paths. Use
  neutral placeholders (`CUSTOM.BP`, `/path/to/server`, `<home>`).
