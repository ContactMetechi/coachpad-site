(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!reduceMotion) {
    var parallaxTargets = document.querySelectorAll("[data-depth]");
    window.addEventListener("pointermove", function (event) {
      var x = (event.clientX / window.innerWidth - 0.5) * 2;
      var y = (event.clientY / window.innerHeight - 0.5) * 2;
      parallaxTargets.forEach(function (el) {
        var depth = Number(el.getAttribute("data-depth")) || 8;
        el.style.transform = "translate3d(" + (x * depth) + "px, " + (y * depth) + "px, 0)";
      });
    }, { passive: true });
  }
}());
