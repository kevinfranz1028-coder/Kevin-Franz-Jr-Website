/* Horizontal journey rows. Arrow buttons on desktop, swipe on the rail,
   and arrow keys while focus is inside a row. */
(function () {
  function amount(rail) {
    var card = rail.querySelector(".bj-card");
    if (!card) return Math.max(240, rail.clientWidth * 0.8);
    var styles = window.getComputedStyle(rail.querySelector(".bj-track"));
    var gap = parseFloat(styles.columnGap || styles.gap) || 12;
    return card.getBoundingClientRect().width + gap;
  }

  function sync(rail, prev, next) {
    var overflow = rail.scrollWidth > rail.clientWidth + 4;
    prev.hidden = !overflow;
    next.hidden = !overflow;
    if (!overflow) return;
    var max = rail.scrollWidth - rail.clientWidth - 2;
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max;
  }

  document.querySelectorAll(".bj-stage").forEach(function (stage) {
    var rail = stage.querySelector(".bj-rail");
    var prev = stage.querySelector('.bj-arrow[data-dir="-1"]');
    var next = stage.querySelector('.bj-arrow[data-dir="1"]');
    if (!rail || !prev || !next) return;

    function go(dir) {
      rail.scrollBy({ left: dir * amount(rail), behavior: "smooth" });
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    rail.addEventListener("scroll", function () { sync(rail, prev, next); }, { passive: true });
    window.addEventListener("resize", function () { sync(rail, prev, next); });

    stage.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      var tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      go(event.key === "ArrowRight" ? 1 : -1);
    });

    sync(rail, prev, next);
  });
})();
