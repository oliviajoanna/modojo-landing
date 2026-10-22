import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-business-insights.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Business Insights content (Stitch: modojo_features_business_insights). Icons are Material Symbols ligatures.
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;

// Dashboard mockup. `tag` is the floating annotation pinned to that element.
const METRICS = [
  { label: 'Total Members', value: '1,248' },
  { label: 'Active Members', value: '1,102' },
  { label: 'Monthly Revenue', value: 'Rp 48.5M', tone: 'good', tag: ['Revenue performance', 'bi-tag-revenue'] },
  { label: 'Unpaid Invoices', value: '24', tone: 'bad' },
  { label: 'Lead Conversion', value: '68%' },
];
const REVENUE_BARS = [[40, .4], [50, .5], [45, .4], [65, .6], [85, .8], [95, 1]];
const BOOKINGS = [
  ['check_circle', 'good', 'Sarah J. booked Hatha Yoga', '2 mins ago'],
  ['check_circle', 'good', 'Mike T. booked HIIT Core', '15 mins ago'],
  ['cancel', 'bad', 'Emma W. cancelled Pilates Reformer', '1 hr ago'],
];

// Rows are [icon, tone, title, text].
const NUMBERS = [
  ['group_add', 'navy', 'Member Growth', 'Track new signups, retention rates, and churn to understand your community\'s health.'],
  ['attach_money', 'orange', 'Revenue', 'Monitor daily income, projected earnings, and outstanding payments in real-time.'],
  ['how_to_reg', 'green', 'Attendance', 'See which classes are full, who\'s showing up, and spot trends in peak hours.'],
  ['calendar_month', 'blue', 'Bookings', 'Analyze booking velocity and popular time slots to optimize your schedule.'],
  ['trending_up', 'purple', 'Lead Conversion', 'Measure how effectively trials and drop-ins are converting into long-term memberships.'],
  ['inventory_2', 'pink', 'Packages', 'Understand which membership tiers and class packs are driving the most value.'],
];

const REVENUE_MONTHS = [['Jan', 38], ['Feb', 55], ['Mar', 68], ['Apr', 62], ['May', 78], ['Jun', 96]];
const PACKAGES = [['Unlimited Monthly', 45, 1], ['10 Class Pack', 30, .8], ['Drop-in', 15, .6]];

// Rows are [icon, tone, title, text].
const GROWTH = [
  ['person_add', 'orange', 'New Members +24%', 'Consistent month-over-month growth in new acquisitions.'],
  ['sync', 'navy', 'Lead Conversion 68%', 'High conversion rate from intro offers to full memberships.'],
  ['favorite', 'green', 'Active Members 1,102', 'Strong retention keeping your core community engaged and active.'],
];

// Rows are [class, attendance, fill %, bar tone, trend icon, trend label].
const CLASSES = [
  ['Pilates Reformer', '14/15', 92, 'good', 'trending_up', 'Trending up'],
  ['Yoga Flow', '22/25', 88, 'good', 'trending_up', 'Trending up'],
  ['Strength &amp; Cond.', '16/20', 84, 'warn', 'trending_flat', 'Steady'],
  ['Restorative Yoga', '12/25', 48, 'bad', 'trending_down', 'Trending down'],
];

const STEPS = [
  ['01', 'visibility', 'orange', 'See', 'Get instant visibility into every aspect of your business operations through intuitive, real-time dashboards.'],
  ['02', 'insights', 'lavender', 'Understand', 'Uncover the \'why\' behind the numbers. Identify trends, spot opportunities, and pinpoint areas for improvement.'],
  ['03', 'rocket_launch', 'green', 'Act', 'Make informed changes confidently. Adjust schedules, launch targeted marketing, or tweak pricing based on facts.'],
];

