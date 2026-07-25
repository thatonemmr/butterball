// Shared resume model used by both the .docx generator and the HTML/PDF renderer,
// so the two formats always carry identical content.
const { CONTACT, EDUCATION, EXPERIENCE, CATEGORIES } = require('./data');

function buildModel(categoryKey, roleText) {
  const cat = CATEGORIES[categoryKey];
  if (!cat) throw new Error(`unknown category: ${categoryKey}`);
  const summary = cat.summary.replace('{ROLE}', roleText || cat.defaultRole);

  const entry = (e) => ({
    title: e.title,
    org: e.org,
    location: e.location,
    dates: e.dates,
    bullets: e.bullets[cat.bulletSet] || e.bullets.base,
  });

  const work = cat.order.map((k) => entry(EXPERIENCE[k]));
  const vol = entry(EXPERIENCE.volunteer);

  const sections = cat.volunteerFirst
    ? [
        { heading: 'Customer Service & Distribution Experience (Volunteer)', entries: [vol] },
        { heading: 'Work Experience', entries: work },
      ]
    : [
        { heading: 'Work Experience', entries: work },
        { heading: 'Volunteer Experience', entries: [vol] },
      ];

  return { contact: CONTACT, education: EDUCATION, label: cat.label, summary, skills: cat.skills, sections };
}

module.exports = { buildModel };
