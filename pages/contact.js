import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Contact content (Stitch: modojo_contact_us). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name) => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;

const CONTACT_EMAIL = 'hello@modojo.com';
const SUPPORT_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('MoDojo support request')}`;

const CHANNELS = [
  ['call', 'Phone', '<a href="tel:+18005550199">+1 (800) 555-0199</a>'],
  ['mail', 'Email', `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`],
  ['location_on', 'Headquarters', '120 Wellness Blvd, Suite 400<br />Austin, TX 78701'],
];
const SUBJECTS = ['General Inquiry', 'Sales &amp; Pricing', 'Technical Support', 'Partnerships'];

const channel = ([name, label, value]) => `<li class="contact-channel"><span class="contact-channel-icon">${icon(name)}</span><div><h3>${label}</h3><p>${value}</p></div></li>`;

app.innerHTML = `${renderHeader(LINKS, 'contact')}

  <main id="top">
    <section class="contact-hero">
      <div class="contact-hero-inner reveal">
        <p class="contact-hero-kicker">Contact MoDojo</p>
        <h1>Have a question? Let’s talk.</h1>
        <p class="lead">Whether you're curious about features, pricing, or need technical support, our team is here to help your studio thrive.</p>
      </div>
    </section>

    <section class="contact-cards" aria-label="How can we help">
      <div class="contact-cards-grid">
        <article class="contact-card contact-card-demo reveal">
          <span class="contact-card-glow" aria-hidden="true"></span>
          ${icon('calendar_today')}
          <h2>Demo &amp; Pricing</h2>
          <p>See MoDojo in action. Schedule a personalized walkthrough to see how we can streamline your business operations.</p>
          <button class="contact-btn contact-btn-peach" type="button" data-demo>Book a Demo</button>
        </article>
        <article class="contact-card contact-card-support reveal reveal-delay">
          ${icon('support_agent')}
          <h2>Get Support</h2>
          <p>Already using MoDojo? Our dedicated support team is ready to assist you with any technical questions or account needs.</p>
          <a class="contact-btn contact-btn-outline" href="${SUPPORT_URL}">Get Help</a>
        </article>
      </div>
    </section>

    <section class="contact-connect" aria-labelledby="connect-title">
      <div class="contact-connect-grid">
        <div class="contact-info reveal">
          <h2 class="heading" id="connect-title">Let's Connect</h2>
          <p class="lead">We believe in building real relationships. Reach out to us through any of the channels below, or drop by our studio space if you're in town.</p>
          <ul class="contact-channels">${CHANNELS.map(channel).join('')}</ul>
        </div>
        <div class="contact-form-card reveal reveal-delay">
          <form class="contact-form" data-contact-form novalidate>
            <div class="contact-row">
              <div class="contact-field"><label for="name">Full Name</label><input id="name" name="name" type="text" placeholder="Jane Doe" autocomplete="name" required /></div>
              <div class="contact-field"><label for="email">Email Address</label><input id="email" name="email" type="email" placeholder="jane@example.com" autocomplete="email" required /></div>
            </div>
            <div class="contact-row">
              <div class="contact-field"><label for="phone">Phone (Optional)</label><input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" autocomplete="tel" /></div>
              <div class="contact-field"><label for="subject">Subject</label><select id="subject" name="subject">${SUBJECTS.map((subject) => `<option>${subject}</option>`).join('')}</select></div>
            </div>
            <div class="contact-field"><label for="message">Message</label><textarea id="message" name="message" rows="5" placeholder="How can we help you?" required></textarea></div>
            <p class="contact-error" data-contact-error role="alert" hidden></p>
            <button class="contact-btn contact-btn-solid contact-submit" type="submit">Send Message</button>
          </form>
          <div class="contact-success" data-contact-success role="status" tabindex="-1" hidden>
            ${icon('check_circle')}
            <h3>Thanks — message received.</h3>
            <p>We’ll get back to you as soon as we can.</p>
            <button class="contact-btn contact-btn-outline" type="button" data-contact-reset>Send another message</button>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-final">
      <div class="contact-final-inner reveal">
        <h2 class="display">Ready to make studio management simpler?</h2>
        <div class="contact-final-actions">
          <a class="btn btn-orange btn-lg" href="${TRIAL_URL}">Start Your Free Trial</a>
          <button class="btn btn-ghost btn-lg" type="button" data-demo>Book a Demo</button>
        </div>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();

// Contact form: validated in the browser only. There is no backend endpoint for it yet, so nothing is sent.
const form = document.querySelector('[data-contact-form]');
const errorBox = document.querySelector('[data-contact-error]');
const success = document.querySelector('[data-contact-success]');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showError = (field, message) => {
  errorBox.textContent = message;
  errorBox.hidden = false;
  field.setAttribute('aria-invalid', 'true');
  field.focus();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
  errorBox.hidden = true;
  const { name, email, message } = form.elements;
  if (!name.value.trim()) return showError(name, 'Please tell us your name.');
  if (!EMAIL_PATTERN.test(email.value.trim())) return showError(email, 'Please enter a valid email address.');
  if (!message.value.trim()) return showError(message, 'Please write a short message.');
  form.hidden = true;
  success.hidden = false;
  success.focus();
});

document.querySelector('[data-contact-reset]').addEventListener('click', () => {
  form.reset();
  success.hidden = true;
  form.hidden = false;
  form.elements.name.focus();
});
