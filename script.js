// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');
const bookingForm = document.querySelector('.booking-form');
const contactForm = document.querySelector('.contact-form');

// Initialize active testimonial index
let activeTestimonialIndex = 0;
let testimonialsInterval;

// Theme Switcher
function initTheme() {
  // Check for saved user preference, if any
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  document.body.className = savedTheme;
  themeSwitch.checked = savedTheme === 'dark-theme';
}

function toggleTheme() {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  }
}

// Mobile Navigation Toggle
function toggleNavigation() {
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
    hamburger.classList.remove('active');
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.right = '0';
    navLinks.style.backgroundColor = 'var(--card-bg)';
    navLinks.style.padding = '20px';
    navLinks.style.borderRadius = 'var(--radius-md)';
    navLinks.style.boxShadow = '0 5px 15px var(--shadow)';
    navLinks.style.width = '200px';
    navLinks.style.zIndex = '1000';
    hamburger.classList.add('active');
  }
}

// Car filtering functionality
function filterCars(filterValue) {
  carCards.forEach(card => {
    if (filterValue === 'all' || card.dataset.category === filterValue) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Testimonial Slider
function showTestimonial(index) {
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Ensure index is within bounds
  if (index < 0) {
    activeTestimonialIndex = testimonialCards.length - 1;
  } else if (index >= testimonialCards.length) {
    activeTestimonialIndex = 0;
  } else {
    activeTestimonialIndex = index;
  }
  
  testimonialCards[activeTestimonialIndex].classList.add('active');
  dots[activeTestimonialIndex].classList.add('active');
}

// Go to next testimonial
function nextTestimonial() {
  showTestimonial(activeTestimonialIndex + 1);
}

// Go to previous testimonial
function prevTestimonial() {
  showTestimonial(activeTestimonialIndex - 1);
}

// Auto-play testimonials
function startTestimonialAutoplay() {
  testimonialsInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

// Validate date selection for booking form
function validateDateSelection() {
  const pickupDate = document.getElementById('pickup-date').value;
  const returnDate = document.getElementById('return-date').value;
  
  if (!pickupDate || !returnDate) {
    return true; // Don't validate if dates are not set
  }
  
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (pickup < today) {
    alert('Дата получения не может быть в прошлом');
    return false;
  }
  
  if (returnD <= pickup) {
    alert('Дата возврата должна быть позже даты получения');
    return false;
  }
  
  return true;
}

// Set minimum date for date inputs
function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('pickup-date').min = today;
  document.getElementById('return-date').min = today;
}

// Handle booking form submission
function handleBookingFormSubmit(e) {
  e.preventDefault();
  
  if (!validateDateSelection()) {
    return;
  }
  
  // Get form values
  const carType = document.getElementById('car-type').value;
  const pickupDate = document.getElementById('pickup-date').value;
  const returnDate = document.getElementById('return-date').value;
  const pickupLocation = document.getElementById('pickup-location').value;
  const returnLocation = document.getElementById('return-location').value;
  
  // Simple form validation
  if (!carType || !pickupDate || !returnDate || !pickupLocation || !returnLocation) {
    alert('Пожалуйста, заполните все поля формы');
    return;
  }
  
  // Simulate form submission
  const formData = {
    carType,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
    timestamp: new Date().toISOString()
  };
  
  // Log form data (for this example, in a real app you would send to a server)
  console.log('Booking form submission:', formData);
  
  // Show success message and scroll to cars section
  alert('Спасибо! Мы подобрали для вас автомобили на указанные даты.');
  
  // Scroll to cars section
  document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
  
  // Reset form
  e.target.reset();
}

// Handle contact form submission
function handleContactFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service-select').value;
  const message = document.getElementById('message').value;
  const privacyConsent = document.getElementById('privacy').checked;
  
  // Simple form validation
  if (!name || !phone || !privacyConsent) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }
  
  // Simulate form submission
  const formData = {
    name,
    phone,
    email,
    service,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Log form data (for this example, in a real app you would send to a server)
  console.log('Contact form submission:', formData);
  
  // Show success message
  alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
  
  // Reset form
  e.target.reset();
}

// Animation when elements come into view
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .car-card, .section-header, .about-content, .contact-content, .pricing-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
        toggleNavigation();
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Set return date based on pickup date
function updateReturnDate() {
  const pickupDateInput = document.getElementById('pickup-date');
  const returnDateInput = document.getElementById('return-date');
  
  pickupDateInput.addEventListener('change', function() {
    if (this.value) {
      // Set min date of return to be at least pickup date
      returnDateInput.min = this.value;
      
      // If current return date is before new pickup date, update it
      if (returnDateInput.value && new Date(returnDateInput.value) <= new Date(this.value)) {
        // Set return date to pickup date + 1 day
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        returnDateInput.value = nextDay.toISOString().split('T')[0];
      }
    }
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Event Listeners
  themeSwitch.addEventListener('change', toggleTheme);
  hamburger.addEventListener('click', toggleNavigation);
  prevBtn.addEventListener('click', prevTestimonial);
  nextBtn.addEventListener('click', nextTestimonial);
  
  // Set minimum dates for booking form
  setMinDates();
  updateReturnDate();
  
  // Add event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterCars(button.dataset.filter);
    });
  });
  
  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Form submissions
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingFormSubmit);
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }
  
  // Start testimonial autoplay
  startTestimonialAutoplay();
  
  // Initialize animations
  animateOnScroll();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Stop testimonial autoplay on mouse hover
  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialsInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      startTestimonialAutoplay();
    });
  }
});

// Sticky header effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 15px var(--shadow)';
    header.style.backdropFilter = 'blur(10px)';
    header.style.backgroundColor = document.body.classList.contains('light-theme') 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(18, 18, 18, 0.9)';
  } else {
    header.style.boxShadow = '0 2px 10px var(--shadow)';
    header.style.backdropFilter = 'blur(0)';
    header.style.backgroundColor = document.body.classList.contains('light-theme')
      ? 'var(--light-card-bg)'
      : 'var(--dark-card-bg)';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (
    window.innerWidth <= 768 && 
    navLinks.style.display === 'flex' && 
    !navLinks.contains(e.target) && 
    !hamburger.contains(e.target)
  ) {
    toggleNavigation();
  }
});

// Adjust navigation on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && navLinks.style.display === 'flex') {
    navLinks.removeAttribute('style');
    hamburger.classList.remove('active');
  }
});