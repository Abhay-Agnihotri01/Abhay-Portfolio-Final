![cover](/public/og.png)

# Personal Site Template

An animated one-person portfolio built with Next.js, React Three Fiber and GSAP.
Every section is wired to placeholder content, so you can clone it, edit a handful
of files, and have your own site.

**Sections included:** intro loader, 3D hero, personal intro, stats grid, pull
quote, scroll-stacked "Ventures" cards, education & skills, project index,
per-project case-study pages, a sliceable pre-footer game, and a full footer with
social icons.

---

## Attribution

This is built on the open-source portfolio template by **Evangelos Giatsidis**.

> _"Original portfolio design and development by Evangelos Giatsidis — [giats.me](https://giats.me)"_

The upstream project is MIT licensed **with attribution required**. Keep this
section and the `LICENSE` file in place if you use this.

- Upstream source: [github.com/Giats2498/giats-portfolio](https://github.com/Giats2498/giats-portfolio)

All imagery, fonts and copy from both the upstream project and the site this was
derived from have been removed. Everything shipped here is generated placeholder
content that you are free to replace.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start
npm run lint
```

Requires Node 20+.

---

## Where the content lives

Start here. These six files hold almost everything you need to change:

| File | What it controls |
| --- | --- |
| `src/constants/experience.js` | The "Ventures" card stack (roles, dates, descriptions) |
| `src/constants/projects.js` | Project list **and** each project's detail page |
| `src/constants/stats.js` | The "By the Numbers" grid |
| `src/constants/credentials.js` | Education, skills, languages |
| `src/components/dom/navbar/constants/footerLinks.js` | Your social links |
| `src/components/dom/navbar/constants/menuLinks.js` | Top-level navigation |

Then the prose, which lives inline in the components:

| File | What it controls |
| --- | --- |
| `src/pages/components/home/Index.jsx` | Hero headline and sub-paragraph |
| `src/pages/components/about/Index.jsx` | Name, pull quote, short intro |
| `src/pages/components/quote/Index.jsx` | Full-screen scroll-revealed quote |
| `src/pages/about/components/overview/Overview.jsx` | The long-form "My story" |
| `src/pages/about/components/services/constants/Containt.jsx` | Services |
| `src/pages/about/components/process/constants/Containt.jsx` | Process / values |
| `src/components/dom/Footer.jsx` | Footer brand line, CTA, contact |
| `src/components/dom/Loader.jsx` | The name shown on the intro screen |
| `src/components/dom/CustomHead.jsx` | SEO defaults, JSON-LD schema, `SITE_URL` |

---

## Rules the layout depends on

Four things will break if you ignore them:

**Services must have exactly 3 entries.** `services/Other.jsx` hardcodes three
colours and an `index === 2` branch.

**Process must have exactly 2 entries.** `process/Other.jsx` hardcodes two colours.

**`smallTitle` in both files is rendered as 3D text on a sphere.** Keep it to one
short word.

**Body copy is hand-broken, one line per element, with separate desktop and mobile
variants.** This is deliberate — it gives you control over where lines wrap. Edit
both variants, and keep line lengths within a block roughly even or the text
looks ragged.

---

## Before you deploy

**Set your domain** in three places, all currently `https://example.com`:

- `src/components/dom/CustomHead.jsx` → `SITE_URL`
- `next-sitemap.config.js` → `siteUrl`
- `public/robots.txt` → `Host` and `Sitemap`

**Replace the placeholder images** in `public/`:

| Path | What it is |
| --- | --- |
| `public/projects/project-{1,2,3}/` | Project cover + gallery images |
| `public/roles/role-{1..4}.webp` + `-blur` | Ventures cards. The sharp file is the framed thumbnail; the blurred one is the full-bleed background |
| `public/profile/front.webp`, `back.webp` | Your photo |
| `public/og.png` | Link-preview card (1200×630) |
| `public/favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png` | Favicons |
| `public/shapes/` | Sprites for the pre-footer game |

---

## Typography

The original design used **Neue Haas Grotesk Display Pro**, a commercial typeface
that cannot be redistributed. This template falls back to a system grotesque
stack instead, which is close in feel but not identical.

To use your own licensed font, drop the `.woff2` files into `public/fonts/`,
restore the `@font-face` blocks in `src/styles/fonts.scss` for weights 450, 550,
650 and 750, and add preload tags in `src/pages/_document.page.jsx`.

Note: a `<link>` preload without `rel` and `crossOrigin` is silently ignored by
browsers — a mistake that is easy to miss because nothing errors.

---

## Deploying

It is a standard Next.js app, so anything that runs Next works: Vercel, Netlify,
Railway, Render, or a container.

```bash
npm run build
npm start        # honours the PORT env var
```

If your host runs a dependency vulnerability scan (Railway does), run
`npm audit` first — a HIGH advisory in `next` will block the build outright.

---

## Tech stack

- [Next.js 14](https://nextjs.org/) (pages router), React 18
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + Drei + Rapier physics
- [GSAP](https://greensock.com/gsap/) with ScrollTrigger, [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- SCSS modules
- [@samasante/liquid-glass](https://github.com/samasante/liquid-glass) for the glass nav and menu

> The glass refraction rides on `backdrop-filter: url()`, which ships in Chromium
> desktop only. Safari, Firefox and all iOS browsers get frost, tint and a rim
> light but no geometric distortion. That is a graceful fallback, not a bug.

---

## Licence

MIT, inheriting the upstream attribution requirement. See `LICENSE`.
