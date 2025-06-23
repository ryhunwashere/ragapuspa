<script>
  import { gsap } from "gsap";
  import { selectedCard } from "../../stores/selectedCard.js";
  import { onMount } from "svelte";

  export let cards = [];

  let cardElements = [];
  let selectedIndex;

  onMount(() => {
    if (cards.length > 0) {
      handleMouseClick(cards[0], 0);
    }
  });

  function handleMouseClick(card, index) {
    for (let i = 0; i < cardElements.length; i++) {
      gsap.to(cardElements[i], {
        width: i === index ? "100%" : "80%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    selectedIndex = index;
    selectedCard.set(card);
  }

  function handleMouseEnter(index) {
    if (index === selectedIndex) return;

    gsap.to(cardElements[index], {
      width: "90%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  function handleMouseLeave(index) {
    if (index === selectedIndex) return;

    gsap.to(cardElements[index], {
      width: "80%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }
</script>

<div class="right-container">
  <div class="wheel">
    <div style="height:40vh"></div>

    {#each cards as card, i}
      <button
        class="card"
        bind:this={cardElements[i]}
        onclick={() => handleMouseClick(card, i)}
        onmouseenter={() => handleMouseEnter(i)}
        onmouseleave={() => handleMouseLeave(i)}
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
