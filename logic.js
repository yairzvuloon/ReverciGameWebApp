const BLACK = 1;
const WHITE = 2;
const EMPTY = 0;

var initBoard = (function() {
    return {
        createBoard: function(boardSize) {
            var table = '';
            for (var r = 0; r < boardSize; r++) {
                table += '<tr>';
                for (var c = 0; c < boardSize; c++) {
                    var id_square = r * boardSize + c;
                    if (id_square < 10) {
                        id_square = "0" + id_square;
                    }
                    table += '<td class="square" id="' + id_square + '" >\n' +
                        '<span class="piece"></span> </td>';
                }
                table += '</tr>';
            }
            table = '<tbody>' + table + '</tbody>';
            table = '<table id="board">' + table + '</table>';
            document.write(table);
        },
        initBoard: function() {
            var table = '';
            table = table + '<table id="namesTable">';
            table = table + '<tbody>\n' +
                '            <tr>\n' +
                '            <td class="namesTableCell">\n' +
                '            <span class="white color">White Score:</span>\n' +
                '        </td>\n' +
                '        <td class="namesTableCell">\n' +
                '            <span class="white color">0</span>\n' +
                '            </td>\n' +
                '            <td class="namesTableCell">\n' +
                '            <span class="black color">Black Score:</span>\n' +
                '        </td>\n' +
                '        <td class="namesTableCell">\n' +
                '            <span class="black color">0</span>\n' +
                '            </td>\n' +
                '            </tr>\n' +
                '            </tbody>';
            table = table + '</table>'
            document.write(table);
        },
        createStatisticsBoard: function() {
            var statisticsTable = '';
            statisticsTable = statisticsTable + '<table id="statsTable">';
            statisticsTable = statisticsTable + '<tbody>\n' +
                '            <tr>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="whiteM">White Moves:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="whiteMoves">0</span>\n' +
                '            </td>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="blackM">Black Moves:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="blackMoves">0</span>\n' +
                '            </td>\n' +
                '            </tr>\n' +
                '            <tr>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="whiteT">White Average:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="whiteTimer">0</span>\n' +
                '            </td>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="blackT">Black Average:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="blackTimer">0</span>\n' +
                '            </td>\n' +
                '            </tr>\n' +
                '            <tr>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="white2">White Only 2:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="whiteTwo">0</span>\n' +
                '            </td>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="black2">Black Only 2:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="blackTwo">0</span>\n' +
                '            </td>\n' +
                '            </tr>\n' +
                '            <td>\n' +
                '            <td class="statsCell">\n' +
                '            <span class="gameT">Game Time:</span>\n' +
                '        </td>\n' +
                '        <td class="statsCell">\n' +
                '            <span class="gameTime">0</span>\n' +
                '            </td>\n' +
                '<td </td>'
            '            <tr>\n' +
            '            </tbody>';
            statisticsTable = statisticsTable + '</table>';
            document.write(statisticsTable);
        }
    }
})();

