/* Shared code for the Herbal Research academic website. */

const SITE = {
    projectId: 'R-26-IT-021',

    // Put the URL of your RESEARCH PROJECT repository's README here.
    // Example: https://github.com/your-username/your-repository/blob/main/README.md
    researchReadmeUrl: 'https://github.com/dinee10/R26-IT-021/blob/main/README.md',

    members: [
        {
            name: 'H D Sachintha',
            studentId: 'IT22168986',
            role: 'Plant Identification',
            email: 'it22168986@my.sliit.lk'
        },
        {
            name: 'Munasinghe M P',
            studentId: 'IT22640598',
            role: 'Herbal Knowledge',
            email: 'it226405986@my.sliit.lk'
        },
        {
            name: 'D G T K Wickramasinghe',
            studentId: 'IT22132796',
            role: 'Cultivation Recommendation',
            email: 'it221327966@my.sliit.lk'
        },
        {
            name: 'Pattiya Arachchi P A H K',
            studentId: 'IT22112132',
            role: 'Quality Assessment',
            email: 'it221112132@my.sliit.lk'
        }
    ],

    nav: [
        ['Home', 'index.html'],
        ['Domain', 'domain.html'],
        ['Milestones', 'milestones.html'],
        ['Documents', 'documents.html'],
        ['Presentations', 'presentations.html'],
        ['About Us', 'about.html'],
        ['Contact Us', 'contact.html']
    ],

    documents: [
        {
            title: 'Plant Identification — Proposal',
            owner: 'H D Sachintha · IT22168986',
            kind: 'Proposal',
            path: 'files/proposals/plant-detection-proposal.pdf'
        },
        {
            title: 'Herbal Knowledge — Proposal',
            owner: 'Munasinghe M P · IT22640598',
            kind: 'Proposal',
            path: 'files/proposals/herbal-knowledge-proposal.pdf'
        },
        {
            title: 'Cultivation Recommendation — Proposal',
            owner: 'D G T K Wickramasinghe · IT22132796',
            kind: 'Proposal',
            path: 'files/proposals/cultivation-proposal.pdf'
        },
        {
            title: 'Quality Assessment — Proposal',
            owner: 'Pattiya Arachchi P A H K · IT22112132',
            kind: 'Proposal',
            path: 'files/proposals/quality-assessment-proposal.pdf'
        },
        {
            title: 'Topic Assessment Form (TAF)',
            owner: 'Research Group R-26-IT-021',
            kind: 'TAF',
            path: 'files/taf/topic-assessment-form.pdf'
        },
        {
            title: 'Quality Assessment and Conversational Assistance — Paper',
            owner: 'Research paper',
            kind: 'Paper',
            path: 'files/papers/quality-and-knowledge-paper.pdf'
        }
    ],

    finalReports: [
        { title: 'H D Sachintha', studentId: 'IT22168986', path: 'files/final-reports/it22168986.pdf' },
        { title: 'Munasinghe M P', studentId: 'IT22640598', path: 'files/final-reports/it22640598.pdf' },
        { title: 'D G T K Wickramasinghe', studentId: 'IT22132796', path: 'files/final-reports/it22132796.pdf' },
        { title: 'Pattiya Arachchi P A H K', studentId: 'IT22112132', path: 'files/final-reports/it22112132.pdf' },
        { title: 'Group Report', path: 'files/final-reports/group-final-report.pdf' }
    ],

    presentations: [
        { title: 'Proposal Presentation', slug: 'proposal' },
        { title: 'Progress Presentation 1', slug: 'progress-1' },
        { title: 'Progress Presentation 2', slug: 'progress-2' },
        { title: 'Final Presentation', slug: 'final' }
    ]
};

const page = document.body.dataset.page || 'index';

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

// Shared navigation.
const navTarget = document.querySelector('#site-nav');

