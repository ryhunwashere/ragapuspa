<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let show = false;

  const MINUTES = 15;
  const TIME_KEY = "albumPromoLastSeen";

  onMount(() => {
    if (typeof localStorage !== "undefined") {
      const lastSeen = localStorage.getItem(TIME_KEY);
      const now = Date.now();

      if (!lastSeen || now - parseInt(lastSeen) > MINUTES * 60 * 1000) {
        // Not shown yet, or enough time has passed
        show = true;
        localStorage.setItem(TIME_KEY, now.toString());
      }
    }
  });

  const close = () => {
    show = false;
    // Update timestamp again in case user closes manually
    localStorage.setItem(TIME_KEY, Date.now().toString());
  };
</script>

{#if show}
  <div class="promo-overlay" transition:fade={{ duration: 400 }}>
    <div class="promo-content">
      <button class="close-btn" on:click={close}>&times;</button>

      <img
        src="https://res.cloudinary.com/djow2j0qk/image/upload/w_1360,f_webp,q_auto:good/v1749822961/hd_baum_shizuha_wide-min_ljl8zw.png"
        alt="Promo"
        class="promo-image"
      />

      <div class="promo-text">
        <h1>🎵 New Album Coming Soon!</h1>
        <p>Check out our upcoming release: <strong>"The Album"</strong></p>
        <a class="promo-button" href="/album1">Take a Look</a>
      </div>
    </div>
  </div>
{/if}

<style>
  .promo-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .promo-content {
    position: relative;
    background: black;
    width: 90%;
    max-width: 1500px;
    height: 90vh;
    border-radius: 1rem;
    overflow: hidden;
    text-align: center;
    color: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);

    /* Remove horizontal padding */
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 0;
    padding-right: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .promo-image {
    transform: scale(1.2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .promo-text {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    box-sizing: border-box;

    text-align: center;
    color: white;
    z-index: 2;
  }

  .promo-button {
    margin-top: 1rem;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #ff4081;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .promo-button:hover {
    background-color: #951693;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    z-index: 2;
  }

  /* mobile layout overrides */
  @media (max-width: 768px) {
    .promo-content {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      justify-content: flex-end;
    }

    .promo-image {
      border-radius: 0;
    }

    .close-btn {
      font-size: 2rem;
    }
  }
</style>
