(() => {
  const body = document.body;
  const dataUrl = body.dataset.projectData;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tags = values => (values || []).map(v => `<span class="tag">${esc(v)}</span>`).join('');
  const linkButtons = values => (values || []).map(l => `<a class="button" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)} ↗</a>`).join('');

  fetch(dataUrl).then(r => r.json()).then(projects => {
    if (body.dataset.project) renderSpotlight(projects.find(p => p.slug === body.dataset.project));
    else renderIndex(projects);
  }).catch(error => {
    const target = document.querySelector('[data-project-app]');
    if (target) target.innerHTML = `<p class="muted">Project registry could not be loaded.</p>`;
    console.error(error);
  });

  function renderIndex(projects) {
    const target = document.querySelector('[data-project-app]');
    target.innerHTML = projects.map(p => `<a class="project-card ${esc(p.accent)}" href="${esc(p.slug)}/">
      <div class="eyebrow">${esc(p.category)}</div><h2>${esc(p.title)} <span class="arrow">↗</span></h2>
      <div class="muted">${esc(p.organization)}</div><p>${esc(p.summary)}</p><div class="tags">${tags(p.tags.slice(0,4))}</div>
    </a>`).join('');
  }

  function renderMedia(media) {
    if (!media || !media.length) return '<div class="empty-media">Project figures, code links, and results will live here as this spotlight grows.</div>';
    return `<h2>Figures & animations</h2><div class="media-grid">${media.map(item => item.type === 'image'
      ? `<figure class="media-card"><img src="${esc(item.src)}" alt="${esc(item.label)}" loading="lazy"><figcaption>${esc(item.label)}</figcaption></figure>`
      : `<a class="media-card" href="${esc(item.src)}" target="_blank" rel="noreferrer"><div class="pdf-card">${esc(item.label)} ↗</div></a>`).join('')}</div>`;
  }

  function renderSpotlight(project) {
    const target = document.querySelector('[data-project-app]');
    if (!project) { target.innerHTML = '<p>Project not found.</p>'; return; }
    document.title = `${project.title} · Bhargav Srinivasan`;
    target.innerHTML = `<a class="back" href="../">← All projects</a>
      <div class="eyebrow">${esc(project.category)}</div><h1>${esc(project.title)}</h1>
      <div class="muted">${esc(project.organization)}</div>
      <div class="meta"><span class="status">${esc(project.status)}</span><span>${esc(project.dates)}</span></div>
      <p class="lede">${esc(project.summary)}</p><div class="tags">${tags(project.tags)}</div>
      <div class="spotlight"><h2>Overview</h2><p>${esc(project.overview)}</p>
      <h2>What I’m building</h2><ul class="highlights">${project.highlights.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${renderMedia(project.media)}
      <h2>Links</h2><div class="links">${linkButtons(project.links)}</div></div>`;
  }
})();
