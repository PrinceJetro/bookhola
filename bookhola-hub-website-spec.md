# Bookhola Hub — Website Build Documentation

**Domain:** bookhola.com.ng
**Type:** Catalogue + quote-request site (no cart, no online payment at launch)
**Reference:** schoolstoreng.com (structure and feel only)
**Audience:** School owners, proprietors, bursars and procurement staff in Lagos and beyond
**Primary goal:** Get a school to request a quote or call/WhatsApp Bookhola Hub

---

## 1. Open items to confirm with the client first

| Item | What we have | Needs decision |
|---|---|---|
| Main phone | 09069372983 (About sheet), 08029496820 (all flyers) | Pick one primary; the other becomes secondary or is dropped |
| WhatsApp number | Not stated | Confirm which number is on WhatsApp |
| Email | bookhola@gmail.com (About sheet), info@bookholahub.com (flyers) | Ideally a new address on bookhola.com.ng (e.g. info@bookhola.com.ng) |
| Website on print material | www.bookhola.com.ng (About sheet), bookholahub.com (flyers) | Flyers should be updated to the new domain |
| Claim "Trusted by 100+ Schools" | On About sheet | Confirm it is accurate before publishing |
| Physical address | 7 Oludare Odekoya Street, Agric, Ikorodu, Lagos | Confirm; get a Google Maps pin |
| Opening hours | Storefront image says Mon–Sat, 8am–8pm | Confirm; that image appears AI-generated |
| Storefront photo | AI-generated look | Use real shop/product photos if they exist |
| Instagram | @bookhola | Confirm handle |
| Product lists, prices | None provided | Decide: no prices ("request a quote") is the recommended default |

## 2. Copy fixes needed from the About sheet

- "cetive pricing" → "competitive pricing"
- "Your Trusted Partner for Learning Materials aross Nigeria" → "across"
- Physics flyer has 2 empty product slots; do not carry those over.
- Furniture flyer: "Classroom Desks & Chairs for Pupils" heading overlaps its subtext; use the text, not the flyer image.

---

## 3. Sitemap

```
/                      Home
/catalogue             All categories overview
/catalogue/lab         Laboratory Equipment
   ├ Chemistry & Biology
   ├ Physics
   └ General
/catalogue/furniture   School Furniture
/catalogue/textbooks   Textbooks
/catalogue/stationery  Bags & Stationery
/quote                 Request a Quote (also opened as a drawer from any page)
/about                 About Us (mission, vision, values, MD message)
/contact               Contact (address, map, phone, WhatsApp, email, hours)
/privacy               Privacy policy
/terms                 Terms
```

Keep the main nav to 5 items: **Home, Catalogue, About, Contact** + a **Request a Quote** button.

---

## 4. Brand and design tokens

### 4.1 Colors (sampled from the logo)

| Token | Hex | Use |
|---|---|---|
| `--navy-900` | `#0A2E5C` | Headings, footer background, top announcement bar |
| `--blue-600` | `#0B4A8F` | Links, secondary buttons, icons (matches "BOOKHOLA HUB" wordmark) |
| `--blue-100` | `#E8F0FA` | Soft section backgrounds, card tints |
| `--orange-500` | `#F07E25` | Primary buttons, highlights, active nav |
| `--orange-600` | `#D96A12` | Button hover, orange text on white |
| `--orange-100` | `#FFF1E5` | Callout backgrounds |
| `--ink-900` | `#14213A` | Body text |
| `--ink-500` | `#5B6B84` | Secondary text |
| `--line` | `#DCE4F0` | Borders, dividers |
| `--surface` | `#F6F8FC` | Page background alternate |
| `--white` | `#FFFFFF` | Cards, header |
| `--whatsapp` | `#25D366` | WhatsApp button only |

**Contrast rules (important):**
- White text on `--orange-500` fails AA for small text. Use **navy text on orange** for buttons, or use `--orange-600` with white bold text at 16px+.
- Body text is always `--ink-900` on white or `--surface`.
- Never put orange text smaller than 18px on white.

**Usage ratio:** roughly 60% white/surface, 25% navy/blue, 15% orange. Orange is the accent: one main orange button per screen.

