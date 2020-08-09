const buttonPlay = document.querySelector(".button-play");
const buttonDraw = document.querySelector(".button-draw");
const startGameForGroup = document.querySelector(".button-start-play-group");
const buttonPlayGroup = document.querySelector(".button-play-group");
const buttonBacks = document.querySelectorAll(".button-back");
const buttonSubmit = document.querySelector(".button-submit");
const buttonStop = document.querySelector(".button-stop");
const buttonEndTurn = document.querySelector(".button-end-turn");
const buttonPlayWithBot = document.querySelector(".button-play-bot");
//import * as models from "./models";
// type deckType = models.Models.deck;
// const userStates = models.Models.userStates;
// type drawCardType = models.Models.drawCard;
// type imagesType = models.Models.images;
// type cardType = models.Models.card;
// type userStates = models.Models.userStates;
// // var playerType = require("./classes");

// // import player from "./classes";

const form: HTMLFormElement = document.querySelector(".username-form");
const formContainerBot: HTMLFormElement = document.querySelector(".form-bot");
let deck: deck;
let currentPlayer: player;
let players: Array<player> = new Array<player>(0);

buttonPlayWithBot.addEventListener("click", async (e) => {
  setHidden(".start-container", true);
  setHidden(".form-container-bot", false);
});

form.onsubmit = (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let userNames = formData.getAll("textInput");
  var lastUserName = userNames[userNames.length - 1];

  if (lastUserName.toString() == "") {
    alert("username should be set");
    return;
  }
  //newElement.disabled = true;

  if (formData.getAll("textInput").length == 4) {
    setHidden(".button-submit", true);
    return;
  }

  var newElement = document.createElement("input");
  newElement.setAttribute("type", "input");
  newElement.className = "input-name";
  newElement.name = "textInput";

  form.insertBefore(newElement, buttonSubmit);
};

startGameForGroup.addEventListener("click", async (e) => {
  let formData1 = new FormData(form);
  let userNamesList = formData1.getAll("textInput");

  if (
    userNamesList.filter((username) => {
      return username != "";
    }).length == 0
  ) {
    alert("Users should be created");
    return;
  }

  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1"
  );

  const formData = new FormData(form);
  const userNames = formData.getAll("textInput").filter((userName) => {
    return userName != "";
  });

  clearUsernamesForm();

  for (var i = 0; i < userNames.length; i++) {
    const newUser = new player(userNames[i] as string, i, false);
    players.push(newUser);
  }
  (buttonDraw as HTMLInputElement).disabled = false;
  (buttonEndTurn as HTMLInputElement).hidden = true;

  setHidden(".start-container", true);
  setHidden(".game-container", false);
  setHidden(".form-container", true);
  setHidden(".message-container", true);
  currentPlayer = players[0];

  initializeGameContainerForUser(currentPlayer);

  buttonDraw.addEventListener("click", methodToGetCardForGroupGame);
  buttonEndTurn.addEventListener("click", endTurnForGroupPlayer);
});

formContainerBot.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formContainerBot);
  const botQuantity: number = parseInt(
    formData.get("input-quantity") as string
  );

  setHidden(".form-container-bot", true);
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1"
  );

  var realPlayer = new player("You", 0, false);
  players.push(realPlayer);
  for (var i = 1; i < botQuantity + 1; i++) {
    const newBot = new player(`bot${i}` as string, i, true);
    players.push(newBot);
  }
  (buttonDraw as HTMLInputElement).disabled = false;
  (buttonEndTurn as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).disabled = false;

  setHidden(".start-container", true);
  setHidden(".game-container", false);
  setHidden(".form-container", true);
  setHidden(".message-container", true);

  currentPlayer = players[0];

  initializeGameContainerForUser(currentPlayer);

  buttonDraw.addEventListener("click", methodToGetCardForGroupGame);
  buttonEndTurn.addEventListener("click", endTurnForPlayWithBots);
};

function initializeGameContainerForUser(player: player) {
  document.querySelector(".score-number").innerHTML = player.score.toString();

  document.querySelector(".username__field").innerHTML = player.name;

  displayUserCard(player);
}

buttonPlay.addEventListener("click", async (e) => {
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/draw/?deck_count=1"
  );
  currentPlayer = new player("test", 0, false);
  initializeGameContainerForUser(currentPlayer);

  setHidden(".message-container", true);
  setHidden(".start-container", true);
  setHidden(".game-container", false);
  setHidden(".username", true);

  (buttonDraw as HTMLInputElement).disabled = false;
  (buttonStop as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).hidden = true;

  buttonDraw.addEventListener("click", methodToGetCardForSingleGame);
});

async function methodToGetCardForSingleGame() {
  (buttonDraw as HTMLInputElement).disabled = true;

  currentPlayer = await drawCardProcessingForPlayer(currentPlayer);

  initializeGameContainerForUser(currentPlayer);

  if (currentPlayer.score == 21) {
    finishGame("You won");
    return;
  } else if (currentPlayer.score > 21) {
    if (
      currentPlayer.cardList.filter((card) => {
        return card.value == "ACE";
      }).length == 2
    ) {
      finishGame("You won");
      currentPlayer.score = 21;
      return;
    } else {
      finishGame("You lose");
      return;
    }
  }

  (buttonDraw as HTMLInputElement).disabled = false;
}

