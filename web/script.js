//constantes
const CHEAT = true;
const N = 10;
const VACIO = " ";
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIRECCIONES = [
  [0, +1], //E
  [+1, 0], //S
  [+1, +1], //SE
  [0, -1], //W
  [+1, -1], //SW
  [-1, -1], //NW
  [-1, +1], //NE
  [-1, 0], //N
];
const LISTASPALABRAS = [
  ["PERRO", "LORO", "TUCAN", "ARAÑA", "MONO"],
  ["COCHE", "MOTO", "AVION", "BUS", "CASCO"],
  ["AGUA", "TIERRA", "VIENTO", "FUEGO", "HIELO"],
  ["XBOX", "SEGA", "STEAM", "MARIO", "MANDO"],
];
const ALEATORIO = function (min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
};
//var globales
let palabraFinal = "";
let tablero = [];
let tableroAux = document.querySelector("#tablero");
let columnas = document.querySelectorAll("td");
let listaPalabras = [];
let movimientos = [];
let listaAux=listaPalabras;
function inicializarTablero() {
  let tr, td;
  for (let i = 0; i < N; i++) {
    tr = document.createElement("tr");
    tablero[i] = [];
    movimientos[i] = [];
    for (let j = 0; j < N; j++) {
      td = document.createElement("td");
      tablero[i][j] = VACIO;
      td.textContent = VACIO;
      tr.appendChild(td);
      movimientos[i][j] = false;
    }
    tableroAux.appendChild(tr);
  }
}
function pintarTablero() {
  tableroAux.innerHTML = "";
  let tr, td;
  for (let i = 0; i < N; i++) {
    tr = document.createElement("tr");
    movimientos[i] = [];
    for (let j = 0; j < N; j++) {
      td = document.createElement("td");
      td.setAttribute("posi", `${i},${j}`);
      td.textContent = tablero[i][j];
      tr.appendChild(td);
      movimientos[i][j] = false;
    }
    tableroAux.appendChild(tr);
  }
}
function rellenarLista() {
  listaPalabras.forEach((palabra) => {
    let div = document.createElement("div");
    div.className = "palabra_lisa";
    div.textContent = palabra;
    document.querySelector("#lista").appendChild(div);
  });
}
function meterPalabras() {
  listaPalabras = [
    ...LISTASPALABRAS[~~(Math.random() * LISTASPALABRAS.length)],
  ];
listaPalabras.forEach((palabra, i) => {
  let colocada = false;
  let dir, y, x;
  do {
    dir = DIRECCIONES[~~(Math.random() * DIRECCIONES.length)];
    //Encontramos un punto valido para los puntos x e y para el comienzo de nuestra palabra teniendo en cuenta su longitud y la dirección
    //en la que se quiere colocar la palabra
    y = ALEATORIO(
      0 - Math.min(dir[0] * palabra.length, 0),
      N - 1 - Math.max(dir[0] * palabra.length, 0)
    );
    x = ALEATORIO(
      0 - Math.min(dir[1] * palabra.length, 0),
      N - 1 - Math.max(dir[1] * palabra.length, 0)
    );
    let i = 0;
    while (i < palabra.length) {
      if (
        tablero[y + i * dir[0]][x + i * dir[1]] != VACIO &&
        tablero[y + i * dir[0]][x + i * dir[1]] != palabra[i]
      )
        break;
      i++;
    }
    colocada = i == palabra.length;
  } while (!colocada);
  //una vez se comprueba el espacio para la palabra se cambian los elementos del tablero por la letra correspondiente
  for (let i = 0; i < palabra.length; i++) {
    tablero[y + i * dir[0]][x + i * dir[1]] = palabra[i];
  }
});
}
function rellenarTablero() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (tablero[i][j] == VACIO) {
        tablero[i][j] = ABC[ALEATORIO(0, ABC.length - 1)];
      }
    }
  }
}
function generarTablero() {
  inicializarTablero();
  meterPalabras();
  rellenarLista();
  rellenarTablero();
  pintarTablero();
}
//TABLERO CORRECTO
function limpiarMovimientos(elemento) {
  let posi = elemento.getAttribute("posi");
  console.log(posi);
  let y = posi[0];
  let x = posi[2];
  console.log("y->" + y + " x->" + x);
}
function borrarTodo() {
  document.querySelectorAll("td").forEach((td) => {
    td.setAttribute("activo", "false");
    this.style.backgroundColor = "#212529";
  });
}
function empezarJuego() {
  document.querySelectorAll("td").forEach((td) => {
    td.setAttribute("activo", "false");
    td.addEventListener("click", function marcarLetra() {
      limpiarMovimientos(this);
      if (this.getAttribute("activo") == "false") {
        td.setAttribute("activo", "true");
        this.style.backgroundColor = "yellow";
        palabraFinal += this.textContent;
        console.log("AÑADIDO " + palabraFinal);
      }
    });
  });
}
function nuevaPartida() {
  generarTablero();
  empezarJuego();
}
nuevaPartida();
document
  .querySelector("input[value='COMPROBAR']")
  .addEventListener("click", function comprobarPalabra() {
    let encontrada = false;
    if (!palabraFinal.length) {
      alert("DEBE SELECCIONAR UNA PALABRA");
    }
    listaPalabras.forEach((palabra, ind) => {
      if (palabra == palabraFinal && !encontrada) {
        console.log(listaPalabras);
        encontrada = true;
        listaPalabras.splice(listaPalabras.indexOf(palabra), 1);
        alert("CORRECTO")
        document.querySelector("#lista").innerHTML="";
        rellenarLista();
        document.querySelectorAll("td").forEach((td) => {
          if (td.getAttribute("activo") != "false") {
            td.setAttribute("activo", "find");
            td.style.backgroundColor = "green";
            palabraFinal = "";
            console.log("TODO A 0 " + palabraFinal);
          }
        });
      }
    });
    if (!encontrada) {
      alert("La Palabra no es correcta o ha seleccionado mal");
    }
    if (listaPalabras.length<1) {
      alert("HA GANADO\nREINICIE LA SOPA O CIERRE EL NAVEGADOR");
      document.querySelector("input").disabled=true;
      document.querySelectorAll("input")[1].disabled=true;
    }

  });
function palabrasIguales(p1, p2) {
  p1 = p1.toString().split("").sort();
  p2 = p2.toString().split("").sort();
  let iguales = true;
  for (let i = 0; i < p1.length; i++) {
    if (p1[i] != p2[i]) iguales = false;
  }
  return iguales;
}

document
  .querySelector("input[value='BORRAR TODO']")
  .addEventListener("click", function borrarTodo() {
    document.querySelectorAll("td").forEach((td) => {
      if (td.getAttribute("activo") != "find") {
        td.setAttribute("activo", "false");
        td.style.backgroundColor = "#212529";
        palabraFinal = "";
        console.log("TODO A 0 " + palabraFinal);
      }
    });
  });
document
  .querySelector("input[value='REINICIAR SOPA']")
  .addEventListener("click", function reinicio() {
    location.reload();
  });
