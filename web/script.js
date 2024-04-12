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

function meterPalabras() {
  listaPalabras = [
    ...LISTASPALABRAS[~~(Math.random() * LISTASPALABRAS.length)],
  ];
  listaPalabras.forEach((palabra) => {
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
      } else {
        td.setAttribute("activo", "false");
        this.style.backgroundColor = "#212529";
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
    palabraFinal = "";
    let encontrada = false;
    document.querySelectorAll("td").forEach((td) => {
      if (td.getAttribute("activo") == "true") {
        palabraFinal += td.textContent;
        td.setAttribute("actio", "false");
      }
    });
    listaPalabras.forEach((palabra) => {
      console.log(
        "palabraFinal " +
          palabraFinal.split("").sort() +
          "\npalabra " +
          palabra.split("").sort()
      );
      if (
        palabraFinal.length == palabra.length &&
        palabraFinal.split().sort() == palabra.split().sort()
      ) {
        console.log("ECNOAFNLKSDJASLDJSALKDSAJD");
      } else {
        console.log("NO ES LA PALA");
        document.querySelectorAll("td").forEach((td) => {
          td.style.backgroundColor = "#212529";
        });
      }
    });

    console.log(palabraFinal);
    palabraFinal = "";
  });
document
  .querySelector("input[value='BORRAR TODO']")
  .addEventListener("click", function comprobarPalabra() {
    document.querySelectorAll("td").forEach((td) => {
      if ((!"activo", "acertado")) {
        td.setAttribute("activo", "false");
        td.style.backgroundColor = "#212529";
      }
    });
  });
document
  .querySelector("input[value='REINICIAR SOPA']")
  .addEventListener("click", function reinicio() {
    location.reload();
  });
