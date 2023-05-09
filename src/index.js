import "./styles.css";

const sound = new Audio("//drud.cz/downloads/gameover.mp3");

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
let y = 3;

const colors = [
  "rgb(166, 39, 61)",
  "rgb(49, 122, 54)",
  "rgb(49, 93, 122)",
  "rgb(66, 46, 105)",
  "rgb(189, 96, 38)",
  "rgb(204, 186, 49)",
  "rgb(204, 49, 134)",
];

let figure1 = [
  [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
];

let figure2 = [
  [
    [2, 0],
    [2, 2],
    [2, 0],
  ],
  [
    [2, 2, 2],
    [0, 2, 0],
  ],
  [
    [0, 2],
    [2, 2],
    [0, 2],
  ],
  [
    [0, 2, 0],
    [2, 2, 2],
  ],
];

let figure3 = [
  [
    [3, 3],
    [3, 3],
  ],
];

/* prettier-ignore */
let figure4 = [
  [
    [4, 4, 4, 4],
  ],
  [
    [4],
    [4],
    [4],
    [4],
  ],
];

let figure5 = [
  [
    [0, 5],
    [5, 5],
    [5, 0],
  ],
  [
    [5, 5, 0],
    [0, 5, 5],
  ],
];

let figure6 = [
  [
    [6, 0],
    [6, 6],
    [0, 6],
  ],
  [
    [0, 6, 6],
    [6, 6, 0],
  ],
];

let figure7 = [
  [
    [7, 7],
    [0, 7],
    [0, 7],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
  ],
  [
    [7, 0],
    [7, 0],
    [7, 7],
  ],
  [
    [7, 7, 7],
    [7, 0, 0],
  ],
];

let figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];

let figureIndex = getRandomNumber(figures.length);
let figurePosition = getRandomNumber(figures[figureIndex].length);

let gameArea = document.getElementById("gameArea");

function getCurrentFigure() {
  return figures[figureIndex][figurePosition];
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

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
        col.style.backgroundColor = colors[array[i][j] - 1];
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
  for (let i = 0; i < array.length; i++) {
    let row = [];
    for (let j = 0; j < array[i].length; j++) {
      row[j] = array[i][j];
    }
    result[i] = row;
  }
  return result;
}

function removeFullLines(gameState) {
  let newGameState = [];
  for (let i = 0; i < gameState.length; i++) {
    let row = [];
    for (let j = 0; j < gameState[j].length; j++) {
      row.push(0);
    }
    newGameState.push(row);
  }

  let currentLine = gameState.length - 1;
  for (let i = gameState.length - 1; i >= 0; i--) {
    let isFull = true;
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j] == 0) {
        isFull = false;
      }
    }

    if (isFull) {
      continue;
    }

    for (let j = 0; j < gameState[i].length; j++) {
      newGameState[currentLine][j] = gameState[i][j];
    }

    currentLine = currentLine - 1;
  }

  return newGameState;
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  console.log("key", key);

  if (key === "ArrowRight") {
    if (y < areaState[0].length - getCurrentFigure()[0].length) {
      if (canPutFigure(areaState, getCurrentFigure(), x, y + 1)) {
        y = y + 1;

        redraw();
      }
    }
  }

  if (key === "ArrowLeft") {
    if (y > 0) {
      if (canPutFigure(areaState, getCurrentFigure(), x, y - 1)) {
        y = y - 1;

        redraw();
      }
    }
  }

  if (key === "ArrowDown") {
    if (x < areaState.length - getCurrentFigure().length) {
      if (canPutFigure(areaState, getCurrentFigure(), x + 1, y)) {
        x = x + 1;
        redraw();
      }
    }
  }

  if (key === "ArrowUp") {
    figurePosition = figurePosition + 1;
    if (figurePosition >= figures[figureIndex].length) {
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
  putFigure(arrayCopy, getCurrentFigure(), x, y);
  draw(arrayCopy);
}

let interval = setInterval(
  function () {
    if (
      isEnd(areaState, getCurrentFigure(), x) ||
      !canPutFigure(areaState, getCurrentFigure(), x + 1, y)
    ) {
      putFigure(areaState, getCurrentFigure(), x, y);

      areaState = removeFullLines(areaState);

      x = 0;
      y = 3;
      figureIndex = getRandomNumber(figures.length);
      figurePosition = getRandomNumber(figures[figureIndex].length);
    } else {
      x = x + 1;
    }

    redraw();

    if (!canPutFigure(areaState, getCurrentFigure(), x, y)) {
      redraw();
      document.getElementById("gameOver").style.display = "flex";
      sound.play();
      clearInterval(interval);
    }
  },

  1000
);
