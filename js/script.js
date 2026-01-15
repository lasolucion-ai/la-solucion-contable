// CONTENIDO DE LOS MODALES
const infoServicios = {
    contable: {
        titulo: "Servicios Contables",
        lista: [
            "Consultoría General",
            "Balances de Apertura, Gestión y Cierre",
            "Regulacion de Pago de impuestos",            
            "Flujos de Efectivo para Préstamos Bancarios",
            "Contabilidad comercial, Servicios, Industrial, Minero, etc.",
            "Elaboracion de Estados Financieros",
            "Contencioso Administrativo y Amparo Constitucional",
            "Impugnacion ante la A.I.T. Ley 2492-843"
        ]
    },
    tributario: {
        titulo: "Servicios Tributarios",
        lista: [
            "Declaraciones Juradas Mensuales y Anuales",
            "Llenado de Formularios (IVA, IT, IUE, etc.)",
            "Envío de Libros de Compras y Ventas R.C.V.",
            "Envio de Estados Financieros SIAT",
            "Bancarizaciones",
            "Cálculo de Deudas Tributarias segun Ley 2492 y Ley 843",
            "Asesoramiento de Fiscalizaciones",
            "Inventario de mercaderias",
            "Auditorias Tributarias",
            "Auditorias Financieras"
        ]
    },
    laboral: {
        titulo: "Servicios Laborales",
        lista: [
            "Trámites en general ante el Ministerio de Trabajo",
            "DD.JJ. a la oficina virtual de tramites del Ministerio de Trabajo",
            "Tramites Cajas de Salud (CNS, Petrolera, etc.)",
            "Certificado R.O.E.",
            "Elaboración de Planillas de Sueldos y Salarios",
            "Altas y bajas de derecho habientes",
            "Liquidación de Beneficios Sociales",
            "Elaboracion de finiquitos",
            "Via administrativa ante el Min. de Trabajo",            
            "SEDEM - subsidios PRENATAL Y LACTANCIA"
        ]
    },
    seprec: {
        titulo: "SEPREC y Otros Trámites",
        lista: [
            "Constitución de Empresas",
            "Transformación y Fusión de Empresas",
            "Cierre, Liquidación y Disolución de Empresas",
            "Apertura de Sucursales",
            "Actualización de Matrículas de Comercio",
            "Llenado de Formularios SEPREC",
            "Balace de Gestión, Cierre y Balances Especiales",
            "Trámites en Aduana Nacional",
            "Licencias de Funcionamiento Municipal",
            "---------------------------------------------",
            "Aduana Nacional",
            "Gobierno Autónomo Municipal de La Paz",
            "Licencia de Funcionamiento y Patentes",
            "SIGMA - SIGEP - RUPE - SICOES",
            "Declaraciones Juradas de Bienes y Renta - Controloria"
        ]
    }
};

// FUNCIONES DEL MODAL
function openModal(tipo) {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('modal-content');
    const data = infoServicios[tipo];

    let listHTML = data.lista.map(item => {
 
        if (item.includes("---")) {
            return `<hr class="modal-divider">`;
        }
        return `
            <div class="modal-list-item">
                <i class="fas fa-check-circle"></i>
                <span>${item}</span>
            </div>
        `;
    }).join('');

    content.innerHTML = `
        <h2 style="color:var(--primary-blue); margin-bottom:20px; font-size:1.8rem;">
            <i class="fas fa-briefcase"></i> ${data.titulo}
        </h2>
        <div class="modal-body-list">
            ${listHTML}
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Bloquea el scroll de la página principal
}

function closeModal() {
    document.getElementById('service-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Habilita el scroll nuevamente
}

// MODO OSCURO
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

// ENVÍO DE FORMULARIO AJAX
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    fetch("https://formsubmit.co/ajax/lasolucion.gerencia@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(this)))
    })
    .then(res => res.json())
    .then(() => {
        status.innerHTML = "¡Información enviada con éxito! Nos contactaremos pronto.";
        status.style.color = "#25d366";
        status.style.marginTop = "15px";
        status.style.fontWeight = "bold";
        this.reset();
    })
    .catch(() => {
        status.innerHTML = "Error al enviar. Por favor contacte vía WhatsApp.";
        status.style.color = "red";
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerHTML = 'Enviar Información <i class="fas fa-paper-plane"></i>';
    });
});

// 1. CONFIGURACIÓN DEL REVEAL
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            if (entry.target.classList.contains('stats-section')) {
                startCounters();
            }
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// 2. LÓGICA DE CONTADORES 
function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; 

    counters.forEach(counter => {
        if (counter.classList.contains('counted')) return;
        counter.classList.add('counted');

        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (target === 10 ? "" : "+");
            }
        };
        updateCount();
    });
}

// 3. FUNCIÓN COMPARTIR PÁGINA
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'La Solución - Tributación y Contabilidad',
            text: 'Asesoría contable y tributaria profesional en La Paz.',
            url: window.location.href,
        }).then(() => {
            console.log('Gracias por compartir');
        }).catch(console.error);
    } else {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Enlace copiado al portapapeles. ¡Ya puedes compartirlo!');
        });
    }
}