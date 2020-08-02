const buttonPlay = document.querySelector(".button-play");
const buttonShuffle = document.querySelector(".button-shuffle");
const buttonNewGame = document.querySelector(".button-new-game");
const startGameForGroup = document.querySelector(".button-start-play-group");
const buttonPlayGroup = document.querySelector(".button-play-group");
const buttonBack = document.querySelector(".button-back");
const buttonSubmit = document.querySelector(".button-sumbit");

const form: HTMLFormElement = document.querySelector(".username-form");

let deck: deck;
let currentUser: user;
let userCounter: number = 0;
let users: Array<user> = new Array<user>(0);

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const getAll = formData.getAll("textInput");
  const lastElement = getAll[getAll.length - 1] as string;

  console.log(getAll);
  console.log(lastElement);

  var newElement = document.createElement("input");
  newElement.setAttribute("type", "input");
  newElement.className = "input-name";
  newElement.name = "textInput";

  form.insertBefore(newElement, buttonSubmit);
};

//TODO play for group
startGameForGroup.addEventListener("click", async (e) => {
  const formData = new FormData(form);
  const userNames = formData.getAll("textInput").filter((userName) => {
    return userName != "";
  });

  for (var i = 0; i < userNames.length; i++) {
    const newUser = new user(userNames[i] as string);
    users.push(newUser);
  }

  document
    .querySelector(".game-container")
    .classList.replace("game-container--hidden", "game-container--show");
  document
    .querySelector(".start-container")
    .classList.replace("start-container--show", "start-container--hidden");
  //TODO
  do {
    // trzeba miec jakis counter current usera
    //jeśli dojdzie do ostatiego to counter sie zeruje
    //4 graczy 0 -> 1 -> 2 -> 3 -> 0-> 1 -> 2
  } while (
    users.some((user) => {
      return user.userState == userStates.won;
    }) ||
    users.filter((user) => {
      return user.userState != userStates.loose;
    }).length == 0
  );
});

buttonPlay.addEventListener("click", async (e) => {
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  currentUser = new user("test");

  document
    .querySelector(".game-container")
    .classList.replace("game-container--hidden", "game-container--show");
  document
    .querySelector(".start-container")
    .classList.replace("start-container--show", "start-container--hidden");
});

buttonPlayGroup.addEventListener("click", async (e) => {
  document
    .querySelector(".start-container")
    .classList.replace("start-container--show", "start-container--hidden");
  document
    .querySelector(".form-container")
    .classList.replace("form-container--hidden", "form-container--show");
});

buttonBack.addEventListener("click", async (e) => {
  document
    .querySelector(".form-container")
    .classList.replace("form-container--show", "form-container--hidden");
  document
    .querySelector(".start-container")
    .classList.replace("start-container--hidden", "start-container--show");

  const removeElements = (elms) => elms.forEach((el) => el.remove());
  removeElements(form.querySelectorAll(".input-name"));

  var newElement = document.createElement("input");
  newElement.setAttribute("type", "input");
  newElement.className = "input-name";
  newElement.name = "textInput";

  form.insertBefore(newElement, buttonSubmit);
});

buttonShuffle.addEventListener("click", async (e) => {
  let drawCard = await fetchData<drawCard>(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  if (currentUser.cardList == null) {
    currentUser.cardList = new Array<card>(0);
  }

  drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
  currentUser.cardList.push(drawCard.cards[0]);

  currentUser.score = currentUser.cardList
    .map((a) => a.points)
    .reduce(function (a, b) {
      return a + b;
    });
  if (currentUser.score == 21) {
    finishGame("You won");
    console.log("Wygrałeś ");
  } else if (currentUser.score > 21) {
    if (
      currentUser.cardList.filter((card) => {
        return card.value == "ACE";
      }).length == 2
    ) {
      finishGame("You won");
    }
    finishGame("You lose");
  }
});

buttonNewGame.addEventListener("click", (e) => {
  document
    .querySelector(".message-container")
    .classList.replace("message-container--show", "message-container--hidden");

  document
    .querySelector(".start-container")
    .classList.replace("start-container--hidden", "start-container--show");
});

function finishGame(message: string) {
  currentUser = null;
  deck = null;
  document
    .querySelector(".game-container")
    .classList.replace("game-container--show", "game-container--hidden");

  document
    .querySelector(".message-container")
    .classList.replace("message-container--hidden", "message-container--show");

  document.querySelector(".message").innerHTML = message;
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

class user {
  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.cardList = new Array<card>(0);
    this.userState = userStates.active;
  }
  name: string;
  score: number;
  cardList: Array<card>;
  userState: userStates;
}

enum userStates {
  active = 1,
  waiting,
  loose,
  won,
}
