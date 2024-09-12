import { templateStageCard } from "./constants.js";

export function createStageCard (card) {
  const cardElement = templateStageCard.querySelector('.stage-card').cloneNode(true);
  const cardNumber = cardElement.querySelector('.stage-card__number');
  const cardDescribtion = cardElement.querySelector('.stage-card__describtion');

  cardNumber.textContent = card['number-stage'];
  cardDescribtion.textContent = card.describtion;
  
  return cardElement;
}
