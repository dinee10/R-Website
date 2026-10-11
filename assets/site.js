/* Shared content for the seven-page academic website. */
const SITE = {
  projectId: 'R-26-IT-021',
  members: [
    { name: 'H D Sachintha', studentId: 'IT22168986', role: 'Plant Identification', email: 'it22168986@my.sliit.lk' },
    { name: 'Munasinghe M P', studentId: 'IT22640598', role: 'Herbal Knowledge', email: 'it22640598@my.sliit.lk' },
    { name: 'D G T K Wickramasinghe', studentId: 'IT22132796', role: 'Cultivation Recommendation', email: 'it22132796@my.sliit.lk' },
    { name: 'Pattiya Arachchi P A H K', studentId: 'IT22112132', role: 'Quality Assessment', email: 'it22112132@my.sliit.lk' }
  ],
  nav: [
    ['Home', 'index.html'], ['Domain', 'domain.html'], ['Milestones', 'milestones.html'],
    ['Documents', 'documents.html'], ['Presentations', 'presentations.html'],
    ['About Us', 'about.html'], ['Contact Us', 'contact.html']
  ],
  documents: [
    {title:'Plant Identification — Proposal', owner:'H D Sachintha · IT22168986', kind:'Proposal', path:'files/proposals/plant-detection-proposal.pdf'},
    {title:'Herbal Knowledge — Proposal', owner:'Munasinghe M P · IT22640598', kind:'Proposal', path:'files/proposals/herbal-knowledge-proposal.pdf'},
    {title:'Cultivation Recommendation — Proposal', owner:'D G T K Wickramasinghe · IT22132796', kind:'Proposal', path:'files/proposals/cultivation-proposal.pdf'},
    {title:'Quality Assessment — Proposal', owner:'Pattiya Arachchi P A H K · IT22112132', kind:'Proposal', path:'files/proposals/quality-assessment-proposal.pdf'},
    {title:'Topic Assessment Form (TAF)', owner:'Research Group R-26-IT-021', kind:'TAF', path:'files/taf/topic-assessment-form.pdf'},
    {title:'Quality Assessment and Conversational Assistance — Paper', owner:'Research paper', kind:'Paper', path:'files/papers/quality-and-knowledge-paper.pdf'}
  ],
  finalReports: [
    {title:'H D Sachintha', studentId:'IT22168986', path:'files/final-reports/it22168986.pdf'},
    {title:'Munasinghe M P', studentId:'IT22640598', path:'files/final-reports/it22640598.pdf'},
    {title:'D G T K Wickramasinghe', studentId:'IT22132796', path:'files/final-reports/it22132796.pdf'},
    {title:'Pattiya Arachchi P A H K', studentId:'IT22112132', path:'files/final-reports/it22112132.pdf'},
    {title:'Group Report', path:'files/final-reports/group-final-report.pdf'}
  ],
  presentations: [
    {title:'Proposal Presentation', slug:'proposal'},
    {title:'Progress Presentation 1', slug:'progress-1'},
    {title:'Progress Presentation 2', slug:'progress-2'},
    {title:'Final Presentation', slug:'final'}
  ]
};
const page = document.body.dataset.page || 'index';
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x])); }
const navTarget = document.querySelector('#site-nav');
if (navTarget) {
  navTarget.innerHTML = `<div class="topbar">SLIIT · Department of Information Technology · Research 2026</div>
  <header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html"><span class="brand-text"><strong>Herbal Research</strong><small>${SITE.projectId} · SLIIT</small></span></a>
  <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="nav-links" aria-label="Main navigation">${SITE.nav.map(([name,link])=>`<a href="${link}" ${page===link.replace('.html','')?'class="active" aria-current="page"':''}>${name}</a>`).join('')}</nav></div></header>`;
  const toggle = navTarget.querySelector('.menu-toggle');
  toggle.addEventListener('click',()=>{const menu=navTarget.querySelector('.nav-links');const active=menu.classList.toggle('open');toggle.textContent=active?'×':'☰';toggle.setAttribute('aria-expanded',String(active));});
}
const footerTarget = document.querySelector('#site-footer');
if (footerTarget) footerTarget.innerHTML = `<footer class="footer"><div class="container footer-inner"><div><strong>Herbal Research</strong><p>R-26-IT-021 · SLIIT</p></div><nav aria-label="Footer links">${SITE.nav.map(([name,link])=>`<a href="${link}">${name}</a>`).join('')}</nav></div><div class="container footer-bottom">Academic research information website · 2026</div></footer>`;

