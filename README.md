# Ashrar Ahmed — Portfolio

An animated personal portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion — word-reveal headlines, a magnetic-button hero, tilting spotlight project cards, and an infinite skills marquee.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for animation
- [react-icons](https://react-icons.github.io/react-icons/)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

## Editing your content

All resume content lives in one place: [src/data/resume.ts](src/data/resume.ts). Update your profile, experience, projects, skills, education, and contact info there — the components read from it directly.

Before deploying, update the placeholder GitHub link in `resume.ts` (`profile.github`) to your real profile URL.

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds and deploys automatically on every push to `main`.

1. Create a new **public** repo on GitHub (e.g. `ashrar-portfolio`).
2. If your repo name is different from `ashrar-portfolio`, update the `base` path in [vite.config.ts](vite.config.ts) to match: `base: '/your-repo-name/'`.
3. Push this project to the repo:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In the GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
5. The workflow will run automatically and your site will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

To deploy manually instead, you can also `npm run build` and push the `dist/` folder to a `gh-pages` branch using a tool like [`gh-pages`](https://www.npmjs.com/package/gh-pages).

## Custom domain

If you have a domain, add a `public/CNAME` file containing the domain (e.g. `ashrar.dev`) and point its DNS at GitHub Pages — then GitHub Pages will serve the site from that domain instead of the `github.io` subpath, and you can drop the `base` path in `vite.config.ts` back to `/`.
