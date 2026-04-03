// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para enlaces internos (funciona con los enlaces del menú Bootstrap)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Cerrar el menú de Bootstrap si está abierto
                const navbarCollapse = document.getElementById('navbarToggleExternalContent');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
                
                // Scroll suave al elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.value-card, .service-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
    
    // Cerrar menú al hacer clic fuera (opcional)
    document.addEventListener('click', function(event) {
        const navbarCollapse = document.getElementById('navbarToggleExternalContent');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });
});

// Agregar estilos de animación si no existen
const style = document.createElement('style');
style.textContent = `
    .value-card, .service-card, .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .value-card.animate, .service-card.animate, .contact-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);