// Embedded viewer for actual available PDFs.
const viewer=document.createElement('dialog');viewer.className='viewer';viewer.id='document-viewer';viewer.setAttribute('aria-label','PDF viewer');
viewer.innerHTML='<div class="viewer-head"><strong id="viewer-title">PDF preview</strong><div class="viewer-controls"><a id="viewer-external" class="viewer-close" target="_blank" rel="noopener">Open PDF ↗</a><button id="viewer-close" class="viewer-close" type="button">Close ✕</button></div></div><iframe title="PDF preview" id="viewer-frame" loading="lazy"></iframe>';
document.body.appendChild(viewer);
function openPdf(path,title){document.querySelector('#viewer-title').textContent=title;document.querySelector('#viewer-frame').src=encodeURI(path)+'#toolbar=1';document.querySelector('#viewer-external').href=encodeURI(path);if(typeof viewer.showModal==='function')viewer.showModal();else window.open(encodeURI(path),'_blank','noopener');}
window.openPdf=openPdf;
document.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
viewer.addEventListener('close',()=>document.querySelector('#viewer-frame').src='about:blank');
async function exists(path) {
  try { return (await fetch(path,{method:'HEAD',cache:'no-store'})).ok; }
  catch { return false; }
}
// A missing PDF must stay hidden, even on hosting services that return an HTML
// fallback page with HTTP 200 for nonexistent files.
async function pdfExists(path) {
  try {
    const response=await fetch(path,{method:'HEAD',cache:'no-store'});
    const mime=response.headers.get('content-type') || '';
    return response.ok && (mime.includes('application/pdf') || mime.includes('application/octet-stream'));
  } catch { return false; }
}
function resourceButton(path,label,kind='pdf'){if(kind==='pdf') {const b=document.createElement('button');b.type='button';b.className='btn primary';b.textContent=label;b.addEventListener('click',()=>openPdf(path,label==='View PDF'?'Research document':label));return b;}
 const a=document.createElement('a');a.className='btn secondary';a.href=path;a.download='';a.textContent=label;return a;}
function renderDocument(doc){const card=document.createElement('article');card.className='doc-card';card.dataset.kind=doc.kind;card.dataset.search=[doc.title,doc.owner,doc.kind].join(' ').toLowerCase();card.innerHTML=`<div class="doc-icon" aria-hidden="true">PDF</div><div class="doc-main"><span class="eyebrow">${escapeHtml(doc.kind)}</span><h3>${escapeHtml(doc.title)}</h3><p class="info-line">${escapeHtml(doc.owner)}</p><div class="doc-actions"></div></div>`;
 const actions=card.querySelector('.doc-actions');const view=resourceButton(doc.path,'View PDF');view.addEventListener('click',()=>{document.querySelector('#viewer-title').textContent=doc.title;});actions.appendChild(view,resourceButton(doc.path,'Download','download'));return card;}
