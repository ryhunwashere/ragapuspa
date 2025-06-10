<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let styleVariant = "default"; // default fallback

  let isMenuOpen = false;

  let header;
  let navLinks;
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

  onMount(() => {
    const maxHideOffset = header.offsetHeight;
    let lastScrollY = window.scrollY;
    let currentOffset = 0;

    const scrollEffectStrength = 0.4; // Adjust this to control speed

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Invert the delta: scroll down = header moves up, scroll up = header moves down
      currentOffset -= delta * scrollEffectStrength;

      // Clamp between fully visible (0) and fully hidden (-maxHideOffset)
      currentOffset = Math.max(Math.min(currentOffset, 0), -maxHideOffset);

      gsap.set(header, { y: currentOffset });

      lastScrollY = currentScrollY;
    });
  });
</script>

<!-- The full structure from layout.astro, with bind:this and event hooks added -->
<header class="site-header {styleVariant}" bind:this={header}>
  <nav class="navbar">
    <!-- Left aligned section -->
    <div class="nav-left">
      <a href="/">Music Group</a>
    </div>

    <!-- Hamburger icon -->
    <button
      class="hamburger-menu"
      aria-label="Menu"
      on:click={toggleMenu}
      bind:this={hamburgerBtn}
    >
      ☰
    </button>

    <!-- Right aligned section -->
    <div class="nav-right" id="navLinks" bind:this={navLinks}>
      <a href="/about">About</a>
      <span class="separator">.</span>
      <a href="/music">Music</a>
      <span class="separator">.</span>
      <a href="/contact-us">Contact Us</a>
    </div>
  </nav>
</header>

<style>
  /* Header container */
  .site-header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgb(110, 228, 255);
    z-index: 999;
    will-change: transform;
  }

  /* Default variant */
  .site-header.default {
    background-color: rgb(110, 228, 255); /* original color */
  }

  /* Album variant */
  .site-header.album {
    background-color: rgb(137, 250, 145); /* example new color */
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
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
    padding: clamp(1rem, 1vw, 2rem);
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
    margin: 0 0.5rem;
  }

  /* Hamburger icon default hidden on large screens */
  .hamburger-menu {
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
      background-color: rgb(170, 220, 196);
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
