// RepublikCuan — shared interactions
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Filter pills (artikel listing) — client-side show/hide by data-cat
  var pills = document.querySelectorAll('.pill[data-filter]');
  var cards = document.querySelectorAll('[data-cat]');
  if (pills.length && cards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var filter = pill.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = filter === 'semua' || card.getAttribute('data-cat') === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});
