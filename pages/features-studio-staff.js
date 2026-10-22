import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-studio-staff.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Studio & Staff content (Stitch: modojo_features_studio_staff). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;
const IMG = '/images/features/studio-staff';

const HIERARCHY = ['Tangerang Studio', 'PIK Studio', 'Bandung Studio'];

// Rows are [name, address, staff, icon, tone].
const LOCATIONS = [
  ['Tangerang Studio', '124 Main St.', 8, 'fitness_center', 'navy'],
  ['PIK Studio', '45 Park Ave.', 5, 'self_improvement', 'violet'],
  ['Bandung Studio', '99 West Blvd.', 12, 'sports_martial_arts', 'orange'],
];

// Rows are [title, text, icon, tone].
const BENEFITS = [
  ['Multiple Locations', 'Run everything from one centralized system. Perfect for growing businesses expanding to new neighborhoods.', 'dashboard', 'navy'],
  ['Organized Operations', 'Keep schedules, staff, and reporting neatly associated with their specific physical locations.', 'hub', 'orange'],
  ['Centralized Visibility', 'Get a bird\'s-eye view of your entire business without constantly switching between different systems.', 'visibility', 'violet'],
];

const TEAM_POINTS = [
  'Assign staff to one or multiple studio locations.',
  'Easily deactivate accounts when staff leaves.',
  'Clear overview of who is working where.',
];

// Rows are [name, role, studio, avatar]; an avatar is an image path or initials.
const TEAM = [
  ['Sarah Tan', 'Studio Manager', 'Bandung Studio', { src: `${IMG}/img-03.jpg` }],
  ['Michael Lee', 'Front Desk', 'PIK Studio', { initials: 'ML' }],
  ['Jessica Wong', 'Instructor', 'All Locations', { src: `${IMG}/img-04.jpg` }],
];

const PERMISSION_ACTIONS = ['View', 'Create', 'Edit', 'Delete'];

// Rows are [module, ...allowed flags in PERMISSION_ACTIONS order].
const PERMISSIONS = [
  ['Members', true, true, true, false],
  ['Classes', true, false, false, false],
  ['Bookings', true, true, true, true],
  ['Finance', false, false, false, false],
];

// Rows are [role, text, icon, tone].
const ROLES = [
  ['Instructor', 'Can view schedules, manage their own class rosters, and take attendance. No access to member billing or sensitive data.', 'sports_gymnastics', 'orange'],
  ['Finance', 'Full access to billing, invoices, and financial reports across all locations. Limited access to class scheduling.', 'account_balance', 'violet'],
];

// Rows are [title, text].
const STEPS = [
  ['Add locations', 'Create your HQ and map out all physical studio branches in the system.'],
  ['Add your team', 'Invite staff via email and assign them to their specific home studios.'],
  ['Set permissions', 'Assign roles to restrict access and keep your business data secure.'],
];

// Rows are [title, text, tone].
const VALUES = [
  ['Stay Organized', 'Stop relying on messy spreadsheets or disparate tools. Bring your entire organizational structure under one roof.', 'navy'],
  ['Stay Secure', 'Protect sensitive business metrics and client data by ensuring staff only see what they strictly need to see.', 'violet'],
  ['Stay in Control', 'As you scale from one location to ten, maintain the same level of oversight without the administrative headache.', 'orange'],
];

const SUMMARY = ['Multiple Studios', 'Employee Accounts', 'Role Permissions', 'Active/Inactive Status', 'Location Assignment'];

const hierarchyItem = (name) => `<li class="ss-tree-branch">${icon('subdirectory_arrow_right', 'ss-tree-arrow')}${icon('store', 'ss-tree-store')}<span>${name}</span></li>`;

const locationItem = ([name, address, staff, glyph, tone]) => `<li class="ss-location">
  <div class="ss-location-main">
    <span class="ss-location-icon is-${tone}">${icon(glyph)}</span>
    <div><p class="ss-location-name">${name}</p><p class="ss-location-meta">${address} · ${staff} Staff</p></div>
  </div>
  ${icon('more_vert', 'ss-location-more')}
</li>`;

