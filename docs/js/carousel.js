// get the elements we need
const carousel = document.querySelector(".js-carousel");

const navLeft = carousel.querySelector(".js-arrow-left");
const navRight = carousel.querySelector(".js-arrow-right");

const slides = carousel.querySelectorAll(".testimonial");

let activeSlide = carousel.querySelector(".testimonial--active");

let navDots;
let activeDot;
let activeSlideNumber;

/* give each item an incrementing data attribute e.g. 
slide-1, slide-2, etc so the slides and nav dots pair up */
function addSlideDataAttr(elements) {
  elements.forEach((element, i) => {
    element.dataset.slide = i + 1;
  });
}

// create dots and finish setting up vars
function createDots() {
  const dotsContainer = document.querySelector(".carousel__dots");

  slides.forEach((el, key) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel__dot");

    if (key == 0) {
      dot.classList.add("carousel__dot--active");
    }

    dotsContainer.appendChild(dot);
  });

  navDots = carousel.querySelectorAll(".carousel__dot");

  // add data attributes to slides
  addSlideDataAttr(slides);
  addSlideDataAttr(navDots);

  // assign rest of variables
  activeDot = carousel.querySelector(".carousel__dot--active");
  activeSlideNumber = activeDot.dataset.slide;
}

function changeActiveDotTo(dot) {
  // remove existing active class
  activeDot.classList.remove("carousel__dot--active");

  // add active class to clicked dot
  dot.classList.add("carousel__dot--active");

  // set clicked dot as new active
  activeDot = dot;
  activeSlideNumber = activeDot.dataset.slide;
}

function changeActiveSlideTo(slide) {
  // remove existing active class
  activeSlide.classList.remove("testimonial--active");

  // add active class to new slide
  slide.classList.add("testimonial--active");

  // set this slide as new active
  activeSlide = slide;
}

// get the slide that has the new active slide number
function getNewActiveSlide() {
  const newActiveSlide = carousel.querySelector(
    `.testimonial[data-slide="${activeSlideNumber}"]`
  );

  return newActiveSlide;
}

function getNewActiveDot() {
  const newActiveDot = carousel.querySelector(
    `.carousel__dot[data-slide="${activeSlideNumber}"]`
  );

  return newActiveDot;
}

// when a dot is clicked, show the corresponding slide
function initDotFunctionality() {
  navDots.forEach(element => {
    element.addEventListener("click", function() {
      changeActiveDotTo(this);

      changeActiveSlideTo(getNewActiveSlide());
    });
  });
}

function initArrowFunctionality() {
  // if its left arrow, minus active slide by 1
  // if we go below 1, set it to the length
  navLeft.addEventListener("click", function() {
    activeSlideNumber = parseInt(activeSlideNumber) - 1;

    if (activeSlideNumber < 1) {
      activeSlideNumber = slides.length;
    }

    changeActiveSlideTo(getNewActiveSlide());
    changeActiveDotTo(getNewActiveDot());
  });

  // if its right arrow, increase active slide by 1
  // if we go above the length, set it to 1
  navRight.addEventListener("click", function() {
    activeSlideNumber = parseInt(activeSlideNumber) + 1;

    if (activeSlideNumber > slides.length) {
      activeSlideNumber = 1;
    }

    changeActiveSlideTo(getNewActiveSlide());
    changeActiveDotTo(getNewActiveDot());
  });
}

// add a dot for each slide in the carousel
createDots();

// add event listeners for dots
initDotFunctionality();

// add event listeners for arrows
initArrowFunctionality();