if (navTarget) {
    const links = SITE.nav.map(([name, link]) => {
        const active = page === link.replace('.html', '')
            ? 'class="active" aria-current="page"'
            : '';
        return `<a href="${link}" ${active}>${name}</a>`;
    }).join('');

    navTarget.innerHTML = `
        <div class="topbar">SLIIT · Department of Information Technology · Research 2026</div>
        <header class="site-header">
            <div class="container nav-wrap">
                <a class="brand" href="index.html">
                    <span class="brand-text">
                        <strong>Herbal Research</strong>
                        <small>${SITE.projectId} · SLIIT</small>
                    </span>
                </a>
                <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
                <nav class="nav-links" aria-label="Main navigation">${links}</nav>
            </div>
        </header>`;

    const toggle = navTarget.querySelector('.menu-toggle');
    toggle.addEventListener('click', () => {
        const menu = navTarget.querySelector('.nav-links');
        const expanded = menu.classList.toggle('open');
        toggle.textContent = expanded ? '×' : '☰';
        toggle.setAttribute('aria-expanded', String(expanded));
    });
}

// Shared footer.
const footerTarget = document.querySelector('#site-footer');

if (footerTarget) {
    const links = SITE.nav.map(([name, link]) => `<a href="${link}">${name}</a>`).join('');
    footerTarget.innerHTML = `
        <footer class="footer">
            <div class="container footer-inner">
                <div>
                    <strong>Herbal Research</strong>
                    <p>R-26-IT-021 · SLIIT</p>
                </div>
                <nav aria-label="Footer links">${links}</nav>
            </div>
            <div class="container footer-bottom">Academic research information website · 2026</div>
        </footer>`;
}

// Shared in-website PDF viewer.
const viewer = document.createElement('dialog');
viewer.className = 'viewer';
viewer.id = 'document-viewer';
viewer.setAttribute('aria-label', 'PDF viewer');
viewer.innerHTML = `
    <div class="viewer-head">
        <strong id="viewer-title">PDF preview</strong>
        <div class="viewer-controls">
            <a id="viewer-external" class="viewer-close" target="_blank" rel="noopener">Open PDF ↗</a>
            <button id="viewer-close" class="viewer-close" type="button">Close ✕</button>
        </div>
    </div>
    <iframe title="PDF preview" id="viewer-frame" loading="lazy"></iframe>`;
document.body.appendChild(viewer);

function openPdf(path, title) {
    const url = encodeURI(path);
    document.querySelector('#viewer-title').textContent = title;
    document.querySelector('#viewer-frame').src = `${url}#toolbar=1`;
    document.querySelector('#viewer-external').href = url;

    if (typeof viewer.showModal === 'function') {
        if (!viewer.open) viewer.showModal();
    } else {
        window.open(url, '_blank', 'noopener');
    }
}

window.openPdf = openPdf;
document.querySelector('#viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => {
    document.querySelector('#viewer-frame').src = 'about:blank';
});

async function exists(path) {
    try {
        const response = await fetch(path, { method: 'HEAD', cache: 'no-store' });
        const contentType = (response.headers.get('content-type') || '').toLowerCase();
        return response.ok && !contentType.includes('text/html');
    } catch {
        return false;
    }
}

async function pdfExists(path) {
    try {
        const response = await fetch(path, { method: 'HEAD', cache: 'no-store' });
        const contentType = (response.headers.get('content-type') || '').toLowerCase();
        return response.ok && (
            contentType.includes('application/pdf') ||
            contentType.includes('application/octet-stream')
        );
    } catch {
        return false;
    }
}

function makeButton(label, className = 'btn primary') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    return button;
}

