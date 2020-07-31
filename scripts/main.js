var buttonPlay = document.querySelector(".button-play");
buttonPlay.addEventListener("click", function (e) {
    document
        .querySelector(".game-container")
        .classList.replace("game-container--hidden", "game-container--show");
    document
        .querySelector(".start-container")
        .classList.replace("start-container--show", "start-container--hidden");
});
//# sourceMappingURL=main.js.map