async function methodToGetCardForGroupGame() {
  (buttonDraw as HTMLInputElement).disabled = true;

  currentPlayer = await drawCardProcessingForPlayer(currentPlayer);

  initializeGameContainerForUser(currentPlayer);
  setHidden(".message-container", true);
  setHidden(".start-container", true);
  setHidden(".game-container", false);

  (buttonDraw as HTMLInputElement).disabled = true;
  (buttonStop as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).hidden = false;

  if (currentPlayer.score == 21) {
    finishGameForGroup("You won");
    currentPlayer.userState = userStates.won;
  } else if (currentPlayer.score > 21) {
    if (
      currentPlayer.cardList.filter((card) => {
        return card.value == "ACE";
      }).length == 2
    ) {
      finishGameForGroup("You won");
      currentPlayer.score = 21;
      currentPlayer.userState = userStates.won;
    }
    finishGameForGroup("You lose");
    currentPlayer.userState = userStates.lose;
  }
}

buttonStop.addEventListener("click", (e) => {
  currentPlayer.userState = userStates.waiting;

  (buttonDraw as HTMLInputElement).disabled = true;
  (buttonStop as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).hidden = false;
});

async function endTurnForPlayWithBots() {
  if (currentPlayer.userState == userStates.won) {
    showResults();
  } else if (
    currentPlayer.userState == userStates.waiting ||
    currentPlayer.userState == userStates.lose
  ) {
    (buttonEndTurn as HTMLInputElement).disabled = true;
    while (
      players.some((player) => {
        return (
          player.userState == userStates.active ||
          player.userState == userStates.won
        );
      })
    ) {
      for (let i = 1; i < players.length; i++) {
        var currentBot = players[i];

        if (
          currentBot.userState == userStates.lose ||
          currentBot.userState == userStates.waiting
        ) {
          continue;
        }

        currentBot = await drawCardProcessingForPlayer(currentBot);

        if (currentBot.score == 20) {
          console.log("bot is waiting");
          currentBot.userState = userStates.waiting;
          continue;
        }

        if (currentBot.score == 21) {
          currentBot.userState = userStates.won;
          showResults();
          return;
        } else if (currentBot.score > 21) {
          if (
            currentBot.cardList.filter((card) => {
              return card.value == "ACE";
            }).length == 2
          ) {
            currentBot.score = 21;
            currentBot.userState = userStates.won;
            showResults();
            return;
          } else {
            currentBot.userState = userStates.lose;
          }
        }
      }
    }

    showResults();
  } else {
    for (let i = 1; i < players.length; i++) {
      let currentBot = players[i];
      if (
        currentBot.userState == userStates.waiting ||
        currentBot.userState == userStates.lose
      ) {
        continue;
      }
      currentBot = await drawCardProcessingForPlayer(currentBot);

      if (currentBot.score == 20) {
        console.log("bot is waiting");
        currentBot.userState = userStates.waiting;
        continue;
      }

      if (currentBot.score == 21) {
        currentBot.userState = userStates.won;
        showResults();
        return;
      } else if (currentBot.score > 21) {
        if (
          currentBot.cardList.filter((card) => {
            return card.value == "ACE";
          }).length == 2
        ) {
          currentBot.score = 21;
          currentBot.userState = userStates.won;
          showResults();
          return;
        } else {
          currentBot.userState = userStates.lose;
          continue;
        }
      }
    }

    (buttonDraw as HTMLInputElement).disabled = false;
    (buttonStop as HTMLInputElement).hidden = false;
    (buttonEndTurn as HTMLInputElement).hidden = true;
  }
}

