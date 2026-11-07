/* US MEN BRAND — Collection cards (only the 3 supplied eyewear models) */
function getProduct(id){return productsData[id]||null;}
function makeProductCard(p){
  const a=document.createElement('a');a.className='product-card reveal';a.href='product.html?id='+encodeURIComponent(p.id);
  a.setAttribute('aria-label','Explore '+p.name+' eyewear and '+p.count+' colour variants');
  const visual=document.createElement('div');visual.className='product-card-visual product-card-eyewear product-card-original';
  const img=document.createElement('img');img.src=p.cover;img.alt=p.name+' — '+p.default+' sunglasses';img.loading='lazy';img.decoding='async';visual.appendChild(img);
  const serial=document.createElement('span');serial.className='card-serial';serial.textContent=p.name;visual.appendChild(serial);
  const miniLogo=document.createElement('img');miniLogo.className='product-mini-logo';miniLogo.src='assets/us-logo.png';miniLogo.alt='';miniLogo.loading='lazy';visual.appendChild(miniLogo);
  const arrow=document.createElement('span');arrow.className='product-card-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';visual.appendChild(arrow);
  const data=document.createElement('div');data.className='product-card-bottom';
  const left=document.createElement('div');const cat=document.createElement('p');cat.className='product-card-category';cat.textContent='SUNGLASSES · '+p.count+' COLOURS';
  const title=document.createElement('h3');title.className='product-card-title';title.textContent=p.name;
  const code=document.createElement('p');code.className='product-cover-code';code.textContent=p.variants.find(v=>v.label===p.default).code;
  const price=document.createElement('p');price.className='product-card-price';price.textContent=p.price;
  left.append(cat,title,code,price);const action=document.createElement('span');action.className='product-card-explore';action.textContent='VIEW DETAILS ↗';data.append(left,action);a.append(visual,data);return a;
}


/* A complete collection card for one named colour, linked to its family page.
   Existing makeProductCard stays for the product-page recommendations. */
function makeVariantCard(product, variant){
  const card=document.createElement('a');
  card.className='product-card reveal';
  card.href='product.html?id='+encodeURIComponent(product.id)+'&color='+encodeURIComponent(variant.label);
  card.setAttribute('aria-label','View '+variant.code+' and other '+product.name+' colours');
  const visual=document.createElement('div');
  visual.className='product-card-visual product-card-eyewear product-card-original';
  const image=document.createElement('img');
  image.src=variant.imgs[0];
  image.alt=variant.code+' sunglasses, original product photo';
  image.loading='lazy';image.decoding='async';
  visual.appendChild(image);
  const serial=document.createElement('span');
  serial.className='card-serial';serial.textContent=product.id;visual.appendChild(serial);
  const logo=document.createElement('img');
  logo.className='product-mini-logo';logo.src='assets/us-logo.png';logo.alt='';logo.loading='lazy';visual.appendChild(logo);
  const arrow=document.createElement('span');
  arrow.className='product-card-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';visual.appendChild(arrow);
  const details=document.createElement('div');details.className='product-card-bottom';
  const left=document.createElement('div');
  const cat=document.createElement('p');cat.className='product-card-category';cat.textContent='SUNGLASSES / '+product.id;
  const title=document.createElement('h3');title.className='product-card-title';title.textContent=variant.code;
  const colour=document.createElement('p');colour.className='product-cover-code';colour.textContent=variant.label;
  const price=document.createElement('p');price.className='product-card-price';price.textContent=product.price;
  left.append(cat,title,colour,price);
  const action=document.createElement('span');action.className='product-card-explore';action.textContent='VIEW DETAILS ↗';
  details.append(left,action);card.append(visual,details);return card;
}
