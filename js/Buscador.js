// Importa los personajes desde Personajes.js
import { personajesCrepusculo } from "./Personajes.js";

// Elementos del DOM
const input = document.getElementById("inputPersonajes");
const suggestions = document.getElementById("sugerencias");
const boton = document.getElementById("botonJugar");
const tabla = document.querySelector(".tabla table tbody");
const empezarJuego = document.getElementById("empezarJuego");
const restoJuego = document.getElementById("restoJuego");
const intentosDisplay = document.getElementById("intentos");

// Variables del juego
let personajeGanador;
let intentos = 0;
const maxIntentos = 5; // Número máximo de intentos

// Seleccionamos un personaje aleatorio para que el usuario lo adivine
function seleccionarPersonajeGanador() {
  personajeGanador =
    personajesCrepusculo[
      Math.floor(Math.random() * personajesCrepusculo.length)
    ];
  let genero = document.getElementById("sexo");
  genero.innerHTML = "Sexo: " + personajeGanador.genero;
}

// Función para filtrar y mostrar sugerencias
function filterCharactersByInitial(initial) {
  suggestions.innerHTML = "";
  suggestions.classList.remove("mostrar");

  if (!initial) return;

  const filtered = personajesCrepusculo.filter((personaje) =>
    personaje.nombre.toLowerCase().startsWith(initial.toLowerCase())
  );

  filtered.forEach((personaje, index) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.textContent = personaje.nombre;

    suggestionItem.addEventListener("click", () => {
      input.value = personaje.nombre;
      suggestions.innerHTML = "";
      suggestions.classList.remove("mostrar");
    });

    suggestions.appendChild(suggestionItem);
  });

  if (filtered.length > 0) {
    suggestions.classList.add("mostrar");
  }
}

// Detectar cambios en el input
input.addEventListener("input", () => {
  filterCharactersByInitial(input.value);
});

// Función para comparar los atributos de los personajes
function compararPersonajes(personajeSeleccionado) {
  const atributos = [
    "nombre",
    "genero",
    "tipo",
    "peliculas",
    "estadoFinal",
    "pareja",
  ];

  return atributos.map((atributo) => {
    const valorSeleccionado = personajeSeleccionado[atributo];
    const valorGanador = personajeGanador[atributo];

    // Convertir ambos valores a cadenas de texto
    const valorSeleccionadoStr =
      valorSeleccionado !== undefined && valorSeleccionado !== null
        ? valorSeleccionado.toString().toLowerCase()
        : "";
    const valorGanadorStr =
      valorGanador !== undefined && valorGanador !== null
        ? valorGanador.toString().toLowerCase()
        : "";

    return valorSeleccionadoStr === valorGanadorStr;
  });
}

// Función para agregar el personaje seleccionado a la tabla
function agregarPersonajeATabla(nombrePersonaje) {
  const personaje = personajesCrepusculo.find(
    (p) => p.nombre.toLowerCase() === nombrePersonaje.toLowerCase()
  );

  if (!personaje) return; // Si no se encuentra el personaje, no hacer nada

  // Crear una nueva fila para la tabla
  const fila = document.createElement("tr");

  // Obtener la comparación de los atributos
  const comparacion = compararPersonajes(personaje);

  // Añadir los atributos de la fila y comparar
  fila.innerHTML = `
    <td><img src="${personaje.imagen}" alt="${
    personaje.nombre
  }" style="width:100%; height:100%; object-fit: cover;"></td>
    <td style="background-color: ${comparacion[0] ? "green" : "red"}">${
    personaje.nombre
  }</td>
    <td style="background-color: ${comparacion[1] ? "green" : "red"}">${
    personaje.genero
  }</td>
    <td style="background-color: ${comparacion[2] ? "green" : "red"}">${
    personaje.tipo
  }</td>
    <td style="background-color: ${comparacion[3] ? "green" : "red"}">${
    personaje.peliculas
  }</td>
    <td style="background-color: ${comparacion[4] ? "green" : "red"}">${
    personaje.estadoFinal
  }</td>
    <td style="background-color: ${comparacion[5] ? "green" : "red"}">${
    personaje.pareja
  }</td>
  `;

  // Añadir la fila a la tabla
  tabla.appendChild(fila);

  // Limpiar el input después de agregar
  input.value = "";
  suggestions.innerHTML = "";
  suggestions.classList.remove("mostrar");

  // Aumentar el contador de intentos
  intentos++;
  intentosDisplay.textContent = `Número de intentos: ${intentos}`;

  let texto;

  // Comprobar si el usuario ha adivinado correctamente
  if (comparacion.every((v) => v === true)) {

    texto = "¡Felicidades! Has adivinado el personaje correctamente.";

    sobreescribirDiv(texto);
    
  } else if (intentos >= maxIntentos) {

    texto = "¡Se acabaron los intentos! El personaje era: " + personajeGanador.nombre;

    sobreescribirDiv(texto);

  }
}

//Hacemos una funcion para sobreescribir el div inicial para poner la imagen del personaje a adivinar.
function sobreescribirDiv(texto){
  //Seleccionamos el div
  const div = document.getElementById("divInicial");

  //Guardamos el contenido original
  const contenidoOriginal = div.innerHTML;

  //Sobreescribimos el contenido del div
  div.innerHTML = `
    <img src="${personajeGanador.imagen}" alt="${personajeGanador.nombre}"
    style="width: 300px;"/>
    <p style="text-align: center;">${texto}</p>
  `;

}

// Detectar clic en el botón para agregar el personaje
boton.addEventListener("click", () => {
  const nombrePersonaje = input.value.trim();
  agregarPersonajeATabla(nombrePersonaje);
});

// Mostrar la parte del juego cuando se haga clic en el botón "JUGAR"
document.getElementById("jugar").addEventListener("click", function () {
  empezarJuego.style.display = "none";
  restoJuego.style.display = "block";
  seleccionarPersonajeGanador(); // Seleccionar el personaje ganador al iniciar el juego
});

// Ocultar las sugerencias si el usuario hace clic fuera del contenedor de sugerencias
document.addEventListener("click", (event) => {
  if (!event.target.closest(".botones")) {
    suggestions.innerHTML = "";
    suggestions.classList.remove("mostrar");
  }
});
