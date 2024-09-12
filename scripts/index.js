import { stagesCards, membersCards  } from "./data.js";
import { createStageCard } from "./cards.js";
import { 
  stagesCarousel,
  stagesList,
  stagesButtonLeft,
  stagesButtonRight
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