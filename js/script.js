// CONTENIDO DE LOS MODALES
const infoServicios = {
    contable: {
        titulo: "Servicios Contables",
        lista: [
            "Consultoría General Contable",
            "Balances de Apertura, Gestión y Cierre",
            "Elaboración de Estados Financieros",
            "Auditorías Financieras y Operativas",
            "Flujos de Efectivo para Préstamos Bancarios"
        ]
    },
    tributario: {
        titulo: "Servicios Tributarios",
        lista: [
            "Declaraciones Juradas Mensuales y Anuales",
            "Llenado de Formularios (IVA, IT, IUE, etc.)",
            "Envío de Libros de Compras y Ventas (RCV)",
            "Cálculo de Deudas Tributarias (Ley 2492)",
            "Asesoramiento en Fiscalizaciones de Impuestos"
        ]
    },
    laboral: {
        titulo: "Servicios Laborales",
        lista: [
            "Trámites ante el Ministerio de Trabajo",
            "Elaboración de Planillas de Sueldos y Salarios",
            "Liquidación de Beneficios Sociales y Finiquitos",
            "Trámites Cajas de Salud (CNS, Petrolera, etc.)",
            "Gestión de Subsidios Prenatal y Lactancia"
        ]
    },
    seprec: {
        titulo: "SEPREC y Otros Trámites",
        lista: [
            "Constitución de Empresas (S.R.L., S.A., Unipersonal)",
            "Actualización de Matrículas de Comercio",
            "Modificaciones, Fusiones y Disoluciones",
            "Trámites en Aduana Nacional",
            "Licencias de Funcionamiento Municipal"
        ]
    }
};

// FUNCIONES DEL MODAL
function openModal(tipo) {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('modal-content');
    const data = infoServicios[tipo];

    content.innerHTML = `
        <h2 style="color:var(--primary-blue); margin-bottom:20px; font-size:1.8rem;">
            <i class="fas fa-check-circle"></i> ${data.titulo}
        </h2>
        <ul style="list-style:none; padding:0;">
            ${data.lista.map(item => `
                <li style="padding:12px 0; border-bottom:1px solid rgba(0,0,0,0.1); display:flex; align-items:start; gap:10px;">
                    <i class="fas fa-caret-right" style="color:var(--accent-blue); margin-top:5px;"></i>
                    <span style="font-size:1.1rem;">${item}</span>
                </li>
            `).join('')}
        </ul>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('service-modal').style.display = 'none';
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