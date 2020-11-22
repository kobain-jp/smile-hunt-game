
const startScreenElement = document.getElementById("start-screen");
const gameScreenElement = document.getElementById("game-screen");

const targetElements = document.querySelectorAll(".game-target");
const scoreElement = document.querySelector(".counter");
const timeElement = document.querySelector(".time");
const retryElement = document.querySelector(".retry-link");

const timelimit = 30
let time = 30;
let smileCount = 0;
const clearCount = 15;

// controller
function storoke(e) {

    const targetElement = e.target;

    if (targetElement.classList.contains("game-smile")) {
        return;
    }

    targetElement.classList.add("game-smile");

    smileCount++;
    renderSmileCount();

    setTimeout(() => {

        if (time !== 0) {
            targetElement.classList.add("hide");
        }

    }, 1000);

}

function renderSmileCount() {
    scoreElement.innerHTML = smileCount;
}


function show() {

    const targetElement = document.getElementById(getRandomInt(0, targetElements.length));

    if (!targetElement.classList.contains("hide")) {
        return;
    }

    targetElement.classList.remove("hide");
    targetElement.classList.remove("game-smile");

    setTimeout(() => {
        if (!targetElement.classList.contains("game-smile") && time !== 0) {
            targetElement.classList.add("hide");
        }
    }, time * 35);

}

function hide(e) {
    e.target.classList.add("hide");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function start() {

    startScreenElement.classList.add("hide");
    gameScreenElement.classList.remove("hide");

    document.removeEventListener("click", start);

    const showIntervalId = setInterval(show, 1000);
    const timerIntervalId = setInterval(function () {

        time--;
        timeElement.innerHTML = time;

        if (time === 0) {
            clearInterval(showIntervalId);
            clearInterval(timerIntervalId);
            showEndScreen();
        }

    }, 1000);
}

function showEndScreen() {

    targetElements.forEach((targetElement) => {
        targetElement.removeEventListener("mouseenter", storoke);
        if (smileCount < clearCount) {
            targetElement.classList.remove("game-smile");
            timeElement.innerHTML = "Result : Angry !!";
            document.body.classList.add("bg-angry");
        } else {
            targetElement.classList.add("game-smile");
            timeElement.innerHTML = "Result : Happy !!";
            document.body.classList.add("bg-happy");
        }
        targetElement.classList.remove("hide");
    });

}


function init() {
    time = timelimit
    document.addEventListener("click", start);
    timeElement.innerHTML = timelimit;

    targetElements.forEach((targetElement) => {
        targetElement.addEventListener("mouseenter", storoke);
    });

    retryElement.addEventListener("click", () => {
        window.location.reload();
    })
}

init();




