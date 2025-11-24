<script lang="ts">
  import { selectedCard } from "../../stores/selectedCard.ts";
  import { fade } from "svelte/transition";
  $: currentCard = $selectedCard;
</script>

{#if currentCard}
  {#key currentCard.imageUrl}
    <img
      transition:fade={{ duration: 300 }}
      alt="Background"
      src={currentCard.imageUrl}
      loading="lazy"
    />
  {/key}
{/if}

<style>
  img {
    position: absolute;
    z-index: 0;
    object-fit: cover;
    object-position: top;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;

    /* Force scaling beyond native resolution */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
</style>