function makeLink(label, url, download = false) {
    const link = document.createElement('a');
    link.className = 'btn secondary';
    link.textContent = label;
    link.href = url;

    if (download) {
        link.download = '';
    } else {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
    return link;
}

function renderDocument(doc) {
    const card = document.createElement('article');
    card.className = 'doc-card';
    card.dataset.kind = doc.kind;
    card.dataset.search = [doc.title, doc.owner, doc.kind].join(' ').toLowerCase();
    const typeLabel = doc.type === 'xlsx' ? 'XLSX' : doc.type === 'external' ? 'LINK' : 'PDF';

    card.innerHTML = `
        <div class="doc-icon" aria-hidden="true">${typeLabel}</div>
        <div class="doc-main">
            <span class="eyebrow">${escapeHtml(doc.kind)}</span>
            <h3>${escapeHtml(doc.title)}</h3>
            <p class="info-line">${escapeHtml(doc.owner)}</p>
            <div class="doc-actions"></div>
        </div>`;

    const actions = card.querySelector('.doc-actions');

    if (doc.type === 'external') {
        actions.appendChild(makeLink('View README ↗', doc.url));
    } else if (doc.type === 'xlsx') {
        if (doc.preview) {
            const view = makeButton('View Planner');
            view.addEventListener('click', () => openPdf(doc.preview, doc.title));
            actions.appendChild(view);
        }
        actions.appendChild(makeLink('Download Excel', doc.path, true));
    } else {
        const view = makeButton('View PDF');
        view.addEventListener('click', () => openPdf(doc.path, doc.title));
        actions.appendChild(view);
        // Keep the existing document PDF download option.
        actions.appendChild(makeLink('Download', doc.path, true));
    }

    return card;
}

function finalReportDocument(report) {
    const group = report.title === 'Group Report';
    return {
        title: group ? 'Group Final Thesis Draft' : `${report.title} — Final Report Draft`,
        owner: group ? 'Research Group R-26-IT-021' : `${report.title} · ${report.studentId}`,
        kind: 'Final Report Draft',
        path: report.path
    };
}

async function loadFinalReports() {
    const available = await Promise.all(SITE.finalReports.map(report => pdfExists(report.path)));
    return SITE.finalReports.filter((_, index) => available[index]).map(finalReportDocument);
}

async function loadChecklistDocuments() {
    const items = [];
    const readme = SITE.researchReadmeUrl.trim();

    // The README card appears only after the real GitHub URL is provided.
    if (/^https:\/\/github\.com\//i.test(readme)) {
        items.push({
            title: 'Research Project README',
            owner: 'Research Group R-26-IT-021',
            kind: 'Checklist',
            type: 'external',
            url: readme
        });
    }

    const planner = 'files/checklists/research-planner.xlsx';
    if (await exists(planner)) {
        const plannerPdf = 'files/checklists/research-planner.pdf';
        items.push({
            title: 'MS Planner — Research Schedule',
            owner: 'Research Group R-26-IT-021',
            kind: 'Checklist',
            type: 'xlsx',
            path: planner,
            preview: await pdfExists(plannerPdf) ? plannerPdf : null
        });
    }

    return items;
}

// Documents page, including the four individual drafts, group thesis and checklists.
const documentGrid = document.querySelector('#document-grid');

if (documentGrid) {
    SITE.documents.forEach(doc => documentGrid.appendChild(renderDocument(doc)));
    const input = document.querySelector('#document-search');
    const filters = [...document.querySelectorAll('[data-filter]')];
    let activeFilter = 'All';

    function refreshDocuments() {
        const query = (input?.value || '').trim().toLowerCase();
        let visible = 0;

        [...documentGrid.children].forEach(card => {
            const matchesFilter = activeFilter === 'All' || activeFilter === card.dataset.kind;
            const matchesSearch = card.dataset.search.includes(query);
            card.hidden = !(matchesFilter && matchesSearch);
            if (!card.hidden) visible++;
        });

        const count = document.querySelector('#document-count');
        if (count) count.textContent = `${visible} document${visible === 1 ? '' : 's'}`;
        const empty = document.querySelector('#no-documents');
        if (empty) empty.hidden = visible !== 0;
    }

    if (input) input.addEventListener('input', refreshDocuments);
    filters.forEach(button => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter;
            filters.forEach(item => item.classList.toggle('active', item === button));
            refreshDocuments();
        });
    });

    refreshDocuments();

    Promise.all([loadFinalReports(), loadChecklistDocuments()]).then(([reports, checklists]) => {
        [...reports, ...checklists].forEach(item => documentGrid.appendChild(renderDocument(item)));
        refreshDocuments();
    }).catch(error => console.error('Document loading failed:', error));
}

