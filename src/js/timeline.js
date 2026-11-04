/**
 * Horizontal Timeline - NBPA Style
 * Interactive timeline navigation and animations
 */

(function() {
  'use strict';

  let currentIndex = 0;
  let timelineData = [];

  function initTimeline() {
    const cards = document.querySelectorAll('.timeline-photo-card');
    const featured = document.querySelector('.timeline-featured');
    const basketballIcon = document.querySelector('.timeline-basketball-icon');

    if (!cards.length || !featured) return;

    // Store timeline data
    cards.forEach((card, index) => {
      timelineData.push({
        element: card,
        year: card.dataset.year,
        title: card.dataset.title,
        description: card.dataset.description,
        stats: JSON.parse(card.dataset.stats || '{}')
      });
    });

    // Set initial active card
    setActiveCard(0);

    // Add click handlers to cards
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        setActiveCard(index);
      });
    });

    // Navigation arrow
    const navArrow = document.querySelector('.timeline-nav-arrow');
    if (navArrow) {
      navArrow.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % timelineData.length;
        setActiveCard(nextIndex);
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length;
        setActiveCard(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % timelineData.length;
        setActiveCard(nextIndex);
      }
    });
  }

  function setActiveCard(index) {
    currentIndex = index;
    const data = timelineData[index];

    // Update active state on cards
    timelineData.forEach((item, i) => {
      if (i === index) {
        item.element.classList.add('active');
      } else {
        item.element.classList.remove('active');
      }
    });

    // Update featured content
    updateFeaturedContent(data);

    // Animate basketball icon
    animateBasketballIcon(index);
  }

  function updateFeaturedContent(data) {
    const featured = document.querySelector('.timeline-featured');
    if (!featured) return;

    // Add active class
    featured.classList.add('active');

    // Update year
    const yearEl = featured.querySelector('.timeline-featured-year');
    if (yearEl) {
      yearEl.textContent = data.year;
    }

    // Update title
    const titleEl = featured.querySelector('.timeline-featured-title');
    if (titleEl) {
      titleEl.textContent = data.title;
    }

    // Update description
    const descEl = featured.querySelector('.timeline-featured-description');
    if (descEl) {
      descEl.textContent = data.description;
    }

    // Update stats
    const stats = data.stats;
    if (stats.games) {
      updateStat('games', stats.games);
    }
    if (stats.ppg) {
      updateStat('ppg', stats.ppg);
    }
    if (stats.apg) {
      updateStat('apg', stats.apg);
    }
  }

  function updateStat(key, value) {
    const statEl = document.querySelector(`[data-stat="${key}"] .timeline-stat-value`);
    if (statEl) {
      statEl.textContent = value;
    }
  }

  function animateBasketballIcon(index) {
    const icon = document.querySelector('.timeline-basketball-icon');
    if (!icon) return;

    const totalCards = timelineData.length;
    const percentage = (index / (totalCards - 1)) * 80; // 80% because of the 10% margins

    icon.style.left = `calc(10% + ${percentage}%)`;
  }

  // Auto-play functionality (optional)
  let autoplayInterval;

  function startAutoplay(delay = 5000) {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % timelineData.length;
      setActiveCard(nextIndex);
    }, delay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }

  // Pause autoplay on user interaction
  document.addEventListener('click', (e) => {
    if (e.target.closest('.timeline-photo-card, .timeline-nav-arrow')) {
      stopAutoplay();
    }
  });

  // Expose functions for external use
  window.TimelineController = {
    setActive: setActiveCard,
    startAutoplay: startAutoplay,
    stopAutoplay: stopAutoplay
  };
})();
