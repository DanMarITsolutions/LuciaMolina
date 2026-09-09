const openButtons = document.querySelectorAll(
  ".project-cover, .project-title"
);

const closeButtons = document.querySelectorAll(".close-sheet");

const projects = document.querySelectorAll(".project-preview");

const previousButton = document.querySelector("#previous-project");
const nextButton = document.querySelector("#next-project");
const counter = document.querySelector("#carousel-counter");

let currentProject = 0;
let previousFocus = null;
let openSheet = null;

/* Mostrar el proyecto activo */

function showProject(index) {
  projects.forEach((project, projectIndex) => {
    project.classList.toggle("is-active", projectIndex === index);
  });

  const currentNumber = String(index + 1).padStart(2, "0");
  const totalNumber = String(projects.length).padStart(2, "0");

  if (counter) {
    counter.textContent = `${currentNumber} / ${totalNumber}`;
  }

  if (previousButton) {
    previousButton.disabled = projects.length <= 1;
  }

  if (nextButton) {
    nextButton.disabled = projects.length <= 1;
  }
}

/* Siguiente proyecto */

function nextProject() {
  currentProject = (currentProject + 1) % projects.length;
  showProject(currentProject);
}

/* Proyecto anterior */

function previousProject() {
  currentProject =
    (currentProject - 1 + projects.length) % projects.length;

  showProject(currentProject);
}

/* Abrir ficha */

function openProject(event) {
  const article = event.currentTarget.closest(".project-preview");
  if (!article) return;

  const projectId = article.dataset.project;
  const sheet = document.querySelector(`#${projectId}-sheet`);
  if (!sheet) return;

  previousFocus = event.currentTarget;
  openSheet = sheet;

  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  const closeButton = sheet.querySelector(".close-sheet");

  if (closeButton) {
    closeButton.focus();
  }
}

/* Cerrar ficha */

function closeProject() {
  if (!openSheet) return;

  openSheet.classList.remove("is-open");
  openSheet.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (previousFocus) {
    previousFocus.focus();
  }

  openSheet = null;
}

/* Eventos de apertura */

openButtons.forEach((button) => {
  button.addEventListener("click", openProject);
});

/* Eventos de cierre */

closeButtons.forEach((button) => {
  button.addEventListener("click", closeProject);
});

/* Flechas */

if (nextButton) {
  nextButton.addEventListener("click", nextProject);
}

if (previousButton) {
  previousButton.addEventListener("click", previousProject);
}

/* Teclado */

document.addEventListener("keydown", (event) => {
  if (openSheet) {
    if (event.key === "Escape") {
      closeProject();
    }

    return;
  }

  if (event.key === "ArrowRight") {
    nextProject();
  }

  if (event.key === "ArrowLeft") {
    previousProject();
  }
});

/* Estado inicial */

showProject(currentProject);