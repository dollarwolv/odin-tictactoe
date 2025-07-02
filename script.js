function createGameboard () {
    let gameArray = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]]

    const updateBoard = (rowidx, colidx, player) => {
        if (gameArray[rowidx][colidx] === 0){
            if (player === 0){
            gameArray[rowidx][colidx] = 5;
            } else if (player === 1){
                gameArray[rowidx][colidx] = 7;
            }
            return true;
        } else {
            return false;
        }
    }

    const resetArray = () => {
        gameArray = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]]
    }

    const determineWin = () => {
        let rowSums = [0, 0, 0];
        let colSums = [0, 0, 0];
        let diagSums = [0, 0];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const val = gameArray[i][j];
                rowSums[i] += val;
                colSums[j] += val;

                if (i === j) diagSums[0] += val;
                if (i + j === 2) diagSums[1] += val;
            }
        }

        const allSums = [...rowSums, ...colSums, ...diagSums];

        if (allSums.includes(15)) return 0;
        if (allSums.includes(21)) return 1;
        if (!gameArray.flat().includes(0)) return 2; // draw
        return null;
    };

    return {gameArray, updateBoard, determineWin, resetArray}
}

function createPlayer (name, id) {
    const playerName = name;
    const playerID = id;

    let score = 0;
    const increaseScore = () => score++;

    return {playerName, playerID, increaseScore}
}

function manageGame() {

    let winner = null
    const gameboard = createGameboard();
    let moveNum = 0;

    let playerOne;
    let playerTwo;

    const getForm = () => {
        const form = document.getElementById("form")
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // make players
            const playerOneName = document.getElementById("playerone").value.trim();
            const playerTwoName = document.getElementById("playertwo").value.trim();
            playerOne = createPlayer(playerOneName, 0)
            playerTwo = createPlayer(playerTwoName, 1)
            renderGame();

        })
        return form;
    }

    const renderGame = () => {

        // create grid
        const grid = document.createElement("div");
        grid.id = "grid"
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateRows: "repeat(3, 100px)",
            gridTemplateColumns: "repeat(3, 100px)",
            gap: "10px",
            width: "330px",
            height: "330px",
            backgroundColor: "#f0f0f0"
        });
        document.body.appendChild(grid);

        // append boxes
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                let box = document.createElement("div");
                box.style.border = "1px solid black"
                box.dataset.row = i;
                box.dataset.col = j;

                box.addEventListener("click", (e) => {
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;
                    handleTurn(row, col, e.target);
                });

                grid.appendChild(box);
            }
        }
        document.body.removeChild(getForm())
    }

    const handleTurn = (row, col, e) => {
        let whoseTurn = moveNum % 2;
        if (gameboard.updateBoard(row, col, whoseTurn)){

            //update symbol
            const playerSymbol = whoseTurn === 0 ? "X" : "O";
            e.textContent = playerSymbol;
        } else {
            return;
        }

        moveNum++;
        determineWinner();
    }

    const determineWinner = () => {

        // determine winner
        let winner = gameboard.determineWin();
        if (winner != null) {
            const resultsDisplay = document.createElement("p");
            if(winner == 0){
                let winPlayer = playerOne;
                resultsDisplay.textContent = `${playerOne.playerName} wins yay`
            } else if(winner == 1){
                let winPlayer = playerTwo;
                resultsDisplay.textContent = `${playerTwo.playerName} wins yay`
            } else if(winner == 2){
                resultsDisplay.textContent = "draw wop wop"
            }
            document.body.appendChild(resultsDisplay);
            
            // play again button
            playAgain = document.createElement("button");
            playAgain.textContent = "play again!!!!!"
            document.body.appendChild(playAgain)
            playAgain.addEventListener("click", () => {
                grid = document.getElementById("grid");
                document.body.removeChild(grid);
                document.body.removeChild(playAgain);
                document.body.removeChild(resultsDisplay);
                gameboard.resetArray();
                moveNum = 0;
                renderGame();
                winPlayer.increaseScore();
            })
        }
    }
    getForm();
    return {};
}
    


manageGame();
