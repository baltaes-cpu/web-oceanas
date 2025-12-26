// Náutica OCEANAS - JavaScript principal
// Cumple con RGPD, LSSI y LOPDGDD

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });
}

// ============================================
// GESTIÓN DE COOKIES CONFORME A LA NORMATIVA
// ============================================

const cookieBanner = document.querySelector('.cookie-banner');
const acceptCookiesBtn = document.querySelector('.accept-cookies');
const rejectCookiesBtn = document.querySelector('.reject-cookies');
const configureCookiesBtn = document.querySelector('.configure-cookies');

// Función para comprobar si ya hay consentimiento
function checkCookieConsent() {
  const consent = localStorage.getItem('oceanas_cookies');
  
  if (!consent && cookieBanner) {
    // Si no hay consentimiento, mostrar banner
    cookieBanner.classList.add('show');
  } else if (consent) {
    // Si hay consentimiento, aplicar preferencias
    const consentData = JSON.parse(consent);
    if (consentData.accepted) {
      // Aquí puedes activar cookies no esenciales si las usaras en el futuro
      console.log('Usuario ha aceptado las cookies');
    }
  }
}

// Función para guardar consentimiento
function saveConsent(accepted) {
  const consentData = {
    accepted: accepted,
    date: new Date().toISOString(),
    version: '1.0'  // Versión de la política
  };
  
  localStorage.setItem('oceanas_cookies', JSON.stringify(consentData));
  
  if (cookieBanner) {
    cookieBanner.classList.remove('show');
  }
}

// Botón Aceptar
if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener('click', () => {
    saveConsent(true);
    
    // Mostrar mensaje de confirmación
    showToast('Preferencias guardadas. Solo usamos cookies técnicas necesarias.', 'success');
  });
}

// Botón Rechazar
if (rejectCookiesBtn) {
  rejectCookiesBtn.addEventListener('click', () => {
    saveConsent(false);
    
    // Mostrar mensaje informativo
    showToast('Solo se usarán cookies técnicas estrictamente necesarias.', 'info');
  });
}

// Botón Configurar (si existe)
if (configureCookiesBtn) {
  configureCookiesBtn.addEventListener('click', () => {
    // Redirigir a la página de política de cookies
    window.location.href = 'cookies.html';
  });
}

// Función para mostrar notificaciones simples
function showToast(message, type = 'info') {
  // Crear elemento de notificación
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4caf50' : '#2196f3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Eliminar después de 4 segundos
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mostrar banner al cargar la página
window.addEventListener('load', checkCookieConsent);

// ============================================
// RESTO DEL CÓDIGO
// ============================================

// Active navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Smooth scroll for anchor links
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

// Cerrar menú móvil al hacer scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  if (mainNav && mainNav.classList.contains('show')) {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 50) {
      mainNav.classList.remove('show');
    }
    lastScroll = currentScroll;
  }
});
