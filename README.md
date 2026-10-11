# Herbal Research — Website

Seven-page academic research information website for **R-26-IT-021**, SLIIT.

## Run locally

1. Open this folder in Visual Studio Code.
2. Right-click `index.html` → **Open with Live Server**.
3. Or run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Included documents

The project includes six supplied PDFs: four individual proposals, the Topic Assessment Form (TAF), and the available quality-assessment/conversational-assistant paper. No group proposal was submitted.


**Home and Documents** automatically display each existing final report as a normal PDF document card, showing the member name and **View PDF** / **Download** buttons. Missing report PDFs are hidden entirely. The Home page hides its entire Final Reports section until at least one PDF is available. Refresh the page after copying a new PDF into the folder. Use the **Final Reports** document filter to see available reports.


Portraits replace the initials automatically. Supervisor profiles are on About Us **only**, not Contact Us.

## Contact emails

Enter the four approved member emails in `assets/site.js`, under `SITE.members`, by replacing their empty `email: ''` values. The directory then shows each address. The **Send Message** button launches the visitor's email application addressed to all configured team member emails, with a prepared subject and message. There is no member-selection field. The visitor must send the email in their email app; the website does not send messages itself.


## Milestones

The six milestone entries contain brief descriptions of the research stages. Only the proposal month is provided; add official dates and assessment mark allocations from your university schedule when known.
