(function() {
  // 防止重复触发
  let played = false;

  function tryPlay() {
    if (played) return;
    if (typeof window.APlayer === 'undefined') {
      return setTimeout(tryPlay, 100);
    }
    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      fixed: true,
      mini: true,
      autoplay: false,   // 先别播
      audio: [{
        name: 'Windy Hill',
        artist: '羽肿',
        url:  '/music/song1.mp3'
      }]
    });

    function onScroll() {
      if (window.scrollY >= 60) {   // 往下滑 60 px 再播
        window.removeEventListener('scroll', onScroll, { passive: true });
        played = true;
        ap.play();                  // 真正开始播放
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 等 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryPlay);
  } else {
    tryPlay();
  }
})();