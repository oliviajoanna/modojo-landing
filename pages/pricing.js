import { APP_URL, TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';

const app = document.querySelector('#app');
const LINKS = createLinks(false);
const GROWTH_URL = `${APP_URL}/owner/register?plan=growth`;

// Pricing content (Stitch: modojo_pricing). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;

const PLANS = {
  trial: { name: 'Trial', blurb: 'Free for 30 days, limited usage', benefits: ['Up to 50 active members', 'Basic class scheduling'] },
  growth: { name: 'Growth', blurb: 'Unlimited members, classes, bookings', benefits: ['Unlimited members', 'Unlimited classes &amp; bookings', 'Advanced reporting'] },
};

// Feature matrix. A cell is `true` (included) or text (a limit). Rows are [feature, trial, growth].
const FEATURES = [
  ['Manage Your Customers', [
    ['Members', 'Up to 2', 'Unlimited'],
    ['Lead Management', true, true],
    ['Packages', true, true],
    ['Member Self-Service', true, true],
    ['Member Google Sign-In', true, true],
  ]],
  ['Run Your Classes', [
    ['Classes &amp; Scheduling', 'Up to 2', 'Unlimited'],
    ['Bookings &amp; Waitlist', 'Up to 2', 'Unlimited'],
    ['Attendance QR Check-In', true, true],
    ['Instructors', 'Up to 2', 'Unlimited'],
    ['Rooms', true, true],
  ]],
  ['Manage Sales &amp; Payments', [
    ['Invoices', true, true],
    ['Payments', true, true],
  ]],
  ['Run Your Team &amp; Locations', [
    ['Branches &amp; Studios', 'Up to 2', 'Multiple'],
    ['Employee Management', true, true],
    ['Staff Accounts', true, true],
    ['Roles &amp; Permissions', true, true],
  ]],
  ['Engage Your Members', [
    ['Customisable Member Website Page', true, true],
    ['Promotional Banner', true, true],
    ['Notifications', true, true],
  ]],
  ['Understand Your Business', [
    ['Dashboard', true, true],
    ['Sales Report', true, true],
  ]],
  ['Work Faster', [
    ['Global Search', true, true],
  ]],
];

// Rows are [feature, MoDojo, other tools].
const COMPARISON = [
  ['Member management', true, true],
  ['Class scheduling', true, true],
  ['Bookings', true, true],
  ['Payments', true, true],
  ['Multiple branches', true, 'Depends'],
  ['Dashboard', true, 'Depends'],
  ['Everything in one platform', true, 'Often separate tools'],
];

const cell = (value, tone) => (value === true
  ? `${icon('check_circle', `cmp-check cmp-check-${tone}`)}<span class="sr-only">Included</span>`
  : `<strong>${value}</strong>`);

const planCard = (key, featured) => {
  const plan = PLANS[key];
  const benefit = (text) => `<li>${icon('check_circle', featured ? 'is-orange' : '')}<span>${text}</span></li>`;
  const price = featured
    ? '<div class="plan-price"><span class="plan-currency">Rp</span><span class="plan-amount">500.000</span><span class="plan-interval">/month</span></div>'
    : '<div class="plan-price"><span class="plan-amount">Free</span></div>';
  const cta = featured
    ? `<a class="pr-btn pr-btn-solid plan-cta" href="${GROWTH_URL}">Upgrade to Growth</a>`
    : `<a class="pr-btn pr-btn-ghost plan-cta" href="${TRIAL_URL}">Start Free Trial</a>`;
  return `<article class="plan${featured ? ' plan-featured' : ''} reveal${featured ? ' reveal-delay' : ''}">
    ${featured ? '<span class="plan-badge">Recommended</span>' : ''}
    <h2>${plan.name}</h2>
    <p class="plan-blurb">${plan.blurb}</p>
    ${price}
    <ul class="plan-benefits">${plan.benefits.map(benefit).join('')}</ul>
    ${cta}
  </article>`;
};

const versusRow = ([feature, modojo, other], index) => `<tr><td${index === COMPARISON.length - 1 ? ' class="cmp-strong"' : ''}>${feature}</td><td class="cmp-center col-accent">${cell(modojo, 'orange')}</td><td class="cmp-center">${other === true ? cell(true, 'muted') : `<span class="cmp-muted">${other}</span>`}</td></tr>`;

app.innerHTML = `${renderHeader(LINKS, 'pricing')}

  <main id="top">
    <section class="pr-hero">
      <div class="pr-hero-inner reveal">
        <h1>The right tools for your studio. <br class="pr-br" />The right price for your business.</h1>
        <p class="lead">Start with a 30-day free trial. Upgrade when you're ready.</p>
        <div class="pr-hero-actions">
          <a class="pr-btn pr-btn-solid" href="${TRIAL_URL}">Start Your Free Trial</a>
          <button class="pr-btn pr-btn-outline" type="button" data-demo>Book a Demo</button>
        </div>
      </div>
    </section>

    <section class="pr-plans" aria-label="Plans">
      <div class="plan-grid">${planCard('trial', false)}${planCard('growth', true)}</div>
    </section>

    <section class="pr-compare" id="compare">
      <div class="pr-compare-inner">
        <div class="pr-head reveal">
          <h2 class="heading">See everything included in your plan.</h2>
          <p class="lead">All MoDojo plans are designed to help you spend less time on repetitive administrative tasks and more time running your business. Compare the features below to find the plan that works best for you.</p>
        </div>
        <div class="pr-search reveal">
          <label for="feature-search">Search features</label>
          <div class="pr-search-field">${icon('search')}<input id="feature-search" type="search" placeholder="e.g. Invoicing" autocomplete="off" /></div>
        </div>
        <div class="cmp-wrap reveal">
          <table class="cmp-table">
            <thead><tr><th class="cmp-cat-head" scope="col">Category</th><th scope="col">Feature</th><th class="cmp-center" scope="col">Trial</th><th class="cmp-center col-accent" scope="col">Growth</th></tr></thead>
            <tbody data-feature-rows></tbody>
          </table>
          <p class="cmp-empty" data-feature-empty role="status" hidden>No features match your search.</p>
        </div>
        <p class="pr-closing reveal">Everything you need to get started. More room to grow when you're ready.</p>
      </div>
    </section>

    <section class="pr-versus">
      <div class="pr-versus-inner">
        <div class="pr-head reveal">
          <h2 class="heading">More than software. A better way to run your business.</h2>
          <p class="lead">You shouldn't have to pay for a collection of separate tools just to run your studio.</p>
        </div>
        <div class="cmp-wrap cmp-wrap-narrow reveal">
          <table class="cmp-table cmp-versus">
            <thead><tr><th scope="col">Feature</th><th class="cmp-center col-accent" scope="col">MoDojo</th><th class="cmp-center" scope="col">Other tools</th></tr></thead>
            <tbody>${COMPARISON.map(versusRow).join('')}</tbody>
          </table>
        </div>
        <div class="pr-versus-foot reveal">
          <h3>One platform. One monthly price. Less hassle.</h3>
          <p>Bring your customers, classes, bookings, payments, staff, and business insights together without stitching together multiple systems.</p>
        </div>
      </div>
    </section>

    <section class="pr-cta">
      <div class="pr-cta-inner reveal">
        <p class="kicker">Ready to get started?</p>
        <h2 class="heading">Start your 30-day free trial today.</h2>
        <p class="lead">Experience everything MoDojo has to offer and see how much easier managing your studio can be.</p>
        <a class="btn btn-orange btn-lg" href="${TRIAL_URL}"><span>Start Your Free Trial</span>${icon('arrow_forward')}</a>
        <p class="pr-cta-note">No credit card required.</p>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();

// Feature matrix: rendered from FEATURES so the search box can filter it. The category label spans its rows on
// desktop (rowspan) and is repeated as a full-width heading row on mobile (see .cmp-cat-row in styles.css).
const tbody = document.querySelector('[data-feature-rows]');
const empty = document.querySelector('[data-feature-empty]');
const table = tbody.closest('table');
const input = document.querySelector('#feature-search');
const plain = (html) => html.replace(/&amp;/g, '&').toLowerCase();

const featureRow = ([feature, trial, growth], category, index, count) => `<tr>${index === 0 ? `<th class="cmp-cat" rowspan="${count}" scope="rowgroup">${category}</th>` : ''}<td>${feature}</td><td class="cmp-center">${cell(trial, 'navy')}</td><td class="cmp-center col-accent">${cell(growth, 'orange')}</td></tr>`;

const renderFeatures = (query) => {
  const term = plain(query.trim());
  const groups = FEATURES
    .map(([category, rows]) => [category, plain(category).includes(term) ? rows : rows.filter(([feature]) => plain(feature).includes(term))])
    .filter(([, rows]) => rows.length > 0);
  tbody.innerHTML = groups.map(([category, rows]) => `<tr class="cmp-cat-row"><th colspan="3" scope="colgroup">${category}</th></tr>${rows.map((row, index) => featureRow(row, category, index, rows.length)).join('')}`).join('');
  empty.hidden = groups.length > 0;
  table.hidden = groups.length === 0;
};
renderFeatures('');
input.addEventListener('input', () => renderFeatures(input.value));
