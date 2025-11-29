// Enhanced JavaScript for modern interactions
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Sidebar Navigation Toggle (Modern Layout)
    // ===================================
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (sidebarToggle && sidebarNav) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebarNav.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        });

        // Close sidebar when clicking a link
        const sidebarLinks = sidebarNav.querySelectorAll('.sidebar-links a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebarNav.classList.remove('active');
                sidebarToggle.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            });
        });

        // Close sidebar when clicking outside (on overlay)
        document.addEventListener('click', (e) => {
            if (sidebarNav.classList.contains('active') &&
                !sidebarToggle.contains(e.target) &&
                !sidebarNav.contains(e.target)) {
                sidebarNav.classList.remove('active');
                sidebarToggle.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebarNav.classList.contains('active')) {
                sidebarNav.classList.remove('active');
                sidebarToggle.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    }

    // ===================================
    // Legacy Mobile Menu Toggle (Fallback)
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // ===================================
    // Navbar Scroll Effect (Legacy)
    // ===================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;

        function updateNavbar() {
            const scrollY = window.scrollY;

            // Add scrolled class when scrolling down
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
        }

        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animateElements = document.querySelectorAll('.card-glance, .tile-card, .update-card, .section-about, .section-tiles');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // Add Loading State
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
