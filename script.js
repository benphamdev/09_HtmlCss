// Typing Effect
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = "";
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Theme Management System
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("portfolio-theme") || "dark";
    this.themeToggle = null;
    this.themeIcon = null;
    this.init();
  }

  init() {
    // Apply saved theme immediately
    this.applyTheme(this.currentTheme);

    // Wait for DOM to load
    document.addEventListener("DOMContentLoaded", () => {
      this.setupEventListeners();
    });
  }

  setupEventListeners() {
    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = document.getElementById("themeIcon");

    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }

    // Update icon based on current theme
    this.updateIcon();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(this.currentTheme);
    this.updateIcon();

    // Save to localStorage
    localStorage.setItem("portfolio-theme", this.currentTheme);

    // Add visual feedback
    this.showThemeChangeNotification();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.content = theme === "light" ? "#f0f8ff" : "#0d1117";

    // Force navbar to update its background
    this.updateNavbarBackground();
  }

  updateNavbarBackground() {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      // Remove inline styles to let CSS variables take effect
      navbar.style.removeProperty("background");
      navbar.style.removeProperty("backdrop-filter");

      // Trigger a reflow to ensure CSS variables are applied
      navbar.offsetHeight;

      // Reapply scroll-based styling if needed
      if (window.scrollY > 50) {
        navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue(
          "--navbar-bg-scrolled"
        );
        navbar.style.backdropFilter = "blur(20px)";
      }
    }
  }

  updateIcon() {
    if (this.themeIcon) {
      // Add rotation animation during icon change
      this.themeIcon.style.transform = "rotate(180deg)";

      setTimeout(() => {
        if (this.currentTheme === "dark") {
          this.themeIcon.className = "fas fa-sun";
          this.themeToggle.setAttribute("aria-label", "Switch to light theme");
        } else {
          this.themeIcon.className = "fas fa-moon";
          this.themeToggle.setAttribute("aria-label", "Switch to dark theme");
        }

        // Reset rotation
        this.themeIcon.style.transform = "rotate(0deg)";
      }, 150);
    }
  }

  showThemeChangeNotification() {
    const notification = document.createElement("div");
    notification.className = "theme-notification";
    notification.textContent = `${
      this.currentTheme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"
    } activated!`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--accent-primary);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 0.9rem;
      z-index: 10000;
      transform: translateX(300px);
      transition: transform 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow-color);
      backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(300px)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2500);
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Initialize Typing Effect
document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.getElementById("typed-text");
  if (typedElement) {
    const words = ["Hi there! 👋", "I'm Phạm Duy Chiến!", "Welcome to my profile!"];
    new TypeWriter(typedElement, words, 2000);
  }
});

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
});

// Navbar Background on Scroll (Legacy - now handled by CSS variables)
// This function is kept for backward compatibility but uses CSS variables

// Enhanced Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is visible - add animation
      const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 50;

      setTimeout(() => {
        entry.target.classList.add("animate");

        // Add extra effects for specific elements
        if (entry.target.classList.contains("tech-item")) {
          entry.target.style.animationDelay = delay + "ms";
        }

        if (entry.target.classList.contains("timeline-item")) {
          entry.target.style.animationDelay = delay + "ms";
        }
      }, Math.min(delay, 300)); // Limit max delay to 300ms
    } else {
      // Element is not visible - remove animation for future use
      entry.target.classList.remove("animate");

      // Reset animation delay
      if (entry.target.classList.contains("tech-item") || entry.target.classList.contains("timeline-item")) {
        entry.target.style.animationDelay = "0ms";
      }
    }
  });
}, observerOptions);

