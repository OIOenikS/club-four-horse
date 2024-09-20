const templateStageCard = document.querySelector('#stage-card-template').content;
const templateMemberCard = document.querySelector('#member-card-template').content;

const stages = document.querySelector('.stages');
const stagesCarousel = stages.querySelector('.stages__carousel');
const stagesList = stages.querySelector('.stages__list');
const stagesButtonLeft = stages.querySelector('.stages__button-left');
const stagesButtonRight = stages.querySelector('.stages__button-right');

const members = document.querySelector('.members');
const membersButtonLeft = members.querySelector('.members__button-left');
const membersButtonRight = members.querySelector('.members__button-right');
const currentMembers = members.querySelector('.members__counter__current');
const totalMembers = members.querySelector('.members__counter__total');
const membersСarousel = members.querySelector('.carousel-members');
const membersСarouselInner = membersСarousel.querySelector('.carousel-members__inner');


export {
  templateStageCard,
  templateMemberCard,
  stagesCarousel,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight,
  membersСarouselInner,
  membersButtonLeft,
  membersButtonRight,
  currentMembers,
  totalMembers
}