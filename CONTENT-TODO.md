# Content & asset TODOs

Most of the site is drawn from publicly published Monastic Marketing material
(monasticmarketing.com) or is generic marketing copy. Figures supplied directly by
Tyler are marked below so provenance stays clear. **No biographical facts have been
invented.** Remaining gaps are marked in the source with `TODO(...)` comments.

## Facts supplied directly by Tyler (not independently verifiable)

These came from Tyler in conversation rather than from a published source:

- **7-Figure exit experience** — as owner / COO of **Soulegria**, a therapy-based
  treatment and coaching organization for young adults and their families.
- **2,000+ trained**
- **85+ employees and contractors**
- **Dallas–Fort Worth, Texas** as the base of operations.

Everything about Soulegria's programs (outpatient and intensive outpatient therapy,
life-skills training, adventure therapy, employment training, family services) comes
from soulegria.com. Utah was removed from the site at Tyler's request, which also
removed Soulegria's stated Hurricane, UT location — restore it in
`experience/index.html` if that detail is wanted back.

Figures still sourced from monasticmarketing.com: `$24M+` revenue generated, `340+`
clients scaled, `1,200+` campaigns launched, founded `2018`, the service lineup, and
the six core values. Note the agency's own site lists Utah **and** Texas hubs, which
now differs from this site.

## Still needed

| Item | Where | Notes |
| --- | --- | --- |
| Direct phone number | all pages, `TODO(content)` | Each `.contact-links` block has a commented `<a href="tel:...">` ready to uncomment. The agency line is (435) 900-8383 — confirm whether that belongs here. |
| Earlier roles / companies | `experience/index.html`, `TODO(content)` | Timeline holds Monastic Marketing, Soulegria, GSD CRM and three practice areas. Add more `<details class="timeline-item">` blocks on the same pattern. |
| Education | `experience/index.html`, commented block | A complete `<section>` is commented out, ready for institution and field of study. |
| Focus industries | `consulting/index.html`, `TODO(content)` | Behavioral health is grounded in the Soulegria role. The rest describe company stage and shape rather than claiming industry specialisms. |
| Downloadable profile PDF | `index.html` hero, `experience/index.html` intro | Links are commented out. Add `downloads/tyler-barton-profile.pdf` and restore them. |

## Done

- **Portrait** — `assets/portrait.webp` (1254×1254) with a 420w variant for small
  screens, used in the hero and the lightbox.
- **Social share card** — `assets/social-profile.jpg` (1200×630), generated from the
  portrait in the site's own typefaces. Wired to `og:image` on every page.
- **Booking** — there is no contact page. Every call to action on the site opens one
  modal holding the LeadConnector calendar: the "Let's Chat" header button, the primary
  gold buttons, and the "Discuss this capability" / "Start a conversation" links on the
  consulting page. The iframe `src` is only set when the modal is first opened, so
  nothing third-party loads on a plain page view. `/contact/` 301s to `/#contact`, the
  closing section that still carries the email address.

## To verify before wide promotion

- **Booking widget timezone.** The calendar currently presents times in **UTC**, which
  will confuse US visitors. That is a setting inside the LeadConnector calendar, not
  something the embed can override — worth changing at the source.
- **Pricing.** Figures in `consulting/index.html` → *Engagement options* are carried over
  from monasticmarketing.com's published plans. Marked `TODO(pricing)`.
- **Copyright year.** Footers read `© 2026`.
