# bds062.github.io
Bhargav Srinivasan's personal website.

## Project pages

Project spotlights live under [`projects/`](projects/). The site is intentionally static, so it works directly on GitHub Pages without a build step.

- [`projects/data/projects.json`](projects/data/projects.json) is the project registry.
- [`projects/index.html`](projects/index.html) renders the project index.
- Each project has a stable URL at `projects/<slug>/`.
- [`projects/template.html`](projects/template.html) is the starter shell for a new spotlight.
- Shared presentation and rendering live in [`assets/css/projects.css`](assets/css/projects.css) and [`assets/js/projects.js`](assets/js/projects.js).

To add a project: add one object to the JSON registry, copy `projects/template.html` to `projects/<slug>/index.html`, and replace `your-project-slug`. Add the spotlight link to the homepage when ready.
