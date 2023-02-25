const gameBoard = (() => {
  const array = [
    'X', 'X', 'O',
    'O', 'O', 'X',
    'X', 'X'];
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


// game logic module
const gameLogic = (() => {
  let isThereWinner = false;
  let winner;



  function checkForWinner() {
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

    winningOptions.forEach((option) => {
      let xCount = 0;
      let oCount = 0;
      option.forEach((cell) => {
        if (gameBoard.array[cell] === 'X') xCount += 1;
        if (gameBoard.array[cell] === 'O') oCount += 1;
      });
      if (xCount === 3) {
        isThereWinner = true;
        winner = 'Player One';
      } else if (oCount === 3) {
        isThereWinner = true;
        winner = 'Player Two';
      }
    });
    console.log(isThereWinner);
    console.log(winner);
  }

  const endGame = () => {
    gameBoard.array = [];
    isThereWinner = false;
    winner = undefined;
  };


  // player factory function
  const player = (symbol) => {
    this.symbol = symbol;
    const makeMove = (field) => {
      // exit function if field is bigger then the original board (which is 8)
      if (field > 8) {
        console.log('Impossible Move');
        return;
      }
      gameBoard.array[field] = symbol;
      checkForWinner();
      if (isThereWinner === true) {
        console.log(`and the winner is, ${winner}!`);
        endGame();
      } else if (isThereWinner === false && gameBoard.array.length === 9) {
        console.log('It is a draw');
        endGame();
      }
      console.log(gameBoard);
    };
    return { makeMove };
  };

  function startGame() {
    const playerOneSymbol = prompt('X or O?');
    this.playerOne = player(playerOneSymbol);
    if (playerOneSymbol === 'X') {
      this.playerTwo = player('O');
    } else if (playerOneSymbol === 'O') {
      this.playerTwo = player('X');
    }
  }



  return {
    startGame,
    checkForWinner,
    isThereWinner,
    winner,
  };
})();

gameLogic.startGame();
gameLogic.playerOne.makeMove(9);

