/* Mobile navigation toggle for the broadcast nav.
   The links are hidden below 980px in CSS; this is what reopens them. */
(function () {
  var toggle = document.querySelector('.b-nav-toggle');
  var links = document.getElementById('b-nav-links');
  if (!toggle || !links) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    links.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Escape closes and returns focus to the button.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close when a link is followed.
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  // Reset if the viewport grows past the breakpoint.
  var mq = window.matchMedia('(min-width: 981px)');
  var onChange = function (e) { if (e.matches) setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