function finalReportDocument(report) {
  const group = report.title === 'Group Report';

  return {
    title: group
      ? 'Group Final Report Draft'
      : `${report.title} — Final Report Draft`,

    owner: group
      ? 'Research Group R-26-IT-021'
      : `${report.title} · ${report.studentId}`,

    kind: 'Final Report Draft',
    path: report.path
  };
}
// Both Home and Documents list reports only if their actual PDF files are accessible.
// Use the same PDF viewer/download behavior as the existing research documents.
async function loadFinalReports(){
  if(!document.querySelector('#document-grid')&&!document.querySelector('#home-report-grid'))return;
  const availability=await Promise.all(SITE.finalReports.map(report=>pdfExists(report.path)));
  return SITE.finalReports.filter((_,i)=>availability[i]).map(finalReportDocument);
}
const documentGrid=document.querySelector('#document-grid');
if(documentGrid){
  SITE.documents.forEach(doc=>documentGrid.appendChild(renderDocument(doc)));
  const input=document.querySelector('#document-search');
  const filters=[...document.querySelectorAll('[data-filter]')];
  let filter='All';
  function refresh(){
    const q=input.value.trim().toLowerCase();let count=0;
    [...documentGrid.children].forEach(card=>{
      const match=(filter==='All'||filter===card.dataset.kind)&&card.dataset.search.includes(q);
      card.hidden=!match;
      if(match)count++;
    });
  }
  input.addEventListener('input',refresh);
  filters.forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    filters.forEach(item=>item.classList.toggle('active',item===button));
    refresh();
  }));
  refresh();
  loadFinalReports().then(reports=>{
    reports.forEach(report=>documentGrid.appendChild(renderDocument(report)));
    refresh();
  });
}
const homeReportGrid=document.querySelector('#home-report-grid');
if(homeReportGrid){
  loadFinalReports().then(reports=>{
    if(!reports.length)return;
    reports.forEach(report=>homeReportGrid.appendChild(renderDocument(report)));
    document.querySelector('#final-reports').hidden=false;
  });
}
const presentationGrid=document.querySelector('#presentation-grid');
if(presentationGrid) SITE.presentations.forEach(async presentation=>{const {slug,title}=presentation;const card=document.createElement('article');card.className='doc-card';card.id=slug;card.innerHTML=`<div class="doc-icon slides" aria-hidden="true">PPT</div><div class="doc-main"><h3>${escapeHtml(title)}</h3><div class="doc-actions"></div></div>`;presentationGrid.appendChild(card);
 const pdf=`files/presentations/${slug}.pdf`,pptx=`files/presentations/${slug}.pptx`,[pdfExists,pptExists]=await Promise.all([exists(pdf),exists(pptx)]);const actions=card.querySelector('.doc-actions');
 if(pdfExists){const b=resourceButton(pdf,'View Slides');b.addEventListener('click',()=>document.querySelector('#viewer-title').textContent=title);actions.appendChild(b);}if(pptExists)actions.appendChild(resourceButton(pptx,'Download PPTX','download'));if(!pdfExists&&!pptExists)actions.innerHTML='<span class="file-unavailable">Not available</span>';});

// Original photo slots show initials until a permitted portrait is present.
document.querySelectorAll('[data-photo]').forEach(async box=>{const path=(box.dataset.fallback||'images/team/')+box.dataset.photo;if(!(await exists(path)))return;box.innerHTML='';const img=document.createElement('img');img.src=path;img.alt=box.dataset.alt||'Profile photograph';img.loading='lazy';box.appendChild(img);});
const contactMembers=document.querySelector('#contact-members');
if(contactMembers){
  SITE.members.forEach((member,index)=>{
    const item=document.createElement('div');
    item.className='contact-member';
    const email=member.email?`<a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>`:'';
    item.innerHTML=`<span class="member-counter">${String(index+1).padStart(2,'0')}</span><div><strong>${escapeHtml(member.name)}</strong><small>${escapeHtml(member.studentId)} · ${escapeHtml(member.role)}</small>${email}</div>`;
    contactMembers.appendChild(item);
  });
}
const form=document.querySelector('#contact-form');
if(form){
  const feedback=document.querySelector('#form-message');
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const data=new FormData(form);
    const emails=SITE.members.map(member=>member.email.trim()).filter(email=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    if(!emails.length){
      feedback.className='form-message error';
      feedback.textContent='Please configure a research team email address to enable sending.';
      return;
    }
    const subject=`R-26-IT-021: ${String(data.get('subject')).trim()}`;
    const body=`Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`;
    feedback.className='form-message success';
    feedback.textContent='Complete sending in your email app.';
    window.location.href=`mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
