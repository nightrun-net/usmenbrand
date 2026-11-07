/* US MEN BRAND — navbar, full-screen overlay, cards, video and reveals */
(()=>{
  'use strict';
  const doc=document, body=doc.body;
  body.classList.add('has-js');
  const menu=doc.getElementById('nav-menu'),toggle=doc.getElementById('menu-toggle');
  let previousFocus=null;
  function closeMenu(){if(!menu||!toggle)return;menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');body.classList.remove('menu-open');if(previousFocus?.isConnected)previousFocus.focus();}
  function openMenu(){if(!menu||!toggle)return;previousFocus=doc.activeElement;menu.classList.add('is-open');menu.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close menu');body.classList.add('menu-open');const first=menu.querySelector('.overlay-links a');first?.focus();}
  if(toggle&&menu){toggle.addEventListener('click',()=>toggle.getAttribute('aria-expanded')==='true'?closeMenu():openMenu());menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));doc.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&menu.classList.contains('is-open')){e.preventDefault();closeMenu();}
    if(e.key==='Tab'&&menu.classList.contains('is-open')){const focusables=[...menu.querySelectorAll('a')].filter(a=>a.getClientRects().length);focusables.push(toggle);const i=focusables.indexOf(doc.activeElement);if(e.shiftKey&&i===0){e.preventDefault();toggle.focus();}else if(!e.shiftKey&&i===focusables.length-1){e.preventDefault();focusables[0].focus();}}
  });}
  const header=doc.getElementById('site-header'),progress=doc.querySelector('.scroll-progress');
  function onScroll(){if(header)header.classList.toggle('is-scrolled',window.scrollY>24);const max=doc.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform='scaleX('+(max>0?Math.max(0,Math.min(1,scrollY/max)):0)+')';}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const year=doc.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  const grid=doc.getElementById('product-grid');
  if(grid&&typeof productsData!=='undefined'&&typeof makeProductCard==='function'){
    Object.keys(productsData).forEach(id=>{
      const p=getProduct(id);if(!p)return;
      // Group all colour cards by their family: 400 together, 250 together, 300 together.
      const heading=document.createElement('div');heading.className='collection-group-heading reveal';
      const name=document.createElement('h3');name.textContent=p.name;
      const info=document.createElement('span');info.textContent=String(p.variants.length).padStart(2,'0')+' COLOURS · '+p.price;
      heading.append(name,info);grid.appendChild(heading);
      p.variants.forEach(variant=>grid.appendChild(makeVariantCard(p,variant)));
    });
  }
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){doc.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));}
  else if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}},{threshold:.08,rootMargin:'0px 0px -25px 0px'});doc.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
  else doc.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
  const video=doc.getElementById('hero-video');
  if(video){
    // Background plays automatically, loops silently, and has no visible controls.
    video.muted=true;video.defaultMuted=true;video.loop=true;
    const tryPlay=()=>{if(!doc.hidden){const attempt=video.play();if(attempt?.catch)attempt.catch(()=>{});}};
    tryPlay();
    doc.addEventListener('visibilitychange',()=>{if(doc.hidden)video.pause();else tryPlay();});
    // The poster remains visible if the video codec cannot be played.
    video.addEventListener('error',()=>{video.style.display='none';});
  }
  if(!reduceMotion&&window.gsap&&window.ScrollTrigger){try{gsap.registerPlugin(ScrollTrigger);gsap.to('.cinematic-divider>img',{yPercent:7,ease:'none',scrollTrigger:{trigger:'.cinematic-divider',start:'top bottom',end:'bottom top',scrub:true}});}catch(err){/* CSS fallback */}}
})();
