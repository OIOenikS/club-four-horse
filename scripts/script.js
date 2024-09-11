import { membersCards, stagesCards } from "./data.js";

const templateStageCard = document.querySelector('#stage-card-template').content;

const stages = document.querySelector('.stages');
const stagesList = stages.querySelector('.stages__list');

function createStageCard (card) {
  const cardElement = templateStageCard.querySelector('.stage-card').cloneNode(true);
  const cardNumber = cardElement.querySelector('.stage-card__number');
  const cardDescribtion = cardElement.querySelector('.stage-card__describtion');

  cardNumber.textContent = card['number-stage'];
  cardDescribtion.textContent = card.describtion;
  
  return cardElement;
}

stagesCards.forEach((card) => {
  stagesList.append(createStageCard(card));
})




const stagesCarousel = document.querySelector('.stages__carousel');
let slideIndex = 0;
const carouselWidth = stagesCarousel.offsetWidth;
const stagesListWidth = stagesList.getBoundingClientRect().width;
const cardst = document.querySelector('.stage-card')
console.log(cardst)
const cardwidth = cardst.offsetWidth
console.log(cardwidth)
const countSlidesStagesCarousel = stagesList.offsetWidth/cardwidth;
console.log(stagesListWidth)
console.log(Math.floor(countSlidesStagesCarousel))
const transition = true;
const buttonLeft = document.querySelector('.arrow-button-left');
const buttonRight = document.querySelector('.arrow-button-right'); 
console.log(carouselWidth)

const define = () => {
  const computedStyle = window.getComputedStyle(stagesList);
  const widthElement = computedStyle.getPropertyValue('width');
  console.log(widthElement/cardwidth)
}

define()

const toggleDisabledBttn = () => {
  if (slideIndex === 0) {
    buttonLeft.setAttribute('disabled', true);
  } else buttonLeft.removeAttribute('disabled', '');

  if (slideIndex === 4) {
    buttonRight.setAttribute('disabled', true);
  } else buttonRight.removeAttribute('disabled', '');
}

const slide = () => {
  if (transition) {
    stagesList.style.transition = 'transform .5s';
  }
  stagesList.style.transform = `translateX(-${slideIndex * carouselWidth}px)`;
};

const dots = Array.from(document.querySelectorAll('.dot'));
const toggleDots = (index) => {
  dots.forEach((dot) => {
    if (dot.classList.contains('active')) {
      dot.classList.remove('active');
    }
  })
  dots[index].classList.add('active');
}

buttonRight.addEventListener('click', () => {
  slideIndex++;
  toggleDisabledBttn();
  slide();
  toggleDots(slideIndex);
});

buttonLeft.addEventListener('click', () => {
  slideIndex--;
  toggleDisabledBttn();
  slide();
  toggleDots(slideIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slideIndex = index;
    toggleDisabledBttn();
    slide();
    toggleDots(slideIndex);
  });  
})