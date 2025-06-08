<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let show = false;

  const SECONDS = 30;
  const TIME_KEY = "albumPromoLastSeen";

  onMount(() => {
    const lastSeen = localStorage.getItem(TIME_KEY);
    const now = Date.now();

    if (!lastSeen || now - parseInt(lastSeen) > SECONDS * 1000) {
      // Not shown yet, or enough time has passed
      show = true;
      localStorage.setItem(TIME_KEY, now.toString());
    }
  });

  const close = () => {
    show = false;
    // Update timestamp again in case user closes manually
    localStorage.setItem(TIME_KEY, Date.now().toString());
  };
</script>


{#if show}
  <div class="promo-overlay" transition:fade={{ duration:400 }}>
    <div class="promo-content">
      <button class="close-btn" on:click={close}>&times;</button>
      <h1>🎵 New Album Coming Soon!</h1>
      <p>Check out our upcoming release: <strong>"The Album"</strong></p>
      <a class="promo-button" href="/album1">Take a Look</a>
    </div>
  </div>
{/if}


<style>
  .promo-overlay {
    position: fixed;
    inset: 0;
    background: red url('/magnificent_album_promo.jpg') center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .promo-content {
    background: rgba(0, 0, 0, 0.75);
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    color: white;
    position: relative;
    width: 90%;
    max-width: 400px;
  }

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    font-size: 2rem;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
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
  }
</style>