var graphic = (function() {
    var domGameBoardObject = null;
    var domNamesTable = null;
    var newGameButton = null;
    var statsBoard = null;
    return {
        setDomMembers: function() {
            domGameBoardObject = document.getElementById("board");
            domNamesTable = document.getElementById("namesTable");
            statsBoard = document.getElementById("statsTable");
            newGameButton = document.getElementById("newGameButton");
        },
        setPieceClassNameInDOM: function(row, col, className) {
            domGameBoardObject.rows[row].cells[col].children[0].className = className;
        },
        addAllListeners: function() {
            for (var i = 0; i < logic.getBoardSize(); i++) {
                for (var j = 0; j < logic.getBoardSize(); j++) {
                    graphic.addClickListenerToPieceInDOM(i, j);
                }
            }
        },
        addClickListenerToPieceInDOM: function(row, col) {
            domGameBoardObject.rows[row].cells[col].addEventListener(
                "click",
                game.move
            );
        },
        removeClickListenerFromPieceInDOM: function(
            row,
            col,
        ) {
            domGameBoardObject.rows[row].cells[col].removeEventListener(
                "click",
                game.move
            );
        },
        cleanDOMBoard: function() {
            for (var i = 0; i < logic.getBoardSize(); i++) {
                for (var j = 0; j < logic.getBoardSize(); j++) {
                    domGameBoardObject.rows[i].cells[j].children[0].className = "empty piece";
                }
            }
        },
        setInitialStateInDOMBoard: function() {
            var size = logic.getBoardSize();
            domGameBoardObject.style.display = "";
            domNamesTable.style.display = "";

            graphic.signCurrentPlayer();
            graphic.resetScoresInDom();
            domGameBoardObject.rows[size / 2 - 1].cells[size / 2 - 1].children[0].className = "white piece";
            domGameBoardObject.rows[size / 2 - 1].cells[size / 2].children[0].className = "black piece";
            domGameBoardObject.rows[size / 2].cells[size / 2 - 1].children[0].className = "black piece";
            domGameBoardObject.rows[size / 2].cells[size / 2].children[0].className = "white piece";
            graphic.cleanAllMarkedSquares();
            graphic.signAllValidSquaresAround(size / 2 - 1, size / 2 - 1);
            graphic.signAllValidSquaresAround(size / 2 - 1, size / 2);
            graphic.signAllValidSquaresAround(size / 2, size / 2 - 1);
            graphic.signAllValidSquaresAround(size / 2, size / 2);

            domGameBoardObject.rows[size / 2 - 1].cells[size / 2 - 1].removeEventListener("click", game.move);
            domGameBoardObject.rows[size / 2 - 1].cells[size / 2].removeEventListener("click", game.move);
            domGameBoardObject.rows[size / 2].cells[size / 2 - 1].removeEventListener("click", game.move);
            domGameBoardObject.rows[size / 2].cells[size / 2].removeEventListener("click", game.move);
        },
        hideBoardInDOM: function() {
            domGameBoardObject.style.display = "none";
        },
        hideNamesTableInDOM: function() {
            domNamesTable.style.display = "none";
        },
        addPiecesScore: function() {
            domNamesTable.rows[0].cells[1].children[0].innerHTML = logic.getWhiteScore();
            domNamesTable.rows[0].cells[3].children[0].innerHTML = logic.getBlackScore();
        },
        addStats: function() {
            statsBoard.rows[0].cells[1].children[0].innerHTML = logic.getWhiteMoves();
            statsBoard.rows[0].cells[3].children[0].innerHTML = logic.getBlackMoves();
            statsBoard.rows[1].cells[1].children[0].innerHTML = logic.getWhiteTime();
            statsBoard.rows[1].cells[3].children[0].innerHTML = logic.getBlackTime();
            statsBoard.rows[2].cells[1].children[0].innerHTML = logic.getWhiteOnly2();
            statsBoard.rows[2].cells[3].children[0].innerHTML = logic.getBlackOnly2();
            statsBoard.rows[3].cells[2].children[0].innerHTML = logic.getGameTime();
        },
        resetScoresInDom: function() {
            domNamesTable.rows[0].cells[1].children[0].innerHTML = "2";
            domNamesTable.rows[0].cells[3].children[0].innerHTML = "2";
        },
        signCurrentPlayer: function() {
            if (logic.getCurrentColor() === WHITE) {
                domNamesTable.rows[0].cells[2].children[0].className = "black color";
                domNamesTable.rows[0].cells[3].children[0].className = "black color";
                domNamesTable.rows[0].cells[0].children[0].className = "white color activePlayer";
                domNamesTable.rows[0].cells[1].children[0].className = "white color activePlayer";

            } else {
                domNamesTable.rows[0].cells[0].children[0].className = "white color";
                domNamesTable.rows[0].cells[1].children[0].className = "white color";
                domNamesTable.rows[0].cells[2].children[0].className = "black color activePlayer";
                domNamesTable.rows[0].cells[3].children[0].className = "black color activePlayer";
            }
        },
        signValidSquare: function(row, col) {
            domGameBoardObject.rows[row].cells[col].className = "valid square";

        },
        cleanInvalidSquare: function(row, col) {
            domGameBoardObject.rows[row].cells[col].className = "square";
        },
        cleanAllMarkedSquares: function() {
            elementArray = document.getElementsByClassName("valid square");
            while (elementArray.length) {
                elementArray[0].className = "square";
            }
        },
        addListenerToNewGameButton: function() {
            newGameButton.addEventListener("click", game.startGame);
        },
        removeAllClickListener: function() {
            var size = logic.getBoardSize();
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    graphic.removeClickListenerFromPieceInDOM(i, j);
                }
            }
        },
        changeTextOfButton: function() {
            if (logic.isGameOver()) {
                newGameButton.innerHTML = "New Game";
            } else {
                newGameButton.innerHTML = "End Game";
            }
        },
        getTheCurrentTextButton: function() {
            return newGameButton.innerHTML;
        },
        signAllValidSquaresAround: function(row, col) {
            graphic.signSquareOrCleanSquare(row - 1, col - 1);
            graphic.signSquareOrCleanSquare(row - 1, col);
            graphic.signSquareOrCleanSquare(row - 1, col + 1);
            graphic.signSquareOrCleanSquare(row, col + 1);
            graphic.signSquareOrCleanSquare(row + 1, col + 1);
            graphic.signSquareOrCleanSquare(row + 1, col);
            graphic.signSquareOrCleanSquare(row + 1, col - 1);
            graphic.signSquareOrCleanSquare(row, col - 1);
        },
        signSquareOrCleanSquare: function(row, col) {
            if (logic.checkIndex(row, col) && logic.isValidIndex(row, col)) {
                graphic.cleanInvalidSquare(row, col);
            } else if (logic.isValidIndex(row, col)) {
                graphic.signValidSquare(row, col);
            }
        },
        hideBoard: function() {
            logic.cleanLogicBoard();
            graphic.removeAllClickListener();
            graphic.cleanDOMBoard();
            graphic.hideBoardInDOM();
            graphic.hideNamesTableInDOM();
        }
    };
})();

