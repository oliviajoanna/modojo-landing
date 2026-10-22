import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-member-portal.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Member Portal feature page (Stitch: modojo_features_member_portal_complete). Icons are Material Symbols ligatures.
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;
const checkList = (items, className = '') => `<ul class="mp-checks ${className}">${items.map((item) => `<li>${icon('check_circle')}<span>${item}</span></li>`).join('')}</ul>`;

const PORTAL_FEATURES = ['Sign up', 'Sign in', 'Manage their profile', 'View their packages', 'Browse available classes', 'Book classes', 'Cancel bookings', 'Join waitlists', 'Make payments', 'View their activity'];

const BOOKING_ACTIONS = [
  ['search', 'Browse classes'],
  ['event_available', 'Book instantly'],
  ['edit_calendar', 'Manage bookings'],
  ['group_add', 'Join the waitlist'],
];

// Placeholder "UI" blocks used by the self-service and journey cards. `w` is any CSS width.
const bar = (w = '100%', tone = '') => `<i class="mp-bar ${tone}" style="width:${w}"></i>`;
const dots = (on) => `<div class="mp-dots">${on.map((active) => `<i class="mp-dot${active ? ' is-on' : ''}"></i>`).join('')}</div>`;

const SELF_SERVICE = [
  ['Check their schedule', `<div class="mp-mock mp-mock-col">${bar('75%')}${bar('50%')}${dots([1, 0, 0, 1, 0, 0, 0])}</div>`],
  ['Manage their package', `<div class="mp-mock mp-mock-row"><div class="mp-mock-col">${bar('48px')}${bar('32px', 'is-dark')}</div><span class="mp-ring">8</span></div>`],
  ['Update their profile', `<div class="mp-mock mp-mock-row"><i class="mp-avatar"></i><div class="mp-mock-col mp-grow">${bar()}${bar('66%')}</div></div>`],
  ['Make payments', `<div class="mp-mock mp-mock-col"><div class="mp-mock-between">${bar('40px')}${bar('24px', 'is-orange')}</div><div class="mp-track">${bar('100%')}</div></div>`],
];

const PAYMENT_MEMBER = ['View payment information', 'Complete payments online', 'See payment status', 'Access their transaction information'];

const NOTIFICATIONS = [
  ['booking', 'check_circle', 'Booking Confirmed', 'Your Pilates class is booked for tomorrow at 9:00 AM.'],
  ['reminder', 'notifications_active', 'Class Reminder', 'Your class starts in 1 hour. Morning Pilates 9:00 AM'],
  ['payment', 'payments', 'Payment Update', 'Your payment has been successfully received.'],
];

const JOURNEY = [
  ['Sign Up', 'Create an account and become a member.', `<i class="mp-avatar"></i>${bar()}${bar('66%')}`],
  ['Explore', 'Discover classes, packages, and available sessions.', `<div class="mp-mock-between">${bar('50%', 'is-accent')}${bar('16px')}</div><div class="mp-tiles"><i></i><i></i></div>`],
  ['Book &amp; Pay', 'Reserve a class and complete payment.', `${icon('check_circle', 'mp-step-check')}${bar('80px')}`],
  ['Come Back', 'Manage upcoming bookings and continue their studio journey.', '<div class="mp-pill-dark"><i></i></div><div class="mp-pill-light"></div>'],
];

const FOR_MEMBERS = [
  ['Simple', 'Everything they need is easy to find in one intuitive interface.'],
  ['Convenient', 'Book and manage their studio activities whenever they want, 24/7.'],
  ['Accessible', 'Their studio experience is available from their phone, wherever they are.'],
];

const FOR_TEAM = [
  ['Fewer repetitive questions', 'Members can find information themselves without calling or messaging.'],
  ['Fewer manual bookings', 'Members can book their own classes, freeing up your front desk.'],
  ['Less payment follow-up', 'Members can complete payments through their portal, reducing admin time.'],
  ['More time for your clients', 'Your team can focus on creating great experiences instead of handling repetitive admin.'],
];

const phoneClasses = [
  ['self_improvement', 'Vinyasa Flow', 'Tomorrow, 9:00 AM'],
  ['fitness_center', 'HIIT Strength', 'Tomorrow, 5:30 PM'],
];
const phoneTabs = [['home', 'Home', true], ['calendar_month', 'Schedule'], ['inventory_2', 'Packages'], ['person', 'Profile']];

