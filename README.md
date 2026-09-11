# obsidian-embedded-nvim

Embed nvim into the Obsidian editor directly. Enjoy typical nvim motions with the
interface of Obsidian

## Development

`mise run setup` installs the pinned tools and dependencies and registers the git hooks.

`mise run build` produces a production bundle, `mise run build --watch` rebuilds on change
with an inline sourcemap, and `mise run preflight` runs the full check set before a
release.

To try the plugin, link a dedicated vault — never your main one — from the checkout root:

```bash
ln -s "$PWD" "<vault>/.obsidian/plugins/embedded-nvim"
```

Then enable Embedded Nvim under Settings → Community plugins. Reload Obsidian after a
rebuild; restart it after changing `manifest.json`.

### Releasing

Bump `version` in `manifest.json`, add it to `versions.json`, and push a tag equal to that
version with no `v` prefix; `release.yml` drafts the release. `bun pm version` always tags
with a `v` prefix, which Obsidian rejects, so it is deliberately not wired up.
