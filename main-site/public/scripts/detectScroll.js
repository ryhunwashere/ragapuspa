console.log("Scroll script loaded")
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  // Scroll direction: down or up
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.classList.add('hide');
  } else {
    // Scrolling up
    header.classList.remove('hide');
  }

  // Update last scroll position
  lastScrollY = window.scrollY;
});
