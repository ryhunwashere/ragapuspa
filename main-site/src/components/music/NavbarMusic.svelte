<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let styleVariant = "default";
  let isMenuOpen: boolean = false;

  let headerEl: HTMLElement;
  let navLinksEl: HTMLDivElement;
  let hamburgerBtn;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      gsap.to(navLinksEl, {
        duration: 0.3,
        scaleY: 1,
        opacity: 1,
        pointerEvents: "auto",
        transformOrigin: "top",
        ease: "power2.out",
      });
    } else {
      gsap.to(navLinksEl, {
        duration: 0.3,
        scaleY: 0,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.in",
      });
    }
  }

  onMount(() => {
    const transparencyThreshold = 4;
    const backgroundOpacity = 0.5;

    const BASE_COLOR = [228, 9, 9];

    function updateHeaderBackground(scrollY: number) {
      const isScrolled = scrollY > transparencyThreshold;

      const alpha = isScrolled ? backgroundOpacity : 1;
      headerEl.style.backgroundColor = `rgba(${BASE_COLOR.join(", ")}, ${alpha})`;
    }
    updateHeaderBackground(window.scrollY);

    // Scroll listener to update both transform and background
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      updateHeaderBackground(currentScrollY);
    });
  });
</script>

<header class="site-header {styleVariant}" bind:this={headerEl}>
  <nav class="navbar">
    <div class="nav-left">
      <a href="/">Ragapuspa</a>
    </div>

    <button
      class="hamburger-menu"
      aria-label="Menu"
      onclick={toggleMenu}
      bind:this={hamburgerBtn}
    >
      ☰
    </button>

    <div class="nav-right" id="navLinks" bind:this={navLinksEl}>
      <a href="/music">Music</a>
      <span class="separator"></span>
      <a href="/gallery">Gallery</a>
      <span class="separator"></span>
      <a href="/merch">Merch</a>
      <span class="separator"></span>
      <a href="/about">About</a>
      <span class="separator"></span>
      <a href="/contact-us">Contact us</a>
    </div>
  </nav>
</header>

<style>
  .site-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    will-change: transform;
    backdrop-filter: blur(5px) invert(80%);
    transition: background-color 0.4s ease;
  }

  .site-header.default {
    background-color: rgb(32, 61, 151, 1);
  }
  .site-header.default a {
    color: white;
    font-family: "Zen Maru Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .site-header.music {
    background-color: rgba(255, 255, 255, 0);
  }
  .site-header.music a {
    color: white;
    font-family: "Zen Maru Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .navbar {
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    font-size: clamp(1rem, 1.4vw, 3rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: clamp(0.5rem, 0.7rem, 2rem);
  }

  .nav-right {
    display: flex;
    flex-direction: row;
    opacity: 1;
    transform: scaleY(1);
    pointer-events: auto;
    position: static;
    background-color: transparent;
  }

  .nav-left a,
  .nav-right a {
    text-decoration: none;
    margin: 0 0.5rem;
  }

  .separator {
    display: inline;
    margin: 0 0.2rem;
  }

  .hamburger-menu {
    color: white;
    display: none;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .nav-right {
      transform-origin: top;
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: rgba(16, 43, 82, 0.95); 
      text-align: center;
    }

    .hamburger-menu {
      display: block;
    }

    .separator {
      display: none;
    }

    .nav-right a {
      margin: 1rem 0;
    }
  }
</style>
