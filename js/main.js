async function cargarNavbar() {
  const contenedor = document.querySelector('#navbar');
  if (!contenedor) return;

  const rutaNavbar = contenedor.dataset.navbar;
  const rutaInicio = contenedor.dataset.home;
  const rutaPaginas = contenedor.dataset.pages;

  try {
    const respuesta = await fetch(rutaNavbar);
    if (!respuesta.ok) throw new Error('No se ha podido cargar navbar.html');

    contenedor.innerHTML = await respuesta.text();

    const rutas = {
      home: rutaInicio,
      proyectos: `${rutaPaginas}proyecto.html`,
      'sobre-mi': `${rutaPaginas}sobre-mi.html`,
      contacto: `${rutaPaginas}contacto.html`
    };

    document.querySelectorAll('[data-link]').forEach((enlace) => {
      const destino = enlace.dataset.link;
      if (rutas[destino]) enlace.setAttribute('href', rutas[destino]);
    });

    marcarPaginaActual();
    activarMenuMovil();
  } catch (error) {
    console.error('Error en el navbar:', error);
  }
}

function marcarPaginaActual() {
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar-links a').forEach((enlace) => {
    const paginaEnlace = enlace.getAttribute('href')?.split('/').pop();
    if (paginaEnlace === paginaActual) enlace.setAttribute('aria-current', 'page');
  });
}

function activarMenuMovil() {
  const boton = document.querySelector('.menu-button');
  const menu = document.querySelector('.navbar-links');
  if (!boton || !menu) return;

  boton.addEventListener('click', () => {
    const abierto = boton.getAttribute('aria-expanded') === 'true';
    boton.setAttribute('aria-expanded', String(!abierto));
    boton.setAttribute('aria-label', abierto ? 'Abrir menú' : 'Cerrar menú');
    menu.classList.toggle('is-open', !abierto);
  });
}

cargarNavbar();
