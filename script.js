function createGameboard () {
    let gameArray = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]]

    const updateBoard = (rowidx, colidx, player) => {
        if (player === 0){
            gameArray[rowidx][colidx] = 5;
        } else if (player === 1){
            gameArray[rowidx][colidx] = 7;
        }
        console.log("new array" + gameArray);
    }

    return {gameArray, updateBoard}
}

function createPlayer (name, id) {
    const playerName = name;
    const playerID = id;

    let score = 0;
    const increaseScore = () => score++;

    return {playerName, playerID, increaseScore}
}

function determineWin(gameArray) {
        let rowOneSum = 0;
        let rowTwoSum = 0;
        let rowThreeSum = 0;
        let colOneSum = 0;
        let colTwoSum = 0;
        let colThreeSum = 0;

        //diag one is the one that goes from top left to bottom right.
        let diagOneSum = 0;
        let diagTwoSum = 0;

        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                
                switch (i) {
                    case 0:
                        rowOneSum += gameArray[i][j];
                        break;
                    case 1:
                        rowTwoSum += gameArray[i][j];
                        break;
                    case 2:
                        rowThreeSum += gameArray[i][j];
                        break;
                }

                switch (j) {
                    case 0:
                        colOneSum += gameArray[i][j];
                        break;
                    case 1:
                        colTwoSum += gameArray[i][j];
                        break;
                    case 2:
                        colThreeSum+= gameArray[i][j];
                        break;
                }

                if(i == j){
                    diagOneSum += gameArray[i][j];
                }

                if(j + i == 2){
                    diagTwoSum += gameArray[i][j];
                }
        
            }
        }

        let sumArray = [rowOneSum, rowTwoSum, rowThreeSum, colOneSum, colTwoSum, colThreeSum, diagOneSum, diagTwoSum]

        if (sumArray.includes(15)){
            console.log("player 1 wins!");
            return 0
        } else if (sumArray.includes(21)){
            console.log("player 2 wins!");
            return 1
        } else {
            return null
        }

        
    }

function playGame() {

    let winner = null
    gameboard = createGameboard();
    playerOne = createPlayer("playerOne", 0)
    playerTwo = createPlayer("playerTwo", 0)

    let moveNum = 0;

    while (winner === null) {
        let whoseTurn = moveNum % 2;
        row = prompt("What row do you want to play in?");
        col = prompt("What column do you want to play in?");

        gameboard.updateBoard(row, col, whoseTurn);
        winner = determineWin(gameboard.gameArray);

        if(winner != null){
            console.log("winner is" + winner)
        } else {
            moveNum++;
        }

    }

    
}

playGame()