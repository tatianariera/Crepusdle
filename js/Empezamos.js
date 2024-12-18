let boton = document.getElementById("jugar");
let div = document.getElementById("empezarJuego");
let div2 = document.getElementById("restoJuego");

boton.addEventListener("click", function(){
    div.style.display="none";
    div2.style.display = "block";
})