// Importa los personajes desde Personajes.js
import { personajesCrepusculo } from "./Personajes.js";

// Elementos del DOM
const input = document.getElementById("inputPersonajes");
const suggestions = document.getElementById("sugerencias");

// Variables para manejar la selección con el teclado
let selectedIndex = -1; // Índice de la sugerencia seleccionada

// Función para filtrar y mostrar sugerencias
function filterCharactersByInitial(initial) {
    suggestions.innerHTML = ""; // Limpia las sugerencias previas
    suggestions.classList.remove("mostrar"); // Oculta las sugerencias por defecto

    if (!initial) return; // Si no hay texto, no hacemos nada

    // Filtra los personajes que comienzan con la inicial ingresada
    const filtered = personajesCrepusculo.filter(personaje =>
        personaje.nombre.toLowerCase().startsWith(initial.toLowerCase())
    );

    // Si hay personajes filtrados, los mostramos
    filtered.forEach((personaje, index) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = personaje.nombre;

        // Añadir clase para indicar la sugerencia seleccionada
        if (index === selectedIndex) {
            suggestionItem.classList.add("selected");
        }

        // Al hacer clic en una sugerencia, completar el input con el nombre
        suggestionItem.addEventListener("click", () => {
            input.value = personaje.nombre; // Completa el input con el nombre del personaje
            suggestions.innerHTML = ""; // Oculta las sugerencias al seleccionar un personaje
            suggestions.classList.remove("mostrar"); // Oculta las sugerencias
            selectedIndex = -1; // Reinicia la selección
        });

        // Agregar la sugerencia a la lista
        suggestions.appendChild(suggestionItem);
    });

    // Si no hay coincidencias, mostramos un mensaje
    if (filtered.length === 0) {
        const noResults = document.createElement("div");
        noResults.textContent = "No se encontraron personajes.";
        suggestions.appendChild(noResults);
    }

    // Mostrar las sugerencias si hay resultados
    if (filtered.length > 0) {
        suggestions.classList.add("mostrar"); // Muestra las sugerencias
    }
}

// Detectar cambios en el input
input.addEventListener("input", () => {
    filterCharactersByInitial(input.value); // Filtra las sugerencias mientras se escribe
});

// Navegar por las sugerencias con las teclas
input.addEventListener("keydown", (event) => {
    const items = suggestions.querySelectorAll("div");
    if (event.key === "ArrowDown") {
        // Mover hacia abajo
        if (selectedIndex < items.length - 1) {
            selectedIndex++;
            filterCharactersByInitial(input.value); // Re-renderizar las sugerencias
        }
    } else if (event.key === "ArrowUp") {
        // Mover hacia arriba
        if (selectedIndex > 0) {
            selectedIndex--;
            filterCharactersByInitial(input.value); // Re-renderizar las sugerencias
        }
    } else if (event.key === "Enter" && selectedIndex >= 0) {
        // Seleccionar la sugerencia con Enter
        const selectedItem = items[selectedIndex];
        input.value = selectedItem.textContent; // Completa el input con el nombre del personaje
        suggestions.innerHTML = ""; // Oculta las sugerencias
        suggestions.classList.remove("mostrar"); // Oculta las sugerencias
        selectedIndex = -1; // Reinicia la selección
    }
});

// Ocultar las sugerencias si el usuario hace clic fuera del contenedor de sugerencias
document.addEventListener("click", (event) => {
    if (!event.target.closest(".botones")) {
        suggestions.innerHTML = ""; // Limpia las sugerencias al hacer clic fuera
        suggestions.classList.remove("mostrar"); // Oculta las sugerencias
        input.value = ""; // Borra el contenido del input
    }
});
