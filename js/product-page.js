/* Product detail: colour variants, real photo slider, thumb gallery, lightbox. */
(()=>{
 'use strict';
 const params=new URLSearchParams(location.search);
 const product=getProduct(params.get('id'))||getProduct('US-400');
 if(!product)return;
 const E=id=>document.getElementById(id);
 const getByLabel=label=>product.variants.find(v=>v.label.toLowerCase()===String(label).toLowerCase());
 let variant=getByLabel(params.get('color'))||getByLabel(product.default)||product.variants[0];
 let index=0,lastFocus=null;
 const stage=E('gallery-main'),thumbs=E('gallery-thumbs'),counter=E('gallery-counter'),chooser=E('variant-options');
 const lightbox=E('lightbox'),lightboxImg=E('lightbox-image'),closeButton=E('lightbox-close');
 document.title=product.name+' — US MEN BRAND';
 E('p-name').textContent=product.name;
 E('p-category').textContent='[ SUNGLASSES — THE COLLECTION ]';
 E('crumb-current').textContent=product.name;
 E('p-desc').textContent=product.about;
 E('p-price').textContent=product.price;E('p-price').hidden=false; // Owner-supplied price in USD.
 const specs=E('p-specs');
 specs.replaceChildren();product.specs.forEach(value=>{const li=document.createElement('li');li.textContent=value;specs.appendChild(li);});
 const makeLabel=()=>variant.code;
 function displaySlide(i){
   index=(i+variant.imgs.length)%variant.imgs.length;
   const src=variant.imgs[index];stage.src=src;stage.alt=variant.code+' photo '+(index+1);
   counter.textContent=String(index+1).padStart(2,'0')+' / '+String(variant.imgs.length).padStart(2,'0');
   [...thumbs.children].forEach((el,j)=>{el.classList.toggle('active',j===index);el.setAttribute('aria-pressed',String(j===index));});
   if(!lightbox.hidden){lightboxImg.src=src;lightboxImg.alt=stage.alt;}
 }
 function setVariant(v){
   variant=v;index=0;E('p-selected-code').textContent='Code: '+v.code;
   chooser.querySelectorAll('button').forEach(el=>{const selected=el.dataset.code===v.code;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});
   const inquire=E('inquire-btn');inquire.href='https://wa.me/447352935273?text='+encodeURIComponent('Hello US Men Brand, I would like to enquire about '+v.code+'.');
   const newParams=new URLSearchParams(location.search);newParams.set('id',product.id);newParams.set('color',v.label);
   history.replaceState(null,'',location.pathname+'?'+newParams.toString());
   thumbs.replaceChildren();v.imgs.forEach((src,j)=>{
     const btn=document.createElement('button');btn.type='button';btn.className='gallery-thumb';btn.setAttribute('aria-label','View '+v.code+' image '+(j+1));btn.setAttribute('aria-pressed','false');
     const img=document.createElement('img');img.src=src;img.alt='';img.loading='lazy';btn.appendChild(img);btn.addEventListener('click',()=>displaySlide(j));thumbs.appendChild(btn);
   });
   displaySlide(0);
 }
 product.variants.forEach(v=>{
   const btn=document.createElement('button');btn.type='button';btn.className='variant-pill';btn.dataset.code=v.code;
   btn.textContent=v.label;btn.setAttribute('aria-label','Select '+v.code);btn.setAttribute('aria-pressed','false');btn.addEventListener('click',()=>setVariant(v));chooser.appendChild(btn);
 });
 setVariant(variant);
 E('gallery-prev').addEventListener('click',()=>displaySlide(index-1));
 E('gallery-next').addEventListener('click',()=>displaySlide(index+1));
 function openZoom(){lastFocus=document.activeElement;lightboxImg.src=stage.src;lightboxImg.alt=stage.alt;lightbox.hidden=false;document.body.classList.add('lightbox-open');closeButton.focus();}
 function closeZoom(){lightbox.hidden=true;document.body.classList.remove('lightbox-open');if(lastFocus?.isConnected)lastFocus.focus();}
 E('gallery-zoom').addEventListener('click',openZoom);stage.addEventListener('click',openZoom);
 stage.addEventListener('keydown',e=>{if(e.key==='Enter'){openZoom();}});
 closeButton.addEventListener('click',closeZoom);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeZoom();});
 window.addEventListener('keydown',e=>{
   if(e.key==='Escape'&&!lightbox.hidden)closeZoom();
   if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
     if(lightbox.hidden&&document.activeElement?.tagName==='BUTTON')return;
     if(document.body.classList.contains('menu-open'))return;
     displaySlide(index+(e.key==='ArrowRight'?1:-1));
   }
 });
 let touchX=0;const stageWrap=E('gallery-stage');
 stageWrap.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});
 stageWrap.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45)displaySlide(index+(dx<0?1:-1));},{passive:true});
 const related=E('related-grid');Object.keys(productsData).filter(key=>key!==product.id).forEach(key=>{related.appendChild(makeProductCard(getProduct(key)));});
 related.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
})();
