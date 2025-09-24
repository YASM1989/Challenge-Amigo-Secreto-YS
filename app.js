let listaDeNombresdeamigos = [];
let jugadorSeleccionado = null;
let jugadoresSorteados = [];
let jugadoresElegidos = []; // 🔹 Nueva lista para almacenar los seleccionados



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function EliminarAtributo (elementoid , atributo) {
    let elemento = document.getElementById(elementoid); 

        if (elemento){
            elemento.removeAttribute(atributo);

        }else{

            console.log('El elemento con ID'+elementoid+"no fue encontrado");
    }
    
}

function agregarAtributo(elementoid, nombreAtributo, valorAtributo) {
    var elemento = document.getElementById(elementoid);

    if (elemento) {
        elemento.setAttribute(nombreAtributo, valorAtributo);

    } else {

        console.log('El elemento con ID ' + elementoid + ' no fue encontrado');
    }
}

function limpiarCaja() {
    document.querySelector('#amigo').value = '';
}

function agregarAmigo() {
    let añadirNombres = document.getElementById('amigo').value.trim().toLowerCase();

    if (añadirNombres === '') {
        asignarTextoElemento('h2', 'Por favor, ingresa un nombre válido o número válido.');
        return;
    }

            if (listaDeNombresdeamigos.includes(añadirNombres)) {
                asignarTextoElemento('h2', 'Este amigo ya ha sido agregado.');
                limpiarCaja();
            } else {
                listaDeNombresdeamigos.push(añadirNombres);
                limpiarCaja();
    }

        if (listaDeNombresdeamigos.length > 3) {
            document.getElementById('quienJuega').disabled = false;
      }
}

function Jugador() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = '';

    listaDeNombresdeamigos.forEach((amigo, index) => {
        // 🔹 Solo mostramos los que NO han sido seleccionados antes
        agregarAtributo("amigo","disabled",'true') 
        agregarAtributo("inputAmigo","disabled","true")
            if (!jugadoresElegidos.includes(amigo)) {
                let listItem = document.createElement('li');
                listItem.textContent = amigo;

                listItem.onclick = function () {
                    seleccionarJugador(index);
            };

            listaHTML.appendChild(listItem);
        }
    });

    asignarTextoElemento('h2', 'Selecciona un jugador de la lista.');
    document.getElementById('sorteo').disabled = true;
}

function seleccionarJugador(index) {
    jugadorSeleccionado = listaDeNombresdeamigos[index];

   
    asignarTextoElemento('h2', `Jugador seleccionado: ${jugadorSeleccionado}`);

    document.getElementById('sorteo').disabled = false;

    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = '';
}

function sortearAmigo() {
   
    let jugadoresDisponibles = listaDeNombresdeamigos.filter(amigo =>
        amigo !== jugadorSeleccionado && !jugadoresSorteados.includes(amigo)
    );

   
    let indiceAleatorio = Math.floor(Math.random() * jugadoresDisponibles.length);
    let resultadoAmigo = jugadoresDisponibles[indiceAleatorio];

    jugadoresSorteados.push(resultadoAmigo);
    asignarTextoElemento('h2', `Amigo Sorteado: ${resultadoAmigo}`);

    document.getElementById('sorteo').disabled = true;

    // 🔹 Movemos el jugador seleccionado a la lista de seleccionados
    jugadoresElegidos.push(jugadorSeleccionado);

    // 🔹 Verificamos si todos los jugadores ya han sido sorteados
       if (jugadoresElegidos.length ===listaDeNombresdeamigos.length) {
            setTimeout(() => {
                asignarTextoElemento('h2', '¡El juego ha finalizado!');
            }, 3000);
            agregarAtributo('quienJuega','disabled','true')
       
        } else {
            setTimeout(() => {
                asignarTextoElemento('h2', 'Seleccione quién juega');
            }, 3000);
    }
}
