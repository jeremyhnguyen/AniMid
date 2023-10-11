// ---DOM Variables---

const $navbar = document.querySelector('.navbar');
const $menuButton = document.querySelector('.menu');
const $dropdown = document.querySelector('.menu-select');
const $airingRow = document.querySelector('.airing-row');
const $popularRow = document.querySelector('.popular-row');
const $upcomingRow = document.querySelector('.upcoming-row');
const $airingView = document.querySelector('.airing-view');
const $popularView = document.querySelector('.popular-view');
const $upcomingView = document.querySelector('.upcoming-view');
const $individualView = document.querySelector('.individual-view');
const $airingA = document.querySelector('#airing-view');
const $popularA = document.querySelector('#popular-view');
const $upcomingA = document.querySelector('#upcoming-view');
const $logoA = document.querySelector('#home-view');
const $individualRow = document.querySelector('individual-row');

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
  const $a = document.createElement('a');
  $a.setAttribute('href', '#');
  const $img = document.createElement('img');
  $img.setAttribute('src', data.images.webp.large_image_url);
  $img.setAttribute('alt', data.title);
  $img.setAttribute('data-id', data.mal_id);
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

// ---Function for Rendering Individual View---

function renderIndividual(data) {
  const $col2 = document.createElement('div');
  $col2.setAttribute('class', 'col-half');
  const $img = document.createElement('img');
  $img.setAttribute('src', data.images.webp.large_image_url);
  $img.setAttribute('alt', data.title);
  const $synopsis = document.createElement('div');
  $synopsis.setAttribute('class', 'col-half');
  $synopsis.setAttribute('class', 'synopsis');
  const $p1 = document.createElement('p');
  $p1.textContent = data.title_english;
  const $p2 = document.createElement('p');
  $p2.textContent = data.title;
  const $p3 = document.createElement('p');
  $p3.textContent = data.title_japanese;
  const $p4 = document.createElement('p');
  $p4.textContent = `Score: ${data.score}`;
  const $p5 = document.createElement('p');
  $p5.textContent = `Episodes: ${data.episodes}`;
  const $p6 = document.createElement('p');
  $p6.textContent = `Year: ${data.year}`;
  const $p7 = document.createElement('p');
  $p7.textContent = data.synopsis;
  const $vidRow = document.createElement('div');
  $vidRow.setAttribute('class', 'video-row');

  $individualRow.appendChild($col2, $synopsis, $vidRow);
  $col2.appendChild($img);
  $synopsis.appendChild($p1, $p2, $p3, $p4, $p5, $p6, $p7);

  if (data.episodes === null) {
    $p3.textContent = 'Unreleased';
  }
  if (data.score === null) {
    $p5.classList.add('hidden');
  }
  if (data.year === null) {
    $p4.classList.add('hidden');
  }
  return $individualRow;
}

// ---API Request for Airing Season---

function getAiring() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const data = renderData(xhr.response.data[i]);
      $airingRow.append(data);
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
      $popularRow.appendChild(data);
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
      $upcomingRow.appendChild(data);
    }
  });
  xhr.send();
}

getUpcoming();

// ---View Swap for Airing View---

$airingA.addEventListener('click', viewAiring);

function viewAiring(event) {
  if (event.target === $airingA) {
    $popularView.classList.add('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.add('hidden');
    $airingView.classList.remove('hidden');
  }
}

// ---View Swap for Popular View---

$popularA.addEventListener('click', viewPopular);

function viewPopular(event) {
  if (event.target === $popularA) {
    $popularView.classList.remove('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.add('hidden');
    $airingView.classList.add('hidden');
  }
}

// ---View Swap for Upcoming View---

$upcomingA.addEventListener('click', viewUpcoming);

function viewUpcoming(event) {
  if (event.target === $upcomingA) {
    $popularView.classList.add('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.remove('hidden');
    $airingView.classList.add('hidden');
  }
}

// ---View Swap for Home View---

$logoA.addEventListener('click', viewHome);

function viewHome(event) {
  if (event.target === $logoA) {
    $popularView.classList.remove('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.remove('hidden');
    $airingView.classList.remove('hidden');
  }
}

// --- Issue #3 WIP ---
// HTML/CSS for Individual View
// --- Function add event listener to rows (parent) for Rendering Individual View DOM Tree +api request, template literal to add variable to {id}---
// --- API Request for IDs ---
// xhr.open('GET', `https://api.jikan.moe/v4/anime/${id}`)
// Fix tile uniformity and logo horizontal stretch
// --- View Swap for Individual View --- (update so that idv. view is hidden in other views)