const benefitCard = ([title, text, glyph, tone]) => `<article class="ss-card">
  <span class="ss-card-icon is-${tone}">${icon(glyph)}</span>
  <h3>${title}</h3>
  <p>${text}</p>
</article>`;

const teamRow = ([name, role, studio, avatar]) => `<li class="ss-team-row">
  <div class="ss-team-name">${avatar.src ? `<img src="${avatar.src}" alt="" width="32" height="32" loading="lazy" />` : `<span class="ss-avatar" aria-hidden="true">${avatar.initials}</span>`}<span>${name}</span></div>
  <div class="ss-team-role">${role}</div>
  <div class="ss-team-studio">${studio}</div>
  <div class="ss-team-status"><span class="ss-badge">Active</span></div>
</li>`;

const permissionCell = (allowed) => `<td>${allowed ? `${icon('check', 'ss-perm-yes')}<span class="sr-only">Allowed</span>` : `${icon('close', 'ss-perm-no')}<span class="sr-only">Not allowed</span>`}</td>`;

const roleCard = ([title, text, glyph, tone]) => `<article class="ss-role">
  <div class="ss-role-head">${icon(glyph, `is-${tone}`)}<h3>${title}</h3></div>
  <p>${text}</p>
</article>`;

const step = ([title, text], index) => `<li class="ss-step">
  <span class="ss-step-badge${index === STEPS.length - 1 ? ' is-filled' : ''}">0${index + 1}</span>
  <h3>${title}</h3>
  <p>${text}</p>
</li>`;

