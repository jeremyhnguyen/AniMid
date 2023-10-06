const $navbar = document.querySelector('.navbar');
const $menuButton = document.querySelector('.menu');
const $dropdown = document.querySelector('.menu-select');
const $row = document.querySelector('.row');

// ---function for navbar scrolling---

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

$menuButton.addEventListener('click', function () {
  if (event.target !== $navbar) {
    $dropdown.classList.toggle('hidden');
  }
});

// ---function for rendering airing page---

function renderAiring(data) {
  const $col5 = document.createElement('div');
  $col5.setAttribute('class', 'col-5');
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

  $row.appendChild($col5);
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
    $p4.textContent = 'Year: 2023';
  }
  return $col5;
}

// --- API Request for Airing Season ---

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
