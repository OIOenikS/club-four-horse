import { stagesCards, membersCards  } from "./data.js";
import { createStageCard, createMemberCard } from "./cards.js";
import { defineWindowWidth, selectDivider } from "./utils.js";
import { 
  stagesCarousel,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight,
  membersСarouselInner,
  membersButtonLeft,
  membersButtonRight,
  currentMembers,
  totalMembers
} from "./constants.js";

stagesCards.forEach((card) => {
  stagesList.append(createStageCard(card));
})

let slideStagesIndex = 0;
const transition = true;
const dots = Array.from(document.querySelectorAll('.dot'));

const defineStagesCarouselWidth = () => {
  return stagesCarousel.offsetWidth;
}

const toggleDisabledBttnStages = () => {
  if (slideStagesIndex <= 0) {
    stagesButtonLeft.setAttribute('disabled', true);
    stagesButtonLeft.classList.add('arrow-button-disabled');
  } else {
      stagesButtonLeft.removeAttribute('disabled', '');
      stagesButtonLeft.classList.remove('arrow-button-disabled');
    }

  if (slideStagesIndex >= 4) {
    stagesButtonRight.setAttribute('disabled', true);
    stagesButtonRight.classList.add('arrow-button-disabled');
  } else {
      stagesButtonRight.removeAttribute('disabled', '');
      stagesButtonRight.classList.remove('arrow-button-disabled');
    }
}

const moveStagesList = () => {
  if (transition) {
    stagesList.style.transition = 'transform .5s';
  }
  stagesList.style.transform = `translateX(-${slideStagesIndex * defineStagesCarouselWidth()}px)`;
};

const toggleDots = () => {
  dots.forEach((dot) => {
    if (dot.classList.contains('active')) {
      dot.classList.remove('active');
    }
  })
  dots[slideStagesIndex].classList.add('active');
}

const slideStagesCarousel = () => {
  toggleDisabledBttnStages();
  moveStagesList();
  toggleDots();
}

function handleBttnRightStages () {
  slideStagesIndex++;
  slideStagesCarousel();
}

function handleBttnLeftStages  () {
  slideStagesIndex--;
  slideStagesCarousel();
}

function handleDottStages  (e) {
  slideStagesIndex = e.target.dataset.dotIndex;
  slideStagesCarousel();
}

stagesButtonRight.addEventListener('click', handleBttnRightStages);
stagesButtonLeft.addEventListener('click', handleBttnLeftStages);
dots.forEach((dot, index) => {
  dot.dataset.dotIndex = index;
  dot.addEventListener('click', handleDottStages);  
});

let slideMembersIndex = 0;
totalMembers.textContent =`/${membersCards.length}`;
currentMembers.textContent = selectDivider();

export function createGroupMembersCarousel () {
  const groupElement = document.createElement('div');
  groupElement.classList.add('carousel-members__group');
  return groupElement;
}

function setValueWidthGroupMembers (groupElement, divider) {
  const itemMembers = document.querySelector('.carousel-members__item');
  const styleItemMembers = window.getComputedStyle(itemMembers);
  const itemMembersMarginRightString = styleItemMembers.getPropertyValue('margin-inline-start');
  const itemMembersMarginRight = itemMembersMarginRightString.match(/\d+/g)[0];
  groupElement.style.width = `${(Number(itemMembers.offsetWidth) + Number(itemMembersMarginRight))*divider}px`;
}

function addGroupsInMembersCarousel (divider) {
  for (let i = 0; i < membersCards.length/divider; i++) {
    const groupElement = createGroupMembersCarousel(); 
    for (let j = 0; j < divider; j++) {
        const itemIndex = i * divider + j;
        if (itemIndex < membersCards.length) {
          groupElement.append(createMemberCard(membersCards[itemIndex]));
        }
    }
    membersСarouselInner.append(groupElement); 
    setValueWidthGroupMembers(groupElement, divider)
  }
}

addGroupsInMembersCarousel(selectDivider());

function removeGroupsInMembersCarousel () {
  const membersGroup = Array.from(document.querySelectorAll('.carousel-members__group'));
  membersGroup.forEach((groupElement) => {
    groupElement.remove(); 
  })
}

