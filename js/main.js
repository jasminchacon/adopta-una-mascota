const apiUrlBase = 'https://dog.ceo/api';

// Cargar la lista de razas en el select
fetch(`${apiUrlBase}/breeds/list/all`)
    .then(response => response.json())
    .then(data => {
        const razas = Object.keys(data.message);
        const selector = document.getElementById('raza');

        razas.forEach(raza => {
            const option = document.createElement('option');
            option.value = raza;
            option.textContent = raza;
            selector.appendChild(option);
        });
    })
    .catch(error => console.error("Error al cargar razas:", error));

// Validar selección de raza y mostrar imagen del perro
const btnBuscar = document.getElementById('btnBuscar');
const mensajeError = document.getElementById('mensajeError');
const selectRaza = document.getElementById('raza');
const resultadoPerro = document.getElementById('resultadoPerro');
const imagenPerro = document.getElementById('imagenPerro');

btnBuscar.addEventListener('click', () => {
    const razaSeleccionada = selectRaza.value;

    if (!razaSeleccionada || razaSeleccionada === "Selecciona") {
        mensajeError.classList.remove('hidden'); // Mostrar el mensaje de error
    } else {
        mensajeError.classList.add('hidden'); // Ocultar el mensaje de error

        // Hacer petición a la API para obtener una imagen de la raza seleccionada
        fetch(`${apiUrlBase}/breed/${razaSeleccionada}/images/random`)
            .then(response => response.json())
            .then(data => {
                imagenPerro.src = data.message; // Mostrar imagen del perro
                resultadoPerro.classList.remove('hidden'); // Mostrar el contenedor del perro
                localStorage.setItem('imagenAdoptada', data.message); // Guardar la imagen para la página de adopción
            })
            .catch(error => console.error("Error al obtener la imagen del perro:", error));
    }
});

// Mostrar modal al presionar "Adoptar"
const btnAdoptar = document.getElementById('btnAdoptar');
btnAdoptar.addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show(); // Mostrar el modal
});

// Validar el formulario y redirigir a la página de adopción
const btnModalAdoptar = document.getElementById('btnModalAdoptar');
btnModalAdoptar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    if (!nombre || !rut || !ciudad) {
        alert("Por favor, completa todos los campos del formulario."); // Validación simple
    } else {
        localStorage.setItem('nombreUsuario', nombre); // Guardar datos en localStorage (opcional)
        localStorage.setItem('ciudadUsuario', ciudad);
        window.location.href = 'adoptado.html'; // Redirigir a la página de adopción
    }
});

 // Mostrar información desde localStorage
 const imagenUrl = localStorage.getItem('imagenAdoptada');
 const nombreUsuario = localStorage.getItem('nombreUsuario');
 const ciudadUsuario = localStorage.getItem('ciudadUsuario');
 const imagenElement = document.getElementById('imagenAdoptada');
 const mensajeAdopcion = document.getElementById('mensajeAdopcion');

 if (imagenUrl) {
     imagenElement.src = imagenUrl;
 } else {
     imagenElement.alt = "No se encontró la imagen del perro adoptado.";
     imagenElement.style.display = "none";
 }

 if (nombreUsuario && ciudadUsuario) {
     mensajeAdopcion.textContent = `¡Gracias ${nombreUsuario} por adoptar desde ${ciudadUsuario}!`;
 } else {
     mensajeAdopcion.textContent = "¡Gracias por adoptar!";
 }




















