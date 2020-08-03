const buttonPlay = document.querySelector(".button-play");
const buttonShuffle = document.querySelector(".button-shuffle");
const buttonNewGame = document.querySelector(".button-new-game");
const startGameForGroup = document.querySelector(".button-start-play-group");
const buttonPlayGroup = document.querySelector(".button-play-group");
const buttonBacks = document.querySelectorAll(".button-back");
const buttonSubmit = document.querySelector(".button-sumbit");
const buttonStop = document.querySelector(".button-stop");
const buttonEndTurn = document.querySelector(".button-end-turn");

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
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );

  const formData = new FormData(form);
  const userNames = formData.getAll("textInput").filter((userName) => {
    return userName != "";
  });

  clearUsernamesForm();

  for (var i = 0; i < userNames.length; i++) {
    const newUser = new user(userNames[i] as string, i);
    users.push(newUser);
  }
  (buttonShuffle as HTMLInputElement).disabled = false;
  (buttonEndTurn as HTMLInputElement).hidden = true;

  setHidden(".start-container", true);
  setHidden(".game-container", false);
  setHidden(".form-container", true);
  setHidden(".message-container", true);
  currentUser = users[0];

  initializeGameContainerForUser(currentUser);

  buttonShuffle.addEventListener("click", methodToGetCardForGroupGame);

  // //TODO
  // do {
  //   // trzeba miec jakis counter current usera
  //   //jeśli dojdzie do ostatiego to counter sie zeruje
  //   //4 graczy 0 -> 1 -> 2 -> 3 -> 0-> 1 -> 2
  //   users.forEach(user => {

  //   });

  // } while (
  //   users.some((user) => {
  //     return user.userState == userStates.won;
  //   }) ||
  //   users.filter((user) => {
  //     return user.userState != userStates.loose;
  //   }).length == 0
  // );
});
function initializeGameContainerForUser(user: user) {
  document.querySelector(".score-number").innerHTML = user.score.toString();

  document.querySelector(".username-field").innerHTML = user.name;

  displayUserCard(user);
}

buttonPlay.addEventListener("click", async (e) => {
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  currentUser = new user("test", 0);
  initializeGameContainerForUser(currentUser);
  //removeElements(document.querySelectorAll(".card-img"));

  setHidden(".message-container", true);
  setHidden(".start-container", true);
  setHidden(".game-container", false);

  (buttonShuffle as HTMLInputElement).disabled = false;
  (buttonStop as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).hidden = true;

  buttonShuffle.addEventListener("click", methodToGetCardForSingleGame);
});

async function methodToGetCardForSingleGame() {
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

  initializeGameContainerForUser(currentUser);

  if (currentUser.score == 21) {
    finishGame("You won", true);
    console.log("Wygrałeś ");
  } else if (currentUser.score > 21) {
    if (
      currentUser.cardList.filter((card) => {
        return card.value == "ACE";
      }).length == 2
    ) {
      finishGame("You won", true);
    }
    finishGame("You lose", true);
  }
}

async function methodToGetCardForGroupGame() {
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

  initializeGameContainerForUser(currentUser);
  setHidden(".message-container", true);
  setHidden(".start-container", true);
  setHidden(".game-container", false);

  (buttonShuffle as HTMLInputElement).disabled = true;
  (buttonStop as HTMLInputElement).hidden = true;
  (buttonEndTurn as HTMLInputElement).hidden = false;

  if (currentUser.score == 21) {
    finishGame("You won", true);
    console.log("Wygrałeś ");
  } else if (currentUser.score > 21) {
    if (
      currentUser.cardList.filter((card) => {
        return card.value == "ACE";
      }).length == 2
    ) {
      finishGame("You won", true);
    }
    finishGame("You lose", false);
  }
}

buttonEndTurn.addEventListener("click", async (e) => {
  console.log("end turn");
});

buttonPlayGroup.addEventListener("click", async (e) => {
  setHidden(".start-container", true);
  setHidden(".form-container", false);
});

buttonBacks.forEach((buttonBack) => {
  currentUser = null;
  deck = null;

  buttonBack.addEventListener("click", async (e) => {
    setHidden(".form-container", true);
    setHidden(".start-container", false);
    setHidden(".game-container", true);

    removeElements(document.querySelectorAll(".card-img"));
    clearUsernamesForm();
  });
});

function clearUsernamesForm() {
  removeElements(form.querySelectorAll(".input-name"));

  var newElement = document.createElement("input");
  newElement.setAttribute("type", "input");
  newElement.className = "input-name";
  newElement.name = "textInput";

  form.insertBefore(newElement, buttonSubmit);
}

function setHidden(name: string, hidden: boolean) {
  (document.querySelector(name) as HTMLScriptElement).hidden = hidden;
}

function removeElements(elements: NodeListOf<Element>) {
  elements.forEach((el) => el.remove());
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

async function displayUserCard(user: user) {
  removeElements(document.querySelectorAll(".card-img"));

  for (let i = 0; i < user.cardList.length; i++) {
    let newImgElement = document.createElement("img");
    newImgElement.src = user.cardList[i].image;
    newImgElement.className = "card-img";
    document.getElementById("card-list").appendChild(newImgElement);
  }
}

buttonNewGame.addEventListener("click", (e) => {
  setHidden(".start-container", false);
  setHidden(".game-container", true);
});

function finishGame(message: string, shouldClearDeck: boolean) {
  currentUser = null;
  if (shouldClearDeck) {
    deck = null;
  }
  setHidden(".message-container", false);

  document.querySelector(".message").innerHTML = message;

  (buttonShuffle as HTMLInputElement).disabled = true;
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
  constructor(name: string, id: number) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.cardList = new Array<card>(0);
    this.userState = userStates.active;
  }
  id: number;
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
