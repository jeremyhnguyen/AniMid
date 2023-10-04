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
const $menuButton = document.querySelector('.menu');

$menuButton.addEventListener('click', function () {
  if (event.target !== $navbar) {
    $dropdown.classList.toggle('hidden');
  }
});

// issue 1

//    create domtree for airing page view
//    a.append img
//    p.append title, score, episodes, airing, year
//    https://api.jikan.moe/v4/seasons/now
//    append APIData.data[i].images(choose which image)
//           APIData.data[i].title_english
//           APIData.data[i].title_japanese
//           APIData.data[i].score
//           APIData.data[i].episodes
//           APIData.data[i].airing
//           APIData.data[i].year

// recreate carousel
//    give carousel functionality

// issue 2
// create test page for individual view
//    copy nav: row: column-halfs of img&text row:container for preview

//    create dom individual page view (using airing+popular+upcoming)
//    append APIData.data[i].images(choose which image)
//           APIData.data[i].title/title_english
//           APIData.data[i].title_japanese
//           APIData.data[i].synopsis
//           APIData.data[i].trailer

// issue 3
//    create domtree for popular/upcoming page views
//    https://api.jikan.moe/v4/top/anime - popular
//    https://api.jikan.moe/v4/seasons/upcoming - upcoming
//        re-use the domtree used for airing page view

// issue 4
//    function that will select a random individual page view from the available objects in the 3 arrays: airing/popular/upcoming (should be 75 entries)
//    check all viewswaps:
//      logo goes to home (on each page)
//      menu options all go to their respective views

// STRETCH
//    1. add search icon/bar based on view
//          search functionality
//    2. user can favorite shows/create list