### 4.2 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings | Plus Jakarta Sans (or Poppins as fallback) | 700–800 | Geometric sans that matches the logo lettering |
| Body / UI | Inter | 400, 500, 600 | Clean and highly legible on phones |

Load via Google Fonts with `font-display: swap`. Provide system fallbacks.

Type scale (mobile → desktop):

| Style | Mobile | Desktop |
|---|---|---|
| H1 | 32px / 1.15 | 56px / 1.08 |
| H2 | 26px / 1.2 | 40px / 1.15 |
| H3 | 20px / 1.3 | 24px / 1.3 |
| Body | 16px / 1.6 | 17px / 1.65 |
| Small | 14px / 1.5 | 14px / 1.5 |

Keep paragraph width to about 65 characters. Sentence case everywhere, no all-caps blocks.

### 4.3 Spacing, radius, shadow

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Section vertical padding: 56px mobile, 96px desktop.
- Page container: max-width 1200px, side padding 20px mobile, 32px desktop.
- Radius: 8px (inputs, small chips), 14px (cards), 999px (pills, primary buttons).
- Shadow: one soft card shadow `0 6px 24px rgba(10,46,92,0.08)`, slightly stronger on hover. Don't stack shadows.

### 4.4 Icons and imagery

- Icon set: Lucide (outline, 1.75 stroke), navy or blue.
- Product images: consistent light backgrounds, square or 4:3 crops, `object-fit: cover`.
- Use the logo mark (open books + pen-butterfly) as the favicon and as a subtle large watermark in the hero, never behind text.

---

## 5. Responsive behaviour

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | 0–639px | Single column, hamburger menu, sticky bottom action bar |
| Tablet | 640–1023px | 2-column grids, hamburger menu |
| Desktop | 1024px+ | 3–4 column grids, full nav |
| Wide | 1440px+ | Container stays 1200px, more whitespace |

Mobile-first CSS. Most Nigerian traffic will be on phones, so design the phone experience first.

**Mobile specifics:**
- **Sticky bottom bar** with three buttons: *Call*, *WhatsApp*, *Get a quote*. Hide on the quote page.
- Tap targets at least 44×44px.
- Catalogue filters become horizontally scrolling chips.
- Tables (if any) scroll inside their own container.
- Forms use correct input types (`tel`, `email`) so the right keyboard opens.

---

## 6. Global components

**Announcement bar (top):** navy, one line. Example: "Supplying schools across Nigeria. Request a free quote today." Dismissible.

**Header:** white, sticky, logo left, nav center, "Request a quote" orange button right. On scroll, add a thin bottom border. The mobile menu is a full-height slide-in panel.

**Buttons**
- Primary: orange pill, navy text, hover `--orange-600`.
- Secondary: navy outline, hover fill navy with white text.
- WhatsApp: green pill with the WhatsApp icon.
- All buttons have visible focus rings (2px blue outline, 2px offset).

**Category card:** image on top, title, one-line description, "View items" link. The whole card is clickable.

**Product card:** image, name, short spec line, "Add to quote" button (no price). Once added, the button turns into "Added ✓" and the quote counter in the header updates.

**Quote basket (drawer):** a slide-in panel listing chosen items with quantity steppers, and the quote form below. Persist in `localStorage` so it survives page reloads.

**Footer:** navy background. Columns: logo + short tagline, Catalogue links, Company links, Contact details. Bottom row: copyright, Privacy, Terms.

**Floating WhatsApp button:** bottom-right on desktop; on mobile it's replaced by the sticky bottom bar.

---

## 7. Page-by-page specification

### 7.1 Home

