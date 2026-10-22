import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-run-your-classes.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Page content (Stitch: modojo_features_run_your_classes). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;
const IMG = '/images/features/run-your-classes';

const PROBLEMS = [
  { tone: 'red', icon: 'event_busy', badge: 'Alert', title: 'Too many schedules', text: 'Fragmented calendars and overlapping sessions lead to staff burnout and missed classes.' },
  { tone: 'amber', icon: 'meeting_room', badge: 'Warning', title: 'Room conflicts', text: 'Double-booked studios, displaced members, and chaotic scrambles for physical space.' },
  { tone: 'red', icon: 'groups', badge: 'Critical', title: 'Capacity headaches', text: 'Overcrowded rooms violating safety limits, or half-empty classes bleeding studio revenue.' },
  { tone: 'amber', icon: 'update', badge: 'Disruption', title: 'Last-minute changes', text: 'Instructor callouts and sudden cancellations turning front desk shifts into panic mode.' },
];

// Orbit nodes: x/y are percentages of the ring box. Tone picks the icon colour and its hover fill.
const ORBIT = {
  outer: [
    { label: 'Members', icon: 'person', tone: 'indigo', href: LINKS.customers, x: 50, y: 0 },
    { label: 'Payments', icon: 'payments', tone: 'orange', href: LINKS.payments, x: 93.3, y: 75 },
    { label: 'Bookings', icon: 'book_online', tone: 'orange', href: '#bookings', x: 6.7, y: 75 },
  ],
  inner: [
    { label: 'Attendance', icon: 'how_to_reg', tone: 'slate', href: '#attendance', x: 0, y: 50 },
    { label: 'Rooms', icon: 'meeting_room', tone: 'slate', href: '#rooms', x: 86, y: 14 },
    { label: 'Instructors', icon: 'sports_martial_arts', tone: 'indigo', href: '#instructors', x: 86, y: 86 },
  ],
};

const problemCard = ({ tone, icon: name, badge, title, text }, index) => `<article class="rc-problem rc-problem-${tone} reveal${index % 2 ? ' reveal-delay' : ''}">
    <span class="rc-problem-icon">${icon(name)}</span>
    <span class="rc-problem-badge"><i aria-hidden="true"></i>${badge}</span>
    <h3>${title}</h3>
    <p>${text}</p>
  </article>`;

const checkItem = (html) => `<li><span class="rc-check">${icon('check')}</span><span>${html}</span></li>`;
const checkList = (items) => `<ul class="rc-checks">${items.map(checkItem).join('')}</ul>`;

const orbitNode = ({ label, icon: name, tone, href, x, y }) => `<div class="rc-node" style="--x:${x}%;--y:${y}%">
          <a class="rc-node-link rc-tone-${tone}" href="${href}"><span class="rc-node-icon">${icon(name)}</span><span class="rc-node-label">${label}</span></a>
        </div>`;

const orbitRing = (kind, nodes) => `<div class="rc-ring rc-ring-${kind}">${nodes.map(orbitNode).join('')}</div>`;

