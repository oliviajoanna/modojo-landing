import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-manage-your-customers.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);
const IMG = '/images/features/manage-your-customers';

// Page content (Stitch: modojo_features_manage_your_customers). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;

// Scattered sources around the "One Central Hub" card. `tone` picks the icon tile colors in the CSS.
const SCATTERED = {
  left: [
    { icon: 'forum', label: 'WhatsApp Enquiries', tone: 'green' },
    { icon: 'table_view', label: 'Spreadsheet Records', tone: 'blue' },
  ],
  right: [
    { icon: 'loyalty', label: 'Package Details', tone: 'orange' },
    { icon: 'search', label: 'Lost Information', tone: 'purple' },
  ],
};

const MEMBER_POINTS = ['Name, Contact &amp; Basic Info', 'Active Status &amp; Join Date', 'Purchased Packages &amp; Credits', 'Complete Attendance History'];

const MEMBERS = [
  { initials: 'JD', name: 'Jane Doe', detail: 'Active Member', status: 'Active', tone: 'green' },
  { initials: 'AS', name: 'Alex Smith', detail: '10 Class Pack (3 left)', status: 'Package', tone: 'blue' },
  { initials: 'MJ', name: 'Mike Johnson', detail: 'Trial Expired', status: 'Inactive', tone: 'gray' },
];

const JOURNEY = [
  { icon: 'person_add', label: 'New Lead', tone: 'blue' },
  { icon: 'mark_email_unread', label: 'Follow Up', tone: 'yellow' },
  { icon: 'favorite', label: 'Interested', tone: 'orange' },
  { icon: 'task_alt', label: 'Converted Member', tone: 'final' },
];

const LEAD_CARDS = [
  { icon: 'group_add', tone: 'blue', title: 'Capture every opportunity', text: 'Log new inquiries from your website or social media straight into MoDojo.' },
  { icon: 'insights', tone: 'orange', title: 'Convert leads in clicks', text: 'Move prospects through your sales pipeline visually and easily convert them to full members.' },
  { icon: 'notifications_active', tone: 'green', title: 'Stay on top of follow-ups', text: 'Set reminders to reach out so no potential customer slips through the cracks.', reminder: 'Call Sarah - Trial feedback' },
];

const PACKAGES = [
  { name: '10 Class Pack', note: 'Valid for 3 months', price: '$50', tone: 'orange' },
  { name: 'Unlimited Monthly', note: 'Auto-renews', price: '$99', interval: '/mo', tone: 'navy' },
  { name: 'Introductory Trial', note: 'First-timers only', price: 'Free', tone: 'trial' },
];

const PACKAGE_LINKS = ['Links to Members', 'Links to Bookings', 'Links to Payments'];

const FLOW = ['Lead', 'Converted', 'Package Bought', 'Class Booked', 'Tracked Forever'];

const scatterCard = ({ icon: name, label, tone }) => `<div class="mc-source">
            <span class="mc-tile mc-tile-${tone}">${icon(name)}</span>
            <p>${label}</p>
          </div>`;

const memberRow = ({ initials, name, detail, status, tone }) => `<li class="mc-member">
              <span class="mc-avatar" aria-hidden="true">${initials}</span>
              <div class="mc-member-text"><strong>${name}</strong><span>${detail}</span></div>
              <span class="mc-badge mc-badge-${tone}">${status}</span>
            </li>`;

const journeyStep = ({ icon: name, label, tone }, index) => `${index > 0 ? `<li class="mc-arrow" aria-hidden="true">${icon('arrow_downward')}</li>` : ''}<li class="mc-step mc-step-${tone}">${icon(name)}<span>${label}</span></li>`;

const leadCard = ({ icon: name, tone, title, text, reminder }, index) => `<article class="mc-lead-card reveal${index ? ' reveal-delay' : ''}">
          <span class="mc-tile mc-tile-lg mc-tile-${tone}">${icon(name)}</span>
          <h3>${title}</h3>
          <p>${text}</p>
          ${reminder ? `<div class="mc-reminder">${icon('alarm')}<span>${reminder}</span></div>` : ''}
        </article>`;

const packageCard = ({ name, note, price, interval, tone }) => `<li class="mc-package mc-package-${tone}">
            <div><h3>${name}</h3><p>${note}</p></div>
            <div class="mc-price">${price}${interval ? `<small>${interval}</small>` : ''}</div>
          </li>`;

