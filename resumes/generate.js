// Generates tailored resume .docx files for Matthew Blakney.
//   node generate.js                 -> 4 category master resumes into resumes/out/
//   node generate.js --jobs jobs.json -> per-job variants into applications/<slug>/
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
  BorderStyle, Table, TableRow, TableCell, WidthType, TabStopType,
} = require('docx');
const { CONTACT, EDUCATION } = require('./data');
const { buildModel } = require('./model');

const FONT = 'Calibri';
const ACCENT = '1F4E5F';
const BULLET_REF = 'resume-bullets';

const heading = (text) =>
  new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
    children: [new TextRun({ text, bold: true, size: 22, color: ACCENT, font: FONT, allCaps: true })],
  });

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 40 },
    children: [new TextRun({ text, size: 21, font: FONT, ...opts.run })],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: BULLET_REF, level: 0 },
    spacing: { after: 20 },
    children: [new TextRun({ text, size: 21, font: FONT })],
  });

function jobBlock(entry) {
  const bullets = entry.bullets;
  return [
    new Paragraph({
      spacing: { before: 80, after: 20 },
      tabStops: [{ type: TabStopType.RIGHT, position: 10800 }],
      children: [
        new TextRun({ text: `${entry.title} | ${entry.org} | ${entry.location}`, bold: true, size: 21, font: FONT }),
        new TextRun({ text: `\t${entry.dates}`, size: 21, font: FONT, italics: true }),
      ],
    }),
    ...bullets.map(bullet),
  ];
}

function skillsTable(skills) {
  const half = Math.ceil(skills.length / 2);
  const rows = [];
  for (let i = 0; i < half; i++) {
    const cellFor = (skill) =>
      new TableCell({
        width: { size: 5400, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        },
        children: [
          new Paragraph({
            spacing: { after: 20 },
            children: [new TextRun({ text: skill ? `•  ${skill}` : '', size: 21, font: FONT })],
          }),
        ],
      });
    rows.push(new TableRow({ children: [cellFor(skills[i]), cellFor(skills[i + half] || '')] }));
  }
  return new Table({ columnWidths: [5400, 5400], width: { size: 10800, type: WidthType.DXA }, rows });
}

function buildDoc({ category, roleText }) {
  const model = buildModel(category, roleText);
  const { summary } = model;

  const expBlocks = [];
  for (const sec of model.sections) {
    expBlocks.push(heading(sec.heading));
    sec.entries.forEach((e) => expBlocks.push(...jobBlock(e)));
  }

  return new Document({
    numbering: {
      config: [{
        reference: BULLET_REF,
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 340, hanging: 200 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 620, bottom: 620, left: 720, right: 720 },
        },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: CONTACT.name, bold: true, size: 34, color: ACCENT, font: FONT })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [new TextRun({
            text: `${CONTACT.location}  |  ${CONTACT.email}  |  ${CONTACT.phone}`,
            size: 21, font: FONT,
          })],
        }),
        heading('Summary'),
        body(summary, { after: 60 }),
        heading('Core Skills'),
        skillsTable(model.skills),
        ...expBlocks,
        heading('Education'),
        ...EDUCATION.flatMap((ed) => [
          new Paragraph({
            spacing: { before: 60, after: 10 },
            children: [
              new TextRun({ text: `${ed.school} — ${ed.location}`, bold: true, size: 21, font: FONT }),
            ],
          }),
          body(ed.detail, { after: 30 }),
        ]),
      ],
    }],
  });
}

async function writeResume({ category, roleText, outPath }) {
  const doc = buildDoc({ category, roleText });
  const buf = await Packer.toBuffer(doc);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log('wrote', outPath);
}

(async () => {
  const args = process.argv.slice(2);
  const jobsIdx = args.indexOf('--jobs');
  if (jobsIdx === -1) {
    const outDir = path.join(__dirname, 'out');
    const names = {
      'grocery-retail': 'Matthew_Blakney_Resume_Grocery_Retail.docx',
      warehouse: 'Matthew_Blakney_Resume_Warehouse.docx',
      landscaping: 'Matthew_Blakney_Resume_Landscaping.docx',
      'snow-removal': 'Matthew_Blakney_Resume_Snow_Removal.docx',
    };
    for (const [category, file] of Object.entries(names)) {
      await writeResume({ category, roleText: null, outPath: path.join(outDir, file) });
    }
  } else {
    // jobs.json: [{slug, category, roleText, outDir}]
    const jobs = JSON.parse(fs.readFileSync(args[jobsIdx + 1], 'utf8'));
    for (const j of jobs) {
      await writeResume({
        category: j.category,
        roleText: j.roleText,
        outPath: path.join(j.outDir, 'Matthew_Blakney_Resume.docx'),
      });
    }
  }
})();