// Decorative phone mockup: the member's home screen with three floating cards around it.
const phone = () => `<div class="mp-stage">
    <div class="mp-phone" role="img" aria-label="MoDojo member portal home screen with an upcoming Morning Pilates class, a 10-class pack and the next classes to book">
      <div class="mp-phone-status"><b>9:41</b><span>${icon('signal_cellular_alt')}${icon('wifi')}${icon('battery_full')}</span></div>
      <div class="mp-phone-head"><span class="mp-phone-brand"><i>M</i>MoDojo</span><span class="mp-phone-user">${icon('person')}</span></div>
      <div class="mp-phone-body">
        <h3>Good morning,<br />Sarah</h3>
        <div class="mp-phone-hero">
          <p>UPCOMING CLASS</p>
          <h4>Morning Pilates</h4>
          <small>Today, 8:00 AM - 9:00 AM</small>
          <div><span><i></i>Elena G.</span><b>Details</b></div>
        </div>
        <div class="mp-phone-row"><h4>Your Packages</h4><span>View all</span></div>
        <div class="mp-phone-card mp-phone-pack"><div><h5>10-Class Pack</h5><small>4 classes remaining</small></div><span class="mp-ring">4</span></div>
        <div class="mp-phone-row"><h4>Book Next</h4><span>Schedule</span></div>
        <div class="mp-phone-list">${phoneClasses.map(([name, label, time]) => `<div class="mp-phone-card mp-phone-class"><span>${icon(name)}</span><div><h5>${label}</h5><small>${time}</small></div></div>`).join('')}</div>
      </div>
      <div class="mp-phone-tabs">${phoneTabs.map(([name, label, active]) => `<span${active ? ' class="is-active"' : ''}>${icon(name)}<small>${label}</small></span>`).join('')}</div>
      <i class="mp-phone-bar"></i>
    </div>
    <div class="mp-float mp-float-booking"><span class="mp-float-icon is-violet">${icon('check')}</span><div><b>Booking Confirmed</b><small>Morning Pilates</small></div></div>
    <div class="mp-float mp-float-payment"><span class="mp-float-icon is-navy">${icon('credit_card')}</span><div><b>Payment Successful</b><small>10-Class Pack</small></div></div>
    <div class="mp-float mp-float-next"><small class="mp-float-kicker">NEXT CLASS</small><b>Vinyasa Flow</b><small>Starts in 45 min</small></div>
  </div>`;

const notification = ([key, name, title, text]) => `<div class="mp-notice mp-notice-${key}"><span class="mp-notice-icon">${icon(name)}</span><div><b>${title}</b><small>${text}</small></div></div>`;

