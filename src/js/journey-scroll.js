/* One journey rail. Arrow buttons, swipe, and arrow keys while focus is inside. */
(function () {
  var root = document.querySelector(".bj-timeline");
  if (!root) return;
  var rail = root.querySelector(".bj-rail");
  var prev = root.querySelector('.bj-arrow[data-dir="-1"]');
  var next = root.querySelector('.bj-arrow[data-dir="1"]');
  if (!rail || !prev || !next) return;

  function step() {
    var card = rail.querySelector(".bj-item");
    if (!card) return Math.max(240, rail.clientWidth * 0.8);
    var styles = window.getComputedStyle(rail.querySelector(".bj-track"));
    var gap = parseFloat(styles.columnGap || styles.gap) || 16;
    return card.getBoundingClientRect().width + gap;
  }

  function sync() {
    var max = rail.scrollWidth - rail.clientWidth - 2;
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max;
  }

  function go(dir) {
    rail.scrollBy({ left: dir * step(), behavior: "smooth" });
  }

  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });
  rail.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);

  root.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    event.preventDefault();
    go(event.key === "ArrowRight" ? 1 : -1);
  });

  sync();
})();
