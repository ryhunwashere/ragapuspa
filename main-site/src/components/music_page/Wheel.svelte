<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { selectedCard } from "../../stores/selectedCard.js"; // svelte store

  export let cards = [];

  let selectedCardEl;
  let firstCardEl;

  onMount(() => {
    if (firstCardEl) {
      selectedCardEl = firstCardEl;
      gsap.set(selectedCardEl, { width: "100%" });
      selectedCard.set(cards[0]);
    }
  });

  function handleMouseClick(event, cardData) {
    const clickedCard = event.currentTarget;

    if (selectedCardEl && selectedCardEl !== clickedCard) {
      gsap.to(selectedCardEl, {
        width: "80%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    selectedCardEl = clickedCard;

    gsap.to(selectedCardEl, {
      width: "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    selectedCard.set(cardData);
  }

  function handleMouseEnter(event) {
    const cardEl = event.currentTarget;

    if (cardEl === selectedCardEl) return;

    gsap.to(cardEl, {
      width: "90%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  function handleMouseLeave(event) {
    const cardEl = event.currentTarget;

    if (cardEl === selectedCardEl) return;

    gsap.to(cardEl, {
      width: "80%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }
</script>

<div class="right-container">
  <div class="wheel">
    <div style="height:40vh"></div>

    <!-- Only the first card gets bind:this -->
    {#if cards.length > 0}
      <button
        class="card"
        bind:this={firstCardEl}
        onclick={(e) => handleMouseClick(e, cards[0])}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        {cards[0].title}
      </button>
    {/if}

    <!-- All remaining cards, no bind:this -->
    {#each cards.slice(1) as card}
      <button
        class="card"
        onclick={(e) => handleMouseClick(e, card)}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        {card.title}
      </button>
    {/each}

    <div style="height:40vh"></div>
  </div>
</div>

<style>
  .right-container {
    position: absolute;
    right: 0;
    top: 0;
    width: 42%;
    height: 100%;
    padding-left: 50px;
    overflow-y: scroll;
  }

  .wheel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 100%;
    position: relative;

    will-change: transform;
    touch-action: none;
    user-select: none;
  }

  .card {
    cursor: pointer;
    width: 80%;
    background-color: rgb(255, 255, 255);
    height: 20vh;
    padding: 10px;
    text-align: left;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    box-shadow: 0px 0px 50px rgb(0, 0, 0, 0.8);
  }
</style>
