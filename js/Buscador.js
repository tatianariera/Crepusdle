// Elementos del DOM
const input = document.getElementById("inputPersonajes");
const suggestions = document.getElementById("sugerencias");

// Función para filtrar y mostrar sugerencias
function filterCharactersByInitial(initial) {
    // Limpia las sugerencias anteriores
    suggestions.innerHTML = "";

    // Verifica si el input está vacío
    if (!initial) {
        return;
    }

    // Filtra los nombres que comienzan con la inicial ingresada (insensible a mayúsculas/minúsculas)
    const filtered = characters.filter(name =>
        name.toLowerCase().startsWith(initial.toLowerCase())
    );

    // Genera nuevas sugerencias
    filtered.forEach(name => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = name;
        suggestionItem.addEventListener("click", () => {
            input.value = name; // Rellena el input con el nombre seleccionado
            suggestions.innerHTML = ""; // Limpia las sugerencias
        });
        suggestions.appendChild(suggestionItem);
    });

    // Si no hay coincidencias, no muestra nada
    if (filtered.length === 0) {
        const noResults = document.createElement("div");
        noResults.textContent = "No se encontraron personajes.";
        noResults.style.color = "gray";
        suggestions.appendChild(noResults);
    }
}

// Detectar cambios en el input
input.addEventListener("input", () => {
    filterCharactersByInitial(input.value);
});

// Ocultar las sugerencias si el usuario hace clic fuera
document.addEventListener("click", (event) => {
    if (!event.target.closest(".input-group")) {
        suggestions.innerHTML = "";
    }
});