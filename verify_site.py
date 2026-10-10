"""Verify required website pages, bundled PDFs and static HTML asset links."""
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parent
PAGES=['index','domain','milestones','documents','presentations','about','contact']
PDFS=['files/proposals/plant-detection-proposal.pdf','files/proposals/herbal-knowledge-proposal.pdf','files/proposals/cultivation-proposal.pdf','files/proposals/quality-assessment-proposal.pdf','files/taf/topic-assessment-form.pdf','files/papers/quality-and-knowledge-paper.pdf']
class Links(HTMLParser):
 def __init__(self):super().__init__();self.files=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  for key in ('href','src'):
   if key in d and d[key] and not d[key].startswith(('http:','https:','#','mailto:','data:')):
    self.files.append(d[key].split('#')[0].split('?')[0])
errors=[]
for name in PAGES:
 f=ROOT/(name+'.html')
 if not f.is_file():errors.append(f'Missing page: {f.name}');continue
 text=f.read_text(encoding='utf-8')
 if '<main' not in text:errors.append(f'Missing main: {f.name}')
 parser=Links();parser.feed(text)
 for ref in parser.files:
  if not (ROOT/ref).exists():errors.append(f'Broken asset in {f.name}: {ref}')
for path in PDFS:
 f=ROOT/path
 if not f.exists() or f.read_bytes()[:4]!=b'%PDF':errors.append(f'Missing PDF: {path}')
print(f'Pages: {sum((ROOT/(p+".html")).exists() for p in PAGES)}/7')
print(f'Supplied PDFs: {sum((ROOT/p).exists() for p in PDFS)}/6')
print('Issues:',errors if errors else 'none')
if errors:raise SystemExit(1)
