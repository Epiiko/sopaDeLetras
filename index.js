const CHEAT = true;
const cls = function () {
  process.stdout.write("\x1bc");
  pintarTablero(tableroDePrueba);
};
const debug = function (str) {
  if (CHEAT) console.log(COLORS.RED + str + COLORS.colocadaET);
};
const COLORS = {
  colocadaET: "\x1b[0m",
  RED: "\x1b[0;31m",
  BLUE: "\x1b[0;34m",
  YELLOW: "\x1b[0;33m",
  GREEN: "\x1b[0;32m",

  BOLD: "\x1b[1m",
  INVERT: "\x1b[7m",
};
const DIRECCIONES = {
  HORIZONTAL: ["0", "+1"], //derecha
  VERTICAL: ["-1", "0"], //izqd
  DIAGONAL: ["+1", "-1"], //arriba
};
const LISTASPALABRAS = [
  ["PERRO", "LORO", "TUCAN", "ARAÑA", "MONO"],
  ["COCHE", "MOTO", "AVION", "BUS", "CASCO"],
  ["AGUA", "TIERRA", "VIENTO", "FUEGO", "HIELO"],
  ["XBOX", "SEGA", "STEAM", "MARIO", "MANDO"],
];
const TAMANOTABLERO = 10;
let tablero = [];
function generarTablero() {
  listaPalabras = LISTASPALABRAS[parseInt(Math.random() * 4)];
  inicializarTablero();
  pintarTablero();
  // meterPalabras();
}
function pintarTablero() {
  for (let i = 0; i < TAMANOTABLERO; i++) {
    let fila = "";
    for (let j = 0; j < TAMANOTABLERO; j++) {
      fila += tablero[i][j] + "   ";
    }
    console.log(COLORS.BLUE + fila + COLORS.colocadaET + "\n");
  }
}
function inicializarTablero() {
  for (let i = 0; i < TAMANOTABLERO; i++) {
    tablero[i] = [];
    for (let j = 0; j < TAMANOTABLERO; j++) {
      tablero[i][j] = "X";
    }
  }
}
let listaPalabras = [];
function meterPalabras() {
  listaPalabras =
    LISTASPALABRAS[parseInt(Math.random() * LISTASPALABRAS.length)];
  const DIRECCIONES = ["horizontal", "vertical", "diagonal"];
  listaPalabras.forEach((palabra) => {
    let colocada = true;
    do {
      const DIRECCION =
        DIRECCIONES[parseInt(Math.random() * DIRECCIONES.length)];
      let fila = Math.floor(Math.random() * TAMANOTABLERO);
      let columna = Math.floor(Math.random() * TAMANOTABLERO);
      if (DIRECCION === "horizontal") {
        fila = Math.floor(Math.random() * TAMANOTABLERO);
        columna = Math.floor(Math.random() * (TAMANOTABLERO - palabra.length + 1));
        palabra.split().forEach((letra, ind) => {
          if (
            tablero[fila][columna + ind] != "" ||
            tablero[fila + ind][columna] != letra
          ) {
            colocada = false;
          }
        });
      } else if (DIRECCION === "vertical") {
        fila = Math.floor(Math.random() * (TAMANOTABLERO - palabra.length + 1));
        columna = Math.floor(Math.random() * TAMANOTABLERO);
        palabra.split().forEach((letra, ind) => {
          if (
            tablero[fila + ind][columna] != "" ||
            tablero[fila + ind][columna] != letra
          ) {
            colocada = false;
          }
        });
      } else if (DIRECCION === "diagonal") {
        fila = Math.floor(Math.random() * (TAMANOTABLERO - palabra.length + 1));
        columna = Math.floor(Math.random() * (TAMANOTABLERO - palabra.length + 1));
        palabra.split().forEach((letra, ind) => {
          if (
            tablero[fila + ind][columna + ind] != "" ||
            tablero[fila + ind][columna + ind] != letra
          ) {
            colocada = false;
          }
        });
      }
    } while (!colocada);
    debug("UNAAAA")
  });
}
generarTablero();

//entorno de prueba hardcode
let palabrasDePrueba = ["PERRO", "LORO", "TUCAN", "ARAÑA", "MONO"];
let tableroDePrueba = [
  [["P"], ["I"], ["R"], ["O"], ["A"], ["B"], ["A"], ["T"]],
  [["A"], ["E"], ["A"], ["A"], ["Z"], ["A"], ["C"], ["T"]],
  [["M"], ["A"], ["R"], ["A"], ["P"], ["A"], ["A"], ["U"]],
  [["O"], ["S"], ["A"], ["R"], ["A"], ["Ñ"], ["A"], ["C"]],
  [["N"], ["A"], ["A"], ["A"], ["O"], ["A"], ["C"], ["A"]],
  [["O"], ["A"], ["L"], ["O"], ["R"], ["O"], ["A"], ["N"]],
];

const pintarPalabra = (w) => {
  w = w.toString();
  if (w == "EXIT") {
    console.log("GRACIAS POR JUGAR ESTAMOS MUY AGRADECIDOS");
    process.exit();
  } else {
    comprobarInicioPalabra(w);
  }
};
//una vez inicia el juego
function recibirPalabra() {
  console.log("Escribe una palabra para comprobar");
  process.stdin.on("data", (pintarPalabra));
}
recibirPalabra();
function comprobarInicioPalabra(palabra) {
  let encontrado = false;
  let palabrasABuscar = [];
  palabra = palabra.toUpperCase();
  palabrasDePrueba.forEach((palabra) => {
    if (palabra[0] == palabra[0]) {
      encontrado = true;
      palabrasABuscar.push(palabra);
    }
  });
  if (!encontrado) {
    cls();
    console.log(
      COLORS.RED +
        "Error " +
        palabra.trim() +
        " no se encuentra en la sopa" +
        COLORS.colocadaET
    );
    recibirPalabra();
  }
}
function comprobarDIRECCIONES(palabra, palabrasABuscar) {
  
}