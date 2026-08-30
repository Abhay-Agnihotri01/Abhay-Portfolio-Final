# Portfolio Customization Checklist & Guide

This document lists every file, line number, and asset you need to replace to turn this template into your personal portfolio.

---

## 📋 Checklist

- [ ] [1. Identity, SEO & Domain](#1-identity-seo--domain)
- [ ] [2. Portfolio Content & Data (`src/constants/`)](#2-portfolio-content--data-srcconstants)
- [ ] [3. Navbar, Footer & Contact](#3-navbar-footer--contact)
- [ ] [4. Homepage Content](#4-homepage-content)
- [ ] [5. About Page Content, Services & Process](#5-about-page-content-services--process)
- [ ] [6. Work & Projects Pages](#6-work--projects-pages)
- [ ] [7. Images & Static Assets (`public/`)](#7-images--static-assets-public)
- [ ] [8. Pre-Deployment & Config](#8-pre-deployment--config)

---

## 1. Identity, SEO & Domain

### `src/components/dom/CustomHead.jsx`
* **Line 6**: Update `SITE_URL` with your final domain:
  ```javascript
  const SITE_URL = 'https://yourdomain.com';
  ```
* **Lines 13–21**: Update structured data (`schema.org`) for search engines:
  ```javascript
  name: 'Abhay Agnihotri',
  jobTitle: 'Software Developer',
  description: 'Software developer working across AI, machine learning and full-stack development.',
  email: 'mailto:your.email@example.com',
  homeLocation: { '@type': 'Place', name: 'City, Country' },
  sameAs: ['https://www.linkedin.com/in/yourhandle', 'https://github.com/yourhandle'],
  ```
* **Line 32**: Update author meta tag:
  ```jsx
  <meta name="author" content="Abhay Agnihotri" />
  ```

### `src/components/dom/Loader.jsx`
* **Line 160**: Update the loading screen text from `'Your Name'` to yours:
  ```jsx
  {introOut ? 'Loading' : 'Abhay Agnihotri'}
  ```

### `src/pages/index.page.jsx`
* **Lines 8–14**: Update homepage SEO title, description, and keywords:
  ```javascript
  const seo = {
    title: 'Abhay Agnihotri - Portfolio',
    description: 'Software developer working across AI, machine learning and full-stack development.',
    keywords: ['Abhay Agnihotri', 'Portfolio', 'Software Developer', 'AI', 'Machine Learning', 'Full Stack'],
  };
  ```

---

## 2. Portfolio Content & Data (`src/constants/`)

### `src/constants/projects.js`
* Replace placeholder projects with your actual projects:
  * `id`: unique url slug (e.g. `'ai-chat-app'`)
  * `title`: Project Title
  * `date`: Year or timeframe
  * `company`: Client / Personal Project / Employer
  * `liveLink`: Live demo URL (or `undefined`)
  * `primary`, `accentColor`, `secondary`, `fillColor`, `menuColor`: Custom hex color palette for the project theme
  * `images`: Array of screenshot paths (e.g. `/projects/project-1/1.webp`)
  * `desc`: Array of strings, each string represents a paragraph

### `src/constants/experience.js`
* Add your work experience entries (ordered most recent first):
  * `company`: Company name
  * `role`: Job title
  * `period`: e.g. `'Jan 2024 – Present'`
  * `location`: e.g. `'San Francisco, CA'`
  * `desc`: 1–2 sentences on what you built/achieved
  * `image` / `imageBlur`: Path to company card graphic in `/roles/`

### `src/constants/credentials.js`
* `education`: Array of `{ school, award, period }`
* `skills`: Array of strings (keep between 9 to 15 pills for best visual layout)
* `languages`: Array of `{ name, level }` (e.g. `Native`, `Fluent`, `Intermediate`)

### `src/constants/stats.js`
* Update metrics grid with your numbers (multiple of 4 fills desktop rows cleanly):
  * e.g. `{ value: '10+', label: 'Projects Built' }`

---

## 3. Navbar, Footer & Contact

### `src/components/dom/navbar/constants/footerLinks.js`
* Replace social links (LinkedIn, GitHub, X/Twitter, Instagram):
  ```javascript
  const footerLinks = [
    { title: 'LinkedIn', href: 'https://www.linkedin.com/in/yourhandle', icon: 'linkedin' },
    { title: 'GitHub', href: 'https://github.com/yourhandle', icon: 'github' },
    { title: 'X', href: 'https://x.com/yourhandle', icon: 'x' },
  ];
  ```

### `src/components/dom/Footer.jsx`
* **Line 23**: Update `const EMAIL = 'your.email@example.com';`
* **Line 95**: Brand wordmark text `<h4 className={...}>ABHAY AGNIHOTRI</h4>`
* **Line 138**: Copyright notice `© 2026 · Abhay Agnihotri · All Rights Reserved`

### `src/components/dom/navbar/Index.jsx`
* **Line 53**: Wordmark logo: `<h4 className={...}>ABHAY AGNIHOTRI</h4>`
* **Line 57**: Contact email button `href="mailto:your.email@example.com"`

### `src/components/dom/navbar/components/MenuLinks.jsx`
* **Line 161**: Email link in slide-out menu `href="mailto:your.email@example.com"`

---

## 4. Homepage Content

### `src/pages/components/home/Index.jsx`
* **Lines 228–229**: Hero Headline:
  ```jsx
  <h2 className="h2">From An Idea To Something</h2>
  <h2 className={clsx('h2', 'bold')}>You Can Use.</h2>
  ```
* **Line 233 (Desktop)** & **Line 253 (Mobile)**: Intro bio text:
  ```jsx
  I'm Abhay — a software developer working across AI, machine learning and full-stack development.
  ```
* **Line 258**: Scrolling ticker text:
  ```jsx
  <InfiniteText text="Scroll Down" length={5} />
  ```
* **3D Spheres / Custom Image**:
  * Physics & Sphere colors: `src/pages/components/home/components/floatingMeshes/FloatRigidBody.jsx`
  * Camera & Environment: `src/pages/components/home/components/floatingMeshes/Index.jsx`

### `src/pages/components/quote/Index.jsx`
* **Line 19**: Quote sentence (reveals word-by-word on scroll)
* **Line 22**: Quote attribution: `Attribution · Source, Year`

### `src/pages/components/about/Index.jsx` (Home Teaser Section)
* **Line 54**: `<h1 className={clsx('h1', 'medium')}>Abhay Agnihotri!</h1>`
* **Lines 62–65**: 4-line personal philosophy quote
* **Lines 72–76 (Desktop)** & **Lines 80–83 (Mobile)**: Teaser bio paragraphs
* **Line 45**: Portrait image path (default: `/profile/front.webp`)

---

## 5. About Page Content, Services & Process

### `src/pages/about/index.page.jsx`
* **Lines 8–14**: SEO title, description, and keywords for `/about`.

### `src/pages/about/components/hero/Hero.jsx`
* **Line 51**: Top story headline:
  ```jsx
  <h2 className={clsx(styles.title, 'h2')}>A single sentence that frames your story.</h2>
  ```
* **Line 55**: Hero image path (default: `/profile/back.webp`).

### `src/pages/about/components/overview/Overview.jsx`
* **Lines 13–32**: Philosophy statements (desktop and mobile).
* **Lines 43–62**: "My Story" biographical paragraphs and signature sign-off.

### `src/pages/about/components/services/constants/Containt.jsx`
> ⚠️ **Note**: Keep **exactly 3 items** in this array so the 3D sphere animation works correctly.
* Update `smallTitle` (1 short word displayed on the 3D ball), `bigTitle`, `desc`, and `options`.

### `src/pages/about/components/process/constants/Containt.jsx`
> ⚠️ **Note**: Keep **exactly 2 items** in this array.
* Update `smallTitle`, `bigTitle`, `desc`, and step-by-step `options`.

---

## 6. Work & Projects Pages

### `src/pages/projects/index.page.jsx`
* **Lines 18–24**: SEO title and keywords for `/projects`.

### `src/pages/projects/[id].page.jsx`
* **Lines 80–92**: Dynamic SEO meta generator for individual project pages.

---

## 7. Images & Static Assets (`public/`)

Replace placeholder assets in the `public` directory:

| Path | Description | Recommended Dimensions |
| :--- | :--- | :--- |
| `public/profile/front.webp` | Homepage About portrait | Portrait (e.g. 1000x1250) |
| `public/profile/back.webp` | About page hero image | Wide / Landscape |
| `public/projects/project-1/` | Project 1 screenshots (`cover.webp`, `1.webp`–`6.webp`) | Clean high-res webp |
| `public/projects/project-2/` | Project 2 screenshots | Clean high-res webp |
| `public/projects/project-3/` | Project 3 screenshots | Clean high-res webp |
| `public/roles/` | Experience card images (`role-1.webp` to `role-4.webp`) | Square/Card |
| `public/og.png` | Social media link preview image | 1200 x 630 px |
| `public/site.webmanifest` | Web app manifest (name, short_name) | JSON |
| `public/favicon-32x32.png`, `public/apple-touch-icon.png` | Site favicons | 32x32, 180x180 |

---

## 8. Pre-Deployment & Config

### `next-sitemap.config.js`
* **Line 3**: Update `siteUrl`:
  ```javascript
  siteUrl: 'https://yourdomain.com/',
  ```

### `package.json`
* **Line 2**: Update project `name` and metadata if desired.