const flowItem = (label, index) => `${index > 0 ? `<li class="mc-flow-arrow" aria-hidden="true">${icon('arrow_right_alt')}</li>` : ''}<li${index === FLOW.length - 1 ? ' class="mc-flow-last"' : ''}>${label}</li>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top">
    <section class="mc-hero feature-hero">
      <img class="mc-hero-bg" src="${IMG}/img-02.jpg" alt="" width="512" height="286" fetchpriority="high" />
      <div class="wrap feature-hero-inner">
        <div class="feature-hero-copy">
        <h1>Manage Your Customers</h1>
        <p class="mc-hero-lead feature-hero-lead">Everything you need to turn visitors into loyal members. Centralize your data, track journeys, and build lasting relationships.</p>
        <div class="mc-hero-actions feature-hero-actions">
          <a class="btn btn-orange" href="${TRIAL_URL}">Start Your Free Trial</a>
          <a class="btn mc-btn-outline" href="#members"><span>See how it works</span>${icon('arrow_forward')}</a>
        </div>
      </div>
    </section>

    <section class="mc-problem">
      <div class="mc-container">
        <h2 class="mc-heading reveal">Your customer information shouldn't be scattered everywhere.</h2>
        <div class="mc-hub-map reveal">
          <svg class="mc-lines" viewBox="0 0 800 400" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <line x1="230" y1="130" x2="350" y2="180" />
            <line x1="230" y1="270" x2="350" y2="220" />
            <line x1="570" y1="130" x2="450" y2="180" />
            <line x1="570" y1="270" x2="450" y2="220" />
          </svg>
          <div class="mc-sources mc-sources-left">${SCATTERED.left.map(scatterCard).join('')}</div>
          <div class="mc-hub">
            <img src="${IMG}/img-04.png" alt="" width="408" height="250" />
            <p>One Central Hub</p>
          </div>
          <div class="mc-sources mc-sources-right">${SCATTERED.right.map(scatterCard).join('')}</div>
        </div>
      </div>
    </section>

    <section class="mc-members" id="members">
      <div class="mc-container mc-split">
        <div class="mc-copy reveal">
          <h2 class="mc-subheading">Know your members. Serve them better.</h2>
          <p class="mc-body-lg">Access detailed profiles for every member instantly. Understand their journey, preferences, and history to provide a personalized experience every time they walk through your door.</p>
          <ul class="mc-checks">${MEMBER_POINTS.map((point) => `<li>${icon('check_circle')}<span>${point}</span></li>`).join('')}</ul>
        </div>
        <div class="mc-mock reveal reveal-delay">
          <div class="mc-mock-card">
            <div class="mc-mock-head"><strong>Members List</strong><span>${icon('filter_list')}${icon('search')}</span></div>
            <ul class="mc-members-list">${MEMBERS.map(memberRow).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="mc-journey" id="leads">
      <div class="mc-container">
        <h2 class="mc-heading reveal">The Customer Journey, Simplified.</h2>
        <ol class="mc-journey-track reveal" aria-label="Customer journey">${JOURNEY.map(journeyStep).join('')}</ol>
        <div class="mc-lead-grid">${LEAD_CARDS.map(leadCard).join('')}</div>
      </div>
    </section>

    <section class="mc-packages" id="packages">
      <div class="mc-container mc-split">
        <ul class="mc-package-list reveal">${PACKAGES.map(packageCard).join('')}</ul>
        <div class="mc-copy reveal reveal-delay">
          <h2 class="mc-subheading">Create packages that fit your business.</h2>
          <p class="mc-body-lg">Offer flexibility with punch passes, unlimited memberships, or trial drops-ins. MoDojo links packages directly to member profiles, tracking usage and payments automatically.</p>
          <ul class="mc-chips">${PACKAGE_LINKS.map((label) => `<li>${icon('link')}<span>${label}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="mc-flow" aria-label="Connected customer journey">
      <ol class="mc-flow-list reveal">${FLOW.map(flowItem).join('')}</ol>
    </section>

    <section class="mc-cta">
      <div class="mc-cta-card reveal">
        <div class="mc-cta-inner">
          <h2>Turn every customer interaction into a better experience.</h2>
          <p>Join thousands of studios streamlining memberships, bookings, and member relationships with MoDojo.</p>
          <div class="mc-cta-actions">
            <a class="btn btn-orange" href="${TRIAL_URL}">Start Your Free Trial</a>
            <a class="btn btn-ghost" href="${LINKS.home}"><span>Explore MoDojo</span>${icon('arrow_forward')}</a>
          </div>
        </div>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
