(function () {
  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateScroll() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    root.style.setProperty("--scroll", String(Math.min(1, window.scrollY / max)));
  }

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  var chapters = document.querySelectorAll("[data-scene]");
  if ("IntersectionObserver" in window && chapters.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          body.setAttribute("data-scene", entry.target.getAttribute("data-scene"));
        }
      });
    }, { threshold: 0.45 });

    chapters.forEach(function (chapter) {
      observer.observe(chapter);
    });
  }

  if (!reduceMotion) {
    window.addEventListener("pointermove", function (event) {
      var x = (event.clientX / window.innerWidth - 0.5) * 2;
      var y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    }, { passive: true });
  }
}());
