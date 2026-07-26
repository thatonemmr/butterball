// Builds one application folder per job in jobs.json:
//   applications/<slug>/Matthew_Blakney_Resume.docx  (tailored)
//   applications/<slug>/Matthew_Blakney_Resume.pdf   (identical content)
//   applications/<slug>/APPLY.md                     (links, steps, cover note / email draft)
const fs = require('fs');
const path = require('path');
const { writeResume } = require('../resumes/generate');
const { renderPdf } = require('../resumes/render_pdf');

const jobs = JSON.parse(fs.readFileSync(path.join(__dirname, 'jobs.json'), 'utf8'));

const COVER_TEMPLATES = {
  'grocery-retail': 'cover-note-grocery-retail.md',
  warehouse: 'cover-note-warehouse.md',
  landscaping: 'cover-note-landscaping.md',
  'snow-removal': 'cover-note-snow-removal.md',
};

function coverNote(job) {
  const tpl = fs.readFileSync(path.join(__dirname, 'templates', COVER_TEMPLATES[job.category]), 'utf8');
  const body = tpl.split('---')[1].trim();
  return body.replaceAll('{ROLE}', job.role).replaceAll('{COMPANY}', job.company);
}

function applyMd(job) {
  const lines = [];
  lines.push(`# ${job.company} — ${job.role}`);
  lines.push('');
  lines.push(`**Location:** ${job.location}`);
  lines.push(`**Pay / shifts:** ${job.pay}`);
  lines.push(`**Callback outlook:** ${job.callback}`);
  lines.push('');
  lines.push('## Apply');
  for (const l of job.links) lines.push(`- ${l}`);
  lines.push('');
  lines.push(`**How:** ${job.method}`);
  lines.push('');
  lines.push('**Resume to upload:** `Matthew_Blakney_Resume.pdf` in this folder (Word version alongside if a site wants .docx).');
  if (job.flags && job.flags.length) {
    lines.push('');
    lines.push('## Watch out');
    for (const f of job.flags) lines.push(`- ${f}`);
  }
  lines.push('');
  if (job.email) {
    lines.push('## Ready-to-send email');
    lines.push('');
    lines.push(`**To:** ${job.email.to}`);
    lines.push(`**Subject:** ${job.email.subject}`);
    lines.push(`**Attach:** Matthew_Blakney_Resume.pdf`);
    lines.push('');
    lines.push('```');
    lines.push(job.email.body);
    lines.push('```');
  } else {
    lines.push('## Cover note (paste into "message to employer" box if offered)');
    lines.push('');
    lines.push('```');
    lines.push(coverNote(job));
    lines.push('```');
  }
  lines.push('');
  lines.push(`> Evidence level: ${job.evidence}`);
  lines.push('');
  return lines.join('\n');
}

(async () => {
  for (const job of jobs) {
    const dir = path.join(__dirname, job.slug);
    fs.mkdirSync(dir, { recursive: true });
    await writeResume({
      category: job.category,
      roleText: job.roleText,
      outPath: path.join(dir, 'Matthew_Blakney_Resume.docx'),
    });
    await renderPdf(job.category, path.join(dir, 'Matthew_Blakney_Resume.pdf'), job.roleText, null);
    fs.writeFileSync(path.join(dir, 'APPLY.md'), applyMd(job));
    console.log('built', job.slug);
  }
})();
