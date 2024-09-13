import { stagesCards, membersCards  } from "./data.js";
import { createStageCard, createMemberCard } from "./cards.js";
import { defineWindowWidth, selectDivider } from "./utils.js";
import { 
  stagesCarousel,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight,
  membersList,
  membersButtonLeft,
  membersButtonRight,
  currentMembers,
  totalMembers
} from "./constants.js";

stagesCards.forEach((card) => {
  stagesList.append(createStageCard(card));
})


let slideIndex = 0;
const transition = true;
const dots = Array.from(document.querySelectorAll('.dot'));

const defineStagesCarouselWidth = () => {
  return stagesCarousel.offsetWidth;
}

const toggleDisabledBttnStages = () => {
  if (slideIndex <= 0) {
    stagesButtonLeft.setAttribute('disabled', true);
    stagesButtonLeft.classList.add('arrow-button-disabled');
  } else {
      stagesButtonLeft.removeAttribute('disabled', '');
      stagesButtonLeft.classList.remove('arrow-button-disabled');
    }

  if (slideIndex >= 4) {
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
  stagesList.style.transform = `translateX(-${slideIndex * defineStagesCarouselWidth()}px)`;
};

const toggleDots = () => {
  dots.forEach((dot) => {
    if (dot.classList.contains('active')) {
      dot.classList.remove('active');
    }
  })
  dots[slideIndex].classList.add('active');
}

const slideStagesCarousel = () => {
  toggleDisabledBttnStages();
  moveStagesList();
  toggleDots();
}

function handleBttnRightStages () {
  slideIndex++;
  slideStagesCarousel();
}

function handleBttnLeftStages  () {
  slideIndex--;
  slideStagesCarousel();
}

function handleDottStages  (e) {
  slideIndex = e.target.dataset.dotIndex;
  slideStagesCarousel();
}

stagesButtonRight.addEventListener('click', handleBttnRightStages);
stagesButtonLeft.addEventListener('click', handleBttnLeftStages);
dots.forEach((dot, index) => {
  dot.dataset.dotIndex = index;
  dot.addEventListener('click', handleDottStages);  
});

let count = 0;
totalMembers.textContent =`/${membersCards.length}`;
currentMembers.textContent = selectDivider();

membersCards.forEach((card) => {
  membersList.append(createMemberCard(card));
})

function moveRightMembersList (countCards, divider) {
  count = count + 1;
  currentMembers.textContent = Number(currentMembers.textContent) + divider;

  if (count < countCards/divider) {
    membersList.style.transform = `translateX(-${100*(count)}%)`;
  }

  if (count >= countCards/divider) {
    count = 0;
    currentMembers.textContent = divider; 
    membersList.style.transform = `translateX(-${100*(count)}%)`;
  }
}

function moveLeftMembersList (countCards, divider) {
  count = count - 1;

  if (count >= 0) {
    membersList.style.transform = `translateX(-${100*(count)}%)`;
    currentMembers.textContent = Number(currentMembers.textContent) - divider;
  }

  if (count < 0) {
    count = countCards/divider - 1;
    currentMembers.textContent = Number(currentMembers.textContent) + countCards - divider;
    membersList.style.transform = `translateX(-${100*(count)}%)`;
  }
}

function handleBttnRightMembers () {
  moveRightMembersList(membersCards.length, selectDivider());
}

function handleBttnLeftMembers () {
  moveLeftMembersList(membersCards.length, selectDivider());
}

membersButtonRight.addEventListener('click', handleBttnRightMembers);
membersButtonLeft.addEventListener('click', handleBttnLeftMembers);

window.addEventListener('resize', () => {
  slideIndex = 0;
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

  count = 0;
  currentMembers.textContent = selectDivider();
  membersList.style.transform = `translateX(0)`;

  membersButtonRight.removeEventListener('click', handleBttnRightMembers);
  membersButtonLeft.removeEventListener('click', handleBttnLeftMembers);

  membersButtonRight.addEventListener('click', handleBttnRightMembers);
  membersButtonLeft.addEventListener('click', handleBttnLeftMembers);
});

setInterval(()=>{
  moveRightMembersList(membersCards.length, selectDivider());
}, 4000);