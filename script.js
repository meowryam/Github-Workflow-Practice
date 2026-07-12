/* ==========================================================================
   GitPath — Interactions
   1. Navbar scroll state
   2. Mobile menu toggle
   3. Scroll-triggered reveal animations
   4. Smooth-close mobile menu on link click
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 12;

  function updateNavbarState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  /* ---------- 2. Mobile menu toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  /* ---------- 4. Close mobile menu when a link is tapped ---------- */
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 3. Scroll-triggered reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* Stagger feature cards and reasons slightly for a more orchestrated feel */
  const featureCards = document.querySelectorAll('.feature-card.reveal');
  featureCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });

  const reasons = document.querySelectorAll('.reason.reveal');
  reasons.forEach(function (reason, i) {
    reason.style.transitionDelay = (i * 0.08) + 's';
  });

  const gitMiniCards = document.querySelectorAll('.git-mini-card.reveal');
  gitMiniCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });

})();