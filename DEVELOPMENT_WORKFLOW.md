# LOGIC LIMIT — Development Workflow

## Required inputs for future work
Provide the latest Windows project ZIP and latest PWA ZIP. These five Markdown files should remain inside the project and be updated with every release.

## Release workflow
1. Extract both packages into separate working directories.
2. Treat the Windows `app/index.html` as the canonical UI unless architecture changes.
3. Apply shared web changes to both Electron `app/` and PWA root.
4. Update version numbers and PWA cache name.
5. Update all relevant documentation and `CHANGELOG.md`.
6. Run syntax checks and unit tests.
7. Verify shared files are identical where expected.
8. Repackage both ZIPs and run ZIP integrity checks.

## Change discipline
- Do not combine unrelated redesigns into a foundation release.
- Preserve save compatibility unless a migration is explicitly designed.
- Do not expose incomplete solver output as proven information.
- Add regression tests for every solver bug.
- Keep the player-facing UI unchanged when a release is declared engine-only.

## Deduction Engine roadmap
1. Foundation: exact candidate solver and fact extraction.
2. Optimization: incremental filtering, pruning, and worker execution.
3. Deduction Feed UI: low-interruption presentation of newly proven facts.
4. Advanced facts: relative order, adjacency, category count, and replay analysis.
