/**
 * script.js — Najmul Islam Tech Blog
 * Handles: dark mode, category filtering, mobile nav
 */

(function () {
  'use strict';

  /* ============================================================
     1. THEME TOGGLE (Light / Dark)
  ============================================================ */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ni-blog-theme';

  /** Apply saved theme on page load */
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ============================================================
     2. MOBILE HAMBURGER MENU
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ============================================================
     3. CATEGORY FILTERING
  ============================================================ */
  const catButtons    = document.querySelectorAll('.cat-btn');
  const blogCards     = document.querySelectorAll('.blog-card');
  const emptyState    = document.getElementById('emptyState');
  const sectionTitle  = document.getElementById('sectionTitle');
  const postCount     = document.getElementById('postCount');
  const mobileCatSel  = document.getElementById('mobileCatSelect');

  /**
   * Filter cards by category string.
   * @param {string} cat — category value or "all"
   */
  function filterByCategory(cat) {
    let visible = 0;

    blogCards.forEach(card => {
      const match = cat === 'all' || card.dataset.category === cat;
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    // Update heading & count
    const label = cat === 'all' ? 'All Posts' : cat;
    if (sectionTitle) sectionTitle.textContent = label;
    if (postCount)    postCount.textContent = `${visible} article${visible !== 1 ? 's' : ''}`;

    // Show/hide empty state
    if (emptyState) emptyState.hidden = visible > 0;
  }

  // Desktop sidebar buttons
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Sync mobile dropdown
      if (mobileCatSel) mobileCatSel.value = btn.dataset.category;

      filterByCategory(btn.dataset.category);
    });
  });

  // Mobile dropdown
  if (mobileCatSel) {
    mobileCatSel.addEventListener('change', () => {
      const cat = mobileCatSel.value;

      // Sync desktop sidebar
      catButtons.forEach(btn => {
        const match = btn.dataset.category === cat;
        btn.classList.toggle('active', match);
        btn.setAttribute('aria-pressed', String(match));
      });

      filterByCategory(cat);
    });
  }

  /* ============================================================
     4. STICKY NAVBAR SHADOW ON SCROLL
  ============================================================ */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(0,0,0,.1)'
        : '';
    }, { passive: true });
  }

})();