const buttonPlay = document.querySelector(".button-play");
const buttonShuffle = document.querySelector(".button-shuffle");
let deck: deck;
let user1: user;
buttonPlay.addEventListener("click", async (e) => {
  deck = await fetchData<deck>(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  user1 = new user();

  document
    .querySelector(".game-container")
    .classList.replace("game-container--hidden", "game-container--show");
  document
    .querySelector(".start-container")
    .classList.replace("start-container--show", "start-container--hidden");
});

buttonShuffle.addEventListener("click", async (e) => {
  let drawCard = await fetchData<drawCard>(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  if (user1.cardList == null) {
    user1.cardList = new Array<card>(0);
  }

  drawCard.cards[0].points = getCardPointsForGame(drawCard.cards[0].value);
  user1.cardList.push(drawCard.cards[0]);

  user1.score = user1.cardList
    .map((a) => a.points)
    .reduce(function (a, b) {
      return a + b;
    });
  if (user1.score == 21) {
  } else if (user1.score > 21) {
  }
  console.log(user1.score);
});

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
  name: string;
  score: number;
  cardList: Array<card>;
}
