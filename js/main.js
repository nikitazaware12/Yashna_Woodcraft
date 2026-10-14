(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Business contact details (change here once) */
  var WHATSAPP = '919764699483';
  var EMAIL = 'nikitazaware77@gmail.com';

  function waLink(text) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text); }
  function mailLink(subject, body) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  /* ---------- Broken image fallback ---------- */
  var FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#e8dcc6"/>' +
    '<rect x="250" y="250" width="300" height="40" rx="6" fill="#5a4636"/><rect x="270" y="290" width="22" height="130" fill="#34261d"/>' +
    '<rect x="508" y="290" width="22" height="130" fill="#34261d"/></svg>'
  );
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.failed) { t.dataset.failed = '1'; t.src = FALLBACK; }
  }, true);

  /* ---------- Footer year ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: shadow on scroll ---------- */
  var header = $('#site-header');
  function onScroll() { if (header) header.classList.toggle('shadow-lg', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menu-btn');
  var panel = $('#mobile-panel');
  function setMenu(open) {
    if (!panel || !menuBtn) return;
    panel.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    $('#icon-open').classList.toggle('hidden', open);
    $('#icon-close').classList.toggle('hidden', !open);
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!panel.classList.contains('is-open')); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) setMenu(false); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Modal helpers ---------- */
  var lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    document.body.classList.add('no-scroll');
    var c = $('[data-close]', m);
    if (c) c.focus();
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('[data-close]')) closeModal(m);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { $$('.modal.is-open').forEach(closeModal); setMenu(false); }
  });

  /* ---------- Products: filter (+ ?cat= from links) ---------- */
  var filterBtns = $$('.filter-btn');
  var cards = $$('.product-card');
  function applyFilter(f) {
    filterBtns.forEach(function (b) {
      var on = b.dataset.filter === f;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    cards.forEach(function (c) {
      var show = f === 'all' || c.dataset.cat === f;
      if (show) {
        c.classList.remove('is-hidden');
        c.classList.add('is-entering');
        requestAnimationFrame(function () { requestAnimationFrame(function () { c.classList.remove('is-entering'); }); });
      } else {
        c.classList.add('is-hidden');
      }
    });
    var count = $('#product-count');
    if (count) count.textContent = $$('.product-card:not(.is-hidden)').length + ' pieces';
  }
  if (filterBtns.length) {
    filterBtns.forEach(function (b) { b.addEventListener('click', function () { applyFilter(b.dataset.filter); }); });
    var wanted = new URLSearchParams(window.location.search).get('cat');
    var valid = filterBtns.some(function (b) { return b.dataset.filter === wanted; });
    applyFilter(valid ? wanted : 'all');
  }

  /* ---------- Products: quick view ---------- */
  var qv = $('#quickview');
  if (qv) {
    $$('.product-card').forEach(function (card) {
      var open = function () {
        var d = card.dataset;
        var img = $('#qv-img');
        img.dataset.failed = '';
        img.src = d.image;
        img.alt = d.name;
        $('#qv-cat').textContent = d.cat;
        $('#qv-name').textContent = d.name;
        $('#qv-text').textContent = d.text;
        $('#qv-finish').textContent = d.finish;
        $('#qv-wa').href = waLink('Hello Yashna Woodcraft, I am interested in "' + d.name + '". Please share details and a quote.');
        $('#qv-mail').href = mailLink('Enquiry: ' + d.name, 'Hello Yashna Woodcraft,\n\nI am interested in "' + d.name + '". Please share details and a quote.\n\nName:\nPhone:');
        openModal(qv);
      };
      $$('.arch-img, .quick-title', card).forEach(function (t) { t.addEventListener('click', open); });
    });
  }

  /* ---------- Home hero panels ---------- */
  var panels = $$('.hero-panel');
  if (panels.length) {
    var activate = function (p) { panels.forEach(function (x) { x.classList.toggle('is-active', x === p); }); };
    panels.forEach(function (p) {
      p.addEventListener('mouseenter', function () { activate(p); });
      p.addEventListener('focus', function () { activate(p); });
      p.addEventListener('click', function (e) { if (!p.classList.contains('is-active')) { e.preventDefault(); activate(p); } });
    });
    var pi = 0;
    var timer = setInterval(function () { pi = (pi + 1) % panels.length; activate(panels[pi]); }, 4500);
    var hp = $('#hero-panels');
    if (hp) { hp.addEventListener('mouseenter', function () { clearInterval(timer); }); hp.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true }); }
  }

  /* ---------- Home collections scroller ---------- */
  var strip = $('#coll-strip');
  if (strip) {
    var pv = $('#coll-prev'), nx = $('#coll-next');
    var paused = false, resumeT = null, pos = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pause = function () { paused = true; clearTimeout(resumeT); };
    var resume = function (delay) {
      clearTimeout(resumeT);
      resumeT = setTimeout(function () { pos = strip.scrollLeft; paused = false; }, delay || 0);
    };
    /* duplicate items once so the loop is seamless */
    $$('.hs-item', strip).forEach(function (it) {
      var cl = it.cloneNode(true);
      cl.setAttribute('aria-hidden', 'true'); cl.setAttribute('tabindex', '-1');
      strip.appendChild(cl);
    });
    var by = function (dir) { pause(); strip.scrollBy({ left: dir * 280, behavior: 'smooth' }); resume(1500); };
    if (pv) pv.addEventListener('click', function () { by(-1); });
    if (nx) nx.addEventListener('click', function () { by(1); });
    [strip, pv, nx].forEach(function (el) {
      if (!el) return;
      el.addEventListener('mouseenter', pause);
      el.addEventListener('mouseleave', function () { resume(0); });
      el.addEventListener('focusin', pause);
      el.addEventListener('focusout', function () { resume(0); });
    });
    strip.addEventListener('touchstart', pause, { passive: true });
    strip.addEventListener('touchend', function () { resume(2500); }, { passive: true });
    if (!reduce) {
      var tick = function () {
        if (!paused) {
          var half = strip.scrollWidth / 2;
          pos += 0.6;
          if (pos >= half) pos -= half;
          strip.scrollLeft = pos;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  /* ---------- Gallery lightbox ---------- */
  var lb = $('#lightbox');
  var gItems = $$('.gallery-item');
  var gi = 0;
  function showImg(i) {
    gi = (i + gItems.length) % gItems.length;
    var el = gItems[gi];
    var img = $('#lb-img');
    img.dataset.failed = '';
    img.src = el.dataset.full;
    img.alt = el.dataset.alt;
    $('#lb-cap').textContent = el.dataset.alt;
  }
  if (lb && gItems.length) {
    gItems.forEach(function (el, i) { el.addEventListener('click', function () { showImg(i); openModal(lb); }); });
    $('#lb-prev').addEventListener('click', function () { showImg(gi - 1); });
    $('#lb-next').addEventListener('click', function () { showImg(gi + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') showImg(gi + 1);
      if (e.key === 'ArrowLeft') showImg(gi - 1);
    });
  }

  /* ---------- Inquiry forms (contact + custom order): WhatsApp or Email ---------- */
  var form = $('#inquiry-form');
  if (form) {
    var statusEl = $('#form-status');
    var f = form.elements;
    var intro = form.dataset.intro || 'Hello Yashna Woodcraft, I would like to make an enquiry.';
    var subject = form.dataset.subject || 'Website enquiry';

    var setError = function (input, msg) {
      var p = input.parentElement.querySelector('.field-error');
      input.classList.toggle('has-error', !!msg);
      if (p) { p.textContent = msg || ''; p.classList.toggle('hidden', !msg); }
    };
    var rules = {
      name: function (v) { return v.trim() ? '' : 'Please enter your name.'; },
      phone: function (v) { return /^[+\d][\d\s()-]{6,}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.'; },
      email: function (v) { return !v.trim() || /^\S+@\S+\.\S+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Please tell us a little about what you need (10+ characters).'; }
    };
    var validate = function () {
      var ok = true;
      Object.keys(rules).forEach(function (k) {
        if (!f[k]) return;
        var msg = rules[k](f[k].value);
        setError(f[k], msg);
        if (msg) ok = false;
      });
      return ok;
    };
    var labelOf = function (el) {
      if (el.dataset.label) return el.dataset.label;
      var l = form.querySelector('label[for="' + el.id + '"]');
      return l ? l.firstChild.textContent.trim() : el.name;
    };
    var buildText = function () {
      var rows = [intro, ''];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.type === 'button' || el.type === 'submit') return;
        var v = (el.value || '').trim();
        if (v) rows.push(labelOf(el) + ': ' + v);
      });
      return rows.join('\n');
    };
    var notify = function (text) { statusEl.textContent = text; statusEl.classList.remove('hidden'); };

    $$('input, select, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { if (el.classList.contains('has-error')) setError(el, ''); });
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    $('#send-wa').addEventListener('click', function () {
      statusEl.classList.add('hidden');
      if (!validate()) { var bad = $('.has-error', form); if (bad) bad.focus(); return; }
      var url = waLink(buildText());
      var w = window.open(url, '_blank');
      if (!w) window.location.href = url;
      notify('WhatsApp has opened with your enquiry. Press Send there to complete it.');
    });

    $('#send-mail').addEventListener('click', function () {
      statusEl.classList.add('hidden');
      if (!validate()) { var bad = $('.has-error', form); if (bad) bad.focus(); return; }
      window.location.href = mailLink(subject + ' from ' + f.name.value.trim(), buildText());
      notify('Your email app has opened with the enquiry ready. Press Send there to complete it.');
    });
  }
})();
