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



    return { gameStart, gameOver, gameReset, gameBoard, gameBoardChange }
})();

const DisplayController = () => {
    const gameButtons = document.querySelectorAll(".game-button");
    const buttonsLength = gameButtons.length;
    const gameBoardArray = [];


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


    return { gameRender, playerClickRender };
}


//IIFE
const Game = (() => {
    const gameButtons = document.querySelectorAll(".game-button");
    const startButton = document.querySelector(".start-button")
    const restartButton = document.querySelector(".restart-button")
    const gameBoard = GameBoard;
    const displayController = DisplayController();
    const playerOneInput = document.querySelector("#player-1-name");

    //sets the board and displays it 
    gameBoard.gameReset();
    displayController.gameRender(gameBoard.gameBoard, 1);


    //event to start the game
    startButton.addEventListener("click", () => {
        gameBoard.gameStart();
        displayController.gameRender(gameBoard.gameBoard, 0);
        let playerOne = player(playerOneInput.value);
    })

    // event to set every tile and player names to default
    restartButton.addEventListener("click", () => {
        gameBoard.gameReset();
        displayController.gameRender(gameBoard.gameBoard, 1);
    })

    gameButtons.forEach(tile => {
        tile.addEventListener("click", (e) => {
            playerClickHandler(Number(e.target.id) - 1, "player-1")
        })
    });

    function playerClickHandler(tile, player) {
        let h = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (h == tile) {
                    if (player == "player-1") {
                        displayController.playerClickRender(Number(tile), "X");
                        gameBoard.gameBoardChange(i, j, "X");
                    } else {
                        displayController.playerClickRender(Number(tile), "O");
                        gameBoard.gameBoardChange(i, j, "O");
                    }

                }
                h++;
            }

        }
    }



})();