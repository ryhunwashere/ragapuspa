<script lang="ts">
  import { selectedCard } from "../../stores/selectedCard.ts";
  $: currentCard = $selectedCard;
</script>

{#if currentCard}
  <div class="top-details">
    {#key currentCard}
      <h2 class="release-title">{currentCard.title}</h2>
      <p class="description">{currentCard.musicDetails.description}</p>
    {/key}
  </div>

  <div class="bottom-details">
    <div class="details">
      {#key currentCard}
        <ul>
          <li>Album: {currentCard.musicDetails.album}</li>
          <li>Arranger: {currentCard.musicDetails.arranger}</li>
          <li>Original: {currentCard.musicDetails.originalSong}</li>
          <li>Artwork: {currentCard.musicDetails.artworkArtist}</li>
        </ul>
      {/key}
    </div>

    <div class="hyperlinks">
      <button class="hyperlink-button" aria-label="Bandcamp">
        <img class="icon" alt="Bandcamp Icon" src="/icons/bandcamp-logo.svg" />
      </button>
    </div>
  </div>
{/if}

<style>
  .top-details {
    display: flex;
    position: relative;
    top: 0;
    padding-top: 1%;
    flex-direction: column;
    overflow: hidden;
  }

  .bottom-details {
    position: relative;
    bottom: 0;
    padding-bottom: 5%;
  }

  .release-title {
    padding-top: 10%;
    letter-spacing: -3px;
    font-size: clamp(4rem, 1.25vw, 8rem);
  }

  .description {
    padding-top: 10%;
    font-size: clamp(1rem, 1.25vw, 3rem);
    overflow-y: auto;
    max-height: 40vh;
    padding-right: 10%;
    padding-bottom: 2rem;
    font-size: clamp(1rem, 1.25vw, 3rem);
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
  }

  .description::-webkit-scrollbar {
    width: 8px;
  }

  .description::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
  }

  .details {
    list-style: none;
    margin-bottom: 5%;
  }

  .hyperlink-button {
    font-size: 0;
    background-color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 70%;
  }

  .hyperlink-button:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }

  .icon {
    border-radius: 70%;
    width: 50px;
    height: 50px;
  }
</style>
