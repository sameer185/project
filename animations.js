(function(){
  'use strict';
  var $=function(s){return document.querySelector(s);};
  var $$=function(s){return Array.from(document.querySelectorAll(s));};

  /* SCROLL REVEAL */
  function initScrollReveal(){
    var auto=['.book-card','.feature-card','.hotel-card','.flight-card','.stat-item','.booking-card','.summary-card','.contact-item','.sensory-banner','.ar-banner','.price-lock-banner','.cab-banner'];
    auto.forEach(function(sel){
      $$(sel).forEach(function(el,i){
        if(!el.classList.contains('reveal')&&!el.classList.contains('reveal-left')&&!el.classList.contains('reveal-scale')){
          el.classList.add('reveal');
          el.style.transitionDelay=Math.min(i*0.06,0.4)+'s';
        }
      });
    });
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('active');io.unobserve(e.target);}
      });
    },{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
    $$('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function(el){io.observe(el);});
  }

  /* 3D TILT */
  function initCardTilt(){
    if(window.matchMedia('(hover:none)').matches)return;
    $$('.book-card,.feature-card,.stat-card,.summary-card').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect();
        var x=((e.clientX-r.left)/r.width-0.5)*10;
        var y=((e.clientY-r.top)/r.height-0.5)*8;
        card.style.transform='perspective(700px) rotateY('+x+'deg) rotateX('+(-y)+'deg) translateY(-5px) scale(1.015)';
        card.style.boxShadow=(-x*1.2)+'px '+(-y*1.2)+'px 30px rgba(29,78,216,0.12),0 16px 48px rgba(0,0,0,0.08)';
      },{passive:true});
      card.addEventListener('mouseleave',function(){card.style.transform='';card.style.boxShadow='';});
    });
  }

  /* RIPPLE */
  function initRipple(){
    document.addEventListener('click',function(e){
      var btn=e.target.closest('button,.btn-primary,.search-btn,.pay-now-btn,.nav-cta');
      if(!btn)return;
      var r=btn.getBoundingClientRect();
      var size=Math.max(r.width,r.height)*2;
      var rip=document.createElement('span');
      rip.className='tg-ripple';
      rip.style.cssText='width:'+size+'px;height:'+size+'px;left:'+(e.clientX-r.left-size/2)+'px;top:'+(e.clientY-r.top-size/2)+'px;';
      btn.appendChild(rip);
      setTimeout(function(){rip.remove();},600);
    });
  }

  /* SPARKLES */
  var COLORS=['#1d4ed8','#0891b2','#f59e0b','#10b981','#f43f5e','#8b5cf6','#fbbf24'];
  var spStyle=document.createElement('style');
  spStyle.textContent='@keyframes tgSpAnim{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0;}}';
  document.head.appendChild(spStyle);
  function spawnSparkles(x,y){
    for(var i=0;i<6;i++){
      var sp=document.createElement('div');
      sp.className='tg-sp';
      var angle=(Math.PI*2/6)*i;
      var dist=28+Math.random()*40;
      var size=5+Math.random()*7;
      sp.style.cssText='left:'+x+'px;top:'+y+'px;width:'+size+'px;height:'+size+'px;background:'+COLORS[i%COLORS.length]+';border-radius:'+(Math.random()>0.4?'50%':'2px')+';animation-delay:'+(i*0.025)+'s;';
      sp.style.setProperty('--tx',(Math.cos(angle)*dist)+'px');
      sp.style.setProperty('--ty',(Math.sin(angle)*dist)+'px');
      document.body.appendChild(sp);
      setTimeout(function(){sp.remove();},800);
    }
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('button,.book-card,.nav-cta,.filter-btn'))spawnSparkles(e.clientX,e.clientY);
  });

  /* TOAST */
  var tStyle=document.createElement('style');
  tStyle.textContent='.tg-toast{position:fixed;bottom:28px;right:22px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 18px;box-shadow:0 16px 48px rgba(0,0,0,0.13);z-index:99996;display:flex;align-items:center;gap:10px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;color:#0d1117;max-width:300px;animation:tgToastIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;overflow:hidden;}.tg-toast.hide{animation:tgToastOut 0.3s ease forwards;}@keyframes tgToastIn{from{opacity:0;transform:translateX(100px) scale(0.9);}to{opacity:1;transform:none;}}@keyframes tgToastOut{from{opacity:1;}to{opacity:0;transform:translateX(80px);}}.tg-tbar{position:absolute;bottom:0;left:0;height:3px;background:linear-gradient(90deg,#1d4ed8,#0891b2);animation:tgTbarShrink var(--dur,3s) linear forwards;}@keyframes tgTbarShrink{from{width:100%;}to{width:0%;}}';
  document.head.appendChild(tStyle);
  window.tgToast=function(msg,icon,duration){
    icon=icon||'✨';duration=duration||3000;
    var t=document.createElement('div');
    t.className='tg-toast';
    t.innerHTML='<span style="font-size:20px">'+icon+'</span><span>'+msg+'</span><div class="tg-tbar" style="--dur:'+duration+'ms"></div>';
    document.body.appendChild(t);
    setTimeout(function(){t.classList.add('hide');setTimeout(function(){t.remove();},350);},duration);
  };

  /* ANIME CHARS */
  function initAnimeChars(){
    var layer=document.createElement('div');
    layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
    var chars=['✈️','🚄','🏨','🎬','🌟','🗺️','🚀','⭐'];
    var positions=['top:8%;left:2%;','top:22%;right:3%;','top:55%;left:1%;','top:72%;right:2%;','top:40%;left:93%;'];
    for(var i=0;i<5;i++){
      var el=document.createElement('div');
      el.textContent=chars[Math.floor(Math.random()*chars.length)];
      el.style.cssText='position:absolute;font-size:'+(32+i*4)+'px;opacity:0.07;user-select:none;pointer-events:none;'+positions[i]+'animation:tgCharFloat '+(16+i*3)+'s '+(-i*4)+'s ease-in-out infinite;';
      layer.appendChild(el);
    }
    document.body.appendChild(layer);
  }

  /* PAGE TRANSITIONS */
  function initPageTransitions(){
    var s=document.createElement('style');
    s.textContent='body.tg-exiting{animation:tgFadeOut 0.32s ease forwards!important;}@keyframes tgFadeOut{to{opacity:0;transform:translateY(-8px);}}';
    document.head.appendChild(s);
    document.addEventListener('click',function(e){
      var link=e.target.closest('a[href]');
      if(!link)return;
      var href=link.getAttribute('href')||'';
      if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('http')||link.target==='_blank')return;
      if(!href.endsWith('.html'))return;
      e.preventDefault();
      document.body.classList.add('tg-exiting');
      setTimeout(function(){window.location.href=href;},300);
    });
  }

  /* SCROLL TO TOP */
  function initScrollTop(){
    var s=document.createElement('style');
    s.textContent='#tg-top{position:fixed;bottom:28px;left:22px;width:42px;height:42px;background:#1d4ed8;color:#fff;border:none;border-radius:50%;font-size:18px;cursor:pointer;z-index:1000;opacity:0;transform:translateY(16px);transition:opacity .3s,transform .3s cubic-bezier(0.34,1.56,0.64,1),box-shadow .3s;box-shadow:0 6px 20px rgba(29,78,216,0.35);display:flex;align-items:center;justify-content:center;}#tg-top.show{opacity:1;transform:translateY(0);}#tg-top:hover{transform:translateY(-4px) scale(1.1)!important;box-shadow:0 12px 28px rgba(29,78,216,0.5);}';
    document.head.appendChild(s);
    var btn=document.createElement('button');
    btn.id='tg-top';btn.innerHTML='↑';btn.title='Back to top';
    btn.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
    document.body.appendChild(btn);
    window.addEventListener('scroll',function(){btn.classList.toggle('show',window.scrollY>350);},{passive:true});
  }

  /* PROGRESS BAR */
  function initProgressBar(){
    var s=document.createElement('style');
    s.textContent='#tg-bar{position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#1d4ed8,#0891b2,#7c3aed);z-index:999999;border-radius:0 3px 3px 0;pointer-events:none;transition:width .25s ease,opacity .3s;display:none;}';
    document.head.appendChild(s);
    var bar=document.createElement('div');bar.id='tg-bar';document.body.appendChild(bar);
    var prog=0,timer=null;
    function start(){bar.style.display='block';bar.style.opacity='1';bar.style.width='0%';prog=0;clearInterval(timer);timer=setInterval(function(){prog+=(100-prog)*0.08;if(prog>90)prog=90;bar.style.width=prog+'%';},150);}
    function finish(){clearInterval(timer);bar.style.width='100%';setTimeout(function(){bar.style.opacity='0';setTimeout(function(){bar.style.display='none';bar.style.width='0%';bar.style.opacity='1';},300);},250);}
    document.addEventListener('click',function(e){if(e.target.closest('a[href]'))start();});
    window.addEventListener('load',finish);
  }

  /* EMOJI WOBBLE */
  function initEmojiWobble(){
    $$('.book-card,.feature-card').forEach(function(card){
      var icon=card.querySelector('.card-icon,.feature-icon');
      if(!icon)return;
      card.addEventListener('mouseenter',function(){
        icon.style.animation='none';icon.offsetHeight;
        icon.style.animation='tgEmojiWobble 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      });
    });
  }

  /* COUNTERS */
  function initCounters(){
    var els=$$('.stat-num[data-target]');if(!els.length)return;
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting)return;
        var el=e.target,target=+el.dataset.target,n=0,step=target/70;
        var fmt=function(v){return v>=1000?Math.round(v/1000)+'k+':Math.round(v).toLocaleString();};
        var t=setInterval(function(){n=Math.min(n+step,target);el.textContent=fmt(n);if(n>=target)clearInterval(t);},18);
        io.unobserve(el);
      });
    },{threshold:0.3});
    els.forEach(function(el){io.observe(el);});
  }

  /* MAGNETIC */
  function initMagnetic(){
    if(window.matchMedia('(hover:none)').matches)return;
    $$('.btn-primary,.nav-cta,.search-btn').forEach(function(btn){
      btn.addEventListener('mousemove',function(e){
        var r=btn.getBoundingClientRect();
        btn.style.transform='translate('+((e.clientX-r.left)/r.width-0.5)*12+'px,'+((e.clientY-r.top)/r.height-0.5)*8+'px) translateY(-2px)';
      },{passive:true});
      btn.addEventListener('mouseleave',function(){btn.style.transform='';});
    });
  }

  /* GLITCH LOGO */
  function initGlitch(){
    var logo=$('.logo');if(!logo)return;
    var orig=logo.textContent,busy=false,chars='TRAVELGO!@#✈🚆🏨★';
    logo.addEventListener('mouseenter',function(){
      if(busy)return;busy=true;var i=0;
      var t=setInterval(function(){
        if(i++<7){logo.textContent=orig.split('').map(function(c){return Math.random()>0.65?chars[Math.floor(Math.random()*chars.length)]:c;}).join('');}
        else{logo.textContent=orig;clearInterval(t);busy=false;}
      },55);
    });
  }

  /* SMOOTH SCROLL */
  function initSmoothScroll(){
    document.addEventListener('click',function(e){
      var a=e.target.closest('a[href^="#"]');if(!a)return;
      var target=$(a.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  }

  /* CONFETTI */
  var cStyle=document.createElement('style');
  cStyle.textContent='.tg-cp{position:absolute;width:9px;height:9px;border-radius:2px;pointer-events:none;animation:tgCP var(--d,.8s) var(--delay,0s) ease-out forwards;opacity:0;}@keyframes tgCP{0%{transform:translate(0,0) rotate(0deg);opacity:1;}100%{transform:translate(var(--tx),var(--ty)) rotate(var(--r,360deg));opacity:0;}}';
  document.head.appendChild(cStyle);
  window.tgConfetti=function(){
    var anchor=$('.success-tick')||$('.success-card');if(!anchor)return;
    anchor.style.position='relative';
    var cols=['#1d4ed8','#0891b2','#f59e0b','#10b981','#f43f5e','#8b5cf6','#fbbf24','#ec4899'];
    for(var i=0;i<12;i++){
      var p=document.createElement('div');p.className='tg-cp';
      var angle=(Math.PI*2/12)*i,dist=60+Math.random()*80;
      p.style.cssText='background:'+cols[i%cols.length]+';left:50%;top:50%;--tx:'+(Math.cos(angle)*dist)+'px;--ty:'+(Math.sin(angle)*dist-40)+'px;--d:'+(0.7+Math.random()*0.4)+'s;--delay:'+(i*0.04)+'s;--r:'+(Math.random()>0.5?540:-360)+'deg;border-radius:'+(Math.random()>0.5?'50%':'2px')+';';
      anchor.appendChild(p);
      setTimeout(function(){p.remove();},1400);
    }
  };

  /* WELCOME TOAST */
  function initWelcomeToast(){
    var isHome=window.location.pathname==='/'||window.location.pathname.endsWith('index.html')||window.location.pathname.endsWith('/');
    if(!isHome||sessionStorage.getItem('tg_hi'))return;
    sessionStorage.setItem('tg_hi','1');
    setTimeout(function(){window.tgToast('Welcome to TravelGo 2026!','👋',4000);},1600);
  }

  /* SUCCESS CONFETTI */
  function initSuccessObserver(){
    var screen=document.getElementById('successScreen');if(!screen)return;
    var mo=new MutationObserver(function(){
      if(screen.classList.contains('show')){
        setTimeout(window.tgConfetti,500);
        setTimeout(function(){window.tgToast('Booking confirmed!','✅',4500);},800);
      }
    });
    mo.observe(screen,{attributes:true,attributeFilter:['class']});
  }

  /* INIT */
  function init(){
    initAnimeChars();
    initProgressBar();
    initPageTransitions();
    initScrollTop();
    initScrollReveal();
    initCardTilt();
    initRipple();
    initEmojiWobble();
    initCounters();
    initMagnetic();
    initGlitch();
    initSmoothScroll();
    initWelcomeToast();
    initSuccessObserver();
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
})();
