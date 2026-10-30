/**
 * OneReachAll - Main JS
 * Features: Mobile Navbar, Interactive RCS Simulator, 1-Tap OTP Copy, Form Handler
 */

document.addEventListener('DOMContentLoaded', function () {
  // Clean URLs: Remove .html extension from browser address bar
  if (window.location.pathname.endsWith('.html')) {
    const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
  }

  // Mobile navbar auto close on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.querySelector('.navbar-collapse');
  if (navCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // ========================================================
  // INTERACTIVE RCS SIMULATOR
  // ========================================================
  const rcsData = {
    retail: {
      title: "Festive Privilege: Flat 40% OFF",
      text: "Hello Rajesh! Your exclusive festival privilege code is <strong>REACH40</strong>. Valid on all electronics & fashion through Sunday. Free express shipping on orders above ₹999.",
      bannerText: "ONEREACHALL FESTIVE SALE • 40% OFF",
      bannerSub: "Use Code: REACH40",
      actions: [
        { icon: "fa-shopping-bag", text: "🛍️ Shop Collection Now", alert: "Redirecting to exclusive festival catalog..." },
        { icon: "fa-location-dot", text: "📍 Locate Nearest Store", alert: "Locating 12 authorized stores near your GPS..." },
        { icon: "fa-phone", text: "📞 Call Concierge Desk", alert: "Connecting to Indian Helpdesk: +91 77458 43216" }
      ],
      chips: ["Explore Menswear", "Explore Electronics", "Store Timings"]
    },
    banking: {
      title: "OneReachAll Secure 2FA Authentication",
      text: "Security Alert: One-Time Password for transaction INR 14,850 at Merchant Gateway is: <strong class='text-primary fs-6'>894-312</strong>. Valid for 3 mins. Do not share your OTP with anyone.",
      bannerText: "VERIFIED BANKING OTP ALERT",
      bannerSub: "High-Priority Transaction Verification",
      actions: [
        { icon: "fa-copy", text: "📋 Copy OTP (894-312)", alert: "OTP 894-312 copied to clipboard!", isCopy: true, copyVal: "894-312" },
        { icon: "fa-triangle-exclamation", text: "🚫 Report Fraud / Unauthorized", alert: "Alerting bank fraud desk immediately..." }
      ],
      chips: ["Card Lock", "Check Balance", "Fraud Helpline"]
    },
    travel: {
      title: "Flight AI-804 Gate Change Alert",
      text: "Dear Passenger, your flight from Mumbai (BOM) to Delhi (DEL) is on schedule. <strong>Departure Gate updated to 42B</strong>. Boarding begins at 17:15. Seat 12A.",
      bannerText: "MUMBAI (BOM) ➔ DELHI (DEL)",
      bannerSub: "Flight AI-804 • Seat 12A • Gate 42B",
      actions: [
        { icon: "fa-ticket", text: "🎫 View Digital Boarding Pass", alert: "Opening Apple Wallet / Google Wallet pass..." },
        { icon: "fa-map", text: "🗺️ Airport Terminal 2 Navigation", alert: "Opening indoor terminal map for Gate 42B..." },
        { icon: "fa-bell-concierge", text: "🛎️ Priority Baggage Status", alert: "Your 1 check-in bag is tagged and loaded." }
      ],
      chips: ["In-flight Meal", "Web Check-in", "Flight Status"]
    },
    logistics: {
      title: "Out for Express Delivery",
      text: "Your shipment #ORA-99214 is out for delivery today with dispatch driver Amit. Estimated arrival: <strong>16:45 - 18:15 IST</strong>. OTP required at delivery: 4218.",
      bannerText: "EXPRESS COURIER EN ROUTE",
      bannerSub: "Tracking ID: #ORA-99214 • Delivery Today",
      actions: [
        { icon: "fa-truck-fast", text: "🚚 Live Driver GPS Tracking", alert: "Courier is 1.8 km away (Est. 18 mins)..." },
        { icon: "fa-calendar-days", text: "🔄 Reschedule Delivery Slot", alert: "Select tomorrow 10am-2pm or 2pm-6pm..." },
        { icon: "fa-phone", text: "📞 Call Delivery Executive", alert: "Calling dispatch driver Amit: +91 77458 43216" }
      ],
      chips: ["Leave with Neighbor", "Deliver Tomorrow", "Update Address"]
    }
  };

  const rcsTabBtns = document.querySelectorAll('.rcs-tab-btn');
  const cardTitle = document.getElementById('rcsCardTitle');
  const cardText = document.getElementById('rcsCardText');
  const cardBannerText = document.getElementById('rcsBannerText');
  const cardBannerSub = document.getElementById('rcsBannerSub');
  const cardActions = document.getElementById('rcsCardActions');
  const cardChips = document.getElementById('rcsCardChips');
  const phoneRichCard = document.getElementById('phoneRichCard');

  function renderRcsCard(key) {
    const data = rcsData[key];
    if (!data) return;

    if (phoneRichCard) {
      phoneRichCard.style.opacity = '0';
      phoneRichCard.style.transform = 'translateY(8px)';
    }

    setTimeout(function () {
      if (cardTitle) cardTitle.innerHTML = data.title;
      if (cardText) cardText.innerHTML = data.text;
      if (cardBannerText) cardBannerText.innerText = data.bannerText;
      if (cardBannerSub) cardBannerSub.innerText = data.bannerSub;

      // Render Actions
      if (cardActions) {
        cardActions.innerHTML = '';
        data.actions.forEach(function (act) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'rcs-action-btn';
          btn.innerHTML = `<i class="fa ${act.icon}"></i> ${act.text}`;
          btn.addEventListener('click', function () {
            if (act.isCopy && act.copyVal) {
              navigator.clipboard?.writeText(act.copyVal);
              btn.innerHTML = `<i class="fa fa-check text-success"></i> Copied "${act.copyVal}"!`;
              setTimeout(function () {
                btn.innerHTML = `<i class="fa ${act.icon}"></i> ${act.text}`;
              }, 2500);
            } else {
              showToast(act.alert);
            }
          });
          cardActions.appendChild(btn);
        });
      }

      // Render Chips
      if (cardChips) {
        cardChips.innerHTML = '';
        data.chips.forEach(function (chip) {
          const span = document.createElement('span');
          span.className = 'rcs-chip';
          span.innerText = chip;
          span.addEventListener('click', function () {
            showToast(`User tapped: "${chip}"`);
          });
          cardChips.appendChild(span);
        });
      }

      if (phoneRichCard) {
        phoneRichCard.style.opacity = '1';
        phoneRichCard.style.transform = 'translateY(0)';
      }
    }, 150);
  }

  rcsTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      rcsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-tab');
      renderRcsCard(key);
    });
  });

  // Initialize with retail
  if (cardTitle) {
    renderRcsCard('retail');
  }

  // Toast feedback simulator
  function showToast(msg) {
    const existing = document.getElementById('rcsSimulatorToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'rcsSimulatorToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '90px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#0a1931';
    toast.style.color = '#ffffff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '50px';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    toast.style.border = '1px solid #c5a059';
    toast.innerHTML = `<i class="fa fa-info-circle text-warning me-2"></i> ${msg}`;

    document.body.appendChild(toast);
    setTimeout(function () {
      toast.remove();
    }, 3000);
  }

  // Phone Simulator Interactive Buttons
  const rcsBackBtn = document.getElementById('rcsBackBtn');
  if (rcsBackBtn) {
    rcsBackBtn.addEventListener('click', function () {
      showToast('Simulated: Returned to RCS Inbox view');
    });
  }

  const rcsMenuBtn = document.getElementById('rcsMenuBtn');
  if (rcsMenuBtn) {
    rcsMenuBtn.addEventListener('click', function () {
      showToast('OneReachAll: Verified Brand • Carrier Gateway Active • 24/7 Desk');
    });
  }

  const rcsAttachBtn = document.getElementById('rcsAttachBtn');
  if (rcsAttachBtn) {
    rcsAttachBtn.addEventListener('click', function () {
      showToast('Simulated: Rich card, carousel, or document attachment dialog');
    });
  }

  const rcsSendBtn = document.getElementById('rcsSendBtn');
  const rcsInputText = document.getElementById('rcsInputText');

  function handleRcsSend() {
    if (!rcsInputText) return;
    const val = rcsInputText.value.trim();
    if (!val) {
      showToast('Type a message or tap any action button above to test RCS!');
      return;
    }
    showToast(`Sent: "${val}" ➔ OneReachAll RCS Automated Gateway`);
    rcsInputText.value = '';
    setTimeout(function () {
      showToast('OneReachAll Bot: Received! Call our Indian desk at +91 77458 43216');
    }, 1200);
  }

  if (rcsSendBtn) {
    rcsSendBtn.addEventListener('click', handleRcsSend);
  }
  if (rcsInputText) {
    rcsInputText.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleRcsSend();
      }
    });
  }

  // ========================================================
  // CONTACT FORM SUBMISSION HANDLER
  // ========================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i> Connecting to Indian Operations Desk...';

      const nameVal = contactForm.querySelector('[name="name"]')?.value || 'Client';
      const serviceVal = contactForm.querySelector('[name="service"]')?.value || 'Telecom';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const alertBox = document.getElementById('formSuccessAlert');
        if (alertBox) {
          const waUrl = `https://wa.me/917745843216?text=${encodeURIComponent('Hello OneReachAll, I just submitted an inquiry for ' + serviceVal + ' (Name: ' + nameVal + '). Please share details.')}`;
          alertBox.innerHTML = `
            <div class="d-flex align-items-start gap-3">
              <i class="fa fa-circle-check text-success fs-3 flex-shrink-0 mt-1"></i>
              <div>
                <h5 class="alert-heading fw-bold mb-1">Inquiry Received Successfully!</h5>
                <p class="mb-2 small text-muted">Thank you, <strong>${nameVal}</strong>. Our Indian telecom operations desk has logged your request and will call your phone number shortly.</p>
                <div class="d-flex flex-wrap gap-2 mt-2">
                  <a href="${waUrl}" target="_blank" class="btn btn-success btn-sm">
                    <i class="fa-brands fa-whatsapp me-1"></i> Instant WhatsApp Chat
                  </a>
                  <a href="tel:+917745843216" class="btn btn-outline-dark btn-sm">
                    <i class="fa fa-phone me-1"></i> Call Desk (+91 77458 43216)
                  </a>
                </div>
              </div>
            </div>
          `;
          alertBox.classList.remove('d-none');
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.reset();
      }, 1200);
    });
  }
});
