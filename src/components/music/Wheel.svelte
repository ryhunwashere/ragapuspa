<script lang="ts">
  import { selectedCard, isPlaying, type CardData } from "@stores/selectedCard.ts";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  export let cards: CardData[];

  export let initialSongSlug: string | undefined;

  let cardElements: HTMLDivElement[] = [];
  let selectedIndex: number;

  onMount(() => {
    let initialIndex = 0;

    if (initialSongSlug) {
      const foundIndex = cards.findIndex(card => card.slug === initialSongSlug);
      if (foundIndex !== -1) {
        initialIndex = foundIndex;
      }
    }

    if (cards.length > 0) {
      handleSongSelection(cards[initialIndex], initialIndex, false);
      isPlaying.set(false);
    }
  });

  function handleSongSelection(card: CardData, index: number, updateUrl: boolean = true) {
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

    if (updateUrl && card.slug) {
      const newPath = `/music/${card.slug}`;
      history.pushState({ path: newPath }, '', newPath);
    }
  }

  function handleMouseClick(card: CardData, index: number) {
    handleSongSelection(card, index, true);
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

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedIndex < cards.length - 1) {
        handleSongSelection(cards[selectedIndex + 1], selectedIndex + 1, true);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedIndex > 0) {
        handleSongSelection(cards[selectedIndex - 1], selectedIndex - 1, true);
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

  @media (max-width: 763px) {
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
