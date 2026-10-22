import { API_URL, APP_URL, TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';

const app = document.querySelector('#app');
const LINKS = createLinks(true);

// Homepage content (Stitch: modojo_homepage). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name) => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
const IMG = '/images/homepage';

const PROBLEMS = [
  ['chat_bubble', 'Booking scattered across WhatsApp'],
  ['table_view', 'Spreadsheet Everywhere'],
  ['payments', 'Chasing Payments'],
  ['mail', 'Leads slipping away'],
];
// Order matters: top-left, middle-left, bottom-left, top-right, middle-right, bottom-right (see .pos-* in styles.css).
const ORBIT_ITEMS = [
  ['groups', 'Manage Your Members', 'tl'],
  ['trending_up', 'Grow Your Customer Base', 'ml'],
  ['calendar_month', 'Simplify Your Schedule', 'bl'],
  ['payments', 'Make Payments Easier', 'tr'],
  ['badge', 'Run Your Team', 'mr'],
  ['insights', 'Understand Your Business', 'br'],
];
const INDUSTRIES = [
  ['Yoga &amp; Pilates', 'Manage classes, memberships, instructors, and bookings with ease.', 'industry-yoga-pilates'],
  ['Fitness &amp; Gyms', 'Keep members, packages, attendance, and payments organized.', 'industry-fitness'],
  ['Martial Arts', 'Manage students, classes, instructors, and memberships.', 'industry-martial-arts'],
  ['Dance Studios', 'Simplify class schedules, bookings, attendance, and member management.', 'industry-dance'],
  ['Cooking &amp; Creative Classes', 'Manage courses, participants, schedules, and payments.', 'industry-cooking'],
];
const STEPS = [
  ['search', 'Discover', 'Beautifully branded schedules integrated right into your website.'],
  ['credit_card', 'Book &amp; Pay', 'Frictionless checkout process via web portal.'],
  ['how_to_reg', 'Attend', 'Self-check-in kiosks and automated attendance tracking.'],
  ['loop', 'Come Back', 'Seamless automated reminders and loyalty retention.'],
];
const STATS = [['Revenue', '+18%'], ['Member Growth', '+24%'], ['Attendance', '87%']];
const TESTIMONIALS = [
  ['MoDojo has made managing our studio so much easier. We spend less time dealing with admin and more time focusing on our members.', 'Sarah Tan', 'Studio Owner, Pilates Studio'],
  ['Everything we need is finally in one place. Our team can manage bookings, members, and payments without jumping between different tools.', 'Michael Lee', 'Studio Manager, Fitness Studio'],
  ['The member experience is so much simpler. Our clients can book and manage their classes without having to message us every time.', 'Jessica Wong', 'Studio Owner, Yoga Studio'],
];
const FAQS = [
  ['What is MoDojo?', 'MoDojo is an all-in-one management platform designed for service-based businesses such as studios, gyms, fitness businesses, and classes.'],
  ['What types of businesses can use MoDojo?', 'MoDojo is designed for businesses that manage members or clients, classes, bookings, payments, and daily operations. This includes Pilates and yoga studios, gyms, martial arts schools, dance studios, and more.'],
  ['Is there a free trial?', 'Yes. You can explore MoDojo with a 30-day free trial without providing a credit card.'],
  ['How much does MoDojo cost?', 'MoDojo Growth is Rp 500,000 per month, billed monthly. Visit our Pricing page for the full details of what’s included.'],
  ['Can I manage multiple branches?', 'Yes. Growth supports multiple branches and locations, allowing you to manage your business from one platform.'],
  ['Can my members book their own classes?', 'Yes. Members can use their dedicated member portal to browse classes, book classes, manage their bookings, and make payments.'],
  ['Can my employees have different permissions?', 'Yes. MoDojo supports roles and permissions so you can control what different members of your team can access.'],
  ['Do I need technical knowledge to use MoDojo?', 'No. MoDojo is designed to be simple and intuitive, so your team can start using it without extensive technical training.'],
];

const orbitItem = ([name, label, pos]) => `<div class="orbit-item pos-${pos}"><span class="orbit-icon">${icon(name)}</span><h3>${label}</h3></div>`;
const orbitGridItem = ([name, label]) => `<div class="orbit-grid-item"><span class="orbit-icon">${icon(name)}</span><h3>${label}</h3></div>`;
const industryCard = ([title, text, img]) => `<article class="industry"><img src="${IMG}/${img}.jpg" alt="" width="512" height="343" loading="lazy" /><div class="industry-shade"></div><div class="industry-body"><h3>${title}</h3><p>${text}</p></div></article>`;
const stepItem = ([name, title, text], index) => `<li class="step"><span class="step-badge${index === 0 ? ' is-filled' : ''}">${icon(name)}</span><div class="step-text"><h3>${title}</h3><p>${text}</p></div></li>`;
const faqItem = ([question, answer]) => `<details class="faq-item"><summary><span>${question}</span>${icon('expand_more')}</summary><div class="faq-answer">${answer}</div></details>`;
app.innerHTML = `${renderHeader(LINKS, 'home')}

  <main id="top">
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy reveal">
          <h1>Studio management, <span>made seamless.</span></h1>
          <p class="hero-lede">Ditch the spreadsheets and scattered tools. MoDojo is the premium, all-in-one platform to run your classes, manage members, and grow your business.</p>
          <div class="hero-actions"><a class="btn btn-orange" href="${TRIAL_URL}">Start Free Trial</a><a class="btn btn-outline" href="${LINKS.features}">See How It Works</a></div>
        </div>
        <div class="hero-visual reveal reveal-delay">
          <div class="hero-glow" aria-hidden="true"></div>
          <div class="hero-shot"><div class="hero-shot-frame"><img src="${IMG}/hero-dashboard.jpg" alt="The MoDojo dashboard on a laptop, showing members, revenue and upcoming classes" width="512" height="286" /></div></div>
        </div>
      </div>
    </section>

    <section class="problem">
      <div class="problem-inner">
        <div class="problem-row">
          <div class="problem-intro reveal"><h2 class="heading">Does running your studio feel like this?</h2><p class="lead">The chaos behind the scenes shouldn’t be the hardest part of your day.</p></div>
          <div class="problem-cards reveal">${PROBLEMS.map(([name, text]) => `<div class="problem-card">${icon(name)}<h3>${text}</h3></div>`).join('')}</div>
        </div>
        <div class="problem-cta reveal"><h2 class="heading">Your studio shouldn’t be this complicated.</h2><a class="btn btn-glass" href="${LINKS.allFeatures}"><span>Explore All Features</span>${icon('arrow_forward')}</a></div>
      </div>
    </section>

    <section id="features" class="orbit-section">
      <div class="wrap">
        <div class="orbit-head reveal"><h2 class="display">Meet MoDojo.</h2><p class="orbit-sub">Everything you need to run your business</p><p class="lead">MoDojo brings your members, classes, bookings, payments, staff, and business insights together in one seamless platform.</p></div>
        <div class="orbit reveal">
          <div class="orbit-bg" aria-hidden="true"><span class="ring-lg"></span><span class="ring-md"></span><span class="ring-sm"></span><span class="glow-orange"></span><span class="glow-violet"></span></div>
          <div class="hub"><div class="hub-inner"><img src="/modojo_icon.png" alt="MoDojo" width="357" height="168" /></div></div>
          <div class="orbit-items">${ORBIT_ITEMS.map(orbitItem).join('')}</div>
          <div class="orbit-grid">${ORBIT_ITEMS.map(orbitGridItem).join('')}</div>
        </div>
        <div class="orbit-cta reveal"><a class="btn btn-glass" href="${LINKS.allFeatures}"><span>Explore All Features</span>${icon('arrow_forward')}</a></div>
      </div>
    </section>

    <section id="industries" class="industries">
      <div class="wrap">
        <div class="section-head reveal"><p class="kicker">One platform. Different businesses.</p><h2 class="display">Made for the way you work.</h2><p class="lead">Whether you run a boutique Pilates studio, a yoga space, a high-intensity fitness studio, a martial arts school, or a dance academy, MoDojo adapts to the way your business operates.</p></div>
        <div class="industry-grid reveal">${INDUSTRIES.map(industryCard).join('')}<article class="industry industry-more"><div class="industry-shade"></div><div class="industry-body"><h3>And more.</h3><p>If your business runs on people, bookings, and great experiences, MoDojo can help you run it better.</p></div></article></div>
      </div>
    </section>

    <section id="member-portal" class="journey">
      <div class="journey-blob" aria-hidden="true"></div>
      <div class="wrap">
        <h2 class="heading journey-title reveal">A flawless experience for your members.</h2>
        <div class="timeline reveal">
          <div class="timeline-wave" aria-hidden="true"><svg viewBox="0 0 1000 200" preserveAspectRatio="none" fill="none"><path d="M 125 150 Q 250 50 375 50 T 625 150 T 875 50" stroke="#121D3C" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round" opacity=".7" /></svg></div>
          <ol class="steps">${STEPS.map(stepItem).join('')}</ol>
        </div>
      </div>
    </section>

    <section id="insights" class="insights">
      <div class="wrap">
        <div class="insights-row">
          <div class="insights-copy reveal">
            <p class="kicker">Business Insights</p>
            <h2 class="display">Don't just manage <span>your business.</span> <span class="accent">Understand it.</span></h2>
            <p>Monitor key metrics such as Revenue, Active members, New leads, Lead conversion, Bookings, Attendance, Unpaid invoices, and Package activity.</p>
            <a class="link-arrow" href="${LINKS.insights}">Explore Business Insights ${icon('arrow_forward')}</a>
          </div>
          <div class="insights-visual reveal reveal-delay"><div class="insights-glow" aria-hidden="true"></div><div class="insights-shot"><img src="${IMG}/insights-dashboard.jpg" alt="The MoDojo Business Insights dashboard with revenue trends and attendance rates" width="512" height="286" loading="lazy" /></div></div>
        </div>
        <div class="stats reveal">${STATS.map(([label, value]) => `<div class="stat"><p>${label}</p><strong>${value}</strong></div>`).join('')}</div>
      </div>
    </section>

    <section class="testimonials">
      <div class="wrap">
        <div class="section-head reveal"><h2 class="display">Built for businesses that put their clients first.</h2></div>
        <div class="testi-grid reveal">${TESTIMONIALS.map(([quote, name, role]) => `<figure class="testi">${icon('format_quote')}<blockquote>“${quote}”</blockquote><figcaption><p class="testi-name">${name}</p><p class="testi-role">${role}</p></figcaption></figure>`).join('')}</div>
      </div>
    </section>

    <section id="pricing" class="pricing-section section">
      <div class="wrap">
        <div class="section-head reveal"><p class="kicker">Simple starting points</p><h2 class="display">Choose the rhythm that fits your studio.</h2><p class="lead">Start free, then pick the plan that matches where you are today. The plan you choose sets your workspace limits and features during signup.</p></div>
        <div class="pricing-grid" data-pricing-grid><p class="pricing-loading">Loading plans…</p></div>
      </div>
    </section>

    <section id="faq" class="faq">
      <div class="faq-inner">
        <div class="faq-head reveal"><h2 class="heading">Frequently Asked Questions</h2></div>
        <div class="faq-list reveal">${FAQS.map(faqItem).join('')}</div>
        <div class="faq-more reveal"><a class="link-arrow" href="${LINKS.faq}">View All FAQs ${icon('arrow_forward')}</a></div>
      </div>
    </section>

    <section id="contact" class="final-cta">
      <div class="final-cta-box reveal">
        <div class="final-cta-glow" aria-hidden="true"></div>
        <div class="final-cta-inner">
          <h2 class="display">Ready to make studio management simpler?</h2>
          <p class="lead">Join thousands of studio owners who have reclaimed their time and grown their business with MoDojo.</p>
          <div class="final-cta-actions"><a class="btn btn-orange btn-lg" href="${TRIAL_URL}">Start your 30-day free trial</a><button class="btn btn-ghost btn-lg" type="button" data-demo>Book a Demo</button></div>
          <p class="final-cta-note">No credit card required. Cancel anytime.</p>
        </div>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
const revealObserver = initReveal();

// --- Pricing: rendered from the live plan catalog so plans, benefits and price stay aligned ---
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const formatPrice = (plan) => {
  if (!plan.price || Number(plan.price) <= 0) return { amount: 'Free', interval: '' };
  const amount = 'Rp ' + new Intl.NumberFormat('id-ID').format(Number(plan.price));
  const interval = plan.billing_interval === 'annual' ? '/yr' : '/mo';
  return { amount, interval };
};

const LIMIT_LABELS = [
  ['members_count', 'members'],
  ['class_count', 'classes'],
  ['bookings_count', 'bookings'],
  ['staff_count', 'instructors'],
  ['branches_count', 'branches'],
];
const FEATURE_LABELS = { member_portal: 'Branded member portal', whatsapp: 'WhatsApp reminders', reports: 'Advanced reports', api_access: 'API access' };

const planBenefits = (plan) => {
  const items = [];
  if (Number(plan.trial_days) > 0) items.push(`Full access free for ${plan.trial_days} days`);
  const limits = plan.limits || {};
  if (Object.keys(limits).length === 0) {
    items.push('Unlimited members & bookings', 'Unlimited classes & schedule', 'Multiple branches & staff');
  } else {
    for (const [key, label] of LIMIT_LABELS) {
      if (limits[key] != null) items.push(`Up to ${limits[key]} ${label}`);
    }
  }
  Object.entries(plan.features || {}).forEach(([key, enabled]) => {
    if (enabled) items.push(FEATURE_LABELS[key] || key.replace(/_/g, ' '));
  });
  return items;
};

const planDescription = (plan) => {
  if (Number(plan.trial_days) > 0) return 'Explore everything MoDojo offers with a full-featured studio workspace.';
  const map = { growth: 'For studios ready to connect members, classes, and payments.', scale: 'For teams coordinating more locations and more visibility.' };
  return map[plan.key] || 'Everything your studio needs to run the day.';
};

const renderPlanCard = (plan, isFeatured) => {
  const { amount, interval } = formatPrice(plan);
  const isTrial = Number(plan.trial_days) > 0;
  const label = isTrial ? 'FREE TRIAL' : isFeatured ? 'MOST POPULAR' : 'PLAN';
  const note = isTrial ? 'No credit card required' : 'Billed monthly · cancel anytime';
  const cta = isTrial ? 'Start free trial' : `Start with ${escapeHtml(plan.name)}`;
  const benefits = planBenefits(plan).map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join('');
  return `<article class="pricing-card${isFeatured ? ' pricing-card-featured' : ''} reveal${isFeatured ? ' reveal-delay' : ''}">
    <span class="pricing-label">${label}</span>
    <h3>${escapeHtml(plan.name)}</h3>
    <p>${escapeHtml(planDescription(plan))}</p>
    <strong class="pricing-price">${amount}${interval ? `<span class="pricing-interval">${interval}</span>` : ''}</strong>
    <span class="pricing-note">${note}</span>
    <ul class="pricing-benefits">${benefits}</ul>
    <a class="button button-small" href="${APP_URL}/owner/register?plan=${encodeURIComponent(plan.key)}">${cta} <span>↗</span></a>
  </article>`;
};

const loadPlans = async () => {
  const grid = document.querySelector('[data-pricing-grid]');
  if (!grid) return;
  try {
    const response = await fetch(`${API_URL}/public/plans`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const payload = await response.json();
    const plans = Array.isArray(payload?.data) ? payload.data : [];
    if (plans.length === 0) throw new Error('No plans available');

    const maxPrice = Math.max(...plans.map((plan) => Number(plan.price) || 0));
    grid.innerHTML = plans
      .map((plan) => renderPlanCard(plan, maxPrice > 0 && Number(plan.price) === maxPrice))
      .join('');
    grid.setAttribute('data-count', String(plans.length));
    grid.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } catch (error) {
    grid.innerHTML = `<p class="pricing-error">Plans are unavailable right now. <a href="${TRIAL_URL}">Start your free trial ↗</a></p>`;
  }
};

loadPlans();
