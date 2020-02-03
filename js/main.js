'use strict'

// Global Variables

var gNums = []
var gBoardSize
var gNextNum = 1
var gSecInterval = null
var gStartGame = false

// StopWatch Variables

var millisecond = 0
var seconds = 0
var minutes = 0
var newMillisecond = 0
var newSeconds = 0
var newMinutes = 0

// Functions:

function init() {
    setLevel(16)
}

function setLevel(level) {
    gBoardSize = level
    pauseTime()
    gNextNum = 1
    document.querySelector(".next-num").innerText = gNextNum
    resetNums(level);
    renderBoard(gNums)
}

function resetNums(limit) {
    gNums = []
    for (var i = 1; i <= limit; i++) {
        gNums.push(i)
    }
}

function renderBoard() {
    var size = Math.sqrt(gNums.length)
    var strHtml = ''
    for (var i = 0; i < size; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < size; j++) {
            var num = randomeNum()
            strHtml += `<td onclick="cellClicked(this, +this.innerText)">${num}</td>`
        }
        strHtml += `</tr>`
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}

function cellClicked(elClickedNum, num) {
    if (!gStartGame) {
        gSecInterval = setInterval(displayTime, 10)
        gStartGame = true
    }
    if (num === gNextNum) {
        elClickedNum.classList.add('td-clicked')
        document.querySelector(".next-num").innerText = gNextNum
        if (gNextNum === gBoardSize) {
            clearInterval(gSecInterval)
            gStartGame = false
        } else {
            gNextNum++
        }
    } else {
        console.log('try again')
    }
}

function displayTime() {
    millisecond++
    if (millisecond / 100 === 1) {
        millisecond = 0
        seconds++
    }
    if (millisecond < 10) {
        newMillisecond = "0" + millisecond.toString()
    }
    else { newMillisecond = millisecond }
    if (seconds < 10) {
        newSeconds = "0" + seconds.toString()
    }
    else { newSeconds = seconds }
    if (minutes < 10) {
        newMinutes = "0" + minutes.toString()
    }
    else { newMinutes = minutes }
    if (seconds / 60 === 1) {
        seconds = 0
        minutes++
    }
    document.querySelector(".stopwatch").innerHTML = newMinutes + ":" + newSeconds + ":" + newMillisecond;
}

function pauseTime() {
    gStartGame = false
    millisecond = 0
    seconds = 0
    minutes = 0
    newMillisecond = 0
    newSeconds = 0
    newMinutes = 0
    clearInterval(gSecInterval)
    document.querySelector(".stopwatch").innerText = "00:00:00"
}

function randomeNum() {
    var randIdx = getRandomIntInclusive(0, gNums.length - 1)
    var randNum = gNums.splice(randIdx, 1)
    return randNum
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


gTimeInterval = setInterval(displayTime, 1000)
clearInterval(gTimeInterval)
