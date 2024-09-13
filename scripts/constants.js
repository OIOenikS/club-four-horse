const templateStageCard = document.querySelector('#stage-card-template').content;
const templateMemberCard = document.querySelector('#member-card-template').content;

const stages = document.querySelector('.stages');
const stagesCarousel = stages.querySelector('.stages__carousel');
const stagesDotsNavigation = stages.querySelector('.dots-navigation');
const stagesList = stages.querySelector('.stages__list');
const stagesButtonLeft = stages.querySelector('.stages__button-left');
const stagesButtonRight = stages.querySelector('.stages__button-right');

const members = document.querySelector('.members');
const membersList = members.querySelector('.members__list');
const membersButtonLeft = members.querySelector('.members__button-left');
const membersButtonRight = members.querySelector('.members__button-right');
const currentMembers = members.querySelector('.members__counter__current');
const totalMembers = members.querySelector('.members__counter__total');


export {
  templateStageCard,
  templateMemberCard,
  stagesCarousel,
  stagesDotsNavigation,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight,
  membersList,
  membersButtonLeft,
  membersButtonRight,
  currentMembers,
  totalMembers
}