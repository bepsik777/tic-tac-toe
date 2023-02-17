const gameBoard = (() => {
  const array = [
    { a1: '', a2: '', a3: '' },
    { b1: '', b2: '', b3: '' },
    { c1: '', c2: '', c3: '' },
  ];
  return { array };
})();

const player = (symbol) => {
  const makeMove = (object, row, field) => {
    object.array[row][field] = symbol;
    console.log(object);
  };
  return { makeMove };
};

const gameLogic = (() => {
  const startGame = (symbol) => {
    const playerOnePrompt = prompt('X or O?');
    const playerOne = player(playerOnePrompt);
    let playerTwo;
    if (playerOnePrompt === 'O') {
      playerTwo = player('X');
    } else if (playerOnePrompt === 'X') {
      playerTwo = player('O');
    }
  };

  return { startGame };
})();
