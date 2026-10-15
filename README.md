# ttbarton.com

Personal executive profile site for **Tyler Barton** — founder of Monastic Marketing.

Static HTML/CSS/JS. No build step, no dependencies, no framework. Cloudflare Pages
serves the repository root directly.

## Structure

```
index.html              Home — hero, metrics, profile, ventures, systems, principles, contact
experience/index.html   Experience timeline + operating principles
consulting/index.html   Value proposition, capabilities, methodology, tools, engagements
contact/index.html      Contact routes + what to expect
404.html                Not-found page
assets/styles.css       Whole design system (one stylesheet)
assets/site.js          Nav drawer, briefing modal, scroll progress, reveal animations
favicon.svg             TB monogram
_headers                Cloudflare Pages response headers (security + caching)
_redirects              www → apex, plus friendly aliases
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

## Deploying to Cloudflare Pages

1. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.**
2. Pick this repository (`monasticmarketing/ttbarton`) and the `main` branch.
3. Build settings — there is no build step:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. **Save and Deploy.** You get a `*.pages.dev` URL immediately.
5. **Custom domains → Set up a domain → `ttbarton.com`.** Add `www.ttbarton.com` as a
   second custom domain so the `_redirects` rule can send it to the apex. Because the
   zone is already on this Cloudflare account, the DNS records are created for you.

Every push to `main` redeploys. Pushes to other branches get preview URLs.

### Alternative: Wrangler CLI

```bash
npx wrangler@latest pages deploy . --project-name=ttbarton
```

## Content maintenance

Copy lives directly in the HTML — there is no CMS. Repeated chrome (header, nav
dialog, footer) is duplicated across the four pages, so a nav or footer change needs
the same edit in each file.

Outstanding content and asset gaps are tracked in [`CONTENT-TODO.md`](CONTENT-TODO.md).
