//name of the player
const player = (name) => {
    let playerName;

    function validateString() {

    }

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


    }

    let checkEquals = (first, middle, last) => {
        let returnVal = false;
        if (first === middle && first === last) {
            returnVal = true;
        } else {
            returnVal = false;
        }
        return returnVal;
    }

    //checks gameOver condition  0 is not over, 1 player won, 2 tie
    function isGameOver() {

        let gameBoardArray = [];
        let returnVal = 0;
        let arrayLength;
        gameBoard.forEach(row => {
            row.forEach(column => {
                gameBoardArray.push(column);
            })


        });
        arrayLength = gameBoardArray.length;
        if (arrayLength > 0) {

            for (let i = 0; i < 3; i++) {
                if (checkEquals(gameBoardArray[i], gameBoardArray[i + 3], gameBoardArray[i + 6])) {
                    returnVal = 1;
                    break;
                }
            }
            // [0][3][6]
            // [1][4][7]
            // [2][5][8]
            if (returnVal == 0) {
                for (let i = 0; i < 5; i += 3) {
                    if (checkEquals(gameBoardArray[i], gameBoardArray[i + 1], gameBoardArray[i + 2])) {
                        returnVal = 1;
                        break;
                    }
                }
            }
            // [0][1][2]
            // [3][4][5]
            // [6][7][8]

            if (returnVal == 0) {
                if (checkEquals(gameBoardArray[0], gameBoardArray[4], gameBoardArray[8])) {
                    returnVal = 1;
                }

                if (checkEquals(gameBoardArray[2], gameBoardArray[4], gameBoardArray[6])) {
                    returnVal = 1;
                }
            }
            // [0][4][8]
            // [2][4][6]
            if (returnVal == 0) {
                for (let i = 0; i < arrayLength; i++) {
                    if (gameBoardArray[i] != 'X' && gameBoardArray[i] != 'O') {
                        returnVal = 0;
                        break;
                    } else {
                        returnVal = 2;
                    }
                }
            }
        }
        return returnVal;
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


    return { gameStart, isGameOver, gameReset, gameBoardChange, gameBoard, gameBoardIsTileAvailable }
})();

const DisplayController = () => {
    const gameButtons = document.querySelectorAll(".game-button");
    const buttonsLength = gameButtons.length;
    const gameBoardArray = [];
    const turnLabel = document.querySelector(".turn");
    // const playerCount = document.querySelector(".player-count");
    const playerCountRadios = document.querySelectorAll(".player-count");
    const playerTwoInput = document.querySelector("#player-2-name");
    const playerOneWins = document.querySelector(".player-1-wins");
    const playerTwoWins = document.querySelector(".player-2-wins");

    function addPlayerWin(player) {
        let playerWins;

        if (player !== NaN && player == "player-1") {
            try {
                playerWins = Number(playerOneWins.textContent);
                playerWins++;
                playerOneWins.textContent = playerWins;
            } catch (error) {
                console.log(error)
            }


        } else {
            playerWins = Number(playerTwoWins.textContent);
            playerWins++;
            playerTwoWins.textContent = playerWins;
        }
        for (let i = 0; i < buttonsLength; i++) {
            gameButtons[i].disabled = true;
        }
    }

    function resetPlayerWins() {
        playerOneWins.textContent = 0;
        playerTwoWins.textContent = 0;
    }

    playerCountRadios.forEach(radio => {
        radio.addEventListener("click", (e) => {
            checkNumberOfPlayers();
        })
    });

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

    //just changes one tile
    function playerClickRender(tile, value) {

        gameButtons[tile].textContent = value;
    }

    function displayTurn(turn) {
        turnLabel.textContent = turn;
    }


    function checkNumberOfPlayers() {
        let returnVal = 0;
        if (playerCountRadios[0].checked == true) {
            returnVal = 1;
            playerTwoInput.disabled = true;
        } else {
            returnVal = 2;
            playerTwoInput.disabled = false;
        }
        return returnVal;
    }

    return { gameRender, playerClickRender, displayTurn, checkNumberOfPlayers, addPlayerWin, resetPlayerWins };
}


//IIFE
// game flow logic
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
        resetTurn();
        gameBoard.gameStart();
        displayController.gameRender(gameBoard.gameBoard, 0);

        //player names
        if (displayController.checkNumberOfPlayers() == 2) {
            if (playerNameIsValid(playerTwoInput.value)) {
                playerTwo.name = playerTwoInput.value;
                console.log(playerTwoInput.value)
            }

        }

        if (playerNameIsValid(playerOneInput.value)) {
            playerOne.name = playerOneInput.value
        }
        displayController.displayTurn(playerOne.name);
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
        resetTurn();
        displayController.displayTurn(playerOne.name);
        gameBoard.gameReset();
        displayController.gameRender(gameBoard.gameBoard, 1);
        displayController.resetPlayerWins();
    })

    gameButtons.forEach(tile => {
        tile.addEventListener("click", (e) => {
            playerClickHandler(Number(e.target.id) - 1, turn);
        })
    });

    function playerClickHandler(tile, player) {
        let h = 0
        let asd;
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
                        asd = gameBoard.isGameOver();
                        if (asd == 1) {
                            displayController.addPlayerWin(turn);
                        } else if (asd == 2) {
                            console.log("Tie");
                        };

                        nextTurn();
                    }

                }
                h++;
            }
        }
    }

    function resetTurn() {
        turn = "player-1";
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