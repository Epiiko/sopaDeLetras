//constantes
const CHEAT = true;
const N = 10;
const VACIO = " ";
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[0;31m",
  BLUE: "\x1b[0;34m",
  YELLOpalabra: "\x1b[0;33m",
  GREEN: "\x1b[0;32m",

  BOLD: "\x1b[1m",
  INVERT: "\x1b[7m",
};
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
const cls = function () {
  process.stdout.write("\x1bc");
};
const debug = function (str) {
  if (CHEAT) console.log(COLORS.RED + str + COLORS.RESET);
};
const ALEATORIO = function (min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
};
//var globales
let tablero = [];
let letrasEncontradas = [];
let listaPalabras = [];

function pintarTablero(color = COLORS.BLUE) {
  console.log("\t\t" + COLORS.GREEN +
   `
   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ██░▄▄▄░██░▄▄▄░██░▄▄░█░▄▄▀████░▄▄▀██░▄▄▄████░█████░▄▄▄█▄▄░▄▄██░▄▄▀█░▄▄▀██░▄▄▄░
   ██▄▄▄▀▀██░███░██░▀▀░█░▀▀░████░██░██░▄▄▄████░█████░▄▄▄███░████░▀▀▄█░▀▀░██▄▄▄▀▀
   ██░▀▀▀░██░▀▀▀░██░████░██░████░▀▀░██░▀▀▀████░▀▀░██░▀▀▀███░████░██░█░██░██░▀▀▀░
   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
   
   `
   + COLORS.RESET+ "\n");
  for (let i = 0; i < N; i++) {
    let fila = "";
    for (let j = 0; j < N; j++) {
      fila +=
        (letrasEncontradas[i][j] ? COLORS.GREEN + COLORS.INVERT : color) +
        " " +
        tablero[i][j] +
        " " +
        COLORS.RESET;
    }
    console.log("\t\t\t" + fila);
  }
  console.log(("\n"));
  debug("\n" + COLORS.GREEN + listaPalabras + COLORS.RESET);
}
function inicializarTablero() {
  for (let i = 0; i < N; i++) {
    tablero[i] = [];
    letrasEncontradas[i] = [];
    for (let j = 0; j < N; j++) {
      tablero[i][j] = VACIO;
      letrasEncontradas[i][j] = false;
    }
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
  cls();
  pintarTablero();
}

function menuFinal(palabra) {
  palabra = palabra.toString().trim().toUpperCase()[0];
  if (palabra == "Y") {
    process.stdin.off("data", menuFinal);
    process.stdin.on("data", pintarPalabra);
    iniciarJuego();
  } else {
    cls();
    console.log("GRACIAS POR JUGAR ESTAMOS MUY AGRADECIDOS");
    process.exit();
  }
}
function pintarPalabra(palabra) {
  cls();
  palabra = palabra.toString().trim().toUpperCase();
  if (palabra == "EXIT") {
    console.log("GRACIAS POR JUGAR ESTAMOS MUY AGRADECIDOS");
    process.exit();
  } else {
    let encontrada = buscarPalabra(palabra);
    pintarTablero();
    console.log(
      "La palabra " +
        palabra +
        (encontrada ? COLORS.GREEN + " si" : COLORS.RED + " no") +
        COLORS.RESET +
        " ha sido encontrada"
    );
    if (!listaPalabras.length) {
      console.log(COLORS.GREEN + "HA GANADO LA PARTIDA" + COLORS.RESET);
      console.log("DESEA JUGAR OTRA PARTIDA -> Y/N");
      process.stdin.off("data", pintarPalabra);
      process.stdin.on("data", menuFinal);
    }
  }
}

function recibirPalabra() {
  console.log(
    "Escribe una palabra para comprobar\n" +
      COLORS.RED +
      "Para salir escriba EXIT en mayusculas" +
      COLORS.RESET
  );
  process.stdin.on("data", pintarPalabra);
}

function buscarPalabra(palabra) {
  if (!listaPalabras.includes(palabra)) {
    return false;
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (palabra[0] == tablero[i][j]) {
        for (let dir of DIRECCIONES) {
          let ymin = -Math.min(dir[0] * palabra.length, 0);
          let ymax = Math.max(dir[0] * palabra.length, 0);
          let xmin = -Math.min(dir[1] * palabra.length, 0);
          let xmax = Math.max(dir[1] * palabra.length, 0);
          if (i >= ymin && i < N - ymax && j >= xmin && j < N - xmax) {
            let k;
            for (k = 1; k < palabra.length; k++) {
              if (palabra[k] != tablero[i + dir[0] * k][j + dir[1] * k]) {
                break;
              }
            }
            if (k == palabra.length) {
              for (let l = 0; l < palabra.length; l++) {
                letrasEncontradas[i + l * dir[0]][j + l * dir[1]] = true;
              }
              listaPalabras.splice(listaPalabras.indexOf(palabra), 1);
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}
function iniciarJuego() {
  generarTablero();
  recibirPalabra();
}
iniciarJuego();