// Rows are [position, icon, tone, label].
const HUB_NODES = [
  ['tl', 'group', 'navy', 'Members'],
  ['tr', 'event_available', 'orange', 'Bookings'],
  ['bl', 'payments', 'green', 'Payments'],
  ['br', 'campaign', 'purple', 'Marketing'],
];

const tag = (entry) => (entry ? `<span class="bi-tag bi-tag-solid ${entry[1]}" aria-hidden="true">${entry[0]}</span>` : '');
const metricCard = ({ label, value, tone = '', tag: pinned }) => `<div class="bi-metric">${tag(pinned)}<p>${label}</p><strong class="${tone ? `is-${tone}` : ''}">${value}</strong></div>`;
const bar = ([height, alpha], index) => `<span style="--h:${height}%;--a:${alpha};--i:${index}"></span>`;
const bookingRow = ([name, tone, text, time]) => `<li>${icon(name, `is-${tone}`)}<span>${text}</span><time>${time}</time></li>`;
const numberCard = ([name, tone, title, text], index) => `<article class="bi-number reveal${index % 3 === 1 ? ' reveal-delay' : ''}"><div class="bi-icon bi-tone-${tone}">${icon(name)}</div><h3>${title}</h3><p>${text}</p></article>`;
const monthBar = ([month, height], index) => `<span style="--h:${height}%;--i:${index}" data-month="${month}"></span>`;
const packageRow = ([name, share, alpha]) => `<div class="bi-package"><p><strong>${name}</strong><span>${share}%</span></p><div class="bi-track"><i style="width:${share}%;opacity:${alpha}"></i></div></div>`;
const growthItem = ([name, tone, title, text]) => `<li><div class="bi-icon bi-icon-round bi-tone-${tone}">${icon(name)}</div><div><p class="bi-growth-title">${title}</p><p class="bi-growth-text">${text}</p></div></li>`;
const classRow = ([name, attendance, fill, tone, trend, trendLabel]) => `<tr><th scope="row">${name}</th><td class="bi-muted">${attendance}</td><td><div class="bi-fill"><div class="bi-track bi-track-plain"><i class="is-${tone}" style="width:${fill}%"></i></div><strong>${fill}%</strong></div></td><td class="bi-trend is-${tone}">${icon(trend)}<span class="sr-only">${trendLabel}</span></td></tr>`;
const stepCard = ([number, name, tone, title, text], index) => `<article class="bi-step reveal${index ? ' reveal-delay' : ''}"><span class="bi-step-number" aria-hidden="true">${number}</span><div class="bi-step-icon bi-step-${tone}">${icon(name)}</div><h3>${title}</h3><p>${text}</p></article>`;
const hubNode = ([position, name, tone, label]) => `<div class="bi-node bi-node-${position}"><div class="bi-node-icon bi-tone-${tone}">${icon(name)}</div><span>${label}</span></div>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top" class="bi-page">
    <section class="bi-hero feature-hero">
      <img class="bi-hero-bg" src="/images/features/business-insights/img-02.jpg" alt="" width="512" height="286" fetchpriority="high" />
      <div class="bi-hero-shade"></div>
      <div class="wrap feature-hero-inner">
        <div class="feature-hero-copy reveal">
        <h1>Business Insights</h1>
        <p class="bi-hero-lead feature-hero-lead">MoDojo turns your everyday business activity into information you can actually use.</p>
        <div class="bi-actions feature-hero-actions">
          <a class="btn btn-orange bi-hero-cta" href="${TRIAL_URL}">Start Your Free Trial</a>
          <a class="btn btn-outline" href="#dashboard">Explore the Dashboard</a>
        </div>
        </div>
      </div>
    </section>

    <section class="bi-section bi-dashboard" id="dashboard">
      <div class="bi-head reveal">
        <h2 class="bi-title-lg">Your business at a glance.</h2>
        <p class="bi-lead">Get a bird's-eye view of your entire operation with a customizable dashboard that puts your most important metrics front and center.</p>
      </div>
      <div class="bi-laptop reveal">
        <div class="bi-lid">
          <span class="bi-camera" aria-hidden="true"></span>
          <div class="bi-screen">
            <div class="bi-screen-head">
              <p class="bi-screen-title">Dashboard</p>
              <div>
                <span class="bi-chip">${icon('calendar_month')}This Month</span>
                <span class="bi-chip bi-chip-solid">${icon('download')}Export</span>
              </div>
            </div>
            <div class="bi-metrics">
              <span class="bi-tag bi-tag-solid bi-tag-key" aria-hidden="true">Key Metrics</span>
              ${METRICS.map(metricCard).join('')}
            </div>
            <div class="bi-panels">
              <div class="bi-panel bi-panel-wide">
                <span class="bi-tag bi-tag-light bi-tag-trends" aria-hidden="true">Revenue trends</span>
                <p class="bi-panel-title">Revenue Overview</p>
                <div class="bi-bars bi-bars-small" role="img" aria-label="Monthly revenue rising over six months">${REVENUE_BARS.map(bar).join('')}</div>
              </div>
              <div class="bi-panel">
                <span class="bi-tag bi-tag-light bi-tag-growth" aria-hidden="true">Member growth</span>
                <p class="bi-panel-title">Member Growth</p>
                <div class="bi-donut-wrap"><div class="bi-donut" role="img" aria-label="76% retained, 24% new"></div></div>
                <ul class="bi-legend">
                  <li><span><i class="is-navy"></i>New</span><strong>24%</strong></li>
                  <li><span><i class="is-orange"></i>Retained</span><strong>76%</strong></li>
                </ul>
              </div>
              <div class="bi-panel bi-panel-full">
                <span class="bi-tag bi-tag-solid bi-tag-booking" aria-hidden="true">Booking activity</span>
                <p class="bi-panel-title">Recent Booking Activity</p>
                <ul class="bi-bookings">${BOOKINGS.map(bookingRow).join('')}</ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bi-base" aria-hidden="true"><span></span></div>
        <div class="bi-base-shadow" aria-hidden="true"></div>
      </div>
    </section>

    <section class="bi-section bi-numbers" id="numbers">
      <div class="bi-wrap">
        <h2 class="bi-title bi-center reveal">Know your numbers</h2>
        <div class="bi-number-grid">${NUMBERS.map(numberCard).join('')}</div>
      </div>
    </section>

    <section class="bi-section bi-revenue" id="revenue">
      <div class="bi-wrap">
        <div class="bi-head reveal">
          <h2 class="bi-title">Know where your revenue comes from</h2>
          <p class="bi-lead">Drill down into your financial data to see exactly which packages and services are driving your growth.</p>
        </div>
        <div class="bi-neo reveal">
          <div class="bi-revenue-grid">
            <div>
              <h3 class="bi-neo-title">Revenue Breakdown</h3>
              <div class="bi-neo-well">
                <div class="bi-bars bi-bars-large" role="img" aria-label="Monthly revenue, January to June, rising from 38 to 96 percent of the peak">${REVENUE_MONTHS.map(monthBar).join('')}</div>
              </div>
            </div>
            <div class="bi-neo-side">
              <div class="bi-neo-card">
                <h3 class="bi-neo-label">Top Packages</h3>
                <div class="bi-packages">${PACKAGES.map(packageRow).join('')}</div>
              </div>
              <div class="bi-neo-card bi-invoice">
                <h3 class="bi-neo-label">Invoice Status</h3>
                <div class="bi-invoice-body">
                  <div class="bi-ring">92%</div>
                  <div><p class="bi-invoice-title">Paid on time</p><p class="bi-invoice-note">Outstanding: Rp 4.2M</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bi-section bi-growth" id="growth">
      <div class="bi-wrap bi-growth-grid">
        <div class="bi-growth-visual reveal">
          <div class="bi-growth-plate" aria-hidden="true"></div>
          <div class="bi-growth-card">
            <h3>Member Growth (YTD)</h3>
            <div class="bi-area">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,100 L0,80 Q25,60 50,70 T100,30 L100,100 Z" fill="#dbe1ff" opacity="0.5"></path>
                <path d="M0,100 L0,90 Q25,75 50,85 T100,40 L100,100 Z" fill="#121D3C" opacity="0.8"></path>
              </svg>
            </div>
            <div class="bi-stats">
              <div><p>New Members</p><strong class="is-good">${icon('arrow_upward')}+24%</strong></div>
              <div><p>Churn Rate</p><strong>${icon('arrow_downward')}2.1%</strong></div>
            </div>
          </div>
        </div>
        <div class="reveal reveal-delay">
          <h2 class="bi-title">Track your community's expansion</h2>
          <p class="bi-lead bi-growth-lead">Watch your studio grow in real-time. MoDojo provides deep insights into acquisition channels, retention rates, and member behavior so you can focus on what's working.</p>
          <ul class="bi-growth-list">${GROWTH.map(growthItem).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="bi-section bi-classes" id="classes">
      <div class="bi-head reveal">
        <h2 class="bi-title">Know which classes are keeping your members engaged</h2>
        <p class="bi-lead">Optimize your schedule based on hard data, not guesswork. See exactly which instructors and class types are driving attendance.</p>
      </div>
      <div class="bi-table-card reveal">
        <div class="bi-table-head">
          <h3>Class Performance (Last 30 Days)</h3>
          <a href="${LINKS.classes}">View All ${icon('arrow_forward')}</a>
        </div>
        <div class="bi-table-scroll">
          <table class="bi-table">
            <thead><tr><th scope="col">Class Type</th><th scope="col">Avg. Attendance</th><th scope="col">Fill Rate</th><th scope="col">Trend</th></tr></thead>
            <tbody>${CLASSES.map(classRow).join('')}</tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="bi-section bi-section-xl bi-process" id="process">
      <div class="bi-glow bi-glow-orange" aria-hidden="true"></div>
      <div class="bi-glow bi-glow-lavender" aria-hidden="true"></div>
      <div class="bi-wrap bi-process-inner">
        <div class="bi-head bi-head-dark reveal">
          <h2 class="bi-title-lg">From Data to Decisions</h2>
          <p class="bi-lead">Don't just collect numbers. Use them to build a stronger, more profitable business with our simple three-step methodology.</p>
        </div>
        <div class="bi-step-grid">${STEPS.map(stepCard).join('')}</div>
      </div>
    </section>

    <section class="bi-section bi-section-xl bi-hub" id="hub">
      <div class="bi-wrap">
        <div class="bi-head reveal">
          <h2 class="bi-title">One clear view of your business</h2>
          <p class="bi-lead">All your MoDojo tools feed into one central intelligence hub, eliminating data silos and giving you the complete picture.</p>
        </div>
        <div class="bi-stage reveal">
          <svg class="bi-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="50" y1="50" x2="15" y2="15" /><line x1="50" y1="50" x2="85" y2="15" /><line x1="50" y1="50" x2="15" y2="85" /><line x1="50" y1="50" x2="85" y2="85" />
          </svg>
          <div class="bi-core">${icon('dashboard')}<span>MoDojo<br />Dashboard</span></div>
          ${HUB_NODES.map(hubNode).join('')}
        </div>
      </div>
    </section>

    <section class="bi-section bi-section-xl bi-cta">
      <div class="bi-wrap bi-center reveal">
        <h2 class="bi-title-lg">Know your business. Run it better.</h2>
        <div class="bi-actions bi-actions-center">
          <a class="btn btn-orange btn-lg" href="${TRIAL_URL}">Start Your 30-Day Free Trial</a>
          <button class="btn btn-outline btn-lg" type="button" data-demo>Book a Demo</button>
        </div>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
