// ========== NAVBAR SCROLL EFFECT ==========
// Adds a shadow/border to navbar when user scrolls down
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    navbar.style.borderBottomColor = 'rgba(100, 255, 218, 0.15)';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.borderBottomColor = 'rgba(100, 255, 218, 0.08)';
  }
});


// ========== ACTIVE NAV LINK HIGHLIGHT ==========
// Highlights the nav link matching the section currently in view
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));


// ========== FADE IN ON SCROLL ==========
// Animates sections and cards into view as you scroll down
const fadeElements = document.querySelectorAll(
  'section, .card, .project-card, .skill-category'
);

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));


// ========== SMOOTH SCROLL OFFSET FIX ==========
// Accounts for fixed navbar height when clicking nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});