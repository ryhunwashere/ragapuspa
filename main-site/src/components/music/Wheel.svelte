<script lang="ts">
  import { selectedCard, isPlaying, type CardData } from "@stores/selectedCard.ts";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  import musicCards from "@data/cards.json";

  const cards: CardData[] = musicCards;

  let cardElements: HTMLDivElement[] = [];
  let selectedIndex: number;

  onMount(() => {
    if (cards.length > 0) {
      handleMouseClick(cards[0], 0);
      isPlaying.set(false);
    }
  });

  function handleMouseClick(card: CardData, index: number) {
    for (let i = 0; i < cardElements.length; i++) {
      gsap.to(cardElements[i], {
        width: i === index ? "100%" : "80%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    selectedIndex = index;
    selectedCard.set(card);

    cardElements[index]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });

    isPlaying.set(true);
  }

  function handleMouseEnter(index: number) {
    if (index === selectedIndex) return;

    gsap.to(cardElements[index], {
      width: "90%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  function handleMouseLeave(index: number) {
    if (index === selectedIndex) return;

    gsap.to(cardElements[index], {
      width: "80%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  // Keyboard controls
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedIndex < cards.length - 1) {
        handleMouseClick(cards[selectedIndex + 1], selectedIndex + 1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedIndex > 0) {
        handleMouseClick(cards[selectedIndex - 1], selectedIndex - 1);
      }
    }
  }
</script>

<div class="wheel">
  <div style="height:40vh"></div>

  {#each cards as card, i}
    <div
      role="button"
      class="card"
      bind:this={cardElements[i]}
      tabindex="-1"
      onkeydown={handleKeydown}
      onclick={() => handleMouseClick(card, i)}
      onmouseenter={() => handleMouseEnter(i)}
      onmouseleave={() => handleMouseLeave(i)}
    >
      {card.title}
    </div>
  {/each}

  <div style="height:40vh"></div>
</div>

<style>
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

  @media (max-width:763px) {
    .wheel {
      visibility: hidden;
    }
  }

  .card {
    cursor: pointer;
    height: 100%;
    width: 80%;
    background-color: white;
    height: 20vh;
    padding: 2%;
    text-align: left;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.8);
  }
</style>
