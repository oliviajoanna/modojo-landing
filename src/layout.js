// Shared site chrome (header, footer, demo modal) used by every page: index.html and pricing.html.
import './styles.css';

// Where the Modojo web app (dashboard, signup, login) lives, and where its API is.
// Configurable per environment; the app URL defaults to the production portal, the API to local dev.
export const APP_URL = (import.meta.env.VITE_APP_URL || 'https://portal.modojo.id').replace(/\/$/, '');
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4007/api/v1').replace(/\/$/, '');
export const TRIAL_URL = `${APP_URL}/owner/register?plan=trial`;
export const SIGNIN_URL = `${APP_URL}/login`;

// Header / footer link targets. Most of the site is the one-page homepage, so those links point at on-page
// sections (prefixed with "/" when we're on another page); '#' marks pages that don't exist yet.
export const createLinks = (onHome) => {
  const home = onHome ? '' : '/';
  return {
    home: onHome ? '#top' : '/',
    features: `${home}#features`,
    allFeatures: '/features',
    customers: '/features/manage-your-customers',
    classes: '/features/run-your-classes',
    payments: '/features/sales-payments',
    staff: '/features/studio-staff',
    memberPortal: '/features/member-portal',
    insights: '/features/business-insights',
    pricing: '/pricing',
    contact: '/contact',
    faq: `${home}#faq`,
    blog: '/blog',
    about: '#', docs: '#', privacy: '#', terms: '#', share: '#',
    instagram: '#', youtube: '#', linkedin: '#',
  };
};

// Product Features mega menu: three columns, each stacking two groups.
const megaColumns = (LINKS) => [
  [
    { title: 'Manage Your Customers', href: LINKS.customers, items: [['Members', '#members'], ['Leads', '#leads'], ['Packages', '#packages']] },
    { title: 'Run Your Classes', href: LINKS.classes, items: [['Classes &amp; Scheduling', '#scheduling'], ['Bookings', '#bookings'], ['Attendance', '#attendance'], ['Instructors', '#instructors'], ['Rooms', '#rooms']] },
  ],
  [
    { title: 'Sales &amp; Payments', href: LINKS.payments, items: [['Invoices', '#invoices'], ['Payments', '#payments'], ['Sales Reports', '#reports']] },
    { title: 'Studio &amp; Staff', href: LINKS.staff, items: [['Branches &amp; Studios', '#locations'], ['Employees', '#team'], ['Roles &amp; Permissions', '#roles']] },
  ],
  [
    { title: 'Member Experience', href: LINKS.memberPortal, items: [['Member Portal', '#portal'], ['Self-Service', '#self-service'], ['Notifications', '#notifications']] },
    { title: 'Business Insights', href: LINKS.insights, items: [['Dashboard', '#dashboard'], ['Analytics', '#revenue']] },
  ],
];
const megaGroup = ({ title, href, items }) => `<p class="mega-title"><a href="${href}">${title}</a></p><ul class="mega-list">${items.map(([label, anchor]) => `<li><a href="${href}${anchor}">${label}</a></li>`).join('')}</ul>`;

const ICON_CHEVRON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
const ICON_SHARE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>';
const ICON_MAIL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>';
const ICON_INSTAGRAM = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
const ICON_YOUTUBE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8z"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/></svg>';
const ICON_LINKEDIN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>';

