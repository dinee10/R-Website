# Herbal Research — Website

Seven-page academic research information website for **R-26-IT-021**, SLIIT.

## Run locally

1. Open this folder in Visual Studio Code.
2. Right-click `index.html` → **Open with Live Server**.
3. Or run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

No `npm install` or backend is required.

## Included documents

The project includes six supplied PDFs: four individual proposals, the Topic Assessment Form (TAF), and the available quality-assessment/conversational-assistant paper. No group proposal was submitted.

## Presentations

Put the following files inside `files/presentations/`:

| Stage | Original slides | Browser preview |
| --- | --- | --- |
| Proposal | `proposal.pptx` | `proposal.pdf` |
| Progress 1 | `progress-1.pptx` | `progress-1.pdf` |
| Progress 2 | `progress-2.pptx` | `progress-2.pdf` |
| Final | `final.pptx` | `final.pdf` |

The Presentations page recognizes those files automatically. The PDF enables **View Slides**; the PowerPoint file enables **Download PPTX**.

## Final reports

Put PDF files in `files/final-reports/` with these names:

- `it22168986.pdf` — H D Sachintha
- `it22640598.pdf` — Munasinghe M P
- `it22132796.pdf` — D G T K Wickramasinghe
- `it22112132.pdf` — Pattiya Arachchi P A H K
- `group-final-report.pdf` — group final report, if there is one

**Home and Documents** automatically display each existing final report as a normal PDF document card, showing the member name and **View PDF** / **Download** buttons. Missing report PDFs are hidden entirely. The Home page hides its entire Final Reports section until at least one PDF is available. Refresh the page after copying a new PDF into the folder. Use the **Final Reports** document filter to see available reports.

## Member and supervisor photographs

Add permitted JPEG photographs:

- `images/team/sachintha.jpg`
- `images/team/munasinghe.jpg`
- `images/team/wickramasinghe.jpg`
- `images/team/pattiya-arachchi.jpg`
- `images/supervisors/nelum-amarasena.jpg`
- `images/supervisors/kaushika-kahatapitiya.jpg`

Portraits replace the initials automatically. Supervisor profiles are on About Us **only**, not Contact Us.

## Contact emails

Enter the four approved member emails in `assets/site.js`, under `SITE.members`, by replacing their empty `email: ''` values. The directory then shows each address. The **Send Message** button launches the visitor's email application addressed to all configured team member emails, with a prepared subject and message. There is no member-selection field. The visitor must send the email in their email app; the website does not send messages itself.

## Before publishing

- Confirm any final report and image publication permissions. The included PDFs may contain signatures or private details.
- Check the supplied TAF: some early wording differs from the four-component Ayurvedic research proposal. The original PDF is preserved unchanged.
- Check that the final report results are accurately represented. The three visible research metrics are from the supplied two-component paper only.
- Verify the site in your own browser and on a phone.
- Run `python verify_site.py` for local files and links.
- Confirm the coursework upload size limit and submission format.

Edit the `.html` files for visible text, `assets/styles.css` for design, and `assets/site.js` for documents, slide filenames and emails.

## Milestones

The six milestone entries contain brief descriptions of the research stages. Only the proposal month is provided; add official dates and assessment mark allocations from your university schedule when known.
