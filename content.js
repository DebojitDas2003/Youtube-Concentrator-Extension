// Skip ads when they appear
function skipAds() {
  const skipButton = document.querySelector('.ytp-ad-skip-button');
  if (skipButton) {
    skipButton.click();
  }
}

// Prevent skipping to a new video until the current one ends
function preventSkip() {
  const player = document.querySelector('.html5-main-video');
  if (player && !player.ended) {
    player.addEventListener('ended', function() {
      const nextButton = document.querySelector('.ytp-next-button');
      if (nextButton) {
        nextButton.style.pointerEvents = 'auto';
      }
      enableVideoSelection();
    });
    const nextButton = document.querySelector('.ytp-next-button');
    if (nextButton) {
      nextButton.style.pointerEvents = 'none';
    }
    disableVideoSelection();
  }
}

// Disable video selection (thumbnails and related video links)
function disableVideoSelection() {
  const thumbnailLinks = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-thumbnail');
  thumbnailLinks.forEach(function(link) {
    link.style.pointerEvents = 'none';
  });

  const relatedVideoLinks = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer');
  relatedVideoLinks.forEach(function(link) {
    link.style.pointerEvents = 'none';
  });
}

// Enable video selection (thumbnails and related video links)
function enableVideoSelection() {
  const thumbnailLinks = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-thumbnail');
  thumbnailLinks.forEach(function(link) {
    link.style.pointerEvents = 'auto';
  });

  const relatedVideoLinks = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer');
  relatedVideoLinks.forEach(function(link) {
    link.style.pointerEvents = 'auto';
  });
}

// Add event listeners to handle skipping ads, preventing skip to next video, and disabling video selection
document.addEventListener('DOMContentLoaded', function() {
  skipAds();
  preventSkip();
});

// Observe DOM changes to handle ads, next video skip button, and video selection
const observer = new MutationObserver(function() {
  skipAds();
  preventSkip();
});

observer.observe(document, {
  childList: true,
  subtree: true
});