function defineCountMembersGroup () {
  const countMembersGroup = Array.from(document.querySelectorAll('.carousel-members__group')).length;
  return countMembersGroup;
}

function defineWidthGroupMembers () {
  const groupMembers = document.querySelector('.carousel-members__group')
  const widthGroupMembers = Number(groupMembers.offsetWidth);
  return widthGroupMembers;
}

function slideRightMembersCarousel (countCards, countMembersGroup, widthGroupMembers, divider) {
  slideMembersIndex = slideMembersIndex + 1;
  currentMembers.textContent = Number(currentMembers.textContent) + divider;

  if (slideMembersIndex < countMembersGroup) {
    if (slideMembersIndex === countMembersGroup - 1 ) {
      currentMembers.textContent = countCards;
    }
    membersСarouselInner.style.transform = `translateX(-${widthGroupMembers*slideMembersIndex}px)`;
  }

  if (slideMembersIndex >= countMembersGroup) {
    slideMembersIndex = 0;
    currentMembers.textContent = divider; 
    membersСarouselInner.style.transform = `translateX(-${widthGroupMembers*slideMembersIndex}px)`;
  }
}

function slideLeftMembersCarousel (countCards, countMembersGroup, widthGroupMembers, divider) {
  slideMembersIndex = slideMembersIndex - 1;

  if (slideMembersIndex >= 0) {
    if (slideMembersIndex === countMembersGroup - 2) {
      currentMembers.textContent = countMembersGroup*divider;
    }
    membersСarouselInner.style.transform = `translateX(-${widthGroupMembers*slideMembersIndex}px)`;
    currentMembers.textContent = Number(currentMembers.textContent) - divider;
  }

  if (slideMembersIndex < 0) {
    slideMembersIndex = countMembersGroup - 1;
    currentMembers.textContent =  countCards;
    membersСarouselInner.style.transform = `translateX(-${widthGroupMembers*slideMembersIndex}px)`;
  }
}

  
function handleBttnRightMembers () {
  slideRightMembersCarousel(
    membersCards.length, 
    defineCountMembersGroup(),
    defineWidthGroupMembers(),
    selectDivider()
  );
}
  
function handleBttnLeftMembers () {
  slideLeftMembersCarousel(
    membersCards.length, 
    defineCountMembersGroup(),
    defineWidthGroupMembers(),
    selectDivider()
  );
}
  
membersButtonRight.addEventListener('click', handleBttnRightMembers);
membersButtonLeft.addEventListener('click', handleBttnLeftMembers);
  
window.addEventListener('resize', () => {
  slideStagesIndex = 0;
  stagesList.style.transform = `translateX(0)`;
  if (defineWindowWidth() < 700) {
    slideStagesCarousel();

    stagesButtonRight.removeEventListener('click', handleBttnRightStages);
    stagesButtonLeft.removeEventListener('click', handleBttnLeftStages);
    dots.forEach((dot, index) => {
      dot.dataset.dotIndex = index;
      dot.removeEventListener('click', handleDottStages);  
    });

    stagesButtonRight.addEventListener('click', handleBttnRightStages);
    stagesButtonLeft.addEventListener('click', handleBttnLeftStages);
    dots.forEach((dot, index) => {
      dot.dataset.dotIndex = index;
      dot.addEventListener('click', handleDottStages);  
    });
  }
  
  removeGroupsInMembersCarousel(); 
  addGroupsInMembersCarousel(selectDivider());
  slideMembersIndex = 0;
  currentMembers.textContent = selectDivider();

  membersСarouselInner.style.transform = `translateX(0)`;

  membersButtonRight.removeEventListener('click', handleBttnRightMembers);
  membersButtonLeft.removeEventListener('click', handleBttnLeftMembers);

  membersButtonRight.addEventListener('click', handleBttnRightMembers);
  membersButtonLeft.addEventListener('click', handleBttnLeftMembers);
});

setInterval(()=>{
  slideRightMembersCarousel(
    membersCards.length, 
    defineCountMembersGroup(),
    defineWidthGroupMembers(),
    selectDivider()
  );
}, 4000);