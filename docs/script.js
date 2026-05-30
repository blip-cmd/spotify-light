/* ==========================================================================
   Spotify-Light Website Interaction Script - Monolithic Docs Release
   ========================================================================== */

// Active Slide Navigation Setup (Desktop Viewport)
const sections = ['#hero', '#how-it-works', '#how-to-use', '#community'];
let currentSlideIndex = 0;

// 1. Navigation Slide Handler
function goToSection(targetId) {
  const targetIndex = sections.indexOf(targetId);
  if (targetIndex === -1) return;
  
  currentSlideIndex = targetIndex;
  
  // Update Slide Class
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => {
    slide.classList.remove('active-slide');
  });
  
  const activeSlide = document.querySelector(targetId);
  if (activeSlide) {
    activeSlide.classList.add('active-slide');
  }
  
  // Update Navbar Links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });

  // Update Vertical Indicators
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((ind, index) => {
    ind.classList.remove('active');
    if (index === targetIndex) {
      ind.classList.add('active');
    }
  });
  
  // Dispatch a small tactile vibration if available
  if (navigator.vibrate) {
    navigator.vibrate(8);
  }
}

// 2. Click Event Interceptions (Fix Navigation Standard Jump)
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
    // Read the onclick or parse manual click
    ind.addEventListener('click', (e) => {
      // Find the target from the onclick string or index
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
  } else {
    goToSection('#hero');
  }

  // Populate dynamic share links on load
  setupDynamicShareLinks();
});

// 3. High-Visibility Desktop Scroll Block & Modals
const scrollModal = document.getElementById('scroll-modal');
const shareModal = document.getElementById('share-modal');

function openScrollModal() {
  if (scrollModal && !scrollModal.classList.contains('active')) {
    scrollModal.classList.add('active');
    scrollModal.setAttribute('aria-hidden', 'false');
  }
}

function closeScrollModal() {
  if (scrollModal) {
    scrollModal.classList.remove('active');
    scrollModal.setAttribute('aria-hidden', 'true');
  }
}

// Intercept desktop scrolling attempts
window.addEventListener('wheel', (e) => {
  if (window.innerWidth > 768) {
    // If a share or scroll modal is currently open, let normal interactions work
    if (scrollModal.classList.contains('active') || shareModal.classList.contains('active')) return;
    
    e.preventDefault();
    openScrollModal();
  }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (window.innerWidth > 768) {
    if (scrollModal.classList.contains('active') || shareModal.classList.contains('active')) return;
    
    e.preventDefault();
    openScrollModal();
  }
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (window.innerWidth > 768) {
    const blockedKeys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'];
    if (blockedKeys.includes(e.key)) {
      if (scrollModal.classList.contains('active') || shareModal.classList.contains('active')) return;
      
      e.preventDefault();
      openScrollModal();
    }
  }
});

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
  const shareText = encodeURIComponent("Check out Spotify-Light - a premium glassmorphic light theme for Spotify! Clean HSL aesthetics, lavender gradients, and fully customized components.");
  
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
    
    setTimeout(() => {
      button.innerText = 'Copy';
      button.classList.remove('copied');
      button.style.transform = 'translateY(-50%) scale(1)';
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}




