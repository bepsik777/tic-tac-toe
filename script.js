const gameBoard = (() => {
  const array = [
    'x', 'x', 'x',
    'o', 'o', 'x',
    'x', 'x', 'o'];
  return { array };
})();



// const player = (symbol) => {
//   this.symbol = symbol;
//   const makeMove = (field) => {
//     gameBoard.array[field] = symbol;
//     console.log(gameBoard);
//   };
//   return { makeMove };
// };



const gameLogic = (() => {
  let isThereWinner = false;
  let winner;





  const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWinner = () => {
    winningOptions.forEach((option) => {
      let xCount = 0;
      let oCount = 0;
      option.forEach((cell) => {
        if (gameBoard.array[cell] === 'X') xCount += 1;
        if (gameBoard.array[cell] === 'O') oCount += 1;
      });
      if (xCount === 3) {
        isThereWinner = true;
        winner = gameLogic.playerOne;
      } else if (oCount === 3) {
        isThereWinner = true;
        winner = gameLogic.playerTwo;
      }
      console.log(isThereWinner);
      console.log(winner);
    });
  };

  const player = (symbol) => {
    this.symbol = symbol;
    const makeMove = (field) => {
      gameBoard.array[field] = symbol;
      checkForWinner();
      console.log(gameBoard);
    };
    return { makeMove };
  };

  function createPlayers() {
    const playerOneSymbol = prompt('X or O?');
    this.playerOne = player(playerOneSymbol);
    if (playerOneSymbol === 'X') {
      this.playerTwo = player('O');
    } else if (playerOneSymbol === 'O') {
      this.playerTwo = player('X');
    }
  }


  return {
    createPlayers,
    checkForWinner,
    isThereWinner,
    winner,
  };
})();

gameLogic.createPlayers();
gameLogic.playerOne.makeMove(2);

