/**
 * WUTTKE IN DER HEIDE – Main JavaScript v2.5
 * Mobiles Menü: Overlay direkt in <body> eingefügt, garantiert über allem
 */

document.addEventListener('DOMContentLoaded', function () {

  var MOBILE_BREAKPOINT = 900;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  // ================================================================
  // MOBILES MENÜ – Overlay als body-Kind (nicht im Header gefangen)
  // ================================================================
  var navToggle = document.querySelector('.nav-toggle');
  var originalNavList = document.querySelector('.nav-list');
  var menuOverlay = null;
  var menuOpen = false;

  function buildMobileOverlay() {
    // Entferne altes Overlay falls vorhanden
    if (menuOverlay) {
      menuOverlay.remove();
      menuOverlay = null;
    }

    // Erstelle neues Overlay-Div direkt in <body>
    menuOverlay = document.createElement('div');
    menuOverlay.id = 'mobile-menu-overlay';
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuOverlay.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'height: 100%',
      'z-index: 99999',
      'background: #2E4028',
      'display: flex',
      'flex-direction: column',
      'overflow-y: auto',
      '-webkit-overflow-scrolling: touch',
      'transform: translateX(-100%)',
      'transition: transform 0.3s ease',
      'padding-top: 0'
    ].join('; ');

    // Menü-Header (Logo + Schließen-Button)
    var overlayHeader = document.createElement('div');
    overlayHeader.style.cssText = [
      'display: flex',
      'align-items: center',
      'justify-content: space-between',
      'padding: 1rem 1.5rem',
      'border-bottom: 3px solid #C8A951',
      'flex-shrink: 0'
    ].join('; ');

    var logoImg = document.querySelector('.site-logo__img');
    var logoClone = logoImg ? logoImg.cloneNode(true) : null;
    if (logoClone) {
      logoClone.style.height = '44px';
      logoClone.style.width = 'auto';
      overlayHeader.appendChild(logoClone);
    }

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&#10005;';
    closeBtn.setAttribute('aria-label', 'Menü schließen');
    closeBtn.style.cssText = [
      'background: none',
      'border: none',
      'color: #FFFFFF',
      'font-size: 1.5rem',
      'cursor: pointer',
      'padding: 0.5rem',
      'line-height: 1'
    ].join('; ');
    closeBtn.addEventListener('click', closeMenu);
    overlayHeader.appendChild(closeBtn);
    menuOverlay.appendChild(overlayHeader);

    // Nav-Links klonen und ins Overlay einfügen
    var navItems = originalNavList ? originalNavList.querySelectorAll('.nav-item') : [];
    var navContainer = document.createElement('ul');
    navContainer.style.cssText = [
      'list-style: none',
      'margin: 0',
      'padding: 0.5rem 0',
      'flex: 1'
    ].join('; ');

    navItems.forEach(function (item) {
      var clonedItem = item.cloneNode(true);
      var mainLink = clonedItem.querySelector('.nav-link');
      var dropdown = clonedItem.querySelector('.nav-dropdown');

      // Stil für jeden Listeneintrag
      clonedItem.style.cssText = 'border-bottom: 1px solid rgba(200,169,81,0.15); list-style: none;';

      if (mainLink) {
        mainLink.style.cssText = [
          'display: block',
          'padding: 1rem 1.5rem',
          'color: rgba(255,255,255,0.9)',
          'font-family: sans-serif',
          'font-size: 0.95rem',
          'font-weight: 700',
          'letter-spacing: 0.07em',
          'text-transform: uppercase',
          'text-decoration: none',
          'cursor: pointer'
        ].join('; ');
      }

      if (dropdown) {
        // Dropdown initial ausgeblendet
        dropdown.style.cssText = [
          'display: none',
          'background: rgba(0,0,0,0.25)',
          'list-style: none',
          'margin: 0',
          'padding: 0.25rem 0'
        ].join('; ');

        // Dropdown-Links stylen
        dropdown.querySelectorAll('a').forEach(function (a) {
          a.style.cssText = [
            'display: block',
            'padding: 0.75rem 2.5rem',
            'color: rgba(255,255,255,0.8)',
            'font-family: sans-serif',
            'font-size: 0.85rem',
            'text-decoration: none'
          ].join('; ');
          a.addEventListener('click', closeMenu);
        });

        // Akkordeon-Toggle
        if (mainLink) {
          mainLink.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = dropdown.style.display === 'block';
            // Alle anderen schließen
            navContainer.querySelectorAll('.nav-dropdown').forEach(function (d) {
              d.style.display = 'none';
            });
            dropdown.style.display = isOpen ? 'none' : 'block';
          });
        }
      } else {
        // Einfacher Link: Menü schließen
        if (mainLink) {
          mainLink.addEventListener('click', closeMenu);
        }
      }

      navContainer.appendChild(clonedItem);
    });

    menuOverlay.appendChild(navContainer);

    // Klick außerhalb (auf Overlay-Rand) schließt Menü
    menuOverlay.addEventListener('click', function (e) {
      if (e.target === menuOverlay) closeMenu();
    });

    document.body.appendChild(menuOverlay);
  }

  function openMenu() {
    if (!menuOverlay) buildMobileOverlay();
    menuOpen = true;
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuOverlay.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
      var spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      }
    }
  }

  function closeMenu() {
    menuOpen = false;
    if (menuOverlay) {
      menuOverlay.style.transform = 'translateX(-100%)';
      menuOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      var spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }
  }

  // Hamburger-Button Event
  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Escape-Taste
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Resize: Overlay entfernen wenn Desktop
  window.addEventListener('resize', function () {
    if (!isMobile()) {
      closeMenu();
      if (menuOverlay) {
        menuOverlay.remove();
        menuOverlay = null;
      }
    }
  });

  // Desktop: Dropdown per Hover (CSS übernimmt das)
  // Keyboard-Zugänglichkeit für Desktop-Dropdowns
  document.querySelectorAll('.nav-item--has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !isMobile()) {
        e.preventDefault();
        var item = this.closest('.nav-item--has-dropdown');
        item.classList.toggle('open');
      }
    });
  });

  // ================================================================
  // HEADER – Scroll-Effekt
  // ================================================================
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ================================================================
  // AKTIVEN NAV-LINK MARKIEREN
  // ================================================================
  var currentPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-dropdown a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href.includes(currentPage) || (currentPage === 'index.html' && href.includes('index')))) {
      link.classList.add('active');
      var parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        var parentItem = parentDropdown.closest('.nav-item--has-dropdown');
        if (parentItem) {
          var parentLink = parentItem.querySelector(':scope > .nav-link');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    }
  });

  // ================================================================
  // SCROLL-ANIMATIONEN
  // ================================================================
  var animElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    animElements.forEach(function (el) { observer.observe(el); });
  } else {
    animElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // ================================================================
  // BACK TO TOP
  // ================================================================
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ================================================================
  // LIGHTBOX
  // ================================================================
  var galleryItems  = document.querySelectorAll('.gallery-item');
  var lightbox      = document.querySelector('.lightbox');
  var lightboxImg   = document.querySelector('.lightbox__img');
  var lightboxClose = document.querySelector('.lightbox__close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = this.querySelector('img');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  // ================================================================
  // COOKIE BANNER
  // ================================================================
  var cookieBanner  = document.querySelector('.cookie-banner');
  var cookieAccept  = document.querySelector('.cookie-accept');
  var cookieDecline = document.querySelector('.cookie-decline');

  if (cookieBanner) {
    if (!localStorage.getItem('wuttke_cookies')) {
      setTimeout(function () { cookieBanner.classList.add('show'); }, 1200);
    }
    if (cookieAccept) cookieAccept.addEventListener('click', function () {
      localStorage.setItem('wuttke_cookies', 'accepted');
      cookieBanner.classList.remove('show');
    });
    if (cookieDecline) cookieDecline.addEventListener('click', function () {
      localStorage.setItem('wuttke_cookies', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // ================================================================
  // SMOOTH SCROLL
  // ================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ================================================================
  // BARRIEREFREIHEITS-WIDGET
  // ================================================================
  var a11yBtn   = document.getElementById('a11y-btn');
  var a11yPanel = document.getElementById('a11y-panel');
  var a11yOpen  = false;

  var A11Y_KEY = 'wuttke_a11y';
  var a11yState = JSON.parse(localStorage.getItem(A11Y_KEY) || '{"fontSize":100,"contrast":false,"gray":false,"links":false}');

  function applyA11y() {
    var html = document.documentElement;
    html.style.fontSize = a11yState.fontSize + '%';
    html.classList.toggle('a11y-high-contrast', a11yState.contrast);
    html.classList.toggle('a11y-grayscale',      a11yState.gray);
    html.classList.toggle('a11y-links-underline', a11yState.links);
    var valEl = document.getElementById('a11y-font-val');
    if (valEl) valEl.textContent = a11yState.fontSize + '%';
    var contrastEl = document.getElementById('a11y-contrast');
    if (contrastEl) contrastEl.checked = a11yState.contrast;
    var grayEl = document.getElementById('a11y-gray');
    if (grayEl) grayEl.checked = a11yState.gray;
    var linksEl = document.getElementById('a11y-links');
    if (linksEl) linksEl.checked = a11yState.links;
    localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState));
  }

  applyA11y();

  if (a11yBtn && a11yPanel) {
    a11yBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      a11yOpen = !a11yOpen;
      a11yPanel.classList.toggle('open', a11yOpen);
      a11yPanel.setAttribute('aria-hidden', String(!a11yOpen));
      a11yBtn.setAttribute('aria-expanded', String(a11yOpen));
    });

    document.addEventListener('click', function (e) {
      if (a11yOpen && !a11yPanel.contains(e.target) && e.target !== a11yBtn) {
        a11yOpen = false;
        a11yPanel.classList.remove('open');
        a11yPanel.setAttribute('aria-hidden', 'true');
        a11yBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && a11yOpen) {
        a11yOpen = false;
        a11yPanel.classList.remove('open');
        a11yPanel.setAttribute('aria-hidden', 'true');
        a11yBtn.setAttribute('aria-expanded', 'false');
        a11yBtn.focus();
      }
    });

    // Schriftgröße
    var fontPlus  = document.getElementById('a11y-font-plus');
    var fontMinus = document.getElementById('a11y-font-minus');
    if (fontPlus)  fontPlus.addEventListener('click',  function () { if (a11yState.fontSize < 140) { a11yState.fontSize += 10; applyA11y(); } });
    if (fontMinus) fontMinus.addEventListener('click', function () { if (a11yState.fontSize > 80)  { a11yState.fontSize -= 10; applyA11y(); } });

    // Toggles
    var contrastEl2 = document.getElementById('a11y-contrast');
    if (contrastEl2) contrastEl2.addEventListener('change', function () { a11yState.contrast = this.checked; applyA11y(); });
    var grayEl2 = document.getElementById('a11y-gray');
    if (grayEl2) grayEl2.addEventListener('change', function () { a11yState.gray = this.checked; applyA11y(); });
    var linksEl2 = document.getElementById('a11y-links');
    if (linksEl2) linksEl2.addEventListener('change', function () { a11yState.links = this.checked; applyA11y(); });

    // Reset
    var resetBtn = document.getElementById('a11y-reset');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      a11yState = { fontSize: 100, contrast: false, gray: false, links: false };
      applyA11y();
    });
  }

  // ================================================================
  // KONTAKT-WIDGET
  // ================================================================
  var contactWidget = document.getElementById('contact-widget');
  var contactBtn    = document.getElementById('contact-widget-btn');
  var contactOpen   = false;

  if (contactWidget && contactBtn) {
    contactBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      contactOpen = !contactOpen;
      contactWidget.classList.toggle('open', contactOpen);
      contactBtn.setAttribute('aria-expanded', String(contactOpen));
      contactBtn.setAttribute('aria-label', contactOpen ? 'Kontaktoptionen schließen' : 'Kontaktoptionen öffnen');
    });

    document.addEventListener('click', function (e) {
      if (contactOpen && !contactWidget.contains(e.target)) {
        contactOpen = false;
        contactWidget.classList.remove('open');
        contactBtn.setAttribute('aria-expanded', 'false');
        contactBtn.setAttribute('aria-label', 'Kontaktoptionen öffnen');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && contactOpen) {
        contactOpen = false;
        contactWidget.classList.remove('open');
        contactBtn.setAttribute('aria-expanded', 'false');
        contactBtn.setAttribute('aria-label', 'Kontaktoptionen öffnen');
        contactBtn.focus();
      }
    });
  }

});

/* ============================================================
   TANDEM NEU-MODAL – wird beim ersten Besuch nach 1,5s gezeigt
   ============================================================ */
(function() {
  var modal = document.getElementById('tandem-modal');
  if (!modal) return;

  // Nur auf der Startseite und nur einmal pro Session anzeigen
  var seen = sessionStorage.getItem('tandem_modal_seen');
  if (seen) return;

  // Nach 1,5 Sekunden einblenden
  setTimeout(function() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('tandem_modal_seen', '1');

    // Fokus auf Schließen-Button setzen (Barrierefreiheit)
    var closeBtn = document.getElementById('tandem-modal-close');
    if (closeBtn) setTimeout(function(){ closeBtn.focus(); }, 50);
  }, 1500);

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Schließen-Button
  var closeBtn = document.getElementById('tandem-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // "Später ansehen"-Button
  var skipBtn = document.getElementById('tandem-modal-skip');
  if (skipBtn) skipBtn.addEventListener('click', closeModal);

  // Klick auf Backdrop
  var backdrop = document.getElementById('tandem-modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Escape-Taste
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
})();
