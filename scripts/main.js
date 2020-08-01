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
var deck;
var user1;
buttonPlay.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")];
            case 1:
                deck = _a.sent();
                user1 = new user();
                document
                    .querySelector(".game-container")
                    .classList.replace("game-container--hidden", "game-container--show");
                document
                    .querySelector(".start-container")
                    .classList.replace("start-container--show", "start-container--hidden");
                return [2 /*return*/];
        }
    });
}); });
buttonShuffle.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var drawCard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=1")];
            case 1:
                drawCard = _a.sent();
                if (user1.cardList == null) {
                    user1.cardList = new Array(0);
                }
                drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
                user1.cardList.push(drawCard.cards[0]);
                user1.score = user1.cardList
                    .map(function (a) { return a.points; })
                    .reduce(function (a, b) {
                    return a + b;
                });
                if (user1.score == 21) {
                    finishGame("You won");
                    console.log("Wygrałeś ");
                }
                else if (user1.score > 21) {
                    if (user1.cardList.filter(function (card) {
                        return card.value == "ACE";
                    }).length == 2) {
                        finishGame("You won");
                    }
                    finishGame("You lose");
                }
                return [2 /*return*/];
        }
    });
}); });
buttonNewGame.addEventListener("click", function (e) {
    document
        .querySelector(".message-container")
        .classList.replace("message-container--show", "message-container--hidden");
    document
        .querySelector(".start-container")
        .classList.replace("start-container--hidden", "start-container--show");
});
function finishGame(message) {
    user1 = null;
    deck = null;
    document
        .querySelector(".game-container")
        .classList.replace("game-container--show", "game-container--hidden");
    document
        .querySelector(".message-container")
        .classList.replace("message-container--hidden", "message-container--show");
    document.querySelector(".message").innerHTML = message;
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
    function user() {
    }
    return user;
}());
//# sourceMappingURL=main.js.map