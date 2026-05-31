/* ==========================================================================
   Spotify-Light Website Interaction Script - Monolithic Docs Release
   ========================================================================== */

// Active Slide Navigation Setup (Desktop Viewport)
const sections = ['#hero', '#how-it-works', '#how-to-use', '#community'];
let currentSlideIndex = 0;

// 1. Navigation Slide Handler
// 1. Navigation Scroll Handler
function goToSection(targetId) {
  const targetIndex = sections.indexOf(targetId);
  if (targetIndex === -1) return;
  
  currentSlideIndex = targetIndex;
  
  const element = document.querySelector(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Dispatch a small tactile vibration if available
  if (navigator.vibrate) {
    navigator.vibrate(8);
  }
}

// 2. Click Event Interceptions & Scroll Observation
document.addEventListener('DOMContentLoaded', () => {
  // Setup Navbar click handlers
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (sections.includes(targetId)) {
        e.preventDefault(); // Stop standard browser scroll jump
        goToSection(targetId);
      }
    });
  });

  // Setup vertical dot indicator handlers
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach(ind => {
    ind.addEventListener('click', (e) => {
      const onclickAttr = ind.getAttribute('onclick');
      if (onclickAttr) {
        const match = onclickAttr.match(/goToSection\('(#[a-zA-Z0-9-]+)'\)/);
        if (match && match[1]) {
          e.preventDefault();
          goToSection(match[1]);
        }
      }
    });
  });

  // Load default slide based on URL hash
  const hash = window.location.hash;
  if (hash && sections.includes(hash)) {
    goToSection(hash);
  }

  // Populate dynamic share links on load
  setupDynamicShareLinks();

  // Load live statistics from APIs
  loadGitHubReleaseDownloads();
  loadInstallCount();

  // Initialize Scroll Position Synchronization
  setupScrollObserver();
});

// 3. Intersection Observer to Sync Navbar & Indicators with Scroll Position
function setupScrollObserver() {
  const options = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.getAttribute('id');
        const targetIndex = sections.indexOf(id);
        if (targetIndex !== -1) {
          // Sync Nav links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
          
          // Sync dot indicators
          document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === targetIndex);
          });
        }
      }
    });
  }, options);

  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
}

// 4. Modal Setup
const shareModal = document.getElementById('share-modal');

// 4. Share Feature Setup
function openShareModal() {
  if (shareModal) {
    shareModal.classList.add('active');
    shareModal.setAttribute('aria-hidden', 'false');
  }
}

function closeShareModal() {
  if (shareModal) {
    shareModal.classList.remove('active');
    shareModal.setAttribute('aria-hidden', 'true');
  }
}

