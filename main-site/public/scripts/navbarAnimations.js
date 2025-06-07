document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navLinks = document.getElementById("navLinks");
  const hamburgerBtn = document.querySelector(".hamburger-menu");

  if (!header || !navLinks || !hamburgerBtn) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" });
    }

    lastScrollY = currentScrollY;
  });

  let isMenuOpen = false;

  hamburgerBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      gsap.to(navLinks, {
        duration: 0.3,
        scaleY: 1,
        opacity: 1,
        pointerEvents: "auto",
        transformOrigin: "top",
        ease: "power2.out"
      });
    } else {
      gsap.to(navLinks, {
        duration: 0.3,
        scaleY: 0,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.in"
      });
    }
  });
});
