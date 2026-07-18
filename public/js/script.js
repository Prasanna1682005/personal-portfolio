/* ==========================================
   PRASANNA KUMAR VM - PERSONAL PORTFOLIO SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PRELOADER & PAGE ANIMATIONS
  // ==========================================
  const preloader = document.getElementById('preloader');
  
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      document.body.classList.remove('no-scroll');
    }
  });

  // Safe fallback if window load event already fired or is delayed
  setTimeout(() => {
    if (preloader && preloader.style.visibility !== 'hidden') {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      document.body.classList.remove('no-scroll');
    }
  }, 1800);

  // ==========================================
  // 2. ACTIVE NAVIGATION HIGHLIGHTING
  // ==========================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if the current URL ends with or includes the link's href
    if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '')) {
      link.classList.add('active');
    } else if (href && currentPath.endsWith(href) && href !== 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================
  // 3. STICKY NAVBAR ON SCROLL
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Show / Hide Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to set initial state

  // ==========================================
  // 4. MOBILE HAMBURGER MENU
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // ==========================================
  // 5. BACK TO TOP CLICK
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 6. HERO TYPING EFFECT (HOME PAGE ONLY)
  // ==========================================
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = ['Frontend Developer', 'UI/UX Designer', 'Computer Science Engineer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // speed up deleting
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 120; // typing speed
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of word
        typeDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400; // Pause before typing next word
      }
      
      setTimeout(type, typeDelay);
    };
    
    // Start typing cycle
    setTimeout(type, 1000);
  }

  // ==========================================
  // 7. SKILLS ANIMATIONS (SKILLS PAGE ONLY)
  // ==========================================
  
  // Technical Skill Circles Progress Animation
  const skillCircles = document.querySelectorAll('.skill-circle circle.circle-progress');
  if (skillCircles.length > 0) {
    // 2 * PI * r (r=54) -> 339.29 px
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    
    const animateCircles = () => {
      skillCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        if (percent) {
          const offset = circumference - (circumference * percent) / 100;
          circle.style.strokeDashoffset = offset;
        }
      });
    };

    // Trigger circular progress animations
    setTimeout(animateCircles, 300);
  }

  // Soft Skills Progress Bars Animation
  const softProgressBars = document.querySelectorAll('.soft-skill-progress');
  if (softProgressBars.length > 0) {
    const animateBars = () => {
      softProgressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (percent) {
          bar.style.width = `${percent}%`;
        }
      });
    };
    
    // Trigger progress bar animations
    setTimeout(animateBars, 400);
  }

  // ==========================================
  // 8. CONTACT FORM VALIDATION (CONTACT PAGE ONLY)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input');
    
    // Check validation on user input
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        const group = input.parentElement;
        if (group && group.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });

    const validateField = (input) => {
      const group = input.parentElement;
      if (!group) return false;

      let isValid = true;
      const val = input.value.trim();
      const type = input.getAttribute('type');
      const name = input.getAttribute('name');

      if (val === '') {
        isValid = false;
      } else if (type === 'email' || name === 'from_email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(val);
      } else if (name === 'phone') {
        // Optional phone check
        const phoneRegex = /^[+]?[0-9]{8,15}$/;
        isValid = val === '' || phoneRegex.test(val.replace(/[\s-()]/g, ''));
      }

      if (isValid) {
        group.classList.remove('invalid');
      } else {
        group.classList.add('invalid');
      }

      return isValid;
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (formStatus) {
          formStatus.textContent = 'Please fix the errors in the form before submitting.';
          formStatus.className = 'form-status error';
          formStatus.style.display = 'block';
        }
        return;
      }

      // If form is valid, simulate dynamic submission (since we don't have backends, it's premium visual logic)
      const submitBtn = contactForm.querySelector('.contact-submit');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Sending...`;
      }
fetch("http://localhost:5001/send-email", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        from_name: document.querySelector("[name='from_name']").value,
        from_email: document.querySelector("[name='from_email']").value,
        phone: document.querySelector("[name='phone']").value,
        subject: document.querySelector("[name='subject']").value,
        message: document.querySelector("[name='message']").value
    })
})
.then(res => res.json())
.then(data => {

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }

    if (data.success) {
        formStatus.textContent = "✅ Message Sent Successfully!";
        formStatus.className = "form-status success";
        formStatus.style.display = "block";
        contactForm.reset();
    } else {
        formStatus.textContent = "❌ Failed to send message.";
        formStatus.className = "form-status error";
        formStatus.style.display = "block";
    }

})
.catch(error => {

    console.error(error);

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }

    formStatus.textContent = "❌ Server Error";
    formStatus.className = "form-status error";
    formStatus.style.display = "block";

});

}); // <-- ADD THIS LINE

} // if (contactForm)

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

}); // DOMContentLoaded