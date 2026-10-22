import { createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './blog.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Blog listing (Stitch: modojo_blog). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name) => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
const IMG = '/images';

const CATEGORIES = ['Lifestyle', 'Wellness', 'Sports', 'Fitness', 'Health'];

// [title, category, date (ISO), image, image alt, image focal point]. Copy is the design's placeholder text.
const ARTICLES = [
  ['Consectetur Adipiscing Elit: The Science of Restorative Movement', 'Wellness', '2024-10-24', 'homepage/industry-yoga-pilates.jpg', 'Sunlit minimalist boutique yoga and pilates studio interior'],
  ['Incididunt Ut Labore: 5 Daily Routines for Peak Physical Fitness', 'Fitness', '2024-10-21', 'features/manage-your-customers/img-02.jpg', 'Bright contemporary studio where members chat beside a reception counter'],
  ['Sed Do Eiusmod Tempor: High-Performance Athletic Conditioning', 'Sports', '2024-10-18', 'homepage/industry-fitness.jpg', 'High-end functional training athletic facility with free weights'],
  ['Lorem Ipsum Dolor Sit Amet: Building a Thriving Boutique Studio', 'Lifestyle', '2024-10-15', 'homepage/industry-dance.jpg', 'Spacious airy dance movement studio with light oak floors and mirrored walls'],
  ['Duis Aute Irure Dolor: Holistic Nutrition and Mind-Body Balance', 'Health', '2024-10-12', 'homepage/industry-cooking.jpg', 'Clean architectural culinary workshop space with natural prep counters'],
  ['Excepteur Sint Occaecat: Optimizing Instructor Energy and Focus', 'Fitness', '2024-10-09', 'features/business-insights/img-02.jpg', 'Studio team reviewing member data together around a table'],
  ['Cupidatat Non Proident: Creating Sacred Spaces in Modern Dojos', 'Sports', '2024-10-04', 'homepage/industry-martial-arts.jpg', 'Minimalist martial arts training dojo with pristine floor mats'],
  ['Sunt In Culpa Qui Officia: Mindful Breathing and Daily Wellness', 'Wellness', '2024-09-28', 'homepage/industry-yoga-pilates.jpg', 'Serene wellness space with premium floor mats and soft natural lighting', 'right'],
  ['Voluptate Velit Esse Cillum: How Community Connection Drives Retention', 'Lifestyle', '2024-09-22', 'features/run-your-classes/img-02.jpg', 'Welcoming studio reception with members socializing after a session'],
];

const formatDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });

const filterButton = (label, value, pressed) => `<button class="blog-filter" type="button" data-category="${value}" aria-pressed="${pressed}">${label}</button>`;
const articleCard = ([title, category, date, image, alt, focus]) => `<article class="blog-card reveal" data-category="${category}">
  <div class="blog-card-media"><img src="${IMG}/${image}" alt="${alt}" width="512" height="286" loading="lazy"${focus ? ` style="object-position:${focus} center"` : ''} /></div>
  <div class="blog-card-body">
    <h2>${title}</h2>
    <div class="blog-card-meta"><span class="blog-tag">${category}</span><time datetime="${date}">${formatDate(date)}</time></div>
  </div>
</article>`;

app.innerHTML = `${renderHeader(LINKS, 'blog')}

  <main id="top">
    <section class="blog-intro">
      <div class="blog-wrap">
        <h1 class="blog-kicker">Our Blog &amp; Insights</h1>
        <div class="blog-controls">
          <div class="blog-filters" role="group" aria-label="Article categories">${filterButton('All', 'all', true)}${CATEGORIES.map((category) => filterButton(category, category, false)).join('')}</div>
          <div class="blog-search">${icon('search')}<input id="article-search" type="search" placeholder="Search articles..." aria-label="Search articles" autocomplete="off" /></div>
        </div>
      </div>
    </section>

    <section class="blog-listing" aria-label="Articles">
      <div class="blog-wrap">
        <div class="blog-grid" data-articles>${ARTICLES.map(articleCard).join('')}</div>
        <div class="blog-empty" data-empty role="status" hidden>
          <span class="blog-empty-icon">${icon('manage_search')}</span>
          <h2>No articles found matching your search.</h2>
          <p>Try adjusting your search terms or selecting another category to discover insights.</p>
          <button class="blog-btn blog-btn-soft" type="button" data-reset>Clear Filters</button>
        </div>
        <div class="blog-more"><button class="blog-btn blog-btn-white" type="button" data-more><span>Load More Articles</span>${icon('expand_more')}</button></div>
      </div>
    </section>

    <section class="blog-newsletter">
      <div class="blog-wrap">
        <div class="blog-newsletter-card reveal">
          <span class="blog-newsletter-glow" aria-hidden="true"></span>
          <div class="blog-newsletter-copy">
            <span class="blog-chip">Curated Knowledge</span>
            <h2>Stay inspired. Get the latest studio insights delivered to your inbox.</h2>
            <p>Join thousands of studio owners receiving weekly strategies on member growth, staff leadership, and wellness business operations.</p>
          </div>
          <div class="blog-newsletter-form">
            <form data-subscribe>
              <input type="email" name="email" placeholder="Enter your work email" aria-label="Email address" autocomplete="email" required />
              <button class="blog-btn blog-btn-orange" type="submit">Subscribe</button>
            </form>
            <p class="blog-newsletter-note" data-subscribe-note>No spam ever. Unsubscribe at any time with one click.</p>
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

// Category filter + search: toggles the `hidden` attribute on cards; shows the empty state when nothing matches.
const cards = [...document.querySelectorAll('.blog-card')];
const filters = [...document.querySelectorAll('.blog-filter')];
const search = document.querySelector('#article-search');
const empty = document.querySelector('[data-empty]');
const more = document.querySelector('[data-more]');
let category = 'all';

const update = () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matches = (category === 'all' || card.dataset.category === category)
      && (!query || `${card.querySelector('h2').textContent} ${card.dataset.category}`.toLowerCase().includes(query));
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  empty.hidden = visible > 0;
  more.closest('.blog-more').hidden = visible === 0;
};

filters.forEach((button) => button.addEventListener('click', () => {
  category = button.dataset.category;
  filters.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
  update();
}));
search.addEventListener('input', update);
document.querySelector('[data-reset]').addEventListener('click', () => {
  search.value = '';
  filters[0].click();
});

// All articles are already on the page, so "Load More" just reports that there is nothing further to load.
more.addEventListener('click', () => {
  more.disabled = true;
  more.querySelector('span:first-child').textContent = 'You’re all caught up';
});

// Newsletter: there is no subscribe endpoint yet, so this only confirms in the browser; nothing is sent.
const subscribe = document.querySelector('[data-subscribe]');
const note = document.querySelector('[data-subscribe-note]');
subscribe.addEventListener('submit', (event) => {
  event.preventDefault();
  subscribe.hidden = true;
  note.textContent = 'Thanks for subscribing! Watch your inbox for our next studio insights.';
});