const avatar = (initials, className = '') => `<span class="rc-avatar ${className}" aria-hidden="true">${initials}</span>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top">
    <section class="rc-hero feature-hero">
      <img class="rc-hero-bg" src="${IMG}/img-02.jpg" alt="" width="512" height="286" fetchpriority="high" />
      <div class="rc-hero-shade"></div>
      <div class="wrap feature-hero-inner">
        <div class="feature-hero-copy reveal">
          <span class="rc-chip">Product Feature</span>
          <h1>Run Your Classes</h1>
          <p class="feature-hero-lead">Take the chaos out of your daily schedule. Manage instructors, rooms, capacities, and bookings from one connected interface that makes running your studio feel effortless.</p>
          <div class="rc-actions feature-hero-actions">
            <a class="btn btn-orange" href="${TRIAL_URL}">Start Your Free Trial ${icon('arrow_forward')}</a>
            <button class="btn btn-outline rc-btn-demo" type="button" data-demo>${icon('play_circle')} Watch Demo</button>
          </div>
        </div>
      </div>
    </section>

    <section class="rc-section rc-problem-section">
      <div class="rc-inner">
        <h2 class="heading rc-center reveal">Your schedule shouldn't <br class="rc-br" />slow you down.</h2>
        <div class="rc-problem-grid">${PROBLEMS.map(problemCard).join('')}</div>
      </div>
    </section>

    <section class="rc-section rc-lavender" id="scheduling">
      <div class="rc-inner rc-split">
        <div class="rc-visual rc-visual-first reveal">
          <div class="rc-glow" aria-hidden="true"></div>
          <img class="rc-shot" src="${IMG}/img-03.jpg" alt="MoDojo weekly class calendar showing scheduled sessions, instructors and room availability" width="512" height="286" loading="lazy" />
          <div class="rc-float rc-float-classes">
            <h4>Today's Classes ${icon('bolt', 'rc-orange')}</h4>
            <div class="rc-today">
              <div class="rc-today-row"><i class="rc-bar rc-bar-orange" aria-hidden="true"></i><div><p>HIIT Power</p><small>09:00 AM • Studio A</small></div><span class="rc-pill rc-pill-indigo">20/20</span></div>
              <div class="rc-today-row"><i class="rc-bar rc-bar-navy" aria-hidden="true"></i><div><p>Yoga Flow</p><small>10:30 AM • Studio B</small></div><span class="rc-pill rc-pill-orange">15/18</span></div>
            </div>
          </div>
        </div>
        <div class="rc-copy reveal reveal-delay">
          <p class="kicker">Scheduling Engine</p>
          <h2 class="heading">Build a schedule that works automatically.</h2>
          <p class="lead">Create single classes, recurring sessions, or complex programs in seconds. Our smart scheduling engine prevents conflicts before they happen.</p>
          ${checkList(['<strong>Instructor availability</strong> is verified instantly', '<strong>Room capacity</strong> limits are strictly enforced'])}
          <a class="link-arrow" href="${LINKS.classes}">Explore Classes &amp; Scheduling ${icon('arrow_forward')}</a>
        </div>
      </div>
    </section>

    <section class="rc-section rc-surface" id="bookings">
      <div class="rc-inner rc-split">
        <div class="rc-copy reveal">
          <p class="kicker">Bookings</p>
          <h2 class="heading">Make booking simple for everyone.</h2>
          <p class="lead">Provide a seamless booking experience for your members while keeping control over your class capacities and waitlists.</p>
          ${checkList(['Class capacity', 'Waitlists', 'Booking status', 'Member booking history'])}
          <p class="rc-note">Fewer messages. Fewer manual bookings.</p>
        </div>
        <div class="rc-visual rc-visual-bookings reveal reveal-delay">
          <div class="rc-panel">
            <div class="rc-panel-head"><h4>Manage Bookings</h4>${icon('more_horiz')}</div>
            <div class="rc-panel-body">
              <div class="rc-panel-title"><div><p>Pilates Reformer</p><small>Today • 6:00 PM</small></div><span class="rc-pill rc-pill-orange">8 Spots left</span></div>
              <ul class="rc-people">
                <li><span>${avatar('JD')}Jane Doe</span><span class="rc-pill rc-pill-navy">Booked</span></li>
                <li><span>${avatar('MS')}Mark Smith</span><span class="rc-pill rc-pill-navy">Booked</span></li>
              </ul>
            </div>
          </div>
          <div class="rc-float rc-float-phone" style="animation-delay:1s">
            <div class="rc-phone-head"><div><h5>Pilates Reformer</h5><p>6:00 PM · Studio A</p></div><span class="rc-heart">${icon('favorite')}</span></div>
            <p class="rc-spots">${icon('group')}<strong>8 spots available</strong></p>
            <span class="btn btn-orange rc-phone-btn">Book Class</span>
          </div>
        </div>
      </div>
    </section>

    <section class="rc-section rc-low" id="attendance">
      <div class="rc-inner rc-center">
        <div class="reveal">
          <h2 class="heading">Check in without the clipboard.</h2>
          <p class="lead rc-attendance-lead">Make attendance fast and simple with QR check-in.</p>
        </div>
        <ol class="rc-steps">
          <li class="reveal"><span class="rc-step-dot">01</span><h3>Scan</h3><p>Members scan the studio QR code.</p></li>
          <li class="reveal reveal-delay"><span class="rc-step-dot rc-step-dot-active">02</span><h3>Check In</h3><p>Confirm details on their own device.</p></li>
          <li class="reveal reveal-delay"><span class="rc-step-dot">03</span><h3>Done</h3><p>Attendance is updated instantly.</p></li>
        </ol>
        <div class="rc-checkin reveal">
          <div class="rc-phone">
            <span class="rc-phone-check">${icon('check_circle')}</span>
            <h4>You're Checked In</h4>
            <p>Enjoy your workout!</p>
            <i class="rc-line" aria-hidden="true"></i><i class="rc-line rc-line-short" aria-hidden="true"></i>
          </div>
          <div class="rc-live">
            <h4>Live Attendance <span class="rc-live-badge"><i aria-hidden="true"></i>Live</span></h4>
            <ul>
              <li><span class="rc-live-who">${avatar('AJ', 'rc-avatar-lg')}<span><b>Alex Johnson</b><small>HIIT Power</small></span></span>${icon('check_circle', 'rc-navy')}</li>
              <li><span class="rc-live-who">${avatar('KL', 'rc-avatar-lg')}<span><b>Katie Lee</b><small>HIIT Power</small></span></span>${icon('check_circle', 'rc-navy')}</li>
            </ul>
          </div>
        </div>
        <p class="rc-note rc-note-center reveal">Less time checking names. More time welcoming members.</p>
      </div>
    </section>

    <section class="rc-section rc-surface" id="instructors">
      <div class="rc-inner rc-split">
        <div class="rc-visual rc-visual-first rc-visual-center reveal">
          <div class="rc-glow rc-glow-corner" aria-hidden="true"></div>
          <div class="rc-card rc-instructor">
            <div class="rc-instructor-head">
              <span class="rc-avatar-xl" aria-hidden="true">ST</span>
              <div><h4>Sarah Tan</h4><p>Pilates · Yoga</p></div>
              <span class="rc-certified">${icon('verified')} Certified</span>
            </div>
            <h5>Assigned Classes</h5>
            <div class="rc-tags"><span>Pilates Reformer</span><span>Pilates Mat</span><span>Yoga Flow</span></div>
            <div class="rc-instructor-today">
              <h5>Today's Schedule</h5>
              <div class="rc-session"><div><p>Pilates Reformer</p><small>08:00 AM - 09:00 AM</small></div><b class="rc-orange">Upcoming</b></div>
              <div class="rc-session"><div><p>Yoga Flow</p><small>10:30 AM - 11:30 AM</small></div><b>Scheduled</b></div>
            </div>
          </div>
        </div>
        <div class="rc-copy reveal reveal-delay">
          <p class="kicker">Instructors</p>
          <h2 class="heading">Keep your instructors organized.</h2>
          <p class="lead">Manage instructor profiles, availability, specialty, and class assignments in one central location. Empower your team to deliver great experiences.</p>
        </div>
      </div>
    </section>

    <section class="rc-section rc-low" id="rooms">
      <div class="rc-inner rc-split">
        <div class="rc-copy reveal">
          <p class="kicker">Rooms</p>
          <h2 class="heading">Know what's happening in every room.</h2>
          <p class="lead">Maximize your studio space and prevent double-bookings with clear, visual room management.</p>
          <p class="rc-note">Keep your rooms organized and your schedule running smoothly.</p>
        </div>
        <div class="rc-card rc-rooms reveal reveal-delay">
          <h4>Room Status</h4>
          <div class="rc-room rc-room-busy">
            <div class="rc-room-head">
              <div><h5>Studio A - Room 01</h5><p>${icon('groups')} 12 cap</p></div>
              <span class="rc-status rc-status-busy">${icon('warning')} In Use</span>
            </div>
            <div class="rc-room-class">${avatar('ST', 'rc-avatar-navy')}<div><p>Pilates Reformer (Sarah Tan)</p><small>08:00 AM - 09:00 AM</small></div></div>
          </div>
          <div class="rc-room rc-room-free">
            <div class="rc-room-head">
              <div><h5>Studio A - Room 02</h5><p>${icon('groups')} 20 cap</p></div>
              <span class="rc-status rc-status-free">Available</span>
            </div>
            <div class="rc-room-class rc-room-next"><p>Next class at 10:30 AM</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="rc-section rc-surface rc-orbit-section" id="hub">
      <div class="rc-inner">
        <div class="rc-orbit-head reveal">
          <h2 class="heading">The center of your studio universe.</h2>
          <p class="lead">In MoDojo, the class isn't just an event on a calendar. It's the hub that connects your entire business together.</p>
        </div>
        <div class="rc-orbit reveal">
          <svg class="rc-tracks" viewBox="0 0 640 640" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="rc-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#121d3c" stop-opacity="0.08" />
                <stop offset="60%" stop-color="#121d3c" stop-opacity="0.03" />
                <stop offset="100%" stop-color="#121d3c" stop-opacity="0" />
              </radialGradient>
            </defs>
            <circle cx="320" cy="320" r="300" fill="url(#rc-glow)" />
            <circle class="rc-track rc-track-outer" cx="320" cy="320" r="275" />
            <circle class="rc-track rc-track-inner" cx="320" cy="320" r="185" />
          </svg>
          <div class="rc-hub"><span>Classes</span><i aria-hidden="true"></i><b class="rc-ping" aria-hidden="true"></b></div>
          ${orbitRing('outer', ORBIT.outer)}
          ${orbitRing('inner', ORBIT.inner)}
        </div>
      </div>
    </section>

    <section class="rc-cta">
      <div class="rc-cta-inner reveal">
        <h2>Make every class easier to manage.</h2>
        <p class="lead">Join hundreds of premium studios using MoDojo to streamline their daily operations.</p>
        <div class="rc-actions rc-actions-center">
          <a class="btn btn-orange" href="${TRIAL_URL}">Start Your Free Trial ${icon('arrow_forward')}</a>
          <button class="btn rc-btn-light" type="button" data-demo>Book a Demo</button>
        </div>
        <p class="rc-cta-note">30-day free trial · No credit card required</p>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
