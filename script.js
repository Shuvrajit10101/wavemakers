/* ===== Wave Makers - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initTestimonialCarousel();
  initModal();
  initForms();
  initCallButtons();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navbar = document.querySelector('.navbar');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    elements.forEach(el => {
      el.classList.add('visible');
      el.querySelectorAll('.animate-child').forEach(c => c.classList.add('visible'));
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

  elements.forEach(el => observer.observe(el));

  // Reveal elements already in viewport on load
  function revealVisible() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('visible');
        el.querySelectorAll('.animate-child').forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }
  revealVisible();
  setTimeout(revealVisible, 300);
  window.addEventListener('scroll', revealVisible, { passive: true });
}

/* ===== TESTIMONIAL CAROUSEL ===== */
function initTestimonialCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  
  console.log('Initializing testimonial carousel...');
  console.log('Track found:', !!track);
  console.log('Dots found:', dots.length);
  
  if (!track || dots.length === 0) {
    console.warn('Testimonial carousel elements not found');
    return;
  }

  let current = 0;
  const slides = track.querySelectorAll('.carousel-slide');
  const total = slides.length;
  
  console.log('Slides found:', total);

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Initialize first slide
  goTo(0);

  // Auto-advance
  setInterval(() => {
    goTo((current + 1) % total);
  }, 5000);
  
  console.log('Testimonial carousel initialized successfully');
}

/* ===== MODAL ===== */
function initModal() {
  // Close modal
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openBookingModal(packageName) {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;
  
  const select = overlay.querySelector('#packageSelect');
  if (select && packageName) {
    select.value = packageName;
  }
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

/* ===== FORMS ===== */
function initForms() {
  document.querySelectorAll('form[data-booking]').forEach(form => {
    form.addEventListener('submit', handleBookingSubmit);
  });
  
  document.querySelectorAll('form[data-contact]').forEach(form => {
    form.addEventListener('submit', handleContactSubmit);
  });
}

// Save booking to Firebase
async function saveToFirebase(collection, data) {
  if (typeof db === 'undefined') {
    console.warn('Firebase not initialized. Make sure firebase-config.js is loaded.');
    return null;
  }
  
  try {
    const docRef = await db.collection(collection).add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('Document written with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw error;
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  // Get form values
  const name = formData.get('name') || '';
  const email = formData.get('email') || '';
  const phone = formData.get('phone') || '';
  const pkg = formData.get('package') || '';
  const date = formData.get('date') || '';
  const message = formData.get('message') || '';
  
  // Prepare booking data
  const bookingData = {
    name: name,
    email: email,
    phone: phone,
    package: pkg,
    preferredDate: date,
    message: message,
    source: window.location.href,
    status: 'pending'
  };
  
  // Construct WhatsApp message
  const text = `Hi! I'd like to book a session.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${pkg}\nPreferred Date/Time: ${date}\nMessage: ${message}`;
  
  const waURL = `https://wa.me/919518009692?text=${encodeURIComponent(text)}`;
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';
  }
  
  // Save to Firebase first, then redirect to WhatsApp
  saveToFirebase('bookings', bookingData)
    .then(() => {
      // Show success, then redirect
      const successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        form.style.display = 'none';
        successEl.classList.add('show');
        setTimeout(() => {
          window.open(waURL, '_blank');
        }, 1000);
      } else {
        window.open(waURL, '_blank');
      }
    })
    .catch((error) => {
      console.error('Booking error:', error);
      alert('There was an error saving your booking. Please try again or contact us directly via WhatsApp.');
      // Still redirect to WhatsApp as fallback
      window.open(waURL, '_blank');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const name = formData.get('name') || '';
  const email = formData.get('email') || '';
  const phone = formData.get('phone') || '';
  const message = formData.get('message') || '';
  
  // Prepare contact data
  const contactData = {
    name: name,
    email: email,
    phone: phone,
    message: message,
    source: window.location.href,
    status: 'new'
  };
  
  const text = `Hi! New inquiry from Wave Makers website.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
  
  const waURL = `https://wa.me/919518009692?text=${encodeURIComponent(text)}`;
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }
  
  // Save to Firebase first, then redirect to WhatsApp
  saveToFirebase('contacts', contactData)
    .then(() => {
      const successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        form.style.display = 'none';
        successEl.classList.add('show');
        setTimeout(() => {
          window.open(waURL, '_blank');
        }, 1000);
      } else {
        window.open(waURL, '_blank');
      }
    })
    .catch((error) => {
      console.error('Contact error:', error);
      alert('There was an error sending your message. Please try again or contact us directly via WhatsApp.');
      // Still redirect to WhatsApp as fallback
      window.open(waURL, '_blank');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== CALL BUTTON FUNCTIONALITY ===== */
function initCallButtons() {
  // Add click handlers to all tel: links
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const phoneNumber = this.getAttribute('href').replace('tel:', '');
      
      // On mobile devices, allow native behavior
      if (isMobileDevice()) {
        return; // Let the browser handle it normally
      }
      
      // On desktop, prevent default and show a helpful message
      e.preventDefault();
      
      // Create or reuse a notification element
      let notification = document.getElementById('call-notification');
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'call-notification';
        notification.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          background: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          z-index: 9999;
          display: none;
          max-width: 350px;
          animation: slideIn 0.3s ease-out;
        `;
        notification.innerHTML = `
          <div style="display: flex; align-items: start; gap: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color: var(--blue-600); flex-shrink: 0;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div style="flex: 1;">
              <p style="font-family: 'Montserrat', sans-serif; font-weight: 600; color: var(--blue-900); margin-bottom: 4px;">Ready to call?</p>
              <p id="call-number-display" style="font-size: 0.9rem; color: var(--gray-600); margin-bottom: 12px;"></p>
              <a id="call-now-link" href="#" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Call Now
              </a>
            </div>
            <button onclick="closeCallNotification()" style="background: none; border: none; cursor: pointer; padding: 4px; color: var(--gray-600);">&times;</button>
          </div>
        `;
        document.body.appendChild(notification);
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Update the phone number display
      document.getElementById('call-number-display').textContent = phoneNumber;
      document.getElementById('call-now-link').href = `tel:${phoneNumber}`;
      
      // Show notification
      notification.style.display = 'block';
      
      // Auto-hide after 5 seconds
      setTimeout(() => closeCallNotification(), 5000);
    });
  });
}

function closeCallNotification() {
  const notification = document.getElementById('call-notification');
  if (notification) {
    notification.style.display = 'none';
  }
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
