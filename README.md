# obsidian-embedded-nvim

Embed nvim into the Obsidian editor directly. Enjoy typical nvim motions with the
interface of Obsidian

## Development

Point `OBSIDIAN_DEV_VAULT` at a dedicated vault — never your main one — in a `.env` file
at the checkout root:

```bash
echo 'OBSIDIAN_DEV_VAULT=/path/to/embedded-nvim-dev' > .env
```

`mise run setup` then installs the pinned tools and dependencies, registers the git hooks,
builds, and symlinks the checkout into that vault as an installed plugin. Enable Embedded
Nvim once under Settings → Community plugins; reload Obsidian after a rebuild, and restart
it after changing `manifest.json`.

`.env` is untracked, so the path stays off the repo, and the worktree tooling copies it
into each new worktree — where `setup` runs on creation, so a fresh worktree links itself.
The vault holds one plugin folder, so whichever checkout linked last owns it; run
`mise run link` from another to claim it back.

`mise run build` produces a production bundle, `mise run build --watch` rebuilds on change
with an inline sourcemap, and `mise run preflight` runs the full check set before a
release.

### Releasing

Bump `version` in `manifest.json`, add it to `versions.json`, and push a tag equal to that
version with no `v` prefix; `release.yml` drafts the release. `bun pm version` always tags
with a `v` prefix, which Obsidian rejects, so it is deliberately not wired up.
