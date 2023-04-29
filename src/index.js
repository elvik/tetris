import "./styles.css";

let areaState = [
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

let x = 0;
let y = 0;

let figurePosition = 0;

let figure1 = [
  [
    [1, 1],
    [1, 0],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
];

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

document.addEventListener("keydown", function (event) {
  const key = event.key;
  console.log("key", key);

  if (key === "ArrowRight") {
    if (y < areaState[0].length - figure1[figurePosition][0].length) {
      if (canPutFigure(areaState, figure1[figurePosition], x, y + 1)) {
        y = y + 1;

        redraw();
      }
    }
  }

  if (key === "ArrowLeft") {
    if (y > 0) {
      if (canPutFigure(areaState, figure1[figurePosition], x, y - 1)) {
        y = y - 1;

        redraw();
      }
    }
  }

  if (key === "ArrowDown") {
    if (x < areaState.length - figure1[figurePosition].length) {
      x = x + 1;
      redraw();
    }
  }

  if (key === "ArrowUp") {
    figurePosition = figurePosition + 1;
    if (figurePosition > 3) {
      figurePosition = 0;
    }
    redraw();
  }
});

function putFigure(gameState, figure, x, y) {
  for (let row = 0; row < figure.length; row++) {
    for (let col = 0; col < figure[row].length; col++) {
      if (gameState[x + row][y + col] === 0) {
        gameState[x + row][y + col] = figure[row][col];
      }
    }
  }
}

function canPutFigure(gameState, figure, x, y) {
  for (let row = 0; row < figure.length; row++) {
    for (let col = 0; col < figure[row].length; col++) {
      if (figure[row][col] && gameState[x + row][y + col]) {
        return false;
      }
    }
  }
  return true;
}

function isEnd(gameState, figure, x) {
  return x + 1 >= gameState.length - figure.length + 1;
}

function redraw() {
  clear();
  let arrayCopy = copy(areaState);
  putFigure(arrayCopy, figure1[figurePosition], x, y);
  draw(arrayCopy);
}

setInterval(
  function () {
    if (isEnd(areaState, figure1[figurePosition], x)) {
      putFigure(areaState, figure1[figurePosition], x, y);
      x = 0;
    } else {
      if (!canPutFigure(areaState, figure1[figurePosition], x + 1, y)) {
        putFigure(areaState, figure1[figurePosition], x, y);
        x = 0;
      } else {
        x = x + 1;
      }
    }

    redraw();
  },

  1000
);
