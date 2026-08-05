// ==========================================
// 1. ESTADO INICIAL Y CONEXIÓN A LOCALSTORAGE
// ==========================================

// Carga los contactos guardados previamente o asigna unos de prueba
let contactos = JSON.parse(localStorage.getItem('gestor_contactos')) || [
  { id: 1, nombre: 'Ana Gómez', telefono: '555-1234', email: 'ana@email.com' },
  { id: 2, nombre: 'Carlos Ruiz', telefono: '555-5678', email: 'carlos@email.com' }
];

// Selección de nodos del DOM
const formContacto = document.getElementById('form-contacto');
const listaContactos = document.getElementById('lista-contactos');
const inputBuscar = document.getElementById('input-buscar');

// ==========================================
// 2. FUNCIONES AUXILIARES
// ==========================================

// Guarda el estado actual en el navegador
function guardarEnLocalStorage() {
  localStorage.setItem('gestor_contactos', JSON.stringify(contactos));
}

// Renderiza los elementos en la tabla (LISTAR + BUSCAR)
function renderizar(filtro = '') {
  listaContactos.innerHTML = '';

  const contactosFiltrados = contactos.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    c.telefono.includes(filtro)
  );

  if (contactosFiltrados.length === 0) {
    listaContactos.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted);">
          No hay contactos registrados.
        </td>
      </tr>
    `;
    return;
  }

  contactosFiltrados.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHTML(c.nombre)}</strong></td>
      <td>${escapeHTML(c.telefono)}</td>
      <td>${escapeHTML(c.email)}</td>
      <td>
        <button class="btn-danger" data-id="${c.id}">Eliminar</button>
      </td>
    `;
    listaContactos.appendChild(tr);
  });
}

// Sanitiza texto para evitar vulnerabilidades XSS
function escapeHTML(cadena) {
  const div = document.createElement('div');
  div.innerText = cadena;
  return div.innerHTML;
}

// ==========================================
// 3. EVENTOS (CREAR, BUSCAR Y ELIMINAR)
// ==========================================

// CREAR: Agregar nuevo contacto
formContacto.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoContacto = {
    id: Date.now(),
    nombre: document.getElementById('nombre').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  contactos.push(nuevoContacto);
  guardarEnLocalStorage();
  formContacto.reset();
  renderizar(inputBuscar.value);
});

// BUSCAR: Filtrado dinámico mientras el usuario escribe
inputBuscar.addEventListener('input', (e) => {
  renderizar(e.target.value);
});

// ELIMINAR: Delegación de eventos para los botones de la tabla
listaContactos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger')) {
    const idAEliminar = Number(e.target.getAttribute('data-id'));
    contactos = contactos.filter(c => c.id !== idAEliminar);
    guardarEnLocalStorage();
    renderizar(inputBuscar.value);
  }
});

// ==========================================
// 4. INICIALIZACIÓN
// ==========================================
renderizar();