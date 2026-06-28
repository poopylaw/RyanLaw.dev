# Ryan Law — Portfolio

A personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Design concept

The whole site is framed as an engineering drawing — title block in the header,
drawing metadata in the hero, spec-sheet style project cards, and a glowing
orb cursor with a soft fading trail. The background is a parallaxing starfield
(three depth layers of stars, drifting at different rates as you move the
mouse) in cyan on near-black.

## Pages / routes

- `/` — home, hero + resume link
- `/work` — education + experience
- `/projects` — full project grid
- `/projects/[slug]` — individual project detail page (photos, goal, tools, write-up)
- `/skills` — capabilities list
- `/contact` — contact form + direct email/phone
- `/api/contact` — server route the contact form posts to

Each nav tab in the header is a real route (not an anchor link), so clicking
between them navigates to a separate page.

## Getting started locally

You'll need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Setting up the contact form (required for it to actually send email)

The form on `/contact` posts to `/api/contact`, which sends the message using
[Resend](https://resend.com) — a transactional email API with a free tier
(100 emails/day, no credit card needed). Without this step, the form will
show an error when someone submits it.

1. Go to [resend.com](https://resend.com) and create a free account.
2. In the Resend dashboard, go to **API Keys** → **Create API Key**. Copy it.
3. **For local testing:** copy `.env.local.example` to `.env.local` and paste
   your key in:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` so it reads:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```
   Restart `npm run dev` after adding it.
4. **For the live Vercel deployment:** go to your project on
   [vercel.com](https://vercel.com) → **Settings** → **Environment Variables**,
   add `RESEND_API_KEY` with your key as the value, and redeploy.

By default, the route sends from Resend's shared sandbox address
(`onboarding@resend.dev`), which works immediately with no extra setup —
messages will land in your inbox (ryanlaw2006@gmail.com) with the sender's
email set as "reply-to," so hitting reply goes straight to them.

**Important sandbox limitation:** the shared sandbox sender can only deliver
to the email address you used to sign up for Resend. So while you're testing,
make sure `ryanlaw2006@gmail.com` (or whichever address you sign up with) is
the one that receives messages — if `TO_EMAIL` in the route doesn't match
your Resend account email, sends will fail with an error from Resend. This
limitation goes away once you verify your own domain (next paragraph).

If you later want emails to come from your own domain (e.g.
`contact@ryanlaw.dev`) instead of the Resend sandbox address, verify your
domain in the Resend dashboard, then update the `from` field in
`src/app/api/contact/route.ts`. Once verified, you can send to any address.

## Adding/updating your resume

The button on the homepage links to `/ryan-law-resume.pdf`, which is the file
at `public/ryan-law-resume.pdf`. To update it, just replace that file with a
new PDF of the same name — no code changes needed. If you rename it, update
the `href` in `src/components/Hero.tsx` to match.

## Project structure

```
src/
  app/
    layout.tsx          — root layout, loads fonts, mounts cursor + background
    page.tsx             — home page
    globals.css          — base styles, custom cursor CSS, focus rings, etc.
    work/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx  — dynamic project detail page
    skills/page.tsx
    contact/page.tsx
    api/contact/route.ts — server route that sends the contact form via Resend
  components/
    TitleBlock.tsx       — sticky header / nav, real routed links
    Hero.tsx             — includes the résumé link
    Education.tsx
    Experience.tsx       — also exports the shared <SectionLabel />
    Projects.tsx         — project grid, links to /projects/[slug]
    Skills.tsx
    Contact.tsx          — page shell around <ContactForm />
    ContactForm.tsx       — the actual form + submit/success/error states
    CustomCursor.tsx     — the glowing orb cursor with a fading trail
    StarfieldBackground.tsx — the parallaxing starfield background
    PageTransition.tsx   — fades page content in on load/route change
    FadeText.tsx          — splits text into words that fade in with a stagger
  lib/
    projects.ts          — all project content lives here as plain data
public/
  ryan-law-resume.pdf    — linked from the homepage
  projects/
    tiny-house/          — drop tiny house project images here
```

## Editing content

- **Experience** — edit the `experience` array near the top of `src/components/Experience.tsx`.
- **Skills** — edit `skillGroups` in `src/components/Skills.tsx`.
- **Projects** — everything (title, summary, write-up sections, images) lives
  in `src/lib/projects.ts`. Each entry has a `slug` that becomes its URL
  (`/projects/<slug>`).

## Adding photos to a project

1. Drop your image files into `public/projects/<slug>/` (create the folder if
   it doesn't exist — there's already one at `public/projects/tiny-house/`
   with a README explaining the expected filenames).
2. In `src/lib/projects.ts`, find that project's entry and add/edit its
   `images` array:

   ```ts
   images: [
     { src: "/projects/tiny-house/chamber.jpg", caption: "Physical Test Chamber" },
     { src: "/projects/tiny-house/setup.jpg", caption: "Data Collection Setup" },
     { src: "/projects/tiny-house/data.jpg", caption: "48-Hour Temperature Data" },
   ],
   ```

   The `src` path always starts with `/projects/...` — Next.js serves
   everything inside `/public` from the site root, so don't include `/public`
   in the path.
3. Save — the dev server hot-reloads and the images appear on that project's
   page automatically.

## Adding a brand-new project

Add a new object to the `projects` array in `src/lib/projects.ts` with a
unique `slug`. That's it — `/projects` and `/projects/<slug>` both pick it up
automatically; no new files or routes needed.

## Deploying to Vercel

1. Push this project to a GitHub repo (see steps below if you don't have one set up).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. Add the `RESEND_API_KEY` environment variable (see contact form setup
   above) so the contact form works on the live site, then redeploy.
5. You'll get a live URL (e.g. `ryan-law.vercel.app`); you can attach a custom
   domain later from the Vercel project settings.

### Pushing to GitHub for the first time

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then import that repo at [vercel.com/new](https://vercel.com/new).

## Notes

- The custom cursor and background motion both automatically disable for
  users with `prefers-reduced-motion` set, and the cursor never replaces the
  native cursor on touch devices.
- Fonts (`Space Grotesk`, `IBM Plex Mono`) load via `next/font/google`, so
  they self-host at build time — no separate font setup needed.
- Project images use `next/image`, which optimizes them automatically — no
  need to resize or compress before uploading, though smaller source files
  will still build faster.
- The contact form has basic validation (required fields, email format,
  message length) on both the client and the server.