1. **Hero**
   - Headline: "Everything your school needs, from one supplier."
   - Subtext: "Textbooks, laboratory equipment, school furniture, bags and stationery. Reliable sourcing, competitive pricing, timely delivery."
   - Buttons: **Request a quote** (primary), **Chat on WhatsApp** (secondary).
   - Visual: a collage of 3–4 product photos (microscope, desks, kids' chairs, beakers) in rounded frames, with the logo mark as a faint watermark.
   - Small trust line under the buttons: "Trusted by schools across Lagos and Nigeria" (only if the 100+ claim is confirmed).
2. **Category tiles (4):** Textbooks, Laboratory Equipment, School Furniture, Bags & Stationery.
3. **Why schools trust Bookhola Hub:** 4 icon points from the About sheet: Reliable, Affordable, Fast delivery, Quality assured.
4. **Featured products:** a horizontally scrolling row of 6–8 items (microscope, burette set, Bunsen burner, classroom desks, teacher table, library shelves, kids' chairs, beakers) each with "Add to quote".
5. **How ordering works (this one is a real sequence, so numbering is fine):**
   1. Tell us what you need (browse or send your school list)
   2. Get a quote (we reply with pricing and availability)
   3. Confirm and pay
   4. We deliver to your school
6. **Send us your school list:** a strip like Schoolstoreng's "Back to School" prompt with a WhatsApp button and an upload field on the quote page.
7. **MD's message:** portrait of Banjo Babalola, Managing Director, with his quote from the About sheet.
8. **Final call to action:** navy band, "Ready to equip your school?" with quote + call buttons.

### 7.2 Catalogue overview (/catalogue)

- Page title and short intro.
- Grid of the 4 categories, each showing 3 sub-highlights.
- Search box (client-side filter across all items).

### 7.3 Category pages

Shared layout: breadcrumb, title, short description, filter chips (sub-category), search, product grid (2 columns mobile, 3 tablet, 4 desktop), and a "Can't find it? Ask us" banner at the bottom.

**Laboratory Equipment** — sub-categories:
- *Chemistry & Biology:* beakers, conical flasks, test tube rack, measuring cylinders, Bunsen burner, compound microscope, human skeleton model, petri dishes.
- *Physics:* meter rule, vernier caliper, ammeter, voltmeter, retort stand, pendulum bob, magnets.
- *General:* burette with retort stand, compound microscope (1000x, LED illumination), Bunsen burner (brass, adjustable flame).
- Highlight line: "We supply complete school labs."

**School Furniture:** classroom desks and chairs for pupils (ages 6–12), teacher table with office chair, library bookshelves, kindergarten colourful plastic chairs.

**Textbooks:** no product data yet. Launch with subject/level tiles (Nursery, Primary, Junior Secondary, Senior Secondary, Reference) and a "Send your booklist" call to action. Add real titles later.

**Bags & Stationery:** same approach as textbooks: tiles (School bags, Notebooks, Pens and pencils, Art supplies) plus "Request a quote".

### 7.4 Product data model

Store products in a simple JSON file at launch (or a Supabase table later):

```json
{
  "id": "compound-microscope",
  "name": "Compound microscope",
  "category": "lab",
  "subcategory": "chemistry-biology",
  "image": "/img/products/compound-microscope.jpg",
  "summary": "Optical microscope, up to 1000x, LED illumination",
  "tags": ["biology", "microscope"],
  "featured": true
}
```

No prices at launch. If the client later wants prices, add `price` and a "Show price" flag.

### 7.5 Request a Quote (/quote)

Fields:
- School name *
- Contact person *
- Role (Proprietor, Bursar, Teacher, Parent association, Other)
- Phone *
- Email
- Location (state / LGA)
- Category interest (checkboxes)
- Items list (auto-filled from the quote basket, editable)
- Additional notes
- Optional file upload for a booklist or school list

Submit options:
1. **Send via WhatsApp:** opens `https://wa.me/234XXXXXXXXXX?text=...` with the details pre-filled.
2. **Send by email/form:** saves to a backend (see section 9).

Success state: "Thanks. We've received your request and will reply within one business day." (Confirm the response time with the client.)

Validation: inline errors under each field that say what to fix, e.g. "Enter a phone number like 0802 949 6820."

### 7.6 About (/about)

- Company intro (corrected text from the About sheet).
- Mission: "To make learning materials accessible and affordable for every child."
- Vision: "To become Nigeria's most trusted school supplies partner."
- Core values: Integrity, Quality, Affordability, Service.
- MD's message with portrait.
- Optional: a short numbers strip (only with verified figures).

### 7.7 Contact (/contact)

- Address, phone(s), WhatsApp, email, Instagram, opening hours.
- Embedded Google Map (lazy loaded).
- Short contact form (name, phone, message).
- Buttons: Call, WhatsApp, Get directions.

### 7.8 Legal pages

Privacy policy and Terms (short, plain language). Needed because the site collects names and phone numbers (Nigeria Data Protection Act).

---

## 8. Content and tone

- Plain, confident, school-focused. Short sentences.
- Button labels state the action: "Request a quote", "Add to quote", "Send on WhatsApp".
- Keep one term for one thing: always "quote", not "enquiry" or "order request".
- No stock-photo clichés; use real product photos.

---

## 9. Suggested technical approach

| Area | Suggestion |
|---|---|
| Framework | React + Vite (or Next.js if SEO is a priority; Next.js gives better server-rendered SEO out of the box) |
| Styling | Tailwind CSS with the tokens above defined in the theme, or plain CSS variables |
| Hosting | Vercel, with bookhola.com.ng pointed at it (domain must be added as a custom domain and DNS records set at the registrar) |
| Form backend | Supabase table `quote_requests` + a notification email; or a form service such as Formspree for a quicker start |
| Products | Static JSON at launch; move to Supabase when the client wants to edit products himself |
| Admin | Optional later: simple admin page to add/edit products and view quote requests |
| Analytics | Vercel Analytics or Google Analytics 4; track "Quote submitted" and "WhatsApp click" as conversions |
| Email | Set up a mailbox on the domain (e.g. Zoho Mail free tier or Google Workspace) |

---

## 10. SEO and performance

- One `<h1>` per page; descriptive `<title>` and meta description on every page.
- Target search phrases: "school laboratory equipment Lagos", "school furniture supplier Nigeria", "school textbooks supplier Lagos".
- Add `LocalBusiness` structured data (name, address, phone, hours).
- Open Graph image (logo on a navy background) for good WhatsApp link previews. Important, since links will be shared on WhatsApp.
- Images: WebP/AVIF, sized per breakpoint, `loading="lazy"` below the fold, explicit width/height to avoid layout shift.
- Target Lighthouse 90+ on mobile; keep the total page weight under about 1.5MB on first load.
- Sitemap.xml and robots.txt; register in Google Search Console and create a Google Business Profile for the shop.

## 11. Accessibility checklist

- Colour contrast meets WCAG AA (see the orange note in 4.1).
- Keyboard navigation works everywhere; focus states are visible.
- All images have meaningful `alt` text.
- Form fields have visible labels, not just placeholders.
- Respect `prefers-reduced-motion`; keep animation minimal.
- Semantic landmarks: `header`, `nav`, `main`, `footer`.

## 12. Asset inventory (from the files shared)

| Asset | Status |
|---|---|
| Logo with wordmark | Good; need an SVG or transparent PNG version |
| Logo mark only | Crop from existing; export a 512×512 icon for favicon |
| MD portrait | Good quality; use in About and the home page |
| Lab equipment flyers | Use the individual product images, crop or re-shoot |
| Furniture flyer | Same as above |
| Storefront image | Looks AI-generated; replace with a real photo if available |
| About sheet | Source for copy (fix typos) |
| Textbook and stationery images | Missing; request or photograph |

## 13. Build order (suggested phases)

1. **Foundation:** project setup, design tokens, header/footer, responsive layout shell.
2. **Core pages:** Home, About, Contact.
3. **Catalogue:** product JSON, category pages, product cards, search and filters.
4. **Quote flow:** basket drawer, quote form, WhatsApp handoff, backend and email notification.
5. **Polish:** SEO, performance, accessibility, analytics, legal pages.
6. **Launch:** connect bookhola.com.ng, set up email, Google Business Profile, test on real phones and slow networks.

## 14. Acceptance checklist before launch

- [ ] All phone numbers, emails and the address are confirmed and consistent everywhere
- [ ] Every "Request a quote" and WhatsApp button works on iOS and Android
- [ ] Quote submissions reach the client by email and are stored
- [ ] Site works well at 360px, 768px, 1024px and 1440px widths
- [ ] Lighthouse mobile score 90+ for performance and accessibility
- [ ] Favicon, page titles and social preview image are set
- [ ] Privacy policy and terms are published
- [ ] The client has approved all copy and photos
