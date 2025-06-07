function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

window.toggleMenu = toggleMenu;