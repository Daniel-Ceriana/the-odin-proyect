//name of the player
const player = (name) => {
    return { name }
}

const GameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];


    //sets everything so that the game starts
    function gameStart() {
        let x = 1;
        for (let i = 0; i < columns; i++) {

            gameBoard[i] = []
            for (let j = 0; j < rows; j++) {
                gameBoard[i].push(x);
                x++
            }
        }

        console.log(gameBoard);

    }

    //checks gameOver condition 
    function gameOver() {

    }

    // resets tiles
    function gameReset() {

        let x = 1;
        for (let i = 0; i < columns; i++) {

            gameBoard[i] = []
            for (let j = 0; j < rows; j++) {
                gameBoard[i].push(x);
                x++
            }
        }

    }

    function gameBoardChange(i, j, value) {
        gameBoard[i][j] = value
    }

    function gameBoardIsTileAvailable(indexI, indexJ) {
        if (gameBoard[indexI][indexJ] != "X" && gameBoard[indexI][indexJ] != "O") {
            return true;
        } else {
            return false;
        }

    }


    return { gameStart, gameOver, gameReset, gameBoardChange, gameBoard, gameBoardIsTileAvailable }
})();

const DisplayController = () => {
    const gameButtons = document.querySelectorAll(".game-button");
    const buttonsLength = gameButtons.length;
    const gameBoardArray = [];
    const turnLabel = document.querySelector(".turn");
    const playerCount = document.querySelector(".player-count");
    const playerTwoInput = document.querySelector("#player-2-name")


    playerCount.addEventListener("click", (e) => {
        console.log("ALGO ESTA PASANDO")
        checkNumberOfPlayers();
    })

    function gameRender(gameBoard, start = 0) {
        const gameBoardLength = gameBoard.length;

        for (let i = 0; i < gameBoardLength; i++) {
            for (let j = 0; j < gameBoardLength; j++) {
                gameBoardArray.push(gameBoard[i][j]);
            }
        }


        for (let i = 0; i < buttonsLength; i++) {
            gameButtons[i].textContent = gameBoardArray[i];
            gameButtons[i].disabled = Boolean(start);
        }
    }

    function playerClickRender(tile, value) {

        gameButtons[tile].textContent = value;
    }

    function displayTurn(turn) {
        turnLabel.textContent = turn;
    }

    function checkNumberOfPlayers() {
        if (playerCount.value == 2) {
            playerTwoInput.disabled = false;
        } else {
            playerTwoInput.disabled = true;
        }
        return playerCount.value;
    }

    return { gameRender, playerClickRender, displayTurn, checkNumberOfPlayers };
}


//IIFE
const Game = (() => {
    const gameButtons = document.querySelectorAll(".game-button");
    const startButton = document.querySelector(".start-button")
    const restartButton = document.querySelector(".restart-button")

    const gameBoard = GameBoard;
    const displayController = DisplayController();


    const playerOneInput = document.querySelector("#player-1-name");
    const playerTwoInput = document.querySelector("#player-2-name");

    let playerOne = player("player-1");
    let playerTwo = player("player-2");
    let turn = "player-1";

    //sets the board and displays it 
    gameBoard.gameReset();
    displayController.gameRender(gameBoard.gameBoard, 1);


    //event to start the game with logic for number of players
    startButton.addEventListener("click", () => {
        gameBoard.gameStart();
        displayController.gameRender(gameBoard.gameBoard, 0);

        //player names
        if (displayController.checkNumberOfPlayers == 2) {
            if (playerNameIsValid(playerTwoInput.value)) {
                playerTwo.name = playerTwoInput.value;
            }

        }
        if (playerNameIsValid(playerOneInput.value)) {
            playerOne.name = playerOneInput.value
        }

    })

    function playerNameIsValid(name) {
        if (name.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // event to set every tile and player names to default
    restartButton.addEventListener("click", () => {
        gameBoard.gameReset();
        displayController.gameRender(gameBoard.gameBoard, 1);
    })

    gameButtons.forEach(tile => {
        tile.addEventListener("click", (e) => {
            playerClickHandler(Number(e.target.id) - 1, turn);
        })
    });

    function playerClickHandler(tile, player) {
        let h = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard.gameBoardIsTileAvailable(i, j)) {
                    if (h == tile) {
                        if (player == "player-1") {

                            displayController.playerClickRender(tile, "X");
                            gameBoard.gameBoardChange(i, j, "X");
                        } else {

                            displayController.playerClickRender(tile, "O");
                            gameBoard.gameBoardChange(i, j, "O");
                        }
                        nextTurn();
                    }

                }
                h++;
            }
        }
    }

    function nextTurn() {

        if (turn == "player-1") {
            turn = "player-2";
            displayController.displayTurn(playerTwo.name);

        } else {
            turn = "player-1"
            displayController.displayTurn(playerOne.name);
        }
    }

})();