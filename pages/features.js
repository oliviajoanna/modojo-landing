import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Features overview: a directory of the same six feature groups as the navbar mega menu.
// Each card links to its existing detail page; detail content is not repeated here.
const icon = (name) => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;

// [title, short description, Material Symbols icon, href, highlights]
const FEATURES = [
  ['Manage Your Customers', 'Keep every member, lead and package organised in one place.', 'groups', LINKS.customers, ['Members', 'Leads', 'Packages']],
  ['Run Your Classes', 'Schedule classes, take bookings and track attendance with ease.', 'calendar_month', LINKS.classes, ['Scheduling', 'Bookings', 'Attendance']],
  ['Sales &amp; Payments', 'Send invoices, collect payments and see sales at a glance.', 'payments', LINKS.payments, ['Invoices', 'Payments', 'Sales Reports']],
  ['Studio &amp; Staff', 'Manage branches, rooms, instructors and team permissions.', 'badge', LINKS.staff, ['Branches', 'Employees', 'Roles']],
  ['Member Experience', 'Give members a portal to book, pay and stay in the loop.', 'smartphone', LINKS.memberPortal, ['Member Portal', 'Self-Service', 'Notifications']],
  ['Business Insights', 'Understand revenue and member trends with clear dashboards.', 'monitoring', LINKS.insights, ['Dashboard', 'Analytics']],
];

const card = ([title, text, iconName, href, tags]) => `<a class="feat-card reveal" href="${href}">
  <span class="feat-icon">${icon(iconName)}</span>
  <h2>${title}</h2>
  <p>${text}</p>
  <ul class="feat-tags">${tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
  <span class="feat-cta">Explore feature ${icon('arrow_forward')}</span>
</a>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top">
    <section class="feat-intro">
      <div class="feat-wrap reveal">
        <p class="kicker">Product Features</p>
        <h1 class="heading">Everything you need to run your studio.</h1>
        <p class="feat-lead">Explore everything MoDojo offers. Pick a feature to see how it works in detail.</p>
      </div>
    </section>

    <section class="feat-listing" aria-label="All features">
      <div class="feat-wrap"><div class="feat-grid">${FEATURES.map(card).join('')}</div></div>
    </section>

    <section class="feat-cta-band">
      <div class="feat-wrap reveal">
        <h2 class="heading">Ready to see MoDojo in action?</h2>
        <a class="btn btn-orange" href="${TRIAL_URL}">Start Free Trial</a>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