var logic = (function() {
    var board = [];
    var boardSize = 10;
    var blackNumber = 0;
    var whiteNumber = 0;
    var currentPlayer = false; // white player=false, black player =true
    var currentColor = WHITE;
    var rivalColor = BLACK;
    var gameOver = false;
    var blackSec = 0;
    var whiteSec = 0;
    var numWhiteTwo = 0;
    var numBlackTwo = 0;
    var whiteMoves = 0;
    var blackMoves = 0;
    var whiteAve = 0;
    var blackAve = 0;
    var gameTime = 0;


    return {
        getBoardSize: function() {
            return boardSize;
        },
        setBoardSize: function(_boardSize) {
            boardSize = _boardSize;
        },
        isEmpty: function(row, col) {
            return logic.getTypePieceByIndex(row, col) === EMPTY;
        },
        cleanLogicBoard: function() {
            for (var i = 0; i < logic.getBoardSize(); i++) {
                board[i] = [];
                for (var j = 0; j < logic.getBoardSize(); j++) {
                    board[i][j] = EMPTY;
                }
            }
        },
        getTypePieceByIndex: function(i, j) {
            var location = null;
            if (logic.isValidIndex(i, j)) {
                location = board[i][j];
            }
            return location;
        },
        cleanStatsTable: function() {
            blackSec = 0;
            whiteSec = 0;
            numWhiteTwo = 0;
            numBlackTwo = 0;
            whiteMoves = 0;
            blackMoves = 0;
            whiteAve = 0;
            blackAve = 0;
            gameTime = 0;
            graphic.addStats()
        },
        isValidIndex: function(row, col) {
            return 0 <= row && row < logic.getBoardSize() && 0 <= col && col < logic.getBoardSize();
        },
        isValidMove: function(row, col) {
            return logic.isEmpty(row, col) && logic.isPieceAround(row, col);
        },
        checkIndex: function(row, col) {
            return logic.isValidIndex(row, col) && !logic.isEmpty(row, col);
        },
        getCurrentColor: function() {
            return currentColor;
        },
        getRivalColor: function() {
            return rivalColor;
        },
        updateGameOver: function() {
            var numOfMaxPieces = logic.getBoardSize() * logic.getBoardSize();
            gameOver = blackNumber + whiteNumber === numOfMaxPieces || blackNumber === 0 || whiteNumber === 0;
        },
        resetGameOver: function() {
            gameOver = false;
        },
        turnOnGameOver: function() {
            gameOver = true;
        },
        isGameOver: function() {
            return gameOver;
        },
        getRivalName: function() {
            if (logic.getRivalColor() === BLACK) {
                return "BLACK";
            } else {
                return "WHITE";
            }
        },
        addPiecesToLogicScore: function(numberOfPieces) {
            if (currentColor === WHITE) {
                whiteNumber += numberOfPieces;
                if (numberOfPieces > 1) {
                    blackNumber -= numberOfPieces;
                    blackNumber += 1;
                }
            } else if (currentColor === BLACK) {
                blackNumber += numberOfPieces;
                if (numberOfPieces > 1) {
                    whiteNumber -= numberOfPieces;
                    whiteNumber += 1;
                }
            }
        },
        resetLogicScores: function() {
            whiteNumber = 2;
            blackNumber = 2;
        },
        getBlackScore: function() {
            return blackNumber;
        },
        getWhiteScore: function() {
            return whiteNumber;
        },
        getBlackMoves: function() {
            return blackMoves;
        },
        getWhiteMoves: function() {
            return whiteMoves;
        },
        getBlackTime: function() {
            return Math.round(blackAve);
        },
        getWhiteTime: function() {
            return Math.round(whiteAve);
        },
        getBlackOnly2: function() {
            return numBlackTwo;
        },
        getWhiteOnly2: function() {
            return numWhiteTwo;
        },
        getGameTime: function() {
            var timeSec;
            timeSec = Math.round(gameTime);
            return this.secondsToHms(timeSec)

        },
        whoWin: function() {
            var winner = "WHITE";
            if (blackNumber > whiteNumber) {
                winner = "BLACK";
            }
            return winner;
        },
        secondsToHms: function(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            if (s < 10) {
                s = "0" + s
            }
            return h + ":" + m + ":" + s
        },
        updateStatistics: function() {
            if (2 === this.getCurrentColor()) {
                whiteMoves += 1;
                whiteSec = this.createCountDown(lastDate, true, whiteSec);
                whiteAve = whiteSec / whiteMoves;
                if (whiteNumber === 2) {
                    numWhiteTwo += 1;
                }
            } else {
                blackMoves += 1;
                blackSec = this.createCountDown(lastDate, true, blackSec);
                blackAve = blackSec / blackMoves;
                if (blackNumber === 2) {
                    numBlackTwo += 1;
                }
            }

            gameTime = (Date.now() - lastDate) / 1000 + gameTime;
            lastDate = Date.now();
        },
        createCountDown: function(timer, pauseTimer, totalTime) {
            if (timer === 0) {
                var startTime = Date.now();
            }
            if (pauseTimer) {
                return (Date.now() - timer) / 1000 + totalTime;
            } else {
                return startTime;
            }
        },
        startStatistics: function() {
            lastDate = this.createCountDown(0, false);
            blackTimer = 0;
            whiteTimer = 0;
            numWhiteTwo = 0;
            numBlackTwo = 0;
            whiteMoves = 0;
            blackMoves = 0;
        },
        setInitialStateInLogicBoard: function() {
            activePlayer = false;
            currentColor = WHITE;
            rivalColor = BLACK;
            logic.resetLogicScores();
            board[boardSize / 2 - 1][boardSize / 2 - 1] = WHITE;
            board[boardSize / 2 - 1][boardSize / 2] = BLACK;
            board[boardSize / 2][boardSize / 2 - 1] = BLACK;
            board[boardSize / 2][boardSize / 2] = WHITE;
        },
        locatePiece: function(row, col, colorPiece) {
            var className = null;
            if (colorPiece === WHITE) {
                className = "white piece";
            } else if (colorPiece === BLACK) {
                className = "black piece";
            }
            board[row][col] = colorPiece;
            graphic.setPieceClassNameInDOM(row, col, className);
            graphic.removeClickListenerFromPieceInDOM(row, col);
        },
        changePlayer: function() {
            currentPlayer = !currentPlayer;
            if (!currentPlayer) {
                currentColor = WHITE;
                rivalColor = BLACK;
            } else {
                currentColor = BLACK;
                rivalColor = WHITE;
            }
            graphic.signCurrentPlayer();
        },
        // This function gets index with row and column and direction for the search, and
        // inserts all the pieces that we need to replace, to "replaceablePiecesStack".
        // after that, the function replaces all of the pieces that in the stack.
        findRivalPiecesAndReplace: function(row, col, rowDir, colDir) {
            var numberOfPieces = 0;
            var targetRow = row + rowDir;
            var targetCol = col + colDir;
            var temp = new Array();
            var index;
            while (logic.getTypePieceByIndex(targetRow, targetCol) === logic.getRivalColor()) {
                temp.push({
                    targetRow,
                    targetCol
                })
                targetRow += rowDir;
                targetCol += colDir;
            }

            if (logic.getTypePieceByIndex(targetRow, targetCol) === logic.getCurrentColor()) {
                while (temp.length !== 0) {
                    numberOfPieces++;
                    index = temp.pop();
                    logic.locatePiece(index.targetRow, index.targetCol, logic.getCurrentColor());
                }
            }
            return numberOfPieces;
        },
        eatRivalPieces: function(row, col) {
            var numberOfPieces = 0;

            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, 1, 0);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, -1, 0);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, 0, 1);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, 0, -1);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, -1, -1);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, 1, 1);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, -1, 1);
            numberOfPieces += logic.findRivalPiecesAndReplace(row, col, 1, -1);

            return numberOfPieces;
        },
        isPieceAround: function(row, col) {
            return (
                logic.checkIndex(row - 1, col - 1) ||
                logic.checkIndex(row - 1, col) ||
                logic.checkIndex(row - 1, col + 1) ||
                logic.checkIndex(row, col + 1) ||
                logic.checkIndex(row + 1, col + 1) ||
                logic.checkIndex(row + 1, col) ||
                logic.checkIndex(row + 1, col - 1) ||
                logic.checkIndex(row, col - 1)
            );
        }
    };
})();

