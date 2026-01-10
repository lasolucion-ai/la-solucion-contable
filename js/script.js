const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Función para cambiar de tema
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Cargar preferencia guardada
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
};

// Pequeña animación al enviar el formulario (opcional)
document.getElementById('contact-form').onsubmit = function() {
    const btn = this.querySelector('.btn-submit');
    btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.opacity = '0.7';
};
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    const formData = new FormData(this);
    
    // Convertimos FormData a un objeto simple para el JSON
    const data = Object.fromEntries(formData.entries());

    btn.disabled = true;
    btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

    // Usamos el endpoint AJAX de FormSubmit
    fetch("https://formsubmit.co/ajax/lasolucion.gerencia@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        status.innerHTML = "¡Información enviada con éxito! Nos contactaremos pronto.";
        status.className = "status-msg status-success";
        this.reset(); // Limpia el formulario
    })
    .catch(error => {
        status.innerHTML = "Hubo un error. Por favor, intenta de nuevo o usa WhatsApp.";
        status.className = "status-msg status-error";
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerHTML = 'Enviar Información <i class="fas fa-paper-plane"></i>';
    });
});