import { templateStageCard, templateMemberCard } from "./constants.js";

export function createStageCard (card) {
  const cardElement = templateStageCard.querySelector('.stage-card').cloneNode(true);
  const cardNumber = cardElement.querySelector('.stage-card__number');
  const cardDescribtion = cardElement.querySelector('.stage-card__describtion');

  cardNumber.textContent = card['number-stage'];
  cardDescribtion.textContent = card.describtion;
  
  return cardElement;
}

export function createMemberCard (card) {
  const cardElement = templateMemberCard.querySelector('.member-card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.member-card__title');
  const cardText = cardElement.querySelector('.member-card__text');
  
  cardTitle.textContent = card.name;
  cardText.textContent = card.grade;
  
  return cardElement;
}