function copyShareLink() {
  // Get current site URL
  const siteUrl = window.location.href.split('#')[0];
  const btn = document.getElementById('btn-share-copy');
  
  navigator.clipboard.writeText(siteUrl).then(() => {
    btn.innerHTML = '<span class="share-opt-icon">👍</span> Copied Link!';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.innerHTML = '<span class="share-opt-icon">🔗</span> Copy Link';
      btn.classList.remove('copied');
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function setupDynamicShareLinks() {
  const siteUrl = encodeURIComponent(window.location.href.split('#')[0]);
  const shareText = encodeURIComponent("Check out Spotify-Light - a premium glassmorphic light theme for the Spotify Desktop App! Clean HSL aesthetics, lavender gradients, and fully customized components.");
  
  // Set X (Twitter) Link
  const xBtn = document.getElementById('btn-share-x');
  if (xBtn) {
    xBtn.setAttribute('href', `https://twitter.com/intent/tweet?text=${shareText}&url=${siteUrl}`);
  }
  
  // Set WhatsApp Link
  const waBtn = document.getElementById('btn-share-wa');
  if (waBtn) {
    waBtn.setAttribute('href', `https://api.whatsapp.com/send?text=${shareText}%20${siteUrl}`);
  }
  
  // Set Telegram Link
  const tgBtn = document.getElementById('btn-share-tg');
  if (tgBtn) {
    tgBtn.setAttribute('href', `https://t.me/share/url?url=${siteUrl}&text=${shareText}`);
  }
}

// 5. Accordions (How It Works)
function toggleAccordion(accordionId) {
  const accordionItem = document.getElementById(accordionId);
  if (!accordionItem) return;
  
  const content = accordionItem.querySelector('.accordion-content');
  const isActive = accordionItem.classList.contains('active-item');
  
  // Close all accordions first for clean UI
  const allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(item => {
    item.classList.remove('active-item');
    const itemContent = item.querySelector('.accordion-content');
    if (itemContent) {
      itemContent.style.maxHeight = null;
    }
  });
  
  // Toggle current accordion
  if (!isActive) {
    accordionItem.classList.add('active-item');
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

// 6. Copy to Clipboard and Visual Action Feedback
function copyCode(codeElementId, buttonId) {
  const codeText = document.getElementById(codeElementId).innerText;
  const button = document.getElementById(buttonId);
  
  navigator.clipboard.writeText(codeText).then(() => {
    // Visual Feedback
    button.innerText = 'Copied! 💜';
    button.classList.add('copied');
    
    // Smooth Scale Pop
    button.style.transform = 'translateY(-50%) scale(1.08)';
    
    // Increment CountAPI installations on Step 4 Copy (clone & apply theme command)
    if (codeElementId === 'code-step-4') {
      trackInstallCount();
    }
    
    setTimeout(() => {
      button.innerText = 'Copy';
      button.classList.remove('copied');
      button.style.transform = 'translateY(-50%) scale(1)';
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// 7. Live Download & Installation Stats API Tracking
let gitHubDownloads = 0;
let terminalInstalls = 0;

function updateTotalCount() {
  const total = gitHubDownloads + terminalInstalls;
  const totalElem = document.getElementById('stat-total');
  if (totalElem) {
    totalElem.innerText = total.toLocaleString();
  }
}

function loadGitHubReleaseDownloads() {
  const url = "https://api.github.com/repos/blip-cmd/spotify-light/releases";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        let count = 0;
        data.forEach(release => {
          if (Array.isArray(release.assets)) {
            release.assets.forEach(asset => {
              if (asset.download_count !== undefined) {
                count += asset.download_count;
              }
            });
          }
        });
        gitHubDownloads = count;
        const downloadsElem = document.getElementById('stat-downloads');
        if (downloadsElem) {
          downloadsElem.innerText = count.toLocaleString();
        }
        updateTotalCount();
      }
    })
    .catch(err => {
      console.error("Error fetching GitHub release downloads: ", err);
      // Fallback display if request is rate-limited or fails
      const downloadsElem = document.getElementById('stat-downloads');
      if (downloadsElem) downloadsElem.innerText = "0";
    });
}

function loadInstallCount() {
  const countKey = "spotify-light-custom-installs-key";
  const url = `https://countapi.mileshilliard.com/api/v1/get/${countKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.value !== undefined) {
        terminalInstalls = data.value;
        const installsElem = document.getElementById('stat-installs');
        if (installsElem) {
          installsElem.innerText = terminalInstalls.toLocaleString();
        }
        updateTotalCount();
      }
    })
    .catch(err => {
      console.error("Error fetching installation count: ", err);
      // Fallback
      const installsElem = document.getElementById('stat-installs');
      if (installsElem) installsElem.innerText = "0";
    });
}

function trackInstallCount() {
  const countKey = "spotify-light-custom-installs-key";
  const url = `https://countapi.mileshilliard.com/api/v1/hit/${countKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.value !== undefined) {
        terminalInstalls = data.value;
        const installsElem = document.getElementById('stat-installs');
        if (installsElem) {
          installsElem.innerText = terminalInstalls.toLocaleString();
        }
        updateTotalCount();
      }
    })
    .catch(err => console.error("Error updating installation counter: ", err));
}




