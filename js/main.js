// Gestion du menu mobile
const initMobileMenu = () => {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const svg = menuButton.querySelector('svg');
        
        if (mobileMenu.classList.contains('open')) {
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
          document.body.style.overflow = 'hidden'; // Empêche le défilement quand le menu est ouvert
        } else {
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
          document.body.style.overflow = ''; // Réactive le défilement
        }
      });
  
      // Ferme le menu mobile lors du clic sur un lien
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
          const svg = menuButton.querySelector('svg');
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        });
      });
    }
  };
  
  // Gestion des accordéons (page À propos)
  const initAccordions = () => {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const chevron = button.querySelector('.chevron');
        const isActive = button.classList.contains('active');
        
        // Ferme tous les autres accordéons
        accordionButtons.forEach(otherButton => {
          if (otherButton !== button && otherButton.classList.contains('active')) {
            otherButton.classList.remove('active');
            otherButton.nextElementSibling.style.maxHeight = '0';
            otherButton.querySelector('.chevron').style.transform = '';
          }
        });
        
        // Ouvre/ferme l'accordéon cliqué
        button.classList.toggle('active');
        chevron.style.transform = isActive ? '' : 'rotate(180deg)';
        content.style.maxHeight = isActive ? '0' : `${content.scrollHeight}px`;
      });
    });
  };
  
  // Animation au défilement
  const initScrollAnimations = () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Arrête d'observer une fois animé
        }
      });
    }, observerOptions);
  
    // Observe les éléments avec animation
    document.querySelectorAll('.portfolio-item, .skill-card, .pricing-card').forEach(item => {
      observer.observe(item);
    });
  };
  
  // Gestion des images de projet
  const initProjectImages = () => {
    const projectImages = document.querySelectorAll('.portfolio-image');
    
    projectImages.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
  
      // Ajoute un effet de zoom au survol sur la page de détail du projet
      if (document.querySelector('.project-images')) {
        img.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
        });
  
        img.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
        });
      }
    });
  };
  
  // Initialisation au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordions();
    initScrollAnimations();
    initProjectImages();
  
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });
  
  // Gestion du redimensionnement de la fenêtre
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Réinitialise la hauteur des accordéons ouverts
      const activeAccordions = document.querySelectorAll('.accordion-button.active');
      activeAccordions.forEach(button => {
        const content = button.nextElementSibling;
        content.style.maxHeight = `${content.scrollHeight}px`;
      });
    }, 250);
  });