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

// ---function for rendering airing page---

const $row = document.querySelector('.row');
const $showInfo = document.querySelector('.show-info');

function renderAiring(data) {
  const $col5 = document.createElement('div');
  $col5.setAttribute('class', 'col-5');
  const $a = document.createElement('a');
  $a.setAttribute('href', '#');
  const $img = document.createElement('img');
  $img.setAttribute('src', data.images.jpg.image_url);
  const $p1 = document.createElement('p');
  $p1.setAttribute('class', 'pTitle');
  $p1.textContent = data.title_english;
  const $p2 = document.createElement('p');
  $p2.setAttribute('class', 'pTitleJP');
  $p2.textContent = data.title_japanese;
  const $p5 = document.createElement('p');
  $p5.textContent = `Score: ${data.score}`;
  const $p3 = document.createElement('p');
  $p3.setAttribute('class', 'pEpisodes');
  $p3.textContent = `Episodes: ${data.episodes}`;
  const $p4 = document.createElement('p');
  $p4.setAttribute('class', 'pYear');
  $p4.textContent = `Year: ${data.year}`;

  $row.appendChild($col5);
  $col5.appendChild($a);
  $a.appendChild($img);
  $col5.appendChild($showInfo);

  $showInfo.appendChild($p1);
  $showInfo.appendChild($p2);
  $showInfo.appendChild($p5);
  $showInfo.appendChild($p3);
  $showInfo.appendChild($p4);

  if (data.episodes === null) {
    $p3.textContent = 'Episodes: 0';
  }
  if (data.score === null) {
    $p5.classList.add('hidden');
  }

  if (data.year === null) {
    $p4.classList.add('hidden');
  }

  return $col5;
}

function getAiring() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const $airing = renderAiring(xhr.response.data[i]);
      $row.appendChild($airing);
    }
  });
  xhr.send();
}

getAiring();
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

//    recreate carousel
//      give carousel functionality

// issue 2
// create test page for individual view
//    copy nav: row: column-halfs of img&text row:container for preview

//    create dom individual page view (using airing+popular+upcoming)
//    append APIData.data[i].images(choose which image)
//           APIData.data[i].title/title_english
//           APIData.data[i].title_japanese
//           APIData.data[i].synopsis
//           APIData.data[i].trailer
// ROW FOR THIS VIEW SHOULD HAVE UNIQUE CLASS!!! popular has score p

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
