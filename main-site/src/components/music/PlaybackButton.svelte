<script lang="ts">
  import { isPlaying } from "../../stores/selectedCard";

  function handleMouseClick() {
    isPlaying.update((playing) => !playing);
    console.log("Audio status: ", isPlaying);
  }

  $: iconSrc = $isPlaying ? "/icons/pause-button.svg" : "/icons/play-button.svg";
  $: iconAlt = $isPlaying ? "Pause" : "Play";
</script>

<button
  class="playback-button"
  aria-label="Play/Pause Button"
  onclick={handleMouseClick}
>
  <img src={iconSrc} alt={iconAlt} class="icon" />
</button>

<style>
  .playback-button {
    font-size: 0;
    background-color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playback-button:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }

  .playback-button:active .icon {
    opacity: 0.8;
    transform: scale(0.85);
    transition: transform 0.1s ease;
  }

  .icon {
    width: 50px;
    height: 50px;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  @media (max-width: 768px) {
    .playback-button {
      display: none;
      visibility: hidden;
    }
  }
</style>
