import { stagesCards, membersCards  } from "./data.js";
import { createStageCard, createMemberCard } from "./cards.js";
import { selectDivider } from "./utils.js";
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

export let slideIndex = 0;
export const stagesCarouselWidth = stagesCarousel.offsetWidth;
export const transition = true;
const dots = Array.from(document.querySelectorAll('.dot'));

const toggleDisabledBttnStages = () => {
  if (slideIndex === 0) {
    stagesButtonLeft.setAttribute('disabled', true);
    stagesButtonLeft.classList.add('arrow-button-disabled');
  } else {
      stagesButtonLeft.removeAttribute('disabled', '');
      stagesButtonLeft.classList.remove('arrow-button-disabled');
    }

  if (slideIndex === 4) {
    stagesButtonRight.setAttribute('disabled', true);
    stagesButtonRight.classList.add('arrow-button-disabled');
  } else {
      stagesButtonRight.removeAttribute('disabled', '');
      stagesButtonRight.classList.remove('arrow-button-disabled');
    }
}

const slideStagesCarousel = () => {
  if (transition) {
    stagesList.style.transition = 'transform .5s';
  }
  stagesList.style.transform = `translateX(-${slideIndex * stagesCarouselWidth}px)`;
};
const toggleDots = (index) => {
  dots.forEach((dot) => {
    if (dot.classList.contains('active')) {
      dot.classList.remove('active');
    }
  })
  dots[index].classList.add('active');
} 

stagesButtonRight.addEventListener('click', () => {
  slideIndex++;
  toggleDisabledBttnStages();
  slideStagesCarousel();
  toggleDots(slideIndex);
});

stagesButtonLeft.addEventListener('click', () => {
  slideIndex--;
  toggleDisabledBttnStages();
  slideStagesCarousel();
  toggleDots(slideIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slideIndex = index;
    toggleDisabledBttnStages();
    slideStagesCarousel();
    toggleDots(slideIndex);
  });  
});

totalMembers.textContent =`/${membersCards.length}`;

membersCards.forEach((card) => {
  membersList.append(createMemberCard(card));
})

currentMembers.textContent = selectDivider();

let count = 0;

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

function handleMouseClickOnBttnRightMembers () {
  moveRightMembersList(membersCards.length, selectDivider());
}

function handleMouseClickOnBttnLeftMembers () {
  moveLeftMembersList(membersCards.length, selectDivider());
}

membersButtonRight.addEventListener('click', handleMouseClickOnBttnRightMembers);
membersButtonLeft.addEventListener('click', handleMouseClickOnBttnLeftMembers);

window.addEventListener('resize', () => {
  count = 0;
  currentMembers.textContent = selectDivider();
  membersList.style.transform = `translateX(0)`;

  membersButtonRight.removeEventListener('click', handleMouseClickOnBttnRightMembers);
  membersButtonLeft.removeEventListener('click', handleMouseClickOnBttnLeftMembers);

  membersButtonRight.addEventListener('click', handleMouseClickOnBttnRightMembers);
  membersButtonLeft.addEventListener('click', handleMouseClickOnBttnLeftMembers);
});


setInterval(()=>{
  moveRightMembersList(membersCards.length, selectDivider());
}, 4000);