const valueItem = ([title, text, tone]) => `<article class="ss-value is-${tone}">
  <h3>${title}</h3>
  <p>${text}</p>
</article>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top">
    <header class="ss-hero feature-hero">
      <div class="ss-hero-bg" aria-hidden="true"></div>
      <div class="wrap ss-hero-grid">
        <div class="ss-hero-copy feature-hero-copy">
          <span class="ss-pill">Studio &amp; Staff Management</span>
          <h1>One platform for your entire team.</h1>
          <p class="ss-hero-lead feature-hero-lead">Whether you run one location or multiple studios, MoDojo helps you keep your people, locations, and day-to-day operations organized in one place.</p>
          <div class="ss-actions feature-hero-actions">
            <a class="btn btn-orange" href="${TRIAL_URL}"><span>Start Your Free Trial</span>${icon('arrow_forward', 'ss-btn-arrow')}</a>
            <button class="btn btn-outline" type="button" data-demo>Book a Demo</button>
          </div>
          <p class="ss-hero-note">${icon('check_circle')}30-day free trial · No credit card required</p>
        </div>
        <div class="ss-hero-visual" aria-hidden="true">
          <div class="ss-float-card">
            <div class="ss-float-head">
              <span class="ss-float-icon">${icon('storefront')}</span>
              <div><p class="ss-float-name">Downtown Studio</p><p class="ss-float-meta">Active · 4 Staff</p></div>
            </div>
            <span class="ss-bar"></span><span class="ss-bar ss-bar-short"></span>
          </div>
        </div>
      </div>
    </header>

    <section class="ss-section ss-locations" id="locations">
      <div class="ss-inner">
        <div class="ss-head reveal">
          <h2 class="heading">Manage your locations <span>from one place.</span></h2>
          <p class="lead">Organize your entire operation with a clear, hierarchical view of all your studios.</p>
        </div>
        <div class="ss-locations-card reveal">
          <div class="ss-locations-copy">
            <div class="ss-feature">
              <span class="ss-feature-icon">${icon('account_tree')}</span>
              <div>
                <h3>Organizational Hierarchy</h3>
                <p>Structure your business logically. Map out your parent organization down to individual studio locations with ease.</p>
              </div>
            </div>
            <ul class="ss-tree" aria-label="Example studio hierarchy">
              <li class="ss-tree-root">${icon('business')}<span>Your Studio</span></li>
              ${HIERARCHY.map(hierarchyItem).join('')}
            </ul>
          </div>
          <div class="ss-mock-frame" aria-hidden="true">
            <div class="ss-mock">
              <div class="ss-mock-bar">
                <span class="ss-mock-title">${icon('map')} Locations</span>
                <span class="ss-mock-add">Add Studio</span>
              </div>
              <ul class="ss-location-list">${LOCATIONS.map(locationItem).join('')}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ss-section ss-benefits">
      <div class="ss-inner">
        <div class="ss-card-grid reveal">${BENEFITS.map(benefitCard).join('')}</div>
      </div>
    </section>

    <section class="ss-section ss-team" id="team">
      <div class="ss-blob" aria-hidden="true"></div>
      <div class="ss-inner ss-team-grid">
        <div class="ss-team-copy reveal">
          <h2 class="heading">Give your team the access they need.</h2>
          <p class="lead">Add unlimited staff members and organize them by studio. Ensure everyone knows their role and has the right tools to do their job effectively.</p>
          <ul class="ss-checks">${TEAM_POINTS.map((point) => `<li>${icon('check_circle')}<span>${point}</span></li>`).join('')}</ul>
        </div>
        <div class="ss-team-panel reveal">
          <div class="ss-team-bar">
            <span class="ss-team-title">${icon('groups')}<span>Team Members</span></span>
            <span class="ss-team-tools" aria-hidden="true">
              <span class="ss-search">${icon('search')} Search</span>
              <span class="ss-add">${icon('add')}</span>
            </span>
          </div>
          <div class="ss-team-head" aria-hidden="true"><span>Name</span><span>Role</span><span>Assigned Studio</span><span>Status</span></div>
          <ul class="ss-team-list">${TEAM.map(teamRow).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="ss-section ss-roles" id="roles">
      <div class="ss-inner">
        <div class="ss-head reveal">
          <h2 class="heading">Everyone gets the right access.</h2>
          <p class="lead">Granular roles and permissions ensure your sensitive data is protected while giving staff exactly what they need to work efficiently.</p>
        </div>
        <div class="ss-roles-grid reveal">
          <div class="ss-matrix">
            <div class="ss-matrix-bar">
              <h3>Role Settings: Front Desk</h3>
              <span class="ss-matrix-edit" aria-hidden="true">${icon('edit')} Edit</span>
            </div>
            <div class="ss-matrix-scroll" tabindex="0" role="region" aria-label="Front Desk permissions">
              <table>
                <caption class="sr-only">Front Desk permissions by module</caption>
                <thead><tr><th scope="col">Module</th>${PERMISSION_ACTIONS.map((action) => `<th scope="col">${action}</th>`).join('')}</tr></thead>
                <tbody>${PERMISSIONS.map(([module, ...flags]) => `<tr><th scope="row">${module}</th>${flags.map(permissionCell).join('')}</tr>`).join('')}</tbody>
              </table>
            </div>
          </div>
          <div class="ss-role-list">${ROLES.map(roleCard).join('')}</div>
        </div>
      </div>
    </section>

    <section class="ss-section ss-steps-section">
      <div class="ss-inner">
        <h2 class="ss-steps-title reveal">Set up your team in minutes</h2>
        <ol class="ss-steps reveal">${STEPS.map(step).join('')}</ol>
      </div>
    </section>

    <section class="ss-section ss-values">
      <div class="ss-inner">
        <div class="ss-values-grid reveal">${VALUES.map(valueItem).join('')}</div>
      </div>
    </section>

    <section class="ss-summary" aria-label="Studio and staff features">
      <ul class="ss-inner ss-summary-list">${SUMMARY.map((item) => `<li>${icon('done')}${item}</li>`).join('')}</ul>
    </section>

    <section class="ss-cta">
      <div class="ss-cta-inner reveal">
        <h2 class="heading">Run your business with confidence.</h2>
        <p class="lead">Join thousands of studios managing their staff and locations effortlessly with MoDojo.</p>
        <div class="ss-actions ss-actions-center">
          <a class="btn btn-orange" href="${TRIAL_URL}"><span>Start Your 30-Day Free Trial</span>${icon('arrow_forward', 'ss-btn-arrow')}</a>
          <button class="btn btn-outline" type="button" data-demo>Book a Demo</button>
        </div>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
