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
  let playerOneSymbol;
  const gameVsAi = false;
  const gameVsPlayer = true;



  // Check if there are no undefined fields in board. if so, returns true
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
    playerOneSymbol = undefined;
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
        winner = 'Player "X"';
      } else if (oCount === 3) {
        isThereWinner = true;
        winner = 'Player "O"';
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


    return { makeMove, symbol };
  };

  const getIsThereWinner = () => isThereWinner;

  const getWinner = () => winner;


  function startGame(e) {
    reset();
    // gameVsAi = false;
    // gameVsPlayer = true;
    /* eslint-disable */
    displayControler.render();
    /* eslint-enable */
    playerOneSymbol = e.target.textContent; // (e) is the button on welcome screen in this case
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




  function playWithAi(field) {
    const aiMove = () => Math.floor(Math.random() * 10);
    let aiPossibleMove = false;

    if (playEnabled === false) return;

    // exit function if field is already taken
    if (gameBoard.array[field] !== undefined) {
      console.log('Invalid Move');
      return;
    }

    this.playerOne.makeMove(field);

    /* eslint-disable */
    displayControler.render();
    /* eslint-enable */

    if (playEnabled === false) return;
    while (aiPossibleMove === false) {
      const move = aiMove();
      if (gameBoard.array[move] === undefined && move <= 8) {
        aiPossibleMove = true;
        this.playerTwo.makeMove(move);
      }
      /* eslint-disable */
       displayControler.render();
       /* eslint-enable */
    }
  }



  return {
    gameVsPlayer,
    gameVsAi,
    playWithAi,
    startGame,
    play,
    getIsThereWinner,
    getWinner,
  };
})();


const displayControler = (() => {
  const gameBoardContainer = document.querySelector('.gameboard-container');
  const welcomeContainer = document.querySelector('.welcome-container');
  const fields = document.querySelectorAll('.field');
  const newGameButton = document.querySelector('.new-game');
  const chooseMarkButtonsContainer = document.querySelectorAll('.choose-box-container');
  const [xContainer, oContainer] = chooseMarkButtonsContainer;
  const chooseMarkButtons = document.querySelectorAll('.choose-box');
  const [xButton, oButton] = chooseMarkButtons;
  const playerOneTag = document.createElement('p');
  const playerTwoTag = document.createElement('p');
  const startButtonContainer = document.querySelector('.start-button-container');
  const startButton = document.createElement('button');
  const restartButton = document.createElement('button');
  const winningMsg = document.createElement('p');
  const chooseEnemyContainer = document.querySelector('.choose-human-or-ai-ctnr');
  const chooseEnemyButtons = document.querySelectorAll('.choose-enemy');
  startButton.textContent = 'Start Game';
  startButton.className = 'start-button';
  restartButton.className = 'restart-button';
  restartButton.textContent = 'Restart Game';
  let clicked = false;
  playerOneTag.textContent = 'Player One';
  playerOneTag.classList.add = 'player-tag';
  playerTwoTag.classList.add = 'player-tag';
  playerTwoTag.textContent = 'Player Two';


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

    const winner = gameLogic.getWinner();
    const isThereWinner = gameLogic.getIsThereWinner();
    if (isThereWinner) {
      winningMsg.textContent = `The winner is ${winner}`;
      gameBoardContainer.appendChild(winningMsg);
      gameBoardContainer.appendChild(restartButton);
    }
  }

  function clickToPlayWithAi(e) {
    gameLogic.playWithAi(e.target.dataset.id);
    const winner = gameLogic.getWinner();
    const isThereWinner = gameLogic.getIsThereWinner();
    if (isThereWinner) {
      winningMsg.textContent = `The winner is ${winner}`;
      gameBoardContainer.appendChild(winningMsg);
      gameBoardContainer.appendChild(restartButton);
    }
  }


  function chooseMark(e) {
    gameLogic.startGame(e);
    e.target.parentNode.appendChild(playerOneTag);
    if (e.target === xButton) {
      oContainer.appendChild(playerTwoTag);
    } else if (e.target === oButton) {
      xContainer.appendChild(playerTwoTag);
    }
    clicked = true;
    if (clicked) {
      chooseMarkButtons.forEach((button) => {
        button.removeEventListener('click', chooseMark);
      });
    }
    startButtonContainer.appendChild(startButton);
  }

  function switchScreen(e) {
    chooseMarkButtons.forEach((button) => {
      button.addEventListener('click', chooseMark);
    });
    gameBoardContainer.classList.toggle('hidden');
    welcomeContainer.classList.toggle('hidden');
    restartButton.remove();
    startButton.remove();
    playerOneTag.remove();
    playerTwoTag.remove();
    winningMsg.remove();
  }


  // Event Listeners

  // fields.forEach((field) => {
  //   // field.addEventListener('click', clickToPlayWithAi);
  //   if (gameLogic.gameVsPlayer === true) {
  //     field.addEventListener('click', clickToPlay);
  //   } else if (gameLogic.gameVsAi === true) {
  //     fields.addEventListener('click', clickToPlayWithAi);
  //   }
  // });

  newGameButton.addEventListener('click', gameLogic.startGame.bind(gameLogic));

  chooseEnemyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      clicked = false;
      chooseEnemyContainer.classList.toggle('hidden');
      welcomeContainer.classList.toggle('hidden');
      if (e.target.textContent === 'VS. AI') {
        gameLogic.gameVsAi = true;
        gameLogic.gameVsPlayer = false;
        fields.forEach((field) => {
          field.removeEventListener('click', clickToPlay);
          field.addEventListener('click', clickToPlayWithAi);
        });
      } else if (e.target.textContent === 'VS. HUMAN') {
        gameLogic.gameVsAi = false;
        gameLogic.gameVsPlayer = true;
        fields.forEach((field) => {
          field.removeEventListener('click', clickToPlayWithAi);
          field.addEventListener('click', clickToPlay);
        });
      }
    });
  });

  chooseMarkButtons.forEach((button) => {
    button.addEventListener('click', chooseMark);
  });

  startButton.addEventListener('click', switchScreen);

  restartButton.addEventListener('click', (e) => {
    chooseMarkButtons.forEach((button) => {
      button.addEventListener('click', chooseMark);
    });
    gameBoardContainer.classList.toggle('hidden');
    chooseEnemyContainer.classList.toggle('hidden');
    restartButton.remove();
    startButton.remove();
    playerOneTag.remove();
    playerTwoTag.remove();
    winningMsg.remove();
  });



  return {
    render,
    xButton,
    oButton,
  };
})();

displayControler.render();



/* THINGS TO DO:

!!!START BY THIS!!!
# Comment code better so it is more readable for you!

# Change the way the player marks are chose (if in the dev console i change
    the html of mark boxes, the game will never end, because it works only with X and O)


# AI:
-> create a basic AI
-> let player choose if he wants to play againt AI or another human (or himself XD)
-> try to create an unbeatable algorithm using minimax?


*/
