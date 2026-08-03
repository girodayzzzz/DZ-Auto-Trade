#!/usr/bin/env python3
"""Dependency-free technical SEO checks for the static site."""
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree
ROOT=Path(__file__).resolve().parents[1]; SITE='https://dzautotrade.si'
errors=[]
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.tags=[]; self.json_scripts=[]; self._json=False; self._buf=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs); self.tags.append((tag,a))
  if tag=='script' and a.get('type')=='application/ld+json': self._json=True; self._buf=[]
 def handle_data(self,data):
  if self._json:self._buf.append(data)
 def handle_endtag(self,tag):
  if tag=='script' and self._json: self.json_scripts.append(''.join(self._buf)); self._json=False

def err(msg): errors.append(msg)
public=[]
for f in sorted(ROOT.rglob('*.html')):
 p=Parser(); text=f.read_text(encoding='utf-8'); p.feed(text)
 robots=[a.get('content','').lower() for t,a in p.tags if t=='meta' and a.get('name','').lower()=='robots']
 indexable=not any('noindex' in x for x in robots)
 if indexable and f.name not in {'admin-panel.html','product.html','404.html','placilo-uspesno.html','placilo-preklicano.html'}: public.append(f)
 if indexable:
  for label, items in [('title',re.findall(r'<title>(.*?)</title>',text,re.I|re.S)),('description',[a.get('content') for t,a in p.tags if t=='meta' and a.get('name')=='description']),('canonical',[a.get('href') for t,a in p.tags if t=='link' and a.get('rel')=='canonical'])]:
   if len(items)!=1 or not items[0]: err(f'{f.name}: expected one {label}')
  can=next((a.get('href','') for t,a in p.tags if t=='link' and a.get('rel')=='canonical'),'')
  if can and not can.startswith(SITE+'/'): err(f'{f.name}: invalid canonical {can}')
  if len([1 for t,a in p.tags if t=='h1'])!=1: err(f'{f.name}: expected one H1')
  required_og={'og:type','og:title','og:description','og:url','og:image','og:site_name'}
  present={a.get('property') for t,a in p.tags if t=='meta'}
  if f.name!='404.html' and required_og-present: err(f'{f.name}: missing OG {required_og-present}')
  required_tw={'twitter:card','twitter:title','twitter:description','twitter:image'}
  tw={a.get('name') for t,a in p.tags if t=='meta'}
  if f.name!='404.html' and required_tw-tw: err(f'{f.name}: missing Twitter {required_tw-tw}')
  if f.parent == ROOT/'izdelki' and f.name.startswith('izdelek-'):
   props={a.get('property'):a.get('content','') for t,a in p.tags if t=='meta' and a.get('property')}
   names={a.get('name'):a.get('content','') for t,a in p.tags if t=='meta' and a.get('name')}
   required_product={'og:locale','og:image:secure_url','og:image:type','og:image:alt','product:price:amount','product:price:currency','product:availability'}
   if required_product-props.keys(): err(f'{f.name}: missing product/social metadata {required_product-props.keys()}')
   if names.get('twitter:card')!='summary_large_image': err(f'{f.name}: product preview must use summary_large_image')
   if not names.get('twitter:image:alt'): err(f'{f.name}: missing twitter:image:alt')
   if 'max-image-preview:large' not in ' '.join(robots): err(f'{f.name}: missing max-image-preview:large')
   image=props.get('og:image','')
   if image.startswith(SITE):
    image_path=ROOT/urlsplit(image).path.lstrip('/')
    if not image_path.exists(): err(f'{f.name}: missing OG image file {image}')
    if not props.get('og:image:width') or not props.get('og:image:height'): err(f'{f.name}: local OG image is missing dimensions')
 for raw in p.json_scripts:
  try: json.loads(raw)
  except json.JSONDecodeError as e: err(f'{f.name}: invalid JSON-LD: {e}')
 base_href=next((a.get('href') for t,a in p.tags if t=='base' and a.get('href')), '')
 base_dir=(f.parent/base_href).resolve() if base_href else f.parent
 for tag,a in p.tags:
  attr='href' if tag in {'a','link'} else 'src' if tag in {'img','script'} else None
  if not attr or not a.get(attr) or tag=='link' and a.get('rel') in {'canonical','preconnect'}: continue
  u=urlsplit(a[attr]); path=unquote(u.path)
  if u.scheme or a[attr].startswith(('#','mailto:','tel:','data:')): continue
  target=(ROOT/path.lstrip('/')) if path.startswith('/') else base_dir/path
  if path in {'','/'}: target=ROOT/'index.html'
  if not target.exists(): err(f'{f.name}: broken internal {attr}={a[attr]}')
xml=ElementTree.parse(ROOT/'sitemap.xml'); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
locs=[x.text for x in xml.findall('s:url/s:loc',ns)]
if len(locs)!=len(set(locs)): err('sitemap: duplicate URLs')
expected={SITE+'/' if f==ROOT/'index.html' else f'{SITE}/{f.relative_to(ROOT).as_posix()}' for f in public}
# Checkout result pages are deliberately excluded; all ordinary public pages must be present.
expected-={f'{SITE}/placilo-uspesno.html',f'{SITE}/placilo-preklicano.html'}
if expected-set(locs): err(f'sitemap missing: {sorted(expected-set(locs))}')
for loc in locs:
 if not loc.startswith(SITE+'/'): err(f'sitemap non-primary URL: {loc}')
 path=urlsplit(loc).path
 target=ROOT/('index.html' if path=='/' else path.lstrip('/'))
 if not target.exists(): err(f'sitemap missing file: {loc}')
robots=(ROOT/'robots.txt').read_text()
if 'Disallow: /' in robots or f'Sitemap: {SITE}/sitemap.xml' not in robots: err('robots.txt blocks site or misses sitemap')
titles={}; descs={}
for f in public:
 s=f.read_text(); title=re.search(r'<title>(.*?)</title>',s,re.S).group(1); desc=re.search(r'<meta name="description" content="(.*?)"',s,re.S).group(1)
 for kind,val,seen in [('title',title,titles),('description',desc,descs)]:
  if val in seen: err(f'duplicate {kind}: {seen[val]} and {f.name}')
  seen[val]=f.name
if errors:
 print('\n'.join('ERROR: '+x for x in errors)); sys.exit(1)
print(f'SEO audit passed: {len(public)} indexable HTML pages, {len(locs)} sitemap URLs.')
