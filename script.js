const gameBoard = (() => {
  const array = [];
  return { array };
})();


// game logic module
const gameLogic = (() => {
  let isThereWinner = false;
  let playerTurn = 1;
  let winner;
  let playEnabled;



  const noEmptyFields = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== undefined) count += 1;
    }
    if (count === 9) {
      return true;
    }
    return false;
  };

  const reset = () => {
    gameBoard.array = [];
    isThereWinner = false;
    winner = undefined;
    playerTurn = 1;
    playEnabled = true;
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

    if (isThereWinner === true) {
      console.log(`and the winner is, ${winner}!`);
      playEnabled = false;
    } else if (isThereWinner === false
        && gameBoard.array.length === 9
        && noEmptyFields(gameBoard.array) === true) {
      console.log('It is a draw');
      playEnabled = false;
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

      if (playerTurn === 1) {
        playerTurn = 2;
      } else {
        playerTurn = 1;
      }
      checkForWinner();
      console.log(gameBoard.array);
    };

    return { makeMove };
  };

  function startGame() {
    reset();
    /* eslint-disable */
    displayControler.render();
    /* eslint-enable */
    const playerOneSymbol = prompt('X or O?');
    this.playerOne = player(playerOneSymbol);
    if (playerOneSymbol === 'X') {
      this.playerTwo = player('O');
    } else if (playerOneSymbol === 'O') {
      this.playerTwo = player('X');
    }
  }

  const play = (field) => {
    if (playEnabled === false) return;
    if (playerTurn === 1) {
      gameLogic.playerOne.makeMove(field);
    } else if (playerTurn === 2) {
      gameLogic.playerTwo.makeMove(field);
    }
  };


  return {
    startGame,
    play,
  };
})();



const displayControler = (() => {
  const fields = document.querySelectorAll('.field');
  const newGameButton = document.querySelector('.new-game');

  // set dataset number to gameboard fields index
  for (let i = 0; i < 9; i++) {
    fields[i].dataset.id = i;
  }

  const render = () => {
    fields.forEach((field) => {
      const indexOfField = gameBoard.array.indexOf(field);
      field.textContent = gameBoard.array[field.dataset.id];
    });
  };

  function clickToPlay(e) {
    gameLogic.play(e.target.dataset.id);
    render();
  }

  // Event Listeners

  fields.forEach((field) => {
    field.addEventListener('click', clickToPlay);
  });
  newGameButton.addEventListener('click', gameLogic.startGame.bind(gameLogic));


  return {
    render,
  };
})();

displayControler.render();


/* THINGS TO DO:

# Comment code better so it is more readable for you!

# after game is over:
-> leave the player marks on board (maybe change the color of the winning combination)
-> disable the possibility to play, by clicking the board or by console.
-> add [new game] button, that reset the all the game and reset the board
    --> reset game and clear display should be separate functions?
    --> should the buttons be added to html and hidden or added via javascript?

# when page is loaded:
-> welcome screen: choose player mark to start game.
-> then diplay borad

# AI:
-> create a basic AI
-> let player choose if he wants to play againt AI or another human (or himself XD)
-> try to create an unbeatable algorithm using minimax?


*/
