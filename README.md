# Matthew Blakney — Job Application Kit

Job search package for Matthew Blakney (Oshawa, ON): grocery/retail, warehouse,
landscaping, and snow removal roles across the Bowmanville → Scarborough corridor
(Bowmanville/Clarington, Courtice, Oshawa, Whitby, Ajax, Pickering, Scarborough).

## What's here

| Path | Contents |
|---|---|
| `JOB_TRACKER.md` | Every researched opening, ranked by callback likelihood, with direct apply links and status |
| `resumes/out/` | 4 tailored resumes (grocery-retail, warehouse, landscaping, snow-removal) in `.docx` + `.pdf` |
| `resumes/source/` | Matthew's original resume for reference |
| `applications/` | One folder per shortlisted job: tailored resume + `APPLY.md` with exact steps and a filled-in cover note |
| `applications/templates/` | Reusable cover-note templates per category |
| `resumes/data.js` / `generate.js` / `render_pdf.js` | Resume generator — edit `data.js`, run `node generate.js` (docx) and `node render_pdf.js` (pdf) |

## Tailoring rules

Every resume version contains only facts from Matthew's original resume — same
jobs, same dates, same education. Tailoring reorders sections, reweights skills,
and rephrases bullets for each job category. Nothing is invented: no licences,
certifications, or experience he doesn't have.

## Regenerating resumes

```bash
cd resumes
npm install docx playwright-core
node generate.js                                        # 4 category .docx files -> out/
node render_pdf.js warehouse out/My_Resume.pdf          # matching PDF via headless Chromium
```
