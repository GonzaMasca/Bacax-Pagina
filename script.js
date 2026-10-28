// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MENÚ HAMBURGUESA (CORREGIDO)
    // ============================================
    
    // Buscar el botón hamburguesa de Bootstrap
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarToggleExternalContent');
    
    if (navbarToggler && navbarCollapse) {
        console.log('✅ Menú encontrado, configurando evento...');
        
        // Cuando se hace clic en el botón hamburguesa
        navbarToggler.addEventListener('click', function() {
            // Bootstrap maneja automáticamente el toggle, solo registramos
            console.log('🔄 Menú toggled');
        });
    } else {
        console.log('❌ No se encontró el menú Bootstrap');
        console.log('Botón:', navbarToggler);
        console.log('Contenedor:', navbarCollapse);
    }
    
    // ============================================
    // 2. SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                
                // Cerrar el menú de Bootstrap si está abierto
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    // Intentar cerrar con Bootstrap
                    if (typeof bootstrap !== 'undefined') {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    } else {
                        // Fallback si Bootstrap no está cargado
                        navbarCollapse.classList.remove('show');
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
    
    // ============================================
    // 3. ANIMACIONES AL HACER SCROLL
    // ============================================
    
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
    document.querySelectorAll('.value-card, .service-card, .contact-card, .fleet-item').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // 4. CERRAR MENÚ AL HACER CLIC FUERA
    // ============================================
    
    document.addEventListener('click', function(event) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
                if (typeof bootstrap !== 'undefined') {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
    
    // ============================================
    // 5. VERIFICACIÓN DE BOOTSTRAP (OPCIONAL)
    // ============================================
    
    if (typeof bootstrap === 'undefined') {
        console.warn('⚠️ Bootstrap JS no está cargado. El menú no funcionará correctamente.');
        console.warn('Asegúrate de incluir: <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>');
    } else {
        console.log('✅ Bootstrap JS está cargado correctamente');
    }
    
});

// ============================================
// 6. AGREGAR ESTILOS DE ANIMACIÓN
// ============================================

const style = document.createElement('style');
style.textContent = `
    .value-card, .service-card, .contact-card, .fleet-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .value-card.animate, .service-card.animate, .contact-card.animate, .fleet-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
// ============================================
// BURBUJA FLOTANTE DE CONTACTO
// ============================================
(function() {
    const fab = document.getElementById('fabContainer');
    const btn = document.getElementById('fabMain');
    if (!fab || !btn) return;

    btn.addEventListener('click', function() {
        fab.classList.toggle('open');
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!fab.contains(e.target)) {
            fab.classList.remove('open');
        }
    });
})();
