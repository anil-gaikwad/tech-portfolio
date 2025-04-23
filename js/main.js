// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    offset: 100,
    once: true
});

// Mobile menu toggle
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const body = document.body;

if (burger && navMenu) {
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        burger.classList.toggle('open');
        body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            burger.classList.remove('open');
            body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !burger.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            burger.classList.remove('open');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when scrolling
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 10 && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            burger.classList.remove('open');
            body.style.overflow = '';
        }
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Update header shadow
    header.classList.toggle('scroll-header', window.scrollY > 0);
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveLink();
            scrollTimeout = null;
        }, 100);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        burger.classList.remove('open');
        body.style.overflow = '';
    }
});

// Typing Animation
const texts = ["Anil Gaikwad", "Software Engineer", "Backend Engineer", "Cloud Engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeText();
});

// Form submission
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove any existing messages
        const existingMessage = this.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        // Create and show success message
        const successMessage = document.createElement('p');
        successMessage.className = 'form-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.cssText = `
            color: var(--primary-color);
            font-size: 1.6rem;
            margin-top: 2rem;
            text-align: center;
            font-weight: 500;
        `;
        
        this.appendChild(successMessage);
        this.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => successMessage.remove(), 5000);
    });
}