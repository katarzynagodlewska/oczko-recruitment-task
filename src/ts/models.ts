// export namespace Models {
//   class player {
//     constructor(name: string, id: number, isBot: boolean) {
//       this.id = id;
//       this.name = name;
//       this.score = 0;
//       this.cardList = new Array<card>(0);
//       this.userState = userStates.active;
//       this.isBot = isBot;
//     }
//     id: number;
//     name: string;
//     score: number;
//     cardList: Array<card>;
//     userState: userStates;
//     isBot: boolean;
//   }
//   export interface deck {
//     success: boolean;
//     deck_id: string;
//     shuffled: boolean;
//     remaining: number;
//   }

//   export interface drawCard {
//     success: boolean;
//     deck_id: string;
//     remaining: number;
//     cards: Array<card>;
//   }

//   export interface card {
//     code: string;
//     image: string;
//     images: images;
//     suit: string;
//     value: string;
//     points: number;
//   }

//   export interface images {
//     png: string;
//     svg: string;
//   }

//   export enum userStates {
//     active = 1,
//     waiting,
//     lose,
//     won,
//   }
// }
