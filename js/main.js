// ---function for navbar scrolling---

const $navbar = document.querySelector('.navbar');

let previousPosition = window.scrollY;

window.addEventListener('scroll', function () {
  const currentPosition = window.scrollY;
  $dropdown.classList.add('hidden');
  if (previousPosition < currentPosition) {
    $navbar.classList.add('hidden');
  } else {
    $navbar.classList.remove('hidden');
  }
  previousPosition = currentPosition;
});

// ---function for dropdown---

const $dropdown = document.querySelector('.menu-select');
const $menuButton = document.querySelector('.navbar');

$navbar.addEventListener('click', function () {
  if (event.target !== $menuButton) {
    $dropdown.classList.toggle('hidden');
  }
});

// console.log(window.scrollY);

// const $track = document.querySelector('.carousel-track');
// const $leftButton = document.querySelector('.button-left');
// const $rightButton = document.querySelector('.button-right');
// const $radioNav = document.querySelector('.carousel-nav');

// const slides = Array.from($track.children);
// const radios = Array.from($radioNav.children);

// console.log(slides);
// when click left move slide left
// when click right move slide right
// when clicking nav, move to that slide
