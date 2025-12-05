<script lang="ts">
  import { selectedCard } from "../../stores/selectedCard.ts";
  $: currentCard = $selectedCard;
</script>

<div class="music-description">
  {#if currentCard}
    <div class="top-details">
      {#key currentCard}
        <h1 class="release-title">{currentCard.title}</h1>
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
          <img
            class="icon"
            alt="Bandcamp Icon"
            src="/icons/bandcamp-logo.svg"
          />
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .music-description {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 5%;
    overflow: hidden;
  }

  .top-details {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .bottom-details {
    margin-top: auto;
    padding-bottom: 5%;
  }

  .release-title {
    padding-top: 10%;
    letter-spacing: -3px;
    font-size: clamp(4rem, 1.25vw, 8rem);
  }

  .description {
    overflow-y: auto;
    padding-right: 10%;
    padding-top: 2rem;
    padding-bottom: 2rem;
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
    margin-bottom: 5%;
  }

  ul {
    list-style-type: none;
    font-size: large;
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

  @media screen and (max-width: 768px) {
    .top-details {
      padding-top: 5%;
    }
  }
</style>
