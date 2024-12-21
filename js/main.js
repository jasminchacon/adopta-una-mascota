const apiUrlBase = 'https://dog.ceo/api';

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

const btnBuscar = document.getElementById('btnBuscar');
const mensajeError = document.getElementById('mensajeError');
const selectRaza = document.getElementById('raza');
const resultadoPerro = document.getElementById('resultadoPerro');
const imagenPerro = document.getElementById('imagenPerro');

btnBuscar.addEventListener('click', () => {
    const razaSeleccionada = selectRaza.value;

    if (!razaSeleccionada || razaSeleccionada === "Selecciona") {
        mensajeError.classList.remove('hidden'); 
        mensajeError.classList.add('hidden'); 

        fetch(`${apiUrlBase}/breed/${razaSeleccionada}/images/random`)
            .then(response => response.json())
            .then(data => {
                imagenPerro.src = data.message; 
                resultadoPerro.classList.remove('hidden'); 
                localStorage.setItem('imagenAdoptada', data.message);
            })
            .catch(error => console.error("Error al obtener la imagen del perro:", error));
    }
});

const btnAdoptar = document.getElementById('btnAdoptar');
btnAdoptar.addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show(); 
});

const btnModalAdoptar = document.getElementById('btnModalAdoptar');
btnModalAdoptar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    if (!nombre || !rut || !ciudad) {
        alert("Por favor, completa todos los campos del formulario."); 
    } else {
        localStorage.setItem('nombreUsuario', nombre); 
        localStorage.setItem('ciudadUsuario', ciudad);
        window.location.href = 'adoptado.html'; 
    }
});

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


















