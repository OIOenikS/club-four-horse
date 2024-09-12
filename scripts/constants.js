const templateStageCard = document.querySelector('#stage-card-template').content;

const stages = document.querySelector('.stages');
const stagesCarousel = stages.querySelector('.stages__carousel');
const stagesList = stages.querySelector('.stages__list');
const stagesButtonLeft = stages.querySelector('.stages__button-left');
const stagesButtonRight = stages.querySelector('.stages__button-right');


export {
  templateStageCard,

  stagesCarousel,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight,
}