(function(){
  // ---- Theme ----
  var root = document.documentElement;
  var saved = localStorage.getItem('naynay-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var initial = saved || (prefersDark ? 'dark' : 'light');
  if(initial === 'dark') root.setAttribute('data-theme','dark');

  function updateToggleIcon(){
    var isDark = root.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  updateToggleIcon();

  document.addEventListener('click', function(e){
    var btn = e.target.closest('.theme-toggle');
    if(!btn) return;
    var isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){ root.removeAttribute('data-theme'); localStorage.setItem('naynay-theme','light'); }
    else { root.setAttribute('data-theme','dark'); localStorage.setItem('naynay-theme','dark'); }
    updateToggleIcon();
  });

  // ---- Mobile nav ----
  document.addEventListener('click', function(e){
    var burger = e.target.closest('.nav-burger');
    if(burger){
      document.querySelector('.nav-links').classList.toggle('mobile-open');
      return;
    }
    var link = e.target.closest('.nav-links a');
    if(link){ document.querySelector('.nav-links').classList.remove('mobile-open'); }
  });

  // ---- Pricing audience toggle (Owners / Barns / Pros) ----
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.toggle-opt');
    if(!btn) return;
    var group = btn.closest('.pricing-toggle');
    if(group){
      group.querySelectorAll('.toggle-opt').forEach(function(b){ b.classList.toggle('active', b === btn); });
    }

    var audience = btn.getAttribute('data-audience');
    if(audience){
      document.querySelectorAll('[data-audience-panel]').forEach(function(panel){
        panel.hidden = panel.getAttribute('data-audience-panel') !== audience;
      });
    }
  });

  // ---- FAQ accordion ----
  document.addEventListener('click', function(e){
    var q = e.target.closest('.faq-q');
    if(!q) return;
    var item = q.closest('.faq-item');
    item.classList.toggle('open');
  });
})();
