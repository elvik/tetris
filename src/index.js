import "./styles.css";

let array2d = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

let figure = [
  [1, 1],
  [1, 0],
  [1, 0],
  [1, 0],
];

// let figure1 = [
//   [
//     [0, 1, 1, 0],
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 1, 1, 1],
//     [0, 0, 0, 1],
//     [0, 0, 0, 0],
//   ],
//   [
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 1, 1, 0],
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 0, 0, 0],
//     [1, 1, 1, 1],
//     [0, 0, 0, 0],
//   ]
// ];

// let nextFigure = [
//   [0, 0, 0, 0],
//   [1, 1, 1, 1],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
// ]

let gameArea = document.getElementById("gameArea");

// document.createElement("div")
// col.className = "col";
// row.appendChild(col);
// gameArea.appendChild(row);
// array[i][j]

function draw(array) {
  for (let i = 0; i < array.length; i++) {
    let row = document.createElement("div");
    row.className = "row";
    gameArea.appendChild(row);
    for (let j = 0; j < array[i].length; j++) {
      let col = document.createElement("div");
      col.className = "col";
      row.appendChild(col);
      if (array[i][j] !== 0) {
        col.className = "col fill";
      }
    }
  }
}

function clear() {
  while (gameArea.firstChild) {
    gameArea.firstChild.remove();
  }
}

function copy(array) {
  let result = [];
  for (var i = 0; i < array.length; i++) {
    let row = [];
    for (var j = 0; j < array[i].length; j++) {
      row[j] = array[i][j];
    }
    result[i] = row;
  }
  return result;
}

// draw(array2d);

x = 0;
y = 0;

document.addEventListener("keydown", function (event) {
  const key = event.key;
  console.log("key", key);

  if (key === "ArrowRight") {
    if (y < array2d[0].length - figure[0].length) {
      y = y + 1;
    }
  }

  if (key === "ArrowLeft") {
    if (y > 0) {
      y = y - 1;
    }
  }
});

function putFigure(gameState, figure, x, y) {
  for (let row = 0; row < figure.length; row++) {
    for (let col = 0; col < figure[row].length; col++) {
      gameState[x + row][y + col] = figure[row][col];
    }
  }
}

setInterval(
  function () {
    clear();
    let arrayCopy = copy(array2d);

    x = x + 1;
    if (x >= arrayCopy.length - figure.length + 1) {
      x = 0;
    }

    putFigure(arrayCopy, figure, x, y);
    draw(arrayCopy);
  },

  1000
);
