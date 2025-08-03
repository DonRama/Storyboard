const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPdf = document.getElementById("modal-pdf");

const data = {
  cap1: {
    title: "Capítulo 1",
    description: "Introducción al conflicto principal.",
    pdf: "docs/fragmento1.pdf"
  },
  cap2: {
    title: "Capítulo 2",
    description: "Se presentan los personajes clave.",
    pdf: "docs/fragmento2.pdf"
  },
  cap3: {
    title: "Capítulo 3",
    description: "El primer giro de la trama.",
    pdf: "docs/fragmento3.pdf"
  }
};

document.querySelectorAll('.bubble').forEach(bubble => {
  const id = bubble.dataset.id;

  // Posición guardada
  const pos = JSON.parse(localStorage.getItem(`bubble-${id}`));
  if (pos) {
    bubble.style.left = pos.left;
    bubble.style.top = pos.top;
  } else {
    // Posición inicial aleatoria
    bubble.style.left = `${Math.random() * 80}vw`;
    bubble.style.top = `${Math.random() * 60}vh`;
  }

  // Drag & drop
  bubble.onmousedown = function (e) {
    let shiftX = e.clientX - bubble.getBoundingClientRect().left;
    let shiftY = e.clientY - bubble.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      bubble.style.left = pageX - shiftX + 'px';
      bubble.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    bubble.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      bubble.onmouseup = null;

      // Guardar posición
      localStorage.setItem(`bubble-${id}`, JSON.stringify({
        left: bubble.style.left,
        top: bubble.style.top
      }));
    };
  };

  bubble.ondragstart = () => false;

  // Click para abrir modal
  bubble.addEventListener("click", () => {
    const d = data[id];
    modalTitle.textContent = d.title;
    modalDescription.textContent = d.description;
    modalPdf.src = d.pdf;
    modal.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalPdf.src = "";
});

// Alternar entre modo libre y timeline
toggleBtn.addEventListener('click', () => {
  isTimeline = !isTimeline;
  document.body.classList.toggle('timeline', isTimeline);
  
  if (isTimeline) {
    // Ordenar por fecha
    const sorted = Array.from(bubbles).sort((a,b) => 
      new Date(a.dataset.date) - new Date(b.dataset.date)
    );
    sorted.forEach(b => container.appendChild(b));
    toggleBtn.textContent = "Cambiar a Modo Libre";
  } else {
    toggleBtn.textContent = "Cambiar a Línea de Tiempo";
  }
});

// Guardar posiciones en localStorage
bubbles.forEach(bubble => {
  // Cargar posición guardada
  const saved = JSON.parse(localStorage.getItem(`bubble-${bubble.dataset.id}`));
  if (saved) {
    bubble.style.left = saved.left;
    bubble.style.top = saved.top;
  }

  // Guardar cuando se mueve
  bubble.addEventListener('mouseup', () => {
    localStorage.setItem(`bubble-${bubble.dataset.id}`, JSON.stringify({
      left: bubble.style.left,
      top: bubble.style.top
    }));
  });
});

const burbujas = document.querySelectorAll('.burbuja');

burbujas.forEach(burbuja => {
  burbuja.onmousedown = function (event) {
    const shiftX = event.clientX - burbuja.getBoundingClientRect().left;
    const shiftY = event.clientY - burbuja.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      burbuja.style.left = pageX - shiftX + 'px';
      burbuja.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    burbuja.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      burbuja.onmouseup = null;
    };
  };

  burbuja.ondragstart = function () {
    return false;
  };
});
