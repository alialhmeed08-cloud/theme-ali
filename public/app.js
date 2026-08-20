(function(){
  'use strict';
  // Progress bar
  var progress = document.querySelector('.progress');
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function(){
    if(progress){
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docHeight > 0 ? (scrollTop/docHeight)*100 : 0) + '%';
    }
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});

  // Theme toggle
  var themeBtn = document.getElementById('phonenx-theme-toggle');
  var root = document.documentElement;
  var saved = localStorage.getItem('phonenx-theme');
  if(saved === 'light') root.classList.remove('dark');
  if(saved === 'dark') root.classList.add('dark');
  if(themeBtn){
    themeBtn.addEventListener('click', function(){
      root.classList.toggle('dark');
      localStorage.setItem('phonenx-theme', root.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Tabs
  document.querySelectorAll('.tab-trigger').forEach(function(btn){
    btn.addEventListener('click', function(){
      var id = btn.dataset.componentId;
      var wrap = id ? document.getElementById(id) : btn.closest('section');
      if(!wrap) return;
      wrap.querySelectorAll('.tab-trigger').forEach(function(b){ b.classList.toggle('is-active', b === btn); });
      wrap.querySelectorAll('.tabs-wrapper > div').forEach(function(tab){
        var on = tab.id === btn.dataset.target;
        tab.classList.toggle('is-active', on);
        tab.style.display = on ? '' : 'none';
      });
    });
  });

  // Countdown
  var cd = document.getElementById('phonenx-countdown');
  if(cd && cd.dataset.deadline){
    var h = document.getElementById('cd-hours');
    var m = document.getElementById('cd-minutes');
    var s = document.getElementById('cd-seconds');
    var deadline = new Date(cd.dataset.deadline).getTime();
    var pad = function(n){ return String(n).padStart(2,'0'); };
    function tick(){
      var diff = Math.max(0, deadline - Date.now());
      h.textContent = pad(Math.floor(diff/3600000));
      m.textContent = pad(Math.floor((diff%3600000)/60000));
      s.textContent = pad(Math.floor((diff%60000)/1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  // Cart open
  document.querySelectorAll('[data-open-cart]').forEach(function(el){
    el.addEventListener('click', function(){ if(window.salla && salla.event) salla.event.dispatch('cart::open'); });
  });
})();