var game = (function() {
    return {
        run: function() {
            initBoard.createBoard(logic.getBoardSize());
            initBoard.initBoard();
            initBoard.createStatisticsBoard();
            graphic.setDomMembers();
            graphic.addListenerToNewGameButton();
            game.setInitialState();
        },
        startGame: function() {
            if (graphic.getTheCurrentTextButton() === "End Game") {
                logic.turnOnGameOver();
                game.endGame();
            } else {
                game.setInitialState();
            }
        },
        move: function() {
            var row = Math.floor(Number(this.id) / logic.getBoardSize());
            var col = Number(this.id) - (row * logic.getBoardSize());

            var numberOfPieces = 0;

            if (logic.isValidMove(row, col)) {
                graphic.cleanInvalidSquare(row, col);
                graphic.signAllValidSquaresAround(row, col);
                logic.locatePiece(row, col, logic.getCurrentColor());
                numberOfPieces += logic.eatRivalPieces(row, col);
                logic.addPiecesToLogicScore(numberOfPieces + 1);
                graphic.addPiecesScore();
                logic.updateStatistics();
                graphic.addStats();
                logic.changePlayer();
                logic.updateGameOver();

                if (logic.isGameOver()) {
                    game.endGame();
                }
            }
        },
        endGame: function() {
            graphic.hideBoard();
            document.getElementById("winner").style.display = "";
            if (graphic.getTheCurrentTextButton() === "New Game") {
                document.getElementById("winner").innerHTML = "The winner is: " + logic.whoWin();
            } else {
                document.getElementById("winner").innerHTML = "The winner is: " + logic.getRivalName();
            }
            graphic.changeTextOfButton();
        },
        setInitialState: function() {
            logic.resetGameOver();
            graphic.changeTextOfButton();
            logic.cleanLogicBoard();
            logic.cleanStatsTable();
            logic.setInitialStateInLogicBoard();
            graphic.cleanDOMBoard();
            graphic.addAllListeners();
            graphic.setInitialStateInDOMBoard();
            logic.startStatistics();
            document.getElementById("winner").style.display = "none";
        }
    };
})();
//Entry point 
game.run();