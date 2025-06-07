import gsap from "gsap";

export function navbarAnimations() {
  const header = document.querySelector(".site-header");
  const navLinks = document.getElementById("navLinks");
  const hamburgerBtn = document.querySelector(".hamburger-menu");

  let lastScrollY = window.scrollY;
  let isHeaderHidden = false;

  // Scroll hide/show behavior
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && !isHeaderHidden) {
      // Scroll down → hide navbar
      gsap.to(header, {
        y: "-100%",
        duration: 0.3,
        ease: "power2.out"
      });
      isHeaderHidden = true;
    } else if (currentScrollY < lastScrollY && isHeaderHidden) {
      // Scroll up → show navbar
      gsap.to(header, {
        y: "0%",
        duration: 0.3,
        ease: "power2.out"
      });
      isHeaderHidden = false;
    }

    lastScrollY = currentScrollY;
  });

  // Hamburger dropdown toggle
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
}
