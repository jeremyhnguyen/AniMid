// ---DOM Variables---

const $navbar = document.querySelector('.navbar');
const $logoA = document.querySelector('#home-view');
const $menuButton = document.querySelector('.menu');
const $dropdown = document.querySelector('.menu-select');
const $airingA = document.querySelector('#airing-view');
const $popularA = document.querySelector('#popular-view');
const $upcomingA = document.querySelector('#upcoming-view');
const $airingRow = document.querySelector('.airing-row');
const $popularRow = document.querySelector('.popular-row');
const $upcomingRow = document.querySelector('.upcoming-row');
const $airingView = document.querySelector('.airing-view');
const $popularView = document.querySelector('.popular-view');
const $upcomingView = document.querySelector('.upcoming-view');
const $individualView = document.querySelector('.individual-view');

// ---Function for Navbar Scrolling---

let previousPosition = window.scrollY;

window.addEventListener('scroll', () => {
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

$menuButton.addEventListener('click', () => {
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
  const $individualRow = document.createElement('div');
  $individualRow.setAttribute('class', 'row');
  $individualRow.setAttribute('class', 'individual-row');
  const $col2 = document.createElement('div');
  $col2.setAttribute('class', 'col-half');
  const $img = document.createElement('img');
  $img.setAttribute('src', data.images.webp.large_image_url);
  $img.setAttribute('alt', data.title);
  const $synopsis = document.createElement('div');
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

  $individualRow.appendChild($col2);
  $col2.appendChild($img);
  $individualRow.appendChild($synopsis);
  $synopsis.appendChild($p1);
  $synopsis.appendChild($p2);
  $synopsis.appendChild($p3);
  $synopsis.appendChild($p4);
  $synopsis.appendChild($p5);
  $synopsis.appendChild($p6);
  $synopsis.appendChild($p7);
  $individualRow.appendChild($vidRow);

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

// ---Click Event for Airing Tiles---

$airingRow.addEventListener('click', () => {
  if (event.target.tagName === 'IMG') {
    const $tileNumber = Number(event.target.getAttribute('data-id'));
    $individualView.textContent = '';
    getIndividualById($tileNumber);
    viewSwap('individual');
  }
});

// ---Click Event for Popular Tiles---

$popularRow.addEventListener('click', () => {
  if (event.target.tagName === 'IMG') {
    const $tileNumber = Number(event.target.getAttribute('data-id'));
    $individualView.textContent = '';
    getIndividualById($tileNumber);
    viewSwap('individual');
  }
});

// ---Click Event for Upcoming Tiles---

$upcomingRow.addEventListener('click', () => {
  if (event.target.tagName === 'IMG') {
    const $tileNumber = Number(event.target.getAttribute('data-id'));
    $individualView.textContent = '';
    getIndividualById($tileNumber);
    viewSwap('individual');
  }
});

// ---API Request for Individual View---

function getIndividualById(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.jikan.moe/v4/anime/${id}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    $individualView.appendChild(renderIndividual(xhr.response.data));
  });
  xhr.send();
}

// ---API Request for Airing Season---

function getAiring() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
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
  xhr.addEventListener('load', () => {
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
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const data = renderData(xhr.response.data[i]);
      $upcomingRow.appendChild(data);
    }
  });
  xhr.send();
}

getUpcoming();

// ---View Swap for Airing View---

$airingA.addEventListener('click', () => viewSwap('airing'));

// ---View Swap for Popular View---

$popularA.addEventListener('click', () => viewSwap('popular'));

// ---View Swap for Upcoming View---

$upcomingA.addEventListener('click', () => viewSwap('upcoming'));

// ---View Swap for Home View---

$logoA.addEventListener('click', () => viewSwap('home'));

// ---View Swap Function---

function viewSwap(viewName) {
  if (viewName === 'airing') {
    $popularView.classList.add('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.add('hidden');
    $airingView.classList.remove('hidden');
  } else if (viewName === 'popular') {
    $popularView.classList.remove('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.add('hidden');
    $airingView.classList.add('hidden');
  } else if (viewName === 'upcoming') {
    $popularView.classList.add('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.remove('hidden');
    $airingView.classList.add('hidden');
  } else if (viewName === 'individual') {
    $popularView.classList.add('hidden');
    $individualView.classList.remove('hidden');
    $upcomingView.classList.add('hidden');
    $airingView.classList.add('hidden');
  } else if (viewName === 'home') {
    $popularView.classList.remove('hidden');
    $individualView.classList.add('hidden');
    $upcomingView.classList.remove('hidden');
    $airingView.classList.remove('hidden');
  }
}
