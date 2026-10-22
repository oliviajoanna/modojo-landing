import { TRIAL_URL, createLinks, initLayout, initReveal, renderFooter, renderHeader, renderModal } from '../src/layout.js';
import './features-sales-payments.css';

const app = document.querySelector('#app');
const LINKS = createLinks(false);

// Sales & Payments content (Stitch: modojo_features_sales_payments). Icons are Material Symbols ligatures (subset loaded in styles.css).
const icon = (name, className = '') => `<span class="material-symbols-outlined ${className}" aria-hidden="true">${name}</span>`;
const IMG = '/images/features/sales-payments';

const INVOICE_POINTS = ['Auto-generate upon purchase', 'Customizable branding', 'Direct email delivery to members'];

// Payment method logos (DOKU). Rows of five on desktop; `w` is the max logo width in px.
const PAYMENT_METHODS = [
  ['img-04', 'BCA', 100], ['img-05', 'Bank BRI', 100], ['img-06', 'Mandiri', 100], ['img-07', 'BSI', 100], ['img-08', 'Permata Bank', 110],
  ['img-09', 'BCA KlikPay', 100], ['img-10', 'Credit and Debit Cards', 110], ['img-11', 'Indodana', 110], ['img-12', 'Indomaret', 100], ['img-13', 'Alfamart', 110],
  ['img-14', 'Akulaku', 100], ['img-15', 'OVO', 80], ['img-16', 'ShopeePay', 100], ['img-17', 'LinkAja', 90], ['img-18', 'Kredivo', 100],
];

const REPORT_CARDS = [
  ['monitoring', 'is-purple', 'Revenue', 'See how much your business is earning. Track sales activity and revenue over time.'],
  ['inventory_2', 'is-orange', 'Package Purchases', 'Know what your members are buying. Understand which packages are driving sales.'],
  ['price_check', 'is-green', 'Payment Status', 'Know what has been paid. Quickly identify paid and outstanding invoices.'],
];

// Journey steps: [icon, title, caption, tone]
const JOURNEY = [
  ['person', 'Member', 'Purchases package', ''],
  ['receipt_long', 'Invoice', 'Invoice created', ''],
  ['account_balance_wallet', 'Payment', 'Completed through DOKU', 'is-purple'],
  ['bar_chart', 'Sales Report', 'Sale recorded', ''],
  ['lightbulb', 'Business Insight', 'Understand performance', 'is-orange'],
];

const checkItem = (text) => `<li>${icon('check_circle')}<span>${text}</span></li>`;

const paymentPill = ([file, name, width]) => `<li class="sp-pay-pill"><img src="${IMG}/${file}.png" alt="${name}" style="max-width:${width}px" loading="lazy" /></li>`;

const reportCard = ([name, tone, title, text], index) => `<article class="sp-card reveal${index ? ' reveal-delay' : ''}">
          <span class="sp-card-icon ${tone}">${icon(name)}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>`;

const journeyStep = ([name, title, caption, tone], index) => `<li class="sp-step reveal${index ? ' reveal-delay' : ''}">
          <span class="sp-step-icon ${tone}">${icon(name)}</span>
          <h3>${title}</h3>
          <p>${caption}</p>
          ${index < JOURNEY.length - 1 ? icon('arrow_downward', 'sp-step-arrow') : ''}
        </li>`;

