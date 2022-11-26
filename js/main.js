'use strict'


const MINE = '💣'
const FLAG = '🚩'

var gBoard

var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gCurrCell



initGame()
function initGame() {
    var level = 4
    gBoard = buildBoard(level)
    placeMines(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '.board-container')


}

// function getLevel() {
// }

function buildBoard(level) {
    const board = []
    for (var i = 0; i < level; i++) {
        board.push([])
        for (var j = 0; j < level; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

function renderBoard(board, selector) {

    var strHTML = '<table border="0"><tbody>'
    var cell = ''
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isShown) {
                cell = (board[i][j].isMine) ? MINE : board[i][j].minesAroundCount
            }
            const className = `cell cell-${i}-${j}`

            strHTML += `<td onmousedown="cellClicked(this, ${i}, ${j}, event)" oncontextmenu="return false" class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = getMinesNegsCount(i, j, gBoard)
            }
        }
    }
}

function cellClicked(elCell, i, j, ev) {
    if (ev.which === 3) elCell.innerText = FLAG
    else elCell.innerText = gBoard[i][j].minesAroundCount

    if (elCell.isMine) checkGameOver(elCell)
}

function cellMarked(elCell) {

}

function placeMines(board) {
    var mines = []
    for (var i = 0; i < gLevel.mines; i++) {
        mines[i] = { i: getRandomInt(0, gBoard.length), j: getRandomInt(0, gBoard.length) }
        board[mines[i].i][mines[i].j].isMine = true
        board[mines[i].i][mines[i].j].minesAroundCount = MINE
        console.log(mines[i])
    }
}

function checkGameOver(elCell) {

}

function expandShown(board, elCell, i, j) {

}

function setDifficulty(level) {
    if (level.classList.contains('.easy')) {
        gLevel.size = 4
        gLevel.mines = 2
    } else if (level.classList.contains('.medium')) {
        gLevel.size = 8
        gLevel.mines = 14
    }
}