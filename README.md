# Masbak Landing Page

Static HTML landing page for Masbak.

- Production entry point: `index.html`
- Deployment platform: Vercel
- Custom domain: `masbak.co`
- Matching source copy: `masbaklanding.html`

The production entry and source copy are kept in sync. Styles,
JavaScript, images, and the SVG diagram are embedded. Google Fonts supplies
IBM Plex Sans Arabic; system fonts are used as a fallback.

## Local preview

Open `index.html` in a browser, or serve this directory with a static HTTP server.
No package installation or build step is required.

## Vercel deployment

Import this GitHub repository into Vercel and select the `main` branch.
Use the **Other** framework preset and the repository root as the Root Directory.
Leave the Build Command empty and use `.` as the Output Directory.
No install command or environment variables are required.

Custom-domain and DNS configuration are separate from this repository setup.