app.innerHTML = `${renderHeader(LINKS, 'features')}

  <main id="top">
    <section class="sp-hero feature-hero">
      <img class="sp-hero-photo" src="/images/homepage/industry-yoga-pilates.jpg" alt="" width="1200" height="800" />
      <div class="sp-hero-shade"></div>
      <div class="wrap feature-hero-inner">
        <div class="feature-hero-copy reveal">
          <span class="sp-pill">Sales &amp; Payments</span>
          <h1>From purchase to payment, keep your finances connected.</h1>
          <p class="feature-hero-lead">Manage invoices, payments, and sales activity without jumping between different systems.</p>
          <div class="sp-actions feature-hero-actions">
            <a class="btn btn-orange" href="${TRIAL_URL}"><span>Start Your Free Trial</span>${icon('arrow_forward')}</a>
            <button class="btn btn-ghost" type="button" data-demo>Book a Demo</button>
          </div>
        </div>
      </div>
      <span class="sp-scroll">${icon('arrow_downward')}</span>
    </section>

    <section class="sp-invoices" id="invoices">
      <div class="wrap sp-split">
        <div class="sp-copy reveal">
          <h2 class="heading">Create invoices in a few clicks.</h2>
          <p class="lead">Generate professional invoices automatically when members purchase packages or book classes. Track status easily from draft to paid.</p>
          <ul class="sp-checks">${INVOICE_POINTS.map(checkItem).join('')}</ul>
        </div>
        <div class="sp-invoice-wrap reveal reveal-delay">
          <div class="sp-invoice-back"></div>
          <div class="sp-invoice" aria-label="Invoice example">
            <div class="sp-invoice-head">
              <div class="sp-invoice-brand">
                <span class="sp-logo-mark">M</span>
                <div><p class="sp-strong">MoDojo Studio</p><p class="sp-small">Invoice #INV-00241</p></div>
              </div>
              <span class="sp-status"><span class="sp-dot"></span>Paid</span>
            </div>
            <div class="sp-billed">
              <p class="sp-eyebrow">Billed To</p>
              <div class="sp-invoice-brand">
                <span class="sp-avatar">ST</span>
                <div><p class="sp-strong">Sarah Tan</p><p class="sp-small">sarah.tan@example.com</p></div>
              </div>
            </div>
            <div class="sp-lines">
              <div class="sp-lines-head"><span>Description</span><span>Amount</span></div>
              <div class="sp-lines-row">
                <div><p class="sp-strong">Pilates 10-Class Package</p><p class="sp-small">Valid for 3 months</p></div>
                <p class="sp-strong sp-nowrap">Rp 750,000</p>
              </div>
            </div>
            <div class="sp-total">
              <p class="sp-small">Total Amount</p>
              <p class="sp-total-amount">Rp 750,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sp-payments" id="payments">
      <div class="wrap sp-split">
        <div class="sp-copy reveal">
          <span class="sp-pill sp-pill-caps">Payments</span>
          <h2 class="heading">Make payments easier for your members.</h2>
          <p class="lead">MoDojo integrates payment functionality through DOKU, allowing members to complete payments through their member experience.</p>
          <div class="sp-tracking">
            <h3>Less manual payment tracking.</h3>
            <p>When payments are connected to invoices, your team can easily understand the entire transaction without checking multiple systems.</p>
            <p class="sp-quote">One connected payment journey. Less administrative work.</p>
          </div>
        </div>
        <div class="sp-phone-wrap reveal reveal-delay">
          <div class="sp-phone" aria-label="Member payment screen example">
            <div class="sp-screen">
              <div class="sp-status-bar"><span>9:41</span><span>${icon('signal_cellular_4_bar')}${icon('wifi')}${icon('battery_full')}</span></div>
              <div class="sp-phone-head"><p class="sp-phone-title">Complete Payment</p><p class="sp-small">Invoice #INV-00241</p></div>
              <div class="sp-phone-body">
                <div class="sp-phone-card">
                  <p class="sp-small">Item</p>
                  <p class="sp-strong sp-phone-item">Pilates 10-Class Package</p>
                  <div class="sp-phone-due"><p class="sp-small">Amount Due</p><p class="sp-phone-amount">Rp 750,000</p></div>
                </div>
                <span class="sp-phone-btn">Continue to Payment</span>
                <div class="sp-success">
                  <span class="sp-success-icon">${icon('check')}</span>
                  <p class="sp-success-title">Payment Successful</p>
                  <p class="sp-success-text">Your payment has been received.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sp-partners">
      <div class="wrap sp-partners-inner">
        <div class="sp-partner reveal">
          <h2>Our Payment Partner</h2>
          <img src="${IMG}/img-03.png" alt="DOKU" height="48" loading="lazy" />
        </div>
        <div class="reveal">
          <h3>Various Payment Method</h3>
          <ul class="sp-pay-grid">${PAYMENT_METHODS.map(paymentPill).join('')}</ul>
          <p class="sp-more">and more</p>
        </div>
      </div>
    </section>

    <section class="sp-reports" id="reports">
      <div class="wrap">
        <div class="sp-reports-head reveal">
          <span class="sp-tag">Sales Reports</span>
          <h2 class="heading">Know where your revenue comes from.</h2>
          <p class="lead">Turn your sales activity into useful business information. Understand what you're selling, how much you're earning, and what's happening across your business.</p>
        </div>
        <figure class="sp-reports-shot reveal">
          <img src="/images/homepage/insights-dashboard.jpg" alt="MoDojo dashboard showing revenue trends, member growth and attendance rates" width="512" height="287" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="sp-understand">
      <div class="wrap">
        <div class="sp-cards">${REPORT_CARDS.map(reportCard).join('')}</div>
        <p class="sp-understand-note reveal">Stop guessing. Start understanding your business. MoDojo turns everyday sales and payment activity into information you can use to make better decisions.</p>
      </div>
    </section>

    <section class="sp-journey">
      <div class="wrap">
        <div class="sp-journey-head reveal">
          <h2 class="heading">One sale. One connected journey.</h2>
          <p class="lead">From the moment a member purchases a package to the moment the payment reaches your business, MoDojo keeps the information connected.</p>
        </div>
        <ol class="sp-steps">${JOURNEY.map(journeyStep).join('')}</ol>
      </div>
    </section>

    <section class="sp-cta">
      <div class="sp-cta-inner reveal">
        <h2 class="heading">Less time tracking payments. More time running your business.</h2>
        <p class="lead">MoDojo brings invoices, payments, and sales activity together so your team can spend less time on financial administration and more time focusing on your members.</p>
        <div class="sp-actions">
          <a class="btn btn-orange" href="${TRIAL_URL}"><span>Start Your Free Trial</span>${icon('arrow_forward')}</a>
          <button class="btn sp-btn-line" type="button" data-demo>Book a Demo</button>
        </div>
        <p class="sp-cta-note">30-day free trial · No credit card required</p>
      </div>
    </section>
  </main>

${renderFooter(LINKS)}
${renderModal()}
`;

initLayout();
initReveal();
