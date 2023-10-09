// ---DOM variables---

const $navbar = document.querySelector('.navbar');
const $menuButton = document.querySelector('.menu');
const $dropdown = document.querySelector('.menu-select');
const $airingrow = document.querySelector('.airing-row');
const $popularrow = document.querySelector('.popular-row');
const $upcomingrow = document.querySelector('.upcoming-row');
const $airingview = document.querySelector('.airing-view');
const $popularview = document.querySelector('.popular-view');
const $upcomingview = document.querySelector('.upcoming-view');
const $individualview = document.querySelector('.individual-view');
const $airingA = document.querySelector('#airing-view');
const $popularA = document.querySelector('#popular-view');
const $upcomingA = document.querySelector('#upcoming-view');
const $logoA = document.querySelector('#home-view');

// ---Function for Navbar Scrolling---

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

// ---Function for Dropdown---

$menuButton.addEventListener('click', function () {
  if (event.target !== $navbar) {
    $dropdown.classList.toggle('hidden');
  }
});

// ---Function for Rendering Views---

function renderData(data) {
  const $col5 = document.createElement('div');
  $col5.setAttribute('class', 'col-5');
  $col5.setAttribute('data-id', data.mal_id);
  const $a = document.createElement('a');
  $a.setAttribute('href', '#');
  const $img = document.createElement('img');
  $img.setAttribute('src', data.images.webp.large_image_url);
  $img.setAttribute('alt', data.title);
  const $showInfo = document.createElement('div');
  $showInfo.setAttribute('class', 'show-info');
  const $p6 = document.createElement('p');
  $p6.setAttribute('class', 'PTitleENG');
  $p6.textContent = data.title_english;
  const $p1 = document.createElement('p');
  $p1.setAttribute('class', 'pTitle');
  $p1.textContent = data.title;
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

  $col5.appendChild($a);
  $a.appendChild($img);
  $col5.appendChild($showInfo);
  $showInfo.appendChild($p6);
  $showInfo.appendChild($p1);
  $showInfo.appendChild($p2);
  $showInfo.appendChild($p5);
  $showInfo.appendChild($p3);
  $showInfo.appendChild($p4);

  if (data.episodes === null) {
    $p3.textContent = 'Unreleased';
  }
  if (data.score === null) {
    $p5.classList.add('hidden');
  }
  if (data.year === null) {
    $p4.classList.add('hidden');
  }
  return $col5;
}

// ---API Request for Airing Season---

function getAiring() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const data = renderData(xhr.response.data[i]);
      $airingrow.append(data);
    }
  });
  xhr.send();
}

getAiring();

// ---API Request for Popular Page---

function getPopular() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/anime');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const data = renderData(xhr.response.data[i]);
      $popularrow.appendChild(data);
    }
  });
  xhr.send();
}

getPopular();

// ---API Request for Upcoming Page---

function getUpcoming() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/seasons/upcoming');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const data = renderData(xhr.response.data[i]);
      $upcomingrow.appendChild(data);
    }
  });
  xhr.send();
}

getUpcoming();

// ---View Swap for Airing View---

$airingA.addEventListener('click', viewAiring);

function viewAiring(event) {
  if (event.target === $airingA) {
    $popularview.classList.add('hidden');
    $individualview.classList.add('hidden');
    $upcomingview.classList.add('hidden');
    $airingview.classList.remove('hidden');
  }
}

// ---View Swap for Popular View---

$popularA.addEventListener('click', viewPopular);

function viewPopular(event) {
  if (event.target === $popularA) {
    $popularview.classList.remove('hidden');
    $individualview.classList.add('hidden');
    $upcomingview.classList.add('hidden');
    $airingview.classList.add('hidden');
  }
}

// ---View Swap for Upcoming View---

$upcomingA.addEventListener('click', viewUpcoming);

function viewUpcoming(event) {
  if (event.target === $upcomingA) {
    $popularview.classList.add('hidden');
    $individualview.classList.add('hidden');
    $upcomingview.classList.remove('hidden');
    $airingview.classList.add('hidden');
  }
}

// ---View Swap for Home View---

$logoA.addEventListener('click', viewHome);

function viewHome(event) {
  if (event.target === $logoA) {
    $popularview.classList.remove('hidden');
    $individualview.classList.add('hidden');
    $upcomingview.classList.remove('hidden');
    $airingview.classList.remove('hidden');
  }
}

// --- Issue #3 WIP ---
// HTML/CSS for Individual View
// Dummy HTML DOM Tree
// --- Function for Rendering Individual View DOM Tree ---
// --- API Request for IDs ---
// Fix tile uniformity and logo horizontal stretch
// --- View Swap for Individual View --- (update so that idv. view is hidden in other views)