// `page` is 'home', 'pricing', 'contact', 'blog' or 'features' (any product feature page). On the homepage the nav highlights whichever section is on screen (data-spy);
// on the other pages the matching link is marked as the current page instead.
export const renderHeader = (LINKS, page) => {
  const onHome = page === 'home';
  const megaMenu = megaColumns(LINKS).map((groups) => `<div>${groups.map(megaGroup).join('')}</div>`).join('');
  const current = (name) => (page === name ? ' class="is-active" aria-current="page"' : '');
  return `
  <header class="site-header" data-header>
    <div class="nav-wrap">
      <a class="brand" href="${LINKS.home}" aria-label="MoDojo home"><img src="/modojo_logo_wide.png" alt="MoDojo" width="161" height="32" /></a>
      <nav id="site-nav" class="site-nav" aria-label="Main navigation">
        <div class="nav-item" data-mega>
          <button class="nav-trigger${page === 'features' ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="mega-menu" data-mega-trigger${onHome ? ' data-spy="features member-portal"' : ''}><span data-text="Product Features">Product Features</span>${ICON_CHEVRON}</button>
          <div class="mega-menu" id="mega-menu">
            <div class="mega-head"><p>Product Features</p><small>MoDojo brings your daily operations together in one seamless platform.</small></div>
            <div class="mega-grid">${megaMenu}</div>
          </div>
        </div>
        <a href="${LINKS.pricing}" data-text="Pricing"${current('pricing')}>Pricing</a>
        <a href="${LINKS.blog}" data-text="Blog"${current('blog')}>Blog</a>
        <a href="${LINKS.contact}" data-text="Contact Us"${current('contact')}>Contact Us</a>
        <div class="nav-panel-actions"><a class="panel-sign-in" href="${SIGNIN_URL}">Sign In</a><a class="nav-cta panel-cta" href="${TRIAL_URL}">Start Free Trial</a></div>
      </nav>
      <div class="nav-actions"><a class="sign-in" href="${SIGNIN_URL}">Sign In</a><a class="nav-cta" href="${TRIAL_URL}">Start Free Trial</a></div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><b>Menu</b></button>
    </div>
  </header>`;
};

export const renderFooter = (LINKS) => `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand-col">
          <a class="footer-logo" href="${LINKS.home}" aria-label="MoDojo home"><img src="/modojo_logo_footer.png" alt="MoDojo" width="161" height="32" /></a>
          <p class="footer-tagline">Studio management, <span>made seamless.</span></p>
          <p class="footer-blurb">Everything you need to manage your studio, members, classes, and business — all in one place.</p>
          <div class="footer-social"><a href="${LINKS.share}" aria-label="Share">${ICON_SHARE}</a><a href="${LINKS.contact}" aria-label="Email us">${ICON_MAIL}</a><a href="${LINKS.instagram}" aria-label="Instagram" target="_blank" rel="noopener noreferrer">${ICON_INSTAGRAM}</a><a href="${LINKS.youtube}" aria-label="YouTube" target="_blank" rel="noopener noreferrer">${ICON_YOUTUBE}</a><a href="${LINKS.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">${ICON_LINKEDIN}</a></div>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <div><p class="footer-heading">Product</p><ul><li><a href="${LINKS.allFeatures}">Features</a></li><li><a href="${LINKS.pricing}">Pricing</a></li><li><a href="${LINKS.memberPortal}">Member Portal</a></li><li><a href="${LINKS.insights}">Business Insights</a></li></ul></div>
          <div><p class="footer-heading">Resources</p><ul><li><a href="${LINKS.blog}">Blog</a></li><li><a href="${LINKS.docs}">Documentation</a></li><li><a href="${LINKS.faq}">FAQs</a></li></ul></div>
          <div><p class="footer-heading">Account</p><ul><li><a href="${SIGNIN_URL}">Sign In</a></li><li><a href="${TRIAL_URL}">Start Free Trial</a></li></ul></div>
        </nav>
      </div>
      <!-- <div class="footer-cta">
        <div><h2>Ready to simplify your studio?</h2><p>Start managing your studio with MoDojo today.</p></div>
        <a class="footer-cta-button" href="${TRIAL_URL}">Start Free Trial</a>
      </div> -->
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} MoDojo. All rights reserved.</p>
      </div>
    </div>
  </footer>`;

