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

// Navbar Background on Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(13, 17, 23, 0.98)";
  } else {
    navbar.style.background = "rgba(13, 17, 23, 0.95)";
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".about-item, .tech-item, .section-title, .timeline-item, .contact-item"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
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
        background: linear-gradient(45deg, #ff006e, #8338ec);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(131, 56, 236, 0.3);
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
