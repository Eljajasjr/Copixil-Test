const form = document.getElementById('Formulario');

const lista_Por_Hacer = document.getElementById('Por-Hacer');

const lista_Terminada = document.getElementById('Terminadas');

const textInput = document.getElementById('textInput');

function actualizarConteo() {

    const por_Hacer = document.querySelectorAll('#Por-Hacer li').length;

    const terminadas = document.querySelectorAll('#Terminadas li').length;

    document.getElementById('cantidadPorHacer').textContent = por_Hacer;

    document.getElementById('cantidadTerminadas').textContent = terminadas;
}

function guardarEnLocalStorage() {
    const por_Hacer = Array.from(lista_Por_Hacer.children).map(li => li.textContent.replace("Quitar tarea", "").trim());

    const terminadas = Array.from(lista_Terminada.children).map(li => li.textContent.replace("Quitar tarea", "").trim());
    
    localStorage.setItem('PorHacer', JSON.stringify(por_Hacer));

    localStorage.setItem('Terminadas', JSON.stringify(terminadas));
}

function cargarDesdeLocalStorage() {

    lista_Por_Hacer.innerHTML = '';

    lista_Terminada.innerHTML = '';

    const por_Hacer = JSON.parse(localStorage.getItem('PorHacer')) || [];

    const terminadas = JSON.parse(localStorage.getItem('Terminadas')) || [];

    por_Hacer.forEach(tarea => agregarTarea(tarea, lista_Por_Hacer));

    terminadas.forEach(tarea => agregarTarea(tarea, lista_Terminada));

    actualizarConteo();
}


function agregarTarea(tarea, lista) {

    const newLi = document.createElement('li');

    const textNode = document.createTextNode(tarea);

    newLi.appendChild(textNode);
    
    const removeButton = document.createElement('button');

    removeButton.textContent = "Quitar tarea";

    removeButton.classList.add('btn-lista');

    newLi.appendChild(removeButton);

    lista.appendChild(newLi);
}

form.addEventListener('submit', function(event) {

    event.preventDefault();

    const newText = textInput.value.trim();

    if (newText !== "") {

        agregarTarea(newText, lista_Por_Hacer);

        textInput.value = "";

        guardarEnLocalStorage();

        actualizarConteo();
    }
});

lista_Por_Hacer.addEventListener("click", function (event) {

    if (event.target.tagName === "LI" && !event.target.querySelector("button").contains(event.target)) {

        lista_Terminada.appendChild(event.target);

        guardarEnLocalStorage();

        actualizarConteo();
    }
});

document.addEventListener("click", function (event) {

    if (event.target.tagName === "BUTTON" && event.target.classList.contains("btn-lista")) {

        event.target.parentElement.remove();

        guardarEnLocalStorage();

        actualizarConteo();
    }
});

document.addEventListener("DOMContentLoaded", function () {

    cargarDesdeLocalStorage();

});

actualizarConteo();