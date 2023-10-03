let $navbar = document.querySelector('.navbar');

let startPosition = window.scrollY;

$navbar.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  if (startPosition > scrollPosition) {
    $navbar.style.top = '0';
  } else {
    $navbar = '-50px';
  }
  startPosition = scrollPosition;
});
