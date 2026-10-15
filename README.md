# ttbarton.com

Personal executive profile site for **Tyler Barton** — founder of Monastic Marketing.

Static HTML/CSS/JS. No build step, no dependencies, no framework. Deployed as a
Cloudflare Worker with static assets, serving the repository root directly.

## Structure

```
index.html              Home — hero, metrics, profile, ventures, systems, principles, contact
experience/index.html   Experience timeline + operating principles
consulting/index.html   Value proposition, capabilities, methodology, tools, engagements
404.html                Not-found page
assets/styles.css       Whole design system (one stylesheet)
assets/site.js          Nav drawer, booking + briefing modals, scroll progress, reveals
                        (every CTA opens the booking modal; there is no contact page)
assets/portrait.webp    Hero portrait (+ portrait-small.webp for narrow viewports)
assets/social-profile.jpg  1200x630 og:image card
favicon.svg             TB monogram
wrangler.jsonc          Worker + static-assets configuration (committed, not generated)
.assetsignore           Keeps .git, docs and config out of the published assets
_headers                Response headers (security + caching)
_redirects              Retired /contact/ -> /#contact, plus path aliases
robots.txt, sitemap.xml
```

### Design system

Dark editorial layout. Tokens live at the top of `assets/styles.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#090909` | Page background |
| `--surface` | `#121212` | Raised sections |
| `--text` | `#f5f3ec` | Body text |
| `--muted` | `#a7a7a7` | Secondary text |
| `--gold` | `#c5a34e` | Accent, numerals, links |
| `--line` | `#2c2a24` | Hairline rules |

Type: **Cormorant Garamond** (display) + **Manrope** (body), loaded from Google Fonts.

## Local preview

Any static server works. The site uses absolute paths (`/assets/...`), so serve the
repository root rather than opening files directly:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment (Cloudflare Workers static assets)

The site deploys as a **Worker with static assets** (not Cloudflare Pages). The
Cloudflare build is connected to this repository and runs `npx wrangler deploy`
on push, so **a push to `main` is the deploy**.

Settings live in `wrangler.jsonc` and are committed, so builds are reproducible
rather than depending on wrangler's auto-detection:

```jsonc
{
  "name": "ttbarton",
  "assets": { "directory": ".", "not_found_handling": "404-page" }
}
```

The repository root *is* the asset directory, which has two consequences worth
knowing before editing:

### 1. `.assetsignore` is load-bearing

Workers uploads everything in the asset directory, including dotfiles. Cloudflare
Pages excluded `.git`, `node_modules` and `.DS_Store` automatically; **Workers does
not.** Without `.assetsignore`, the entire `.git` directory is published and served
at `https://ttbarton.com/.git/...`, exposing full repository history.

`_headers`, `_redirects` and `.assetsignore` itself are excluded by wrangler
automatically — never add those three to `.assetsignore`, or the rules stop being
applied. Everything else that should not be public needs a line in that file.

Verify what would actually be served before any risky change:

```bash
WRANGLER_LOG=debug npx wrangler deploy --dry-run 2>&1 | grep "Ignoring asset"
```

Note that wrangler's `Read N files from the assets directory` line is printed
*before* filtering and counts directories too — it is not the number of files
being published. Use the debug output above instead.

### 2. `_redirects` accepts relative URLs only

Workers static assets rejects absolute URLs in `_redirects` with
`Invalid _redirects configuration ... [code: 100324]`, and that failure aborts the
whole deploy. Cross-host redirects therefore cannot live in this file.

**`www.ttbarton.com` → `ttbarton.com` is not configured yet.** Both hostnames
already have proxied `AAAA 100::` records in the zone. To finish it, add a
Redirect Rule in the dashboard — *Rules → Redirect Rules → Create rule* — matching
`http.host eq "www.ttbarton.com"`, with a dynamic target of
`concat("https://ttbarton.com", http.request.uri.path)` and status 301. Attach
both the apex and `www` as custom domains on the Worker so the rule is reached.

### Local verification

`wrangler dev` runs the real asset router, so redirects, headers and 404 handling
behave as they will in production:

```bash
npx wrangler dev --port 8788
curl -I http://127.0.0.1:8788/about        # expect 301 -> /experience/
curl -I http://127.0.0.1:8788/.git/index   # expect 404
```

A plain `python3 -m http.server` serves the files but applies none of the
`_headers` / `_redirects` / 404 rules.

### Manual deploy

Requires a token with **Workers Scripts: Edit** on the account:

```bash
CLOUDFLARE_API_TOKEN=... npx wrangler deploy
```

## Content maintenance

Copy lives directly in the HTML — there is no CMS. Repeated chrome (header, nav
dialog, footer) is duplicated across the three content pages, so a nav or footer change needs
the same edit in each file.

Outstanding content and asset gaps are tracked in [`CONTENT-TODO.md`](CONTENT-TODO.md).