// Home page's Final Report Drafts section.
const homeReportGrid = document.querySelector('#home-report-grid');

if (homeReportGrid) {
    loadFinalReports().then(reports => {
        if (!reports.length) return;
        reports.forEach(report => homeReportGrid.appendChild(renderDocument(report)));
        const section = document.querySelector('#final-reports');
        if (section) section.hidden = false;
    }).catch(error => console.error('Home reports failed to load:', error));
}

// Backward compatibility with the original Presentations page.
const presentationGrid = document.querySelector('#presentation-grid');

if (presentationGrid) {
    SITE.presentations.forEach(async presentation => {
        const pdf = `files/presentations/${presentation.slug}.pdf`;
        const pptx = `files/presentations/${presentation.slug}.pptx`;
        const [hasPdf, hasPptx] = await Promise.all([pdfExists(pdf), exists(pptx)]);
        if (!hasPdf && !hasPptx) return;

        const card = document.createElement('article');
        card.className = 'doc-card';
        card.id = presentation.slug;
        card.innerHTML = `
            <div class="doc-icon slides" aria-hidden="true">PPT</div>
            <div class="doc-main">
                <h3>${escapeHtml(presentation.title)}</h3>
                <div class="doc-actions"></div>
            </div>`;

        const actions = card.querySelector('.doc-actions');
        if (hasPdf) {
            const button = makeButton('View Slides');
            button.addEventListener('click', () => openPdf(pdf, presentation.title));
            actions.appendChild(button);
        }
        if (hasPptx) actions.appendChild(makeLink('Download PPTX', pptx, true));
        presentationGrid.appendChild(card);
    });
}

// Original photo placeholders: load the image without altering the card styles.
document.querySelectorAll('[data-photo]').forEach(async box => {
    const path = (box.dataset.fallback || 'images/team/') + box.dataset.photo;
    if (!(await exists(path))) return;
    const img = document.createElement('img');
    img.src = path;
    img.alt = box.dataset.alt || 'Profile photograph';
    img.loading = 'lazy';
    box.replaceChildren(img);
});

// Contact details for the four members only.
const contactMembers = document.querySelector('#contact-members');

if (contactMembers) {
    SITE.members.forEach((member, index) => {
        const item = document.createElement('div');
        item.className = 'contact-member';
        const email = member.email
            ? `<a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>`
            : '';
        item.innerHTML = `
            <span class="member-counter">${String(index + 1).padStart(2, '0')}</span>
            <div>
                <strong>${escapeHtml(member.name)}</strong>
                <small>${escapeHtml(member.studentId)} · ${escapeHtml(member.role)}</small>
                ${email}
            </div>`;
        contactMembers.appendChild(item);
    });
}

// Old email-app form support. Formspree forms must use their own direct-send handler.
const contactForm = document.querySelector('#contact-form');
const usesFormspree = contactForm && /^https:\/\/formspree\.io\/f\//i.test(contactForm.action);

if (contactForm && !usesFormspree) {
    const feedback = document.querySelector('#form-message');
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        const data = new FormData(contactForm);
        const emails = SITE.members.map(member => member.email.trim()).filter(Boolean);
        if (!emails.length) {
            if (feedback) feedback.textContent = 'Please configure the research team email address.';
            return;
        }

        const subject = `R-26-IT-021: ${String(data.get('subject') || '').trim()}`;
        const body = `Name: ${String(data.get('name') || '').trim()}\nEmail: ${String(data.get('email') || '').trim()}\n\n${String(data.get('message') || '').trim()}`;
        if (feedback) feedback.textContent = 'Complete sending in your email app.';
        window.location.href = `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
