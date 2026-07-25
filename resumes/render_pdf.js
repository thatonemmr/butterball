// Renders resume PDFs (US Letter) from the shared model via headless Chromium.
//   node render_pdf.js <category> <out.pdf> [roleText] [--png out.png]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const { buildModel } = require('./model');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(model) {
  const half = Math.ceil(model.skills.length / 2);
  const skillCols = [model.skills.slice(0, half), model.skills.slice(half)];
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: Letter; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Carlito', 'Calibri', 'Liberation Sans', Arial, sans-serif;
         font-size: 10.5pt; color: #1a1a1a; padding: 0.55in 0.7in; line-height: 1.25; }
  .name { text-align: center; font-size: 17pt; font-weight: 700; color: #1F4E5F; letter-spacing: .5px; }
  .contact { text-align: center; font-size: 10.5pt; margin: 3px 0 8px; }
  h2 { font-size: 11pt; color: #1F4E5F; text-transform: uppercase; letter-spacing: .5px;
       border-bottom: 1.2px solid #1F4E5F; padding-bottom: 2px; margin: 11px 0 5px; }
  .skills { display: flex; gap: 24px; }
  .skills ul { flex: 1; list-style: none; }
  .skills li::before { content: "•  "; }
  .skills li { margin-bottom: 2px; }
  .job { margin-top: 7px; }
  .jobline { display: flex; justify-content: space-between; }
  .jobline .t { font-weight: 700; }
  .jobline .d { font-style: italic; white-space: nowrap; padding-left: 12px; }
  ul.bullets { margin: 2px 0 0 16px; }
  ul.bullets li { margin-bottom: 2px; }
  .edu { margin-top: 6px; }
  .edu .s { font-weight: 700; }
  </style></head><body>
  <div class="name">${esc(model.contact.name)}</div>
  <div class="contact">${esc(model.contact.location)} &nbsp;|&nbsp; ${esc(model.contact.email)} &nbsp;|&nbsp; ${esc(model.contact.phone)}</div>
  <h2>Summary</h2><div>${esc(model.summary)}</div>
  <h2>Core Skills</h2>
  <div class="skills">${skillCols.map((col) => `<ul>${col.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`).join('')}</div>
  ${model.sections.map((sec) => `<h2>${esc(sec.heading)}</h2>${sec.entries.map((e) => `
    <div class="job"><div class="jobline"><span class="t">${esc(e.title)} | ${esc(e.org)} | ${esc(e.location)}</span><span class="d">${esc(e.dates)}</span></div>
    <ul class="bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`).join('')}`).join('')}
  <h2>Education</h2>
  ${model.education.map((ed) => `<div class="edu"><div class="s">${esc(ed.school)} — ${esc(ed.location)}</div><div>${esc(ed.detail)}</div></div>`).join('')}
  </body></html>`;
}

async function renderPdf(categoryKey, outPdf, roleText, pngPath) {
  const model = buildModel(categoryKey, roleText);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  await page.setContent(html(model), { waitUntil: 'load' });
  fs.mkdirSync(path.dirname(outPdf), { recursive: true });
  await page.pdf({ path: outPdf, format: 'Letter', printBackground: true });
  if (pngPath) await page.screenshot({ path: pngPath, fullPage: true });
  await browser.close();
  console.log('wrote', outPdf);
}

if (require.main === module) {
  const [cat, out, ...rest] = process.argv.slice(2);
  const pngIdx = rest.indexOf('--png');
  const png = pngIdx !== -1 ? rest[pngIdx + 1] : null;
  const role = rest.filter((_, i) => i !== pngIdx && i !== pngIdx + 1).join(' ') || null;
  renderPdf(cat, out, role, png).catch((e) => { console.error(e); process.exit(1); });
}

module.exports = { renderPdf };
