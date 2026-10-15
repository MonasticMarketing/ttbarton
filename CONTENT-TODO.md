# Content & asset TODOs

Everything on the site today is drawn from publicly published Monastic Marketing
material (monasticmarketing.com) or is generic marketing copy. **No biographical
facts have been invented.** The gaps below are the places where personal detail is
needed, each marked in the source with a `TODO(...)` comment.

## Facts needed

| Item | Where | Notes |
| --- | --- | --- |
| Direct phone number | all four pages, `TODO(content)` | Contact page has a ready-to-uncomment `<a href="tel:...">` block. The agency line is (435) 900-8383 — confirm whether that should appear here. |
| Earlier roles / companies / exits | `experience/index.html`, `TODO(content)` | Timeline currently holds Monastic Marketing, GSD CRM, and three practice-area entries. Add further `<details class="timeline-item">` blocks using the same pattern. |
| Education | `experience/index.html`, commented block | A complete `<section>` is commented out and ready for institution, field of study, and a sentence on relevance. |
| Additional ventures | `index.html` venture list, `TODO(content)` | Only Monastic Marketing and GSD CRM are listed. Each entry links to an `/experience/#anchor`. |
| Focus industries | `consulting/index.html`, `TODO(content)` | The list describes company *stage and shape* (scaling, owner-led, multi-location) rather than claiming industry specialisms. Replace with real verticals. |
| Booking calendar | `contact/index.html`, commented block | Section is written and commented out; set `data-src` to the scheduling embed URL. It stays behind a click so nothing third-party loads until a visitor asks. |

## Assets needed

| Item | Where | Notes |
| --- | --- | --- |
| Professional portrait | `index.html` hero + portrait dialog | A `TB` monogram stands in. Drop `assets/portrait.webp` (portrait orientation, roughly 1086×1448) and swap the `.portrait-frame.is-monogram` block for the commented `<img>`. |
| Social share card | `<head>` of each page | `og:image` is omitted rather than pointing at a missing file. Add a 1200×630 JPG at `assets/social-profile.jpg` and restore the tags. |
| Downloadable profile PDF | `index.html` hero, `experience/index.html` intro, footer | Download links are commented out. Add `downloads/tyler-barton-profile.pdf` and restore them. |

## To verify before wide promotion

- **Pricing.** The figures in `consulting/index.html` → *Engagement options* are carried
  over from monasticmarketing.com's published plans. Confirm they should appear on a
  personal profile site, or remove the `.price-note` spans. Marked `TODO(pricing)`.
- **Copyright year.** Footers read `© 2026`. Fine for now; update annually.
- **Stats.** `$24M+`, `340+`, `1,200+`, `5/5`, `2018`, `2 hubs` all come from
  monasticmarketing.com. Refresh when the agency's own numbers move.