const stepCard = ([title, text, mock], index) => `<li class="mp-step reveal"><span class="mp-step-badge">0${index + 1}</span><h3>${title}</h3><p>${text}</p><div class="mp-step-mock" aria-hidden="true">${mock}</div></li>`;
const pointList = (points) => `<div class="mp-points">${points.map(([title, text]) => `<div><h4>${title}</h4><p>${text}</p></div>`).join('')}</div>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top" class="mp-main">
    <section class="mp-hero feature-hero">
      <img class="mp-hero-bg" src="/hero/studio-collage.png" alt="" width="1672" height="941" />
      <div class="mp-hero-shade" aria-hidden="true"></div>
      <div class="wrap feature-hero-inner">
        <div class="mp-hero-copy feature-hero-copy reveal">
          <h1>Member<br>Experience</h1>
          <p class="mp-hero-lead feature-hero-lead">Give your member a simple digital experience for discovering classes, booking sessions, managing their membership, and making payments from their own device.</p>
          <div class="mp-hero-actions feature-hero-actions">
            <a class="btn btn-orange" href="${TRIAL_URL}"><span>Start Your Free Trial</span>${icon('arrow_forward')}</a>
            <a class="btn btn-outline" href="#portal">See How It Works</a>
          </div>
          <p class="mp-hero-note">${icon('check_circle')}<span>Book · Pay · Manage · Stay Connected</span></p>
        </div>
      </div>
    </section>

    <section class="mp-intro">
      <div class="wrap reveal"><h2 class="heading">A better experience for your members.</h2></div>
    </section>

    <section class="mp-section mp-portal" id="portal">
      <div class="wrap mp-split">
        <div class="mp-copy reveal">
          <p class="mp-kicker">Member Portal</p>
          <h2 class="heading">Everything your members need.</h2>
          <p class="lead">Give members one simple place to manage their relationship with your studio.</p>
          ${checkList(PORTAL_FEATURES, 'mp-checks-grid')}
          <p class="mp-quote">One simple portal. Everything your members need to stay connected to your studio.</p>
        </div>
        <div class="mp-visual reveal reveal-delay">${phone()}</div>
      </div>
    </section>

    <section class="mp-section mp-booking">
      <div class="wrap mp-split mp-split-wide">
        <div class="mp-shot reveal"><img src="/images/features/member-portal/img-03.jpg" alt="MoDojo Member Portal Class Booking Interface" width="512" height="382" loading="lazy" /></div>
        <div class="mp-copy reveal reveal-delay">
          <p class="mp-kicker">Class Booking</p>
          <h2 class="heading">Finding and booking a class should be effortless.</h2>
          <p class="lead">Members can browse your available classes, check schedules, and reserve their spot without sending a message or waiting for your staff to respond.</p>
          <ul class="mp-actions">${BOOKING_ACTIONS.map(([name, label]) => `<li>${icon(name)}<h3>${label}</h3></li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="mp-section mp-self" id="self-service">
      <div class="wrap">
        <div class="mp-head reveal">
          <p class="mp-kicker">Self-Service</p>
          <h2 class="heading">Let members take care of the little things themselves.</h2>
          <p class="lead">Your staff shouldn't have to answer the same questions all day.</p>
        </div>
        <ol class="mp-self-grid">${SELF_SERVICE.map(([title, mock], index) => `<li class="mp-self-card reveal"><span class="mp-self-num">0${index + 1}</span><h3>${title}</h3><div aria-hidden="true">${mock}</div></li>`).join('')}</ol>
        <p class="mp-closing reveal">Less back-and-forth for your team. More independence for your members.</p>
      </div>
    </section>

    <section class="mp-section mp-payments">
      <div class="wrap mp-split">
        <div class="mp-copy reveal">
          <p class="mp-kicker is-navy">Payments</p>
          <h2 class="heading">Pay without the back-and-forth.</h2>
          <p class="lead">Members can complete payments through their portal, making the process simpler for both the member and your staff.</p>
          <h3 class="mp-sub">Simple for members.</h3>
          ${checkList(PAYMENT_MEMBER)}
          <h3 class="mp-sub">Better for your team.</h3>
          <p class="mp-body">Reduce manual payment confirmations and unnecessary conversations about whether a payment has been completed.</p>
          <p class="mp-powered"><span>Payments powered through</span><b>DOKU</b></p>
        </div>
        <div class="mp-shot mp-shot-narrow reveal reveal-delay"><img src="/images/features/member-portal/img-04.jpg" alt="MoDojo Member Portal Payment Interface" width="512" height="512" loading="lazy" /></div>
      </div>
    </section>

    <section class="mp-connected" id="notifications">
      <div class="mp-glow" aria-hidden="true"></div>
      <div class="wrap mp-split">
        <div class="mp-connected-copy reveal">
          <p class="mp-kicker is-light">Stay Connected</p>
          <h2>Keep your members in the loop.</h2>
          <p>Important information shouldn't get lost in a chat thread. Keep members informed about their studio experience with relevant notifications and updates.</p>
        </div>
        <div class="mp-notices reveal reveal-delay">${NOTIFICATIONS.map(notification).join('')}</div>
      </div>
    </section>

    <section class="mp-section mp-journey">
      <div class="wrap">
        <div class="mp-head reveal">
          <p class="mp-kicker is-navy">The Member Journey</p>
          <h2 class="heading">From first sign-up to their next class.</h2>
          <p class="lead">Create a simple member journey showing how MoDojo helps members interact with the studio throughout their experience.</p>
        </div>
        <ol class="mp-steps">${JOURNEY.map(stepCard).join('')}</ol>
      </div>
    </section>

    <section class="mp-section mp-everyone">
      <div class="wrap">
        <div class="mp-head reveal">
          <p class="mp-kicker is-navy">Better for Everyone</p>
          <h2 class="heading">A better member experience means less work for your team.</h2>
        </div>
        <div class="mp-everyone-grid">
          <div class="mp-column reveal"><h3 class="is-violet">For your members</h3>${pointList(FOR_MEMBERS)}</div>
          <div class="mp-column mp-column-team reveal reveal-delay"><h3>For your team</h3>${pointList(FOR_TEAM)}</div>
        </div>
      </div>
    </section>

    <section class="mp-showcase">
      <div class="wrap">
        <div class="mp-head reveal">
          <p class="mp-kicker">MoDojo Member Portal</p>
          <h2 class="heading">Everything your members need. One simple experience.</h2>
        </div>
        <div class="mp-showcase-shot reveal"><img src="/images/features/member-portal/img-05.jpg" alt="MoDojo Member Portal Showcase" width="512" height="286" loading="lazy" /></div>
      </div>
    </section>

    <section class="mp-cta">
      <div class="mp-cta-inner reveal">
        <h2 class="display">Give your members an experience they'll want to come back to.</h2>
        <p class="lead">Make booking, payments, and member management simpler for everyone while giving your team more time to focus on your business.</p>
        <a class="btn btn-orange btn-lg" href="${TRIAL_URL}"><span>Start Your 30-Day Free Trial</span>${icon('arrow_forward')}</a>
        <p class="mp-cta-note">No credit card required.</p>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
