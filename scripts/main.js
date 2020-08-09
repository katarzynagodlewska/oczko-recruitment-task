var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var buttonPlay = document.querySelector(".button-play");
var buttonDraw = document.querySelector(".button-draw");
var startGameForGroup = document.querySelector(".button-start-play-group");
var buttonPlayGroup = document.querySelector(".button-play-group");
var buttonBacks = document.querySelectorAll(".button-back");
var buttonSubmit = document.querySelector(".button-submit");
var buttonStop = document.querySelector(".button-stop");
var buttonEndTurn = document.querySelector(".button-end-turn");
var buttonPlayWithBot = document.querySelector(".button-play-bot");
var form = document.querySelector(".username-form");
var formContainerBot = document.querySelector(".form-bot");
var deck;
var currentPlayer;
var userCounter = 0;
var players = new Array(0);
buttonPlayWithBot.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        setHidden(".start-container", true);
        setHidden(".form-container-bot", false);
        return [2 /*return*/];
    });
}); });
form.onsubmit = function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var userNames = formData.getAll("textInput");
    var lastUserName = userNames[userNames.length - 1];
    console.log(lastUserName);
    if (lastUserName.toString() == "") {
        alert("username should be set");
        return;
    }
    var newElement = document.createElement("input");
    newElement.setAttribute("type", "input");
    newElement.className = "input-name";
    newElement.name = "textInput";
    form.insertBefore(newElement, buttonSubmit);
};
formContainerBot.onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, botQuantity, realPlayer, i, newBot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(formContainerBot);
                botQuantity = parseInt(formData.get("input-quantity"));
                setHidden(".form-container-bot", true);
                return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1")];
            case 1:
                deck = _a.sent();
                realPlayer = new player("realPlayer", 0, false);
                players.push(realPlayer);
                for (i = 1; i < botQuantity + 1; i++) {
                    newBot = new player("bot" + i, i, true);
                    players.push(newBot);
                }
                buttonDraw.disabled = false;
                buttonEndTurn.hidden = true;
                setHidden(".start-container", true);
                setHidden(".game-container", false);
                setHidden(".form-container", true);
                setHidden(".message-container", true);
                currentPlayer = players[0];
                initializeGameContainerForUser(currentPlayer);
                // buttonDraw.removeEventListener("click", e, false);
                buttonDraw.addEventListener("click", methodToGetCardForGroupGame);
                buttonEndTurn.addEventListener("click", endTurnForPlayWithBots);
                return [2 /*return*/];
        }
    });
}); };
startGameForGroup.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, userNames, i, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1")];
            case 1:
                deck = _a.sent();
                formData = new FormData(form);
                userNames = formData.getAll("textInput").filter(function (userName) {
                    return userName != "";
                });
                clearUsernamesForm();
                for (i = 0; i < userNames.length; i++) {
                    newUser = new player(userNames[i], i, false);
                    players.push(newUser);
                }
                buttonDraw.disabled = false;
                buttonEndTurn.hidden = true;
                setHidden(".start-container", true);
                setHidden(".game-container", false);
                setHidden(".form-container", true);
                setHidden(".message-container", true);
                currentPlayer = players[0];
                initializeGameContainerForUser(currentPlayer);
                buttonDraw.addEventListener("click", methodToGetCardForGroupGame);
                buttonEndTurn.addEventListener("click", endTurnForGroupPlayer);
                return [2 /*return*/];
        }
    });
}); });
function initializeGameContainerForUser(player) {
    document.querySelector(".score-number").innerHTML = player.score.toString();
    document.querySelector(".username__field").innerHTML = player.name;
    displayUserCard(player);
}
buttonPlay.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1")];
            case 1:
                deck = _a.sent();
                currentPlayer = new player("test", 0, false);
                initializeGameContainerForUser(currentPlayer);
                setHidden(".message-container", true);
                setHidden(".start-container", true);
                setHidden(".game-container", false);
                setHidden(".username", true);
                buttonDraw.disabled = false;
                buttonStop.hidden = true;
                buttonEndTurn.hidden = true;
                buttonDraw.addEventListener("click", methodToGetCardForSingleGame);
                return [2 /*return*/];
        }
    });
}); });
function methodToGetCardForSingleGame() {
    return __awaiter(this, void 0, void 0, function () {
        var howManyCardsUserShouldGet, drawCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buttonDraw.disabled = true;
                    howManyCardsUserShouldGet = currentPlayer.cardList.length == 0 ? 2 : 1;
                    return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=" + howManyCardsUserShouldGet)];
                case 1:
                    drawCard = _a.sent();
                    if (currentPlayer.cardList == null) {
                        currentPlayer.cardList = new Array(0);
                    }
                    drawCard.cards.forEach(function (element) {
                        element.points = getCardPointsForGame(element.value);
                        currentPlayer.cardList.push(element);
                    });
                    currentPlayer.score = currentPlayer.cardList
                        .map(function (a) { return a.points; })
                        .reduce(function (a, b) {
                        return a + b;
                    });
                    initializeGameContainerForUser(currentPlayer);
                    if (currentPlayer.score == 21) {
                        finishGame("You won");
                        return [2 /*return*/];
                    }
                    else if (currentPlayer.score > 21) {
                        if (currentPlayer.cardList.filter(function (card) {
                            return card.value == "ACE";
                        }).length == 2) {
                            finishGame("You won");
                            currentPlayer.score = 21;
                            return [2 /*return*/];
                        }
                        else {
                            finishGame("You lose");
                            return [2 /*return*/];
                        }
                    }
                    buttonDraw.disabled = false;
                    return [2 /*return*/];
            }
        });
    });
}
function methodToGetCardForGroupGame() {
    return __awaiter(this, void 0, void 0, function () {
        var howManyCardsUserShouldGet, drawCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buttonDraw.disabled = true;
                    howManyCardsUserShouldGet = currentPlayer.cardList.length == 0 ? 2 : 1;
                    return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=" + howManyCardsUserShouldGet)];
                case 1:
                    drawCard = _a.sent();
                    if (currentPlayer.cardList == null) {
                        currentPlayer.cardList = new Array(0);
                    }
                    drawCard.cards.forEach(function (element) {
                        element.points = getCardPointsForGame(element.value);
                        currentPlayer.cardList.push(element);
                    });
                    currentPlayer.score = currentPlayer.cardList
                        .map(function (a) { return a.points; })
                        .reduce(function (a, b) {
                        return a + b;
                    });
                    initializeGameContainerForUser(currentPlayer);
                    setHidden(".message-container", true);
                    setHidden(".start-container", true);
                    setHidden(".game-container", false);
                    buttonDraw.disabled = true;
                    buttonStop.hidden = true;
                    buttonEndTurn.hidden = false;
                    if (currentPlayer.score == 21) {
                        finishGameForGroup("You won");
                        currentPlayer.userState = userStates.won;
                    }
                    else if (currentPlayer.score > 21) {
                        if (currentPlayer.cardList.filter(function (card) {
                            return card.value == "ACE";
                        }).length == 2) {
                            finishGameForGroup("You won");
                            currentPlayer.score = 21;
                            currentPlayer.userState = userStates.won;
                        }
                        finishGameForGroup("You lose");
                        currentPlayer.userState = userStates.lose;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
buttonStop.addEventListener("click", function (e) {
    currentPlayer.userState = userStates.waiting;
    buttonDraw.disabled = true;
    buttonStop.hidden = true;
    buttonEndTurn.hidden = false;
});
function endTurnForPlayWithBots() {
    return __awaiter(this, void 0, void 0, function () {
        var currentPlayerId, i, currentBot, howManyCardsUserShouldGet, drawCard, _loop_1, i, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(currentPlayer.userState == userStates.won)) return [3 /*break*/, 1];
                    showResults();
                    return [3 /*break*/, 13];
                case 1:
                    if (!(currentPlayer.userState == userStates.waiting ||
                        currentPlayer.userState == userStates.lose)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    if (!players.some(function (player) {
                        return (player.userState == userStates.waiting ||
                            player.userState == userStates.lose);
                    })) return [3 /*break*/, 7];
                    currentPlayerId = 1;
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i < players.length)) return [3 /*break*/, 6];
                    if (i == players.length - 1) {
                        i = 1;
                    }
                    currentBot = players[i];
                    howManyCardsUserShouldGet = currentBot.cardList.length == 0 ? 2 : 1;
                    return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=" + howManyCardsUserShouldGet)];
                case 4:
                    drawCard = _a.sent();
                    if (currentBot.cardList == null) {
                        currentBot.cardList = new Array(0);
                    }
                    drawCard.cards.forEach(function (element) {
                        element.points = getCardPointsForGame(element.value);
                        currentBot.cardList.push(element);
                    });
                    currentBot.score = currentBot.cardList
                        .map(function (a) { return a.points; })
                        .reduce(function (a, b) {
                        return a + b;
                    });
                    if (currentBot.score == 20) {
                        console.log("bot is waiting");
                        currentBot.userState = userStates.waiting;
                        return [3 /*break*/, 5];
                    }
                    if (currentBot.score == 21) {
                        currentBot.userState = userStates.won;
                        console.log(currentBot);
                        console.log("bot won");
                        showResults();
                        return [2 /*return*/];
                    }
                    else if (currentBot.score > 21) {
                        if (currentBot.cardList.filter(function (card) {
                            return card.value == "ACE";
                        }).length == 2) {
                            console.log(currentBot);
                            console.log("bot won by ace");
                            currentBot.score = 21;
                            currentBot.userState = userStates.won;
                            showResults();
                            return [2 /*return*/];
                        }
                        else {
                            currentBot.userState = userStates.lose;
                            console.log("bot lose");
                        }
                    }
                    console.log(currentBot);
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 13];
                case 8:
                    _loop_1 = function (i) {
                        var currentBot_1, howManyCardsUserShouldGet, drawCard;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    currentBot_1 = players[i];
                                    if (currentBot_1.userState == userStates.waiting ||
                                        currentBot_1.userState == userStates.lose) {
                                        return [2 /*return*/, "continue"];
                                    }
                                    howManyCardsUserShouldGet = currentBot_1.cardList.length == 0 ? 2 : 1;
                                    return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=" + howManyCardsUserShouldGet)];
                                case 1:
                                    drawCard = _a.sent();
                                    if (currentBot_1.cardList == null) {
                                        currentBot_1.cardList = new Array(0);
                                    }
                                    drawCard.cards.forEach(function (element) {
                                        element.points = getCardPointsForGame(element.value);
                                        currentBot_1.cardList.push(element);
                                    });
                                    currentBot_1.score = currentBot_1.cardList
                                        .map(function (a) { return a.points; })
                                        .reduce(function (a, b) {
                                        return a + b;
                                    });
                                    if (currentBot_1.score == 20) {
                                        console.log("bot is waiting");
                                        currentBot_1.userState = userStates.waiting;
                                        return [2 /*return*/, "continue"];
                                    }
                                    if (currentBot_1.score == 21) {
                                        currentBot_1.userState = userStates.won;
                                        console.log(currentBot_1);
                                        console.log("bot won");
                                        showResults();
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    else if (currentBot_1.score > 21) {
                                        if (currentBot_1.cardList.filter(function (card) {
                                            return card.value == "ACE";
                                        }).length == 2) {
                                            console.log(currentBot_1);
                                            console.log("bot won by ace");
                                            currentBot_1.score = 21;
                                            currentBot_1.userState = userStates.won;
                                            showResults();
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        else {
                                            currentBot_1.userState = userStates.lose;
                                            console.log("bot lose");
                                            return [2 /*return*/, "continue"];
                                        }
                                    }
                                    console.log(currentBot_1);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 1;
                    _a.label = 9;
                case 9:
                    if (!(i < players.length)) return [3 /*break*/, 12];
                    return [5 /*yield**/, _loop_1(i)];
                case 10:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12:
                    //    initializeGameContainerForUser(currentPlayer);
                    buttonDraw.disabled = false;
                    buttonStop.hidden = false;
                    buttonEndTurn.hidden = true;
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
}
function endTurnForGroupPlayer() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUserId, i, player_1, i, player_2;
        return __generator(this, function (_a) {
            setHidden(".message-container", true);
            if (currentPlayer.userState == userStates.won) {
                showResults();
            }
            else {
                currentUserId = currentPlayer.id;
                currentPlayer = null;
                for (i = currentUserId + 1; i < players.length; i++) {
                    player_1 = players[i];
                    if (player_1.userState == userStates.active) {
                        currentPlayer = player_1;
                        break;
                    }
                }
                if (currentPlayer == null) {
                    for (i = 0; i < players.length; i++) {
                        player_2 = players[i];
                        if (player_2.userState == userStates.active) {
                            currentPlayer = player_2;
                            break;
                        }
                    }
                }
                if (currentPlayer == null) {
                    showResults();
                }
                else {
                    initializeGameContainerForUser(currentPlayer);
                    buttonDraw.disabled = false;
                    buttonStop.hidden = false;
                    buttonEndTurn.hidden = true;
                }
            }
            return [2 /*return*/];
        });
    });
}
function showResults() {
    setHidden(".results-container", false);
    setHidden(".game-container", true);
    if (players.some(function (player) { return player.userState == userStates.won; })) {
        players.forEach(function (element) {
            if (element.userState != userStates.won) {
                element.userState = userStates.lose;
            }
        });
    }
    if (players.some(function (player) { return player.userState == userStates.waiting; })) {
        var wonUser = players
            .filter(function (player) { return player.userState == userStates.waiting; })
            .sort(function (a, b) { return b.score - a.score; })[0];
        wonUser.userState = userStates.won;
        players.forEach(function (element) {
            if (element.userState != userStates.won) {
                element.userState = userStates.lose;
            }
        });
    }
    console.log(players);
    players = players.sort(function (a, b) {
        return a.userState > b.userState ? -1 : 1;
    });
    console.log(players);
    for (var i = 0; i < players.length; i++) {
        var newElement = document.createElement("span");
        newElement.className = "player-result";
        newElement.innerHTML = "  " + players[i].name + " || " + players[i].score + " || " + players[i].userState + "  ";
        document.querySelector(".results-container").appendChild(newElement);
    }
}
buttonPlayGroup.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        setHidden(".start-container", true);
        setHidden(".form-container", false);
        setHidden(".username", false);
        return [2 /*return*/];
    });
}); });
buttonBacks.forEach(function (buttonBack) {
    buttonBack.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            currentPlayer = null;
            deck = null;
            players = new Array();
            setHidden(".form-container", true);
            setHidden(".start-container", false);
            setHidden(".game-container", true);
            setHidden(".results-container", true);
            setHidden(".form-container-bot", true);
            removeElements(document.querySelectorAll(".card-img"));
            removeElements(document.querySelectorAll(".player-result"));
            clearUsernamesForm();
            return [2 /*return*/];
        });
    }); });
});
function clearUsernamesForm() {
    removeElements(form.querySelectorAll(".input-name"));
    var newElement = document.createElement("input");
    newElement.setAttribute("type", "input");
    newElement.className = "input-name";
    newElement.name = "textInput";
    form.insertBefore(newElement, buttonSubmit);
}
function setHidden(name, hidden) {
    if (hidden) {
        document.querySelector(name).style.display = "none";
    }
    else {
        document.querySelector(name).removeAttribute("style");
    }
    //  (document.querySelector(name) as HTMLScriptElement).hidden = hidden;
}
function removeElements(elements) {
    elements.forEach(function (el) { return el.remove(); });
}
function displayUserCard(player) {
    return __awaiter(this, void 0, void 0, function () {
        var i, newImgElement;
        return __generator(this, function (_a) {
            removeElements(document.querySelectorAll(".card-img"));
            for (i = 0; i < player.cardList.length; i++) {
                newImgElement = document.createElement("img");
                newImgElement.src = player.cardList[i].image;
                newImgElement.className = "card-img";
                document.getElementById("card-list").appendChild(newImgElement);
                if (i == player.cardList.length - 1) {
                    //dodaj animacje
                }
            }
            return [2 /*return*/];
        });
    });
}
function finishGame(message) {
    currentPlayer = null;
    deck = null;
    setHidden(".message-container", false);
    document.querySelector(".message").innerHTML = message;
    buttonDraw.disabled = true;
}
function finishGameForGroup(message) {
    setHidden(".message-container", false);
    document.querySelector(".message").innerHTML = message;
    buttonDraw.disabled = true;
}
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function getCardPointsForGame(value) {
    var points = 0;
    switch (value) {
        case "ACE": {
            points = 11;
            break;
        }
        case "KING": {
            points = 4;
            break;
        }
        case "QUEEN": {
            points = 3;
            break;
        }
        case "JACK": {
            points = 2;
            break;
        }
        default: {
            points = +value;
            break;
        }
    }
    return points;
}
var player = /** @class */ (function () {
    function player(name, id, isBot) {
        this.id = id;
        this.name = name;
        this.score = 0;
        this.cardList = new Array(0);
        this.userState = userStates.active;
        this.isBot = isBot;
    }
    return player;
}());
var userStates;
(function (userStates) {
    userStates[userStates["active"] = 1] = "active";
    userStates[userStates["waiting"] = 2] = "waiting";
    userStates[userStates["lose"] = 3] = "lose";
    userStates[userStates["won"] = 4] = "won";
})(userStates || (userStates = {}));
//TOdo ogarnac kod, readme, dwa asy = score 21, UI
//# sourceMappingURL=main.js.map