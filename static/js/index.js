document.addEventListener('DOMContentLoaded', function () {
  var videos = Array.from(document.querySelectorAll('video[data-autoplay]'));

  if (!videos.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function playVideo(video) {
    var promise = video.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(function () {
        // Browser autoplay policies can still require manual playback.
      });
    }
  }

  if (!('IntersectionObserver' in window)) {
    videos.forEach(playVideo);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        playVideo(entry.target);
      } else {
        entry.target.pause();
      }
    });
  }, {
    rootMargin: '120px 0px',
    threshold: 0.2
  });

  videos.forEach(function (video) {
    observer.observe(video);
  });
});
