const CHEAT = true;
const cls = function () {
  process.stdout.write("\x1bc");
  pintarTablero(tableroDePrueba);
};
const debug = function (str) {
  if (CHEAT) console.log(COLORS.RED + str + COLORS.RESET);
};
const COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[0;31m",
  BLUE: "\x1b[0;34m",
  YELLOW: "\x1b[0;33m",
  GREEN: "\x1b[0;32m",

  BOLD: "\x1b[1m",
  INVERT: "\x1b[7m",
};
const DIRECCIONES = [
  [0, +1], //E
  [0, -1], //W
  [+1, 0], //S
  [-1, 0], //N
  [+1, +1], //SE
  [+1, -1], //SW
  [-1, -1], //NW
  [-1, +1], //NE
];
const LISTASPALABRAS = [
  ["PERRO", "LORO", "TUCAN", "ARAÑA", "MONO"],
  ["COCHE", "MOTO", "AVION", "BUS", "CASCO"],
  ["AGUA", "TIERRA", "VIENTO", "FUEGO", "HIELO"],
  ["XBOX", "SEGA", "STEAM", "MARIO", "MANDO"],
];
const TAMANOTABLERO = 10;
let tablero = [];
let listaPalabras = [];
const VACIO=" ";
function generarTablero() {
  listaPalabras = LISTASPALABRAS[~~(Math.random() * LISTASPALABRAS.length)];
  inicializarTablero();
  meterPalabras();
  pintarTablero();
}

function pintarTablero() {
  for (let i = 0; i < TAMANOTABLERO; i++) {
    let fila = "";
    for (let j = 0; j < TAMANOTABLERO; j++) {
      fila += tablero[i][j] + " ";
    }
    console.log(fila + "\n");
  }
}
function inicializarTablero() {
  for (let i = 0; i < TAMANOTABLERO; i++) {
    tablero[i] = [];
    for (let j = 0; j < TAMANOTABLERO; j++) {
      tablero[i][j] = VACIO;
    }
  }
}
function meterPalabras() {
  listaPalabras = LISTASPALABRAS[~~(Math.random() * LISTASPALABRAS.length)];
  listaPalabras.forEach((palabra) => {
    let colocada = false;
    let dir, y ,x;
    //
    do {
      dir = DIRECCIONES[~~(Math.random() * DIRECCIONES.length)];
      //Encontramos un punto valido para los puntos x e y para el comienzo de nuestra palabra teniendo en cuenta su longitud y la dirección
      //en la que se quiere colocar la palabra
      y = aleatorio(0 - Math.min(dir[0]*palabra.length, 0),(TAMANOTABLERO-1)-Math.max(dir[0]*palabra.length, 0));
      x = aleatorio(0 - Math.min(dir[1]*palabra.length, 0),(TAMANOTABLERO-1)-Math.max(dir[1]*palabra.length, 0));
      let i=0;
      while(i<palabra.length){
        if(tablero[y+i*dir[0]][x+i*dir[1]]!=VACIO && tablero[y+i*dir[0]][x+i*dir[1]]!=palabra[i])
         break;
        i++;
      }
      colocada=i==palabra.length;
    } while (!colocada);
    //una vez se comprueba el espacio para la palabra se cambian los elementos del tablero por la letra correspondiente
    for (let i = 0; i < palabra.length; i++) {
      tablero[y+i*dir[0]][x+i*dir[1]]=palabra[i];
    }
    debug("UNAAAA" + palabra);
  });
}
function aleatorio(min, max){
  return ~~(Math.random()*(max-min+1)+min);
}
generarTablero();
console.log(tablero);
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
// const pintarPalabra = (w) => {
//   w = w.toString();
//   if (w == "EXIT") {
//     console.log("GRACIAS POR JUGAR ESTAMOS MUY AGRADECIDOS");
//     process.exit();
//   } else {
//     comprobarInicioPalabra(w);
//   }
// };
// //una vez inicia el juego
// function recibirPalabra() {
//   console.log("Escribe una palabra para comprobar");
//   process.stdin.on("data", (pintarPalabra));
// }
// recibirPalabra();
// function comprobarInicioPalabra(palabra) {
//   let encontrado = false;
//   let palabrasABuscar = [];
//   palabra = palabra.toUpperCase();
//   palabrasDePrueba.forEach((palabra) => {
//     if (palabra[0] == palabra[0]) {
//       encontrado = true;
//       palabrasABuscar.push(palabra);
//     }
//   });
//   if (!encontrado) {
//     cls();
//     console.log(
//       COLORS.RED +
//         "Error " +
//         palabra.trim() +
//         " no se encuentra en la sopa" +
//         COLORS.RESET
//     );
//     recibirPalabra();
//   }
// }
// function comprobardirECCIONES(palabra, palabrasABuscar) {

// }
