// ============================================
// Navigation & Mobile Menu
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add scrolled class to nav on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Testimonials Carousel
// ============================================
const testimonials = document.querySelectorAll('.testimonial');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const indicators = document.querySelectorAll('.indicator');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Remove active class from all
    testimonials.forEach(t => t.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    // Add active class to current
    testimonials[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

carouselNext.addEventListener('click', nextTestimonial);
carouselPrev.addEventListener('click', prevTestimonial);

// Indicator click handlers
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance carousel
let carouselInterval = setInterval(nextTestimonial, 7000);

// Pause on hover
const carouselWrapper = document.getElementById('testimonialsCarousel');
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselWrapper.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextTestimonial, 7000);
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextTestimonial();
    }
    if (touchEndX > touchStartX + 50) {
        prevTestimonial();
    }
}

// ============================================
// Expandable About Section
// ============================================
const expandAbout = document.getElementById('expandAbout');
const aboutExpanded = document.getElementById('aboutExpanded');
const expandText = expandAbout.querySelector('.expand-text');

expandAbout.addEventListener('click', () => {
    expandAbout.classList.toggle('active');
    aboutExpanded.classList.toggle('active');
    
    if (aboutExpanded.classList.contains('active')) {
        expandText.textContent = 'Show Less';
    } else {
        expandText.textContent = 'Read Full Bio';
    }
});

// ============================================
// Sample Chapter Modal
// ============================================
const sampleBtn = document.getElementById('sampleBtn');
const sampleModal = document.getElementById('sampleModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const sampleForm = document.getElementById('sampleForm');
const sampleSuccess = document.getElementById('sampleSuccess');

function openModal() {
    sampleModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    sampleModal.classList.remove('show');
    document.body.style.overflow = '';
    // Reset form after closing
    setTimeout(() => {
        sampleForm.style.display = 'block';
        sampleSuccess.classList.remove('show');
        sampleForm.reset();
    }, 300);
}

sampleBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sampleModal.classList.contains('show')) {
        closeModal();
    }
});

// Sample form submission
sampleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    sampleForm.style.display = 'none';
    sampleSuccess.classList.add('show');
    
    // Auto close after 3 seconds
    setTimeout(closeModal, 3000);
});

// ============================================
// Newsletter Form
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    
    // Simulate form submission
    newsletterForm.style.display = 'none';
    newsletterSuccess.classList.add('show');
    
    // Reset after 5 seconds
    setTimeout(() => {
        newsletterForm.style.display = 'block';
        newsletterSuccess.classList.remove('show');
        newsletterForm.reset();
    }, 5000);
    
    // Here you would typically send data to your email service
    console.log('Newsletter subscription:', { email, name });
});

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    contactForm.style.display = 'none';
    contactSuccess.classList.add('show');
    
    // Reset after 5 seconds
    setTimeout(() => {
        contactForm.style.display = 'block';
        contactSuccess.classList.remove('show');
        contactForm.reset();
    }, 5000);
    
    // Here you would typically send data to your email service
    console.log('Contact form submission:', formData);
});

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll('.section-header, .book-showcase, .about-grid, .testimonials-carousel, .newsletter-content, .contact-grid');

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Social Share Functions
// ============================================
function shareOnTwitter() {
    const url = window.location.href;
    const text = "Check out this amazing author, Simon Hally!";
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

// ============================================
// Utility Functions
// ============================================

// Add active state to current nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Prevent form resubmission on page reload
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============================================
// Page Load Animations
// ============================================
window.addEventListener('load', () => {
    // Fade in body content
    document.body.style.opacity = '1';
    
    // Initialize first testimonial
    showTestimonial(0);
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c Welcome to Simon Hally\'s Portfolio ', 'background: #1a2332; color: #d4af37; font-size: 16px; padding: 10px;');
console.log('%c Crafted with care and attention to detail ', 'color: #6b6b6b; font-size: 12px;');

// ============================================
// Performance Monitoring (Optional)
// ============================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Log performance metrics (optional for debugging)
            if (entry.duration > 50) {
                console.warn('Slow interaction detected:', entry.name, entry.duration);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['measure'] });
}
