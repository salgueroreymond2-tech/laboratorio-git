document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // --------------------------------------------------
  const formLogin = document.getElementById('form-login');
  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const checkRemember = document.getElementById('remember');

  // Crear dinámicamente un contenedor de alertas en el DOM
  const alertContainer = document.createElement('div');
  alertContainer.id = 'alert-message';
  formLogin.prepend(alertContainer); // Se inserta al inicio del formulario

  // --------------------------------------------------
  // 2. FUNCIONES DE MANIPULACIÓN DEL DOM
  // --------------------------------------------------

  /**
   * Muestra mensajes de error o éxito dentro del DOM
   * @param {string} mensaje - Texto a mostrar
   * @param {string} tipo - 'error' o 'success'
   */
  function mostrarAlerta(mensaje, tipo) {
    alertContainer.textContent = mensaje;
    alertContainer.className = `alert-box alert-${tipo}`;
    alertContainer.style.display = 'block';
  }

  /**
   * Guarda los datos de sesión según la preferencia del usuario
   */
  function guardarSesion(email, recordar) {
    const datosSesion = {
      email: email,
      loginTime: new Date().toISOString()
    };

    if (recordar) {
      // Persiste aunque se cierre el navegador
      localStorage.setItem('sesion_activa', JSON.stringify(datosSesion));
    } else {
      // Se borra al cerrar la pestaña
      sessionStorage.setItem('sesion_activa', JSON.stringify(datosSesion));
    }
  }

  // --------------------------------------------------
  // 3. EVENTO PRINCIPAL: SUBMIT DEL FORMULARIO
  // --------------------------------------------------
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const recordar = checkRemember.checked;

    // Validación básica de campos vacíos
    if (!email || !password) {
      mostrarAlerta('Por favor, completa todos los campos.', 'error');
      return;
    }

    // Validación simple de contraseña
    if (password.length < 6) {
      mostrarAlerta('La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    // SIMULACIÓN DE AUTENTICACIÓN EXITOSA
    mostrarAlerta('¡Credenciales correctas! Redirigiendo...', 'success');

    // Guardar sesión y redirigir
    guardarSesion(email, recordar);

    // Redirigir al gestor de contactos (index.html) tras 1.5 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
});