export const renderModal = () => `
  <div class="modal-backdrop" data-modal aria-hidden="true"><div class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close aria-label="Close dialog">×</button><span class="modal-kicker">LET’S TALK STUDIO</span><h2 id="modal-title">See MoDojo in action.</h2><p>Tell us a little about your studio and we’ll be in touch to schedule a walkthrough.</p><form data-demo-form><label>Work email<input required type="email" placeholder="you@yourstudio.com" /></label><label>Studio name<input required type="text" placeholder="Your studio" /></label><label>What would you like to see?<select><option>Managing classes & bookings</option><option>Memberships & payments</option><option>Attendance & member portal</option><option>Everything</option></select></label><button class="button" type="submit">Request a demo <span>↗</span></button></form><p class="form-success" data-success hidden>Thanks—we’ll be in touch soon.</p></div></div>`;

// Wires up the header (mobile menu, mega menu, scroll state, section spy) and the demo modal.
export const initLayout = () => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const mega = document.querySelector('[data-mega]');
  const megaTrigger = mega.querySelector('[data-mega-trigger]');
  const hoverMega = window.matchMedia('(min-width: 1101px) and (hover: hover)');
  let megaTimer;
  const setMega = (open) => { clearTimeout(megaTimer); mega.classList.toggle('is-open', open); megaTrigger.setAttribute('aria-expanded', String(open)); };
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (!open) setMega(false);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

  // Product Features mega menu: opens on hover (desktop), toggles on click/tap, closes on Escape / outside click / focus leaving.
  mega.addEventListener('mouseenter', () => { if (hoverMega.matches) setMega(true); });
  mega.addEventListener('mouseleave', () => { if (hoverMega.matches) megaTimer = setTimeout(() => setMega(false), 150); });
  megaTrigger.addEventListener('click', (event) => setMega(hoverMega.matches && event.detail > 0 ? true : !mega.classList.contains('is-open')));
  mega.addEventListener('focusout', (event) => { if (!mega.contains(event.relatedTarget)) setMega(false); });
  mega.querySelectorAll('.mega-menu a').forEach((link) => link.addEventListener('click', () => setMega(false)));
  document.addEventListener('click', (event) => { if (!mega.contains(event.target)) setMega(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mega.classList.contains('is-open')) return;
    if (mega.contains(document.activeElement)) megaTrigger.focus();
    setMega(false);
  });

  // Pages are rendered by JS, so the browser's own jump to a #hash target fires before the section exists: do it here
  // (again after images load, since they shift the layout).
  const scrollToHash = () => {
    const target = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: 'instant' });
  };
  scrollToHash();
  window.addEventListener('load', scrollToHash, { once: true });

  // Highlight the nav item whose section is crossing the middle of the viewport (homepage only).
  const spyLinks = [...document.querySelectorAll('[data-spy]')];
  const spyVisible = new Set();
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? spyVisible.add(entry.target.id) : spyVisible.delete(entry.target.id)));
    spyLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.spy.split(' ').some((id) => spyVisible.has(id))));
  }, { rootMargin: '-45% 0px -50% 0px' });
  new Set(spyLinks.flatMap((link) => link.dataset.spy.split(' '))).forEach((id) => { const section = document.getElementById(id); if (section) spyObserver.observe(section); });

  // Demo modal: any [data-demo] trigger opens it (plus the legacy #contact buttons on the homepage).
  const modal = document.querySelector('[data-modal]');
  const openModal = (event) => { if (event) event.preventDefault(); modal.classList.add('is-visible'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); modal.querySelector('input').focus(); };
  const closeModal = () => { modal.classList.remove('is-visible'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); };
  document.querySelectorAll('[data-demo], a[href="#contact"]').forEach((link) => link.addEventListener('click', (event) => { if (link.classList.contains('button') || link.classList.contains('nav-cta') || link.classList.contains('sign-in') || link.dataset.demo !== undefined) openModal(event); }));
  document.querySelector('[data-close]').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-visible')) closeModal(); });
  document.querySelector('[data-demo-form]').addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.hidden = true; document.querySelector('[data-success]').hidden = false; });
};

// Scroll-reveal: fades `.reveal` elements in as they enter the viewport. Returns the observer so late-rendered
// elements can be registered with it.
export const initReveal = () => {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  return observer;
};