async function drawCardProcessingForPlayer(player: player): Promise<player> {
  let howManyCardsUserShouldGet = player.cardList.length == 0 ? 2 : 1;
  let drawCard = await fetchData<drawCard>(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${howManyCardsUserShouldGet}`
  );

  if (player.cardList == null) {
    player.cardList = new Array<card>(0);
  }

  drawCard.cards.forEach((element) => {
    element.points = getCardPointsForGame(element.value);
    player.cardList.push(element);
  });

  player.score = player.cardList
    .map((a) => a.points)
    .reduce(function (a, b) {
      return a + b;
    });

  return player;
}

async function endTurnForGroupPlayer() {
  setHidden(".message-container", true);
  if (currentPlayer.userState == userStates.won) {
    showResults();
  } else {
    let currentUserId = currentPlayer.id;
    currentPlayer = null;
    for (let i = currentUserId + 1; i < players.length; i++) {
      let player = players[i];
      if (player.userState == userStates.active) {
        currentPlayer = player;
        break;
      }
    }

    if (currentPlayer == null) {
      for (let i = 0; i < players.length; i++) {
        let player = players[i];
        if (player.userState == userStates.active) {
          currentPlayer = player;
          break;
        }
      }
    }

    if (currentPlayer == null) {
      showResults();
    } else {
      initializeGameContainerForUser(currentPlayer);
      (buttonDraw as HTMLInputElement).disabled = false;
      (buttonStop as HTMLInputElement).hidden = false;
      (buttonEndTurn as HTMLInputElement).hidden = true;
    }
  }
}

function showResults() {
  setHidden(".results-container", false);
  setHidden(".game-container", true);

  if (players.some((player) => player.userState == userStates.won)) {
    players.forEach((element) => {
      if (element.userState != userStates.won) {
        element.userState = userStates.lose;
      }
    });
  }

  if (players.some((player) => player.userState == userStates.waiting)) {
    let wonUser = players
      .filter((player) => player.userState == userStates.waiting)
      .sort((a, b) => b.score - a.score)[0];

    wonUser.userState = userStates.won;
    players.forEach((element) => {
      if (element.userState != userStates.won) {
        element.userState = userStates.lose;
      }
    });
  }

  players = players.sort((a, b) => {
    return a.userState > b.userState ? -1 : 1;
  });

  for (let i = 0; i < players.length; i++) {
    var newElement = document.createElement("span");
    newElement.className = "player-result";
    newElement.innerHTML = `  ${players[i].name} || ${players[i].score} || ${players[i].userState}  `;

    document
      .querySelector(".results-container")
      .insertBefore(
        newElement,
        document
          .querySelector(".results-container")
          .querySelector(".button-back")
      );
  }
}

buttonPlayGroup.addEventListener("click", async (e) => {
  setHidden(".start-container", true);
  setHidden(".form-container", false);
  setHidden(".username", false);
});

buttonBacks.forEach((buttonBack) => {
  buttonBack.addEventListener("click", async (e) => {
    currentPlayer = null;
    deck = null;
    players = new Array<player>();
    setHidden(".form-container", true);
    setHidden(".start-container", false);
    setHidden(".game-container", true);
    setHidden(".results-container", true);
    setHidden(".form-container-bot", true);
    setHidden(".button-submit", false);

    removeElements(document.querySelectorAll(".card-img"));
    removeElements(document.querySelectorAll(".player-result"));

    clearUsernamesForm();

    removedEventListenersFromButtons();
  });
});

function removedEventListenersFromButtons() {
  buttonDraw.removeEventListener("click", methodToGetCardForSingleGame, false);

  buttonDraw.removeEventListener("click", methodToGetCardForGroupGame, false);
  buttonEndTurn.removeEventListener("click", endTurnForGroupPlayer, false);

  buttonEndTurn.removeEventListener("click", endTurnForPlayWithBots, false);
}

function clearUsernamesForm() {
  removeElements(form.querySelectorAll(".input-name"));

  var newElement = document.createElement("input");
  newElement.setAttribute("type", "input");
  newElement.className = "input-name";
  newElement.name = "textInput";

  form.insertBefore(newElement, buttonSubmit);
}

function setHidden(name: string, hidden: boolean) {
  if (hidden) {
    (document.querySelector(name) as HTMLScriptElement).style.display = "none";
  } else {
    (document.querySelector(name) as HTMLScriptElement).removeAttribute(
      "style"
    );
  }
  //  (document.querySelector(name) as HTMLScriptElement).hidden = hidden;
}

function removeElements(elements: NodeListOf<Element>) {
  elements.forEach((el) => el.remove());
}

async function displayUserCard(player: player) {
  removeElements(document.querySelectorAll(".card-img"));

  for (let i = 0; i < player.cardList.length; i++) {
    let newImgElement = document.createElement("img");
    newImgElement.src = player.cardList[i].image;
    newImgElement.className = "card-img";
    document.getElementById("card-list").appendChild(newImgElement);
    if (i == player.cardList.length - 1) {
      //TODO add animations
    }
  }
}

function finishGame(message: string) {
  setHidden(".message-container", false);

  document.querySelector(".message").innerHTML = message;

  (buttonDraw as HTMLInputElement).disabled = true;
}

function finishGameForGroup(message: string) {
  setHidden(".message-container", false);

  document.querySelector(".message").innerHTML = message;

  (buttonDraw as HTMLInputElement).disabled = true;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await (response.json() as Promise<T>);
  return data;
}

function getCardPointsForGame(value: string): number {
  let points: number = 0;
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

class player {
  constructor(name: string, id: number, isBot: boolean) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.cardList = new Array<card>(0);
    this.userState = userStates.active;
    this.isBot = isBot;
  }
  id: number;
  name: string;
  score: number;
  cardList: Array<card>;
  userState: userStates;
  isBot: boolean;
}
interface deck {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface drawCard {
  success: boolean;
  deck_id: string;
  remaining: number;
  cards: Array<card>;
}

interface card {
  code: string;
  image: string;
  images: images;
  suit: string;
  value: string;
  points: number;
}
interface images {
  png: string;
  svg: string;
}

enum userStates {
  active = 1,
  waiting,
  lose,
  won,
}
