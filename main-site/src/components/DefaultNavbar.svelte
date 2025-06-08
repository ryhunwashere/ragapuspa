<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

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
  }

  onMount(() => {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        gsap.to(header, { y: "-100%", duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(header, { y: "0%", duration: 0.5, ease: "power2.out" });
      }
      lastScrollY = currentScrollY;
    });
  });
</script>

<!-- The full structure from layout.astro, with bind:this and event hooks added -->
<header class="site-header" bind:this={header}>
  <nav class="navbar">
    <!-- Left aligned section -->
    <div class="nav-left">
      <a href="/">Ragapuspa</a>
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