// Initialize animations on scroll
document.addEventListener("DOMContentLoaded", function () {
  // Add animation classes to elements with improved logic
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title, index) => {
    title.classList.add("animate-on-scroll", "fade-in");
    // Set initial state
    title.style.transitionDelay = index * 100 + "ms";
  });

  const aboutItems = document.querySelectorAll(".about-item");
  aboutItems.forEach((item, index) => {
    item.classList.add("animate-on-scroll", index % 2 === 0 ? "slide-in-left" : "slide-in-right");
  });

  const techItems = document.querySelectorAll(".tech-item");
  techItems.forEach((item, index) => {
    item.classList.add("animate-on-scroll", "scale-in");
  });

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    item.classList.add("animate-on-scroll", index % 2 === 0 ? "slide-in-left" : "slide-in-right");
  });

  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item, index) => {
    item.classList.add("animate-on-scroll", "zoom-in");
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.classList.add("animate-on-scroll", "fade-in");
  });

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => {
    scrollObserver.observe(el);
  });

  // Add debug info (remove in production)
  console.log(`Observing ${animatedElements.length} elements for scroll animations`);

  // Force initial state for all animated elements
  animatedElements.forEach((el) => {
    el.classList.remove("animate");
  });
});

// Additional function to reset animations manually (for debugging)
function resetAllAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => {
    el.classList.remove("animate");
    // Force reflow
    el.offsetHeight;
  });
  console.log("All animations reset");
}

// Function to trigger animations manually (for debugging)
function triggerAllAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("animate");
    }, index * 50);
  });
  console.log("All animations triggered");
}

// Additional scroll effects for navbar
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector(".navbar");

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;

  // Change navbar background based on scroll position using CSS variables
  if (window.scrollY > 50) {
    // More opaque background when scrolled
    navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue(
      "--navbar-bg-scrolled"
    );
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    // Default background
    navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue("--navbar-bg");
    navbar.style.backdropFilter = getComputedStyle(document.documentElement).getPropertyValue(
      "--navbar-blur"
    );
  }
});

// Tech Stack Hover Effects
document.addEventListener("DOMContentLoaded", function () {
  const techItems = document.querySelectorAll(".tech-item");

  techItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotateY(10deg)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateY(0deg)";
    });
  });
});

// Scroll to Top Button
function createScrollToTopButton() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px var(--shadow-color);
    `;

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  scrollButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton);

// Parallax Effect for Hero Section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroGif = document.querySelector(".hero-gif");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (heroGif) {
    const rate = scrolled * -0.5;
    heroGif.style.transform = `translateY(${rate}px)`;
  }

  // Hide scroll indicator when scrolling
  if (scrollIndicator) {
    if (scrolled > 100) {
      scrollIndicator.style.opacity = "0";
    } else {
      scrollIndicator.style.opacity = "1";
    }
  }
});

// GitHub Stats Loading Animation
document.addEventListener("DOMContentLoaded", function () {
  const statsImages = document.querySelectorAll(".github-stats img");

  statsImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    });

    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTYxYjIyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM4Yjk0OWUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg==";
    });

    // Set initial state
    img.style.opacity = "0";
    img.style.transform = "scale(0.9)";
    img.style.transition = "all 0.5s ease";
  });
});

// Preloader
function showPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loading"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0d1117;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

  const style = document.createElement("style");
  style.textContent = `
        .preloader-content {
            text-align: center;
            color: #f8f8f2;
        }
        .preloader-content p {
            margin-top: 1rem;
            font-family: 'Poppins', sans-serif;
        }
    `;

  document.head.appendChild(style);
  document.body.appendChild(preloader);

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
        style.remove();
      }, 500);
    }, 1000);
  });
}

// Initialize preloader
document.addEventListener("DOMContentLoaded", showPreloader);

// Email Copy Functionality
document.addEventListener("DOMContentLoaded", function () {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const email = this.getAttribute("href").replace("mailto:", "");

      // Try to copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showNotification("Email copied to clipboard!");
        });
      }
    });
  });
});

// Notification System
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check" : "exclamation"}-circle"></i>
        <span>${message}</span>
    `;
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Poppins', sans-serif;
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Hide notification
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Performance Optimization
document.addEventListener("DOMContentLoaded", function () {
  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Debounce scroll events
  let ticking = false;

  function updateOnScroll() {
    // Your scroll-based updates here
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
});
