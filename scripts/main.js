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
var buttonShuffle = document.querySelector(".button-shuffle");
var buttonNewGame = document.querySelector(".button-new-game");
var startGameForGroup = document.querySelector(".button-start-play-group");
var buttonPlayGroup = document.querySelector(".button-play-group");
var buttonBacks = document.querySelectorAll(".button-back");
var buttonSubmit = document.querySelector(".button-sumbit");
var buttonStop = document.querySelector(".button-stop");
var buttonEndTurn = document.querySelector(".button-end-turn");
var form = document.querySelector(".username-form");
var deck;
var currentUser;
var userCounter = 0;
var users = new Array(0);
form.onsubmit = function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var getAll = formData.getAll("textInput");
    var lastElement = getAll[getAll.length - 1];
    console.log(getAll);
    console.log(lastElement);
    var newElement = document.createElement("input");
    newElement.setAttribute("type", "input");
    newElement.className = "input-name";
    newElement.name = "textInput";
    form.insertBefore(newElement, buttonSubmit);
};
//TODO play for group
startGameForGroup.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, userNames, i, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")];
            case 1:
                deck = _a.sent();
                formData = new FormData(form);
                userNames = formData.getAll("textInput").filter(function (userName) {
                    return userName != "";
                });
                clearUsernamesForm();
                for (i = 0; i < userNames.length; i++) {
                    newUser = new user(userNames[i], i);
                    users.push(newUser);
                }
                buttonShuffle.disabled = false;
                buttonEndTurn.hidden = true;
                setHidden(".start-container", true);
                setHidden(".game-container", false);
                setHidden(".form-container", true);
                setHidden(".message-container", true);
                currentUser = users[0];
                initializeGameContainerForUser(currentUser);
                buttonShuffle.addEventListener("click", methodToGetCardForGroupGame);
                return [2 /*return*/];
        }
    });
}); });
function initializeGameContainerForUser(user) {
    document.querySelector(".score-number").innerHTML = user.score.toString();
    document.querySelector(".username-field").innerHTML = user.name;
    displayUserCard(user);
}
buttonPlay.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")];
            case 1:
                deck = _a.sent();
                currentUser = new user("test", 0);
                initializeGameContainerForUser(currentUser);
                //removeElements(document.querySelectorAll(".card-img"));
                setHidden(".message-container", true);
                setHidden(".start-container", true);
                setHidden(".game-container", false);
                buttonShuffle.disabled = false;
                buttonStop.hidden = true;
                buttonEndTurn.hidden = true;
                buttonShuffle.addEventListener("click", methodToGetCardForSingleGame);
                return [2 /*return*/];
        }
    });
}); });
function methodToGetCardForSingleGame() {
    return __awaiter(this, void 0, void 0, function () {
        var drawCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=1")];
                case 1:
                    drawCard = _a.sent();
                    if (currentUser.cardList == null) {
                        currentUser.cardList = new Array(0);
                    }
                    drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
                    currentUser.cardList.push(drawCard.cards[0]);
                    currentUser.score = currentUser.cardList
                        .map(function (a) { return a.points; })
                        .reduce(function (a, b) {
                        return a + b;
                    });
                    initializeGameContainerForUser(currentUser);
                    if (currentUser.score == 21) {
                        finishGame("You won", true);
                        console.log("Wygrałeś ");
                    }
                    else if (currentUser.score > 21) {
                        if (currentUser.cardList.filter(function (card) {
                            return card.value == "ACE";
                        }).length == 2) {
                            finishGame("You won", true);
                        }
                        finishGame("You lose", true);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function methodToGetCardForGroupGame() {
    return __awaiter(this, void 0, void 0, function () {
        var drawCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=1")];
                case 1:
                    drawCard = _a.sent();
                    if (currentUser.cardList == null) {
                        currentUser.cardList = new Array(0);
                    }
                    drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
                    currentUser.cardList.push(drawCard.cards[0]);
                    currentUser.score = currentUser.cardList
                        .map(function (a) { return a.points; })
                        .reduce(function (a, b) {
                        return a + b;
                    });
                    initializeGameContainerForUser(currentUser);
                    setHidden(".message-container", true);
                    setHidden(".start-container", true);
                    setHidden(".game-container", false);
                    buttonShuffle.disabled = true;
                    buttonStop.hidden = true;
                    buttonEndTurn.hidden = false;
                    if (currentUser.score == 21) {
                        finishGame("You won", true);
                        console.log("Wygrałeś ");
                    }
                    else if (currentUser.score > 21) {
                        if (currentUser.cardList.filter(function (card) {
                            return card.value == "ACE";
                        }).length == 2) {
                            finishGame("You won", true);
                        }
                        finishGame("You lose", false);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
buttonEndTurn.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("end turn");
        return [2 /*return*/];
    });
}); });
buttonPlayGroup.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        setHidden(".start-container", true);
        setHidden(".form-container", false);
        return [2 /*return*/];
    });
}); });
buttonBacks.forEach(function (buttonBack) {
    currentUser = null;
    deck = null;
    buttonBack.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setHidden(".form-container", true);
            setHidden(".start-container", false);
            setHidden(".game-container", true);
            removeElements(document.querySelectorAll(".card-img"));
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
    document.querySelector(name).hidden = hidden;
}
function removeElements(elements) {
    elements.forEach(function (el) { return el.remove(); });
}
// buttonShuffle.addEventListener("click", async (e) => {
//   let drawCard = await fetchData<drawCard>(
//     `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
//   );
//   if (currentUser.cardList == null) {
//     currentUser.cardList = new Array<card>(0);
//   }
//   drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
//   currentUser.cardList.push(drawCard.cards[0]);
//   currentUser.score = currentUser.cardList
//     .map((a) => a.points)
//     .reduce(function (a, b) {
//       return a + b;
//     });
//   initializeGameContainerForUser(currentUser);
//   if (currentUser.score == 21) {
//     finishGame("You won", true);
//     console.log("Wygrałeś ");
//   } else if (currentUser.score > 21) {
//     if (
//       currentUser.cardList.filter((card) => {
//         return card.value == "ACE";
//       }).length == 2
//     ) {
//       finishGame("You won", true);
//     }
//     finishGame("You lose", true);
//   }
// });
function displayUserCard(user) {
    return __awaiter(this, void 0, void 0, function () {
        var i, newImgElement;
        return __generator(this, function (_a) {
            removeElements(document.querySelectorAll(".card-img"));
            for (i = 0; i < user.cardList.length; i++) {
                newImgElement = document.createElement("img");
                newImgElement.src = user.cardList[i].image;
                newImgElement.className = "card-img";
                document.getElementById("card-list").appendChild(newImgElement);
            }
            return [2 /*return*/];
        });
    });
}
buttonNewGame.addEventListener("click", function (e) {
    setHidden(".start-container", false);
    setHidden(".game-container", true);
});
function finishGame(message, shouldClearDeck) {
    currentUser = null;
    if (shouldClearDeck) {
        deck = null;
    }
    setHidden(".message-container", false);
    document.querySelector(".message").innerHTML = message;
    buttonShuffle.disabled = true;
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
var user = /** @class */ (function () {
    function user(name, id) {
        this.id = id;
        this.name = name;
        this.score = 0;
        this.cardList = new Array(0);
        this.userState = userStates.active;
    }
    return user;
}());
var userStates;
(function (userStates) {
    userStates[userStates["active"] = 1] = "active";
    userStates[userStates["waiting"] = 2] = "waiting";
    userStates[userStates["loose"] = 3] = "loose";
    userStates[userStates["won"] = 4] = "won";
})(userStates || (userStates = {}));
//# sourceMappingURL=main.js.map