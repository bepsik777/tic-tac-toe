const gameBoard = (() => {
  const array = [];
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
  let playerTurn = 1;
  let winner;

  const endGame = () => {
    gameBoard.array = [];
    isThereWinner = false;
    winner = undefined;
    playerTurn = 1;
  };


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

    if (isThereWinner === true) {
      console.log(`and the winner is, ${winner}!`);
      endGame();
    } else if (isThereWinner === false && gameBoard.array.length === 9) {
      console.log('It is a draw');
      endGame();
    }
  }



  // player factory function
  const player = (symbol) => {
    this.symbol = symbol;

    const makeMove = (field) => {
      console.log(playerTurn);
      // exit function if field is out of board (which is 8)
      if (field > 8) {
        console.log('Invalid Move');
        return;
      }
      // exit function if field is already taken
      if (gameBoard.array[field] !== undefined) {
        console.log('Invalid Move');
        return;
      }

      gameBoard.array[field] = symbol;

      // why it does not change the playerTurn?
      if (playerTurn === 1) {
        playerTurn = 2;
      } else {
        playerTurn = 1;
      }
      checkForWinner();
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

  const play = (field) => {
    if (playerTurn === 1) {
      gameLogic.playerOne.makeMove(field);
    } else if (playerTurn === 2) {
      gameLogic.playerTwo.makeMove(field);
    }
  };


  return {
    startGame,
    play,
    playerTurn,
  };
})();

gameLogic.startGame();
gameLogic.play(1);

