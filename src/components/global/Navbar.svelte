<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  type RGBColor = [number, number, number];

  export let styleVariant: string = "default";
  const variantColorsRGB = new Map<string, RGBColor>([
      ["default", [32, 68, 152]],
      ["album", [228, 9, 9]]
    ]);

  let isMenuOpen = false;

  let header: any;
  let navLinks: object;
  let hamburgerBtn;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      gsap.to(navLinks, {
        duration: 0.3,
        scaleY: 1,
        opacity: 1,
        pointerEvents: "auto",
        transformOrigin: "top",
        ease: "power2.out",
      });
    } else {
      gsap.to(navLinks, {
        duration: 0.3,
        scaleY: 0,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.in",
      });
    }
  }

  function clampRGB(value: number): number {
    return Math.min(255, Math.max(0, Math.round(value)));
  }

  onMount(() => {
    const transparencyThreshold: number = 4;
    const backgroundOpacity: number = 0.5;

    function updateHeaderBackground(scrollY: number) {
      const isScrolled = scrollY > transparencyThreshold;

      const baseColor = variantColorsRGB.get(styleVariant);
      if (!baseColor) {
        console.warn(`Unknown base color type for navbar: ${styleVariant}`);
        return;
      }

      const normalizedColors = baseColor.map(clampRGB);

      const alpha = isScrolled ? backgroundOpacity : 1;
      header.style.backgroundColor = `rgba(${normalizedColors.join(", ")}, ${alpha})`;
    }
    
    updateHeaderBackground(window.scrollY);

    // Scroll listener to update both transform and background
    window.addEventListener("scroll", () => {
      const currentScrollY: number = window.scrollY;
      updateHeaderBackground(currentScrollY);
    });
  });
</script>

<header class="site-header {styleVariant}" bind:this={header}>
  <nav class="navbar">
    <!-- Left aligned section -->
    <div class="nav-left">
      <a href="/">Ragapuspa</a>
    </div>

    <!-- Hamburger icon -->
    <button
      class="hamburger-menu"
      aria-label="Menu"
      onclick={toggleMenu}
      bind:this={hamburgerBtn}
    >
      ☰
    </button>

    <!-- Right aligned section -->
    <div class="nav-right" id="navLinks" bind:this={navLinks}>
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
  /* Header container */
  .site-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    will-change: transform;
    backdrop-filter: blur(5px) invert(80%);
    transition: background-color 0.4s ease;
  }

  /* Default variant */
  .site-header.default {
    background-color: rgb(32, 61, 151, 1);
  }
  .site-header.default a {
    color: white;
    font-family: "Zen Maru Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  /* Music variant */
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

  /* Default nav-right style for large screens */
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

  /* Hide separator on small screens */
  .separator {
    display: inline;
    margin: 0 0.2rem;
  }

  /* Hamburger icon default hidden on large screens */
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
