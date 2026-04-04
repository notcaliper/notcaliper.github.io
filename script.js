/* ================================================
   SCRIPT.JS — Minimalist portfolio
   No particles, no GSAP ticker, no heavy ops.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Loader ─── */
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-fill');
  let pct = 0;

  const tick = setInterval(() => {
    pct += Math.random() * 20 + 8;
    if (pct >= 100) {
      pct = 100;
      clearInterval(tick);
      fill.style.width = '100%';
      setTimeout(() => loader.classList.add('hidden'), 350);
    }
    fill.style.width = pct + '%';
  }, 100);

  /* ─── Scroll progress bar ─── */
  const scrollFill = document.getElementById('scroll-fill');
  window.addEventListener('scroll', () => {
    const h   = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
    scrollFill.style.transform = `scaleX(${pct})`;
  }, { passive: true });

  /* ─── Navbar: class on scroll + active link ─── */
  const navbar   = document.getElementById('navbar');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* ─── Smooth scroll on all anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ─── Mobile menu ─── */
  const toggle    = document.getElementById('menu-toggle');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ─── Intersection Observer — reveal on scroll ─── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    io.observe(el);
  });

  /* ─── Animated counters in hero ─── */
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.ceil(end / 20);
      const id = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur + '+';
        if (cur >= end) clearInterval(id);
      }, 60);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterIO.observe(c));

});