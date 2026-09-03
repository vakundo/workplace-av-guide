# CAN — Workplace AV Guide

A cinematic room picker for CAN's workplace AV guides. Built with plain HTML, CSS, and JavaScript so a beginner can edit it without installing a framework.

## Current phase

- Welcome screen and CAN identity.
- Room picker for Condo Room, Board Room, R&D Room, and Training Room.
- A separate starter page for Condo Room.
- Responsive layout, keyboard-friendly controls, and reduced-motion support.

Room instructions will be added in the next phase. No accounts, analytics, or backend are included. Google Fonts is used for typography, with local font fallbacks.

## Open it on your computer

Open `index.html` in your browser. No install or build step is required.

## Publish for free on GitHub Pages

1. Sign in to GitHub and create a **public** repository named `workplace-av-guide`.
2. Upload the files from this folder directly into the repository, so `index.html` is at the top level. Commit them to `main`.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. Wait for the Pages deployment to finish. GitHub displays the published address in Settings → Pages.

For account `vakundo` and repository `workplace-av-guide`, the expected address is `https://vakundo.github.io/workplace-av-guide/`. It only works after publishing succeeds.

The repository and site are public. Keep passwords, meeting links, access codes, internal room identifiers, and confidential workplace information out of the content.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Your first edit, step by step

1. Open `index.html` on GitHub and click the pencil icon.
2. Find `Good meetings.` and change it to your preferred headline.
3. Click **Commit changes**, write a short description, and commit to `main`.
4. Wait for GitHub Pages to publish the update, then refresh your site.

## Where to change things

| File | Purpose |
| --- | --- |
| `index.html` | Page headings and structure |
| `styles.css` | Colors, fonts, spacing, and mobile layout |
| `app.js` | Checklists, troubleshooting content, and quiz |
| `.nojekyll` | Serves the plain static files without Jekyll processing |

To change the green accent, edit `--lime` in `styles.css`. To change a checklist, edit `meetings` in `app.js`. Keep quotation marks and commas intact.

## Suggested next step

Pick one real room type and identify the approved connection method, meeting platform, and support process. Replace the generic instructions with reviewed, public-safe guidance for that room type.


