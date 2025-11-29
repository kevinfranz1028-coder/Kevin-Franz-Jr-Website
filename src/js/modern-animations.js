/**
 * Modern Animations & Interactions
 * Inspired by Novaprobio Template
 * Enhanced for Kevin Franz Jr. Portfolio
 */

// ===================================
// Scroll Animation Observer
// ===================================

class ScrollAnimationObserver {
    constructor() {
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );

        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // this.observer.unobserve(entry.target);
            }
        });
    }
}

// ===================================
// Testimonial Slider
// ===================================

class TestimonialSlider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        if (!this.container) return;

        this.slides = this.container.querySelectorAll('.testimonial-card');
        this.dots = this.container.querySelectorAll('.slider-dot');
        this.currentIndex = 0;
        this.autoPlayInterval = 5000;
        this.autoPlayTimer = null;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Hide all slides except first
        this.slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });

        // Setup dot click handlers
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Setup keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        // Hide current slide
        this.slides[this.currentIndex].style.display = 'none';
        this.dots[this.currentIndex].classList.remove('active');

        // Show new slide
        this.currentIndex = index;
        this.slides[this.currentIndex].style.display = 'block';
        this.dots[this.currentIndex].classList.add('active');

        // Add fade animation
        this.slides[this.currentIndex].style.animation = 'fadeIn 0.5s ease-in-out';
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => this.next(), this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
}

// ===================================
// Navbar Scroll Effect
// ===================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        if (!this.navbar) return;

        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Ignore empty anchors
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// Counter Animation for Stats
// ===================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number, .stat-value');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            // Store the final value
            counter.dataset.target = counter.innerText;
            counter.innerText = '0';
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                element.innerText = Math.ceil(current).toString();
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = element.dataset.target;
            }
        };

        updateCounter();
    }
}

// ===================================
// Parallax Effect
// ===================================

class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        if (this.parallaxElements.length === 0) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            this.parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ===================================
// Video Play Functionality
// ===================================

class VideoPlayer {
    constructor() {
        this.videoCards = document.querySelectorAll('.video-card-modern');
        this.init();
    }

    init() {
        this.videoCards.forEach(card => {
            const playButton = card.querySelector('.video-play-button');
            const videoUrl = card.dataset.videoUrl;

            if (playButton && videoUrl) {
                playButton.addEventListener('click', () => {
                    this.openVideo(videoUrl);
                });
            }
        });
    }

    openVideo(url) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-backdrop"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-modal-player">
                    <iframe
                        src="${url}?autoplay=1"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal
        const closeBtn = modal.querySelector('.video-modal-close');
        const backdrop = modal.querySelector('.video-modal-backdrop');

        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
}

// ===================================
// Timeline Animation
// ===================================

class TimelineAnimation {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item-modern');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.timelineItems.forEach(item => observer.observe(item));
    }
}

// ===================================
// Form Validation
// ===================================

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.validate()) {
                this.submitForm();
            }
        });

        // Real-time validation
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    validate() {
        let isFormValid = true;

        this.form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showFieldError(field, isValid, message) {
        // Remove existing error
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) existingError.remove();

        if (!isValid) {
            field.classList.add('field-invalid');
            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = message;
            field.parentElement.appendChild(errorEl);
        } else {
            field.classList.remove('field-invalid');
        }
    }

    submitForm() {
        // Handle form submission
        console.log('Form is valid and ready to submit');

        // You can add actual form submission logic here
        // For example: fetch API call, FormData, etc.

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        successMessage.style.cssText = `
            background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            animation: fadeIn 0.5s ease;
        `;

        this.form.appendChild(successMessage);
        this.form.reset();

        setTimeout(() => successMessage.remove(), 5000);
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================

class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');

        if (!this.menuToggle || !this.navLinks) return;

        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.menuToggle.classList.remove('active');
                this.navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.menuToggle.classList.remove('active');
                this.navLinks.classList.remove('active');
            });
        });
    }
}

// ===================================
// Page Load Animation
// ===================================

class PageLoadAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');

            // Trigger hero animations
            const heroElements = document.querySelectorAll('.hero-label, .hero-heading-modern, .hero-subtitle-modern, .hero-cta-group');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
                }, 100);
            });
        });
    }
}

// ===================================
// Initialize All Components
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ScrollAnimationObserver();
    new TestimonialSlider('.testimonial-slider');
    new NavbarScroll();
    new SmoothScroll();
    new CounterAnimation();
    new ParallaxEffect();
    new VideoPlayer();
    new TimelineAnimation();
    new FormValidator('#contact-form');
    new MobileMenu();
    new PageLoadAnimation();

    console.log('🏀 Kevin Franz Jr. Portfolio - Modern animations initialized');
});

// ===================================
// Export for module usage (optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimationObserver,
        TestimonialSlider,
        NavbarScroll,
        SmoothScroll,
        CounterAnimation,
        ParallaxEffect,
        VideoPlayer,
        TimelineAnimation,
        FormValidator,
        MobileMenu,
        PageLoadAnimation
    };
}
