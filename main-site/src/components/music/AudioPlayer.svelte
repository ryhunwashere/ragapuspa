<!-- AudioPlayer is a child of Wheel component -->
<script lang="ts">
  import { selectedCard, isPlaying } from "../../stores/selectedCard.ts";
  import { onDestroy } from "svelte";

  let audioEl: HTMLAudioElement | undefined;
  $: currentCard = $selectedCard;

  $: if (currentCard?.audioUrl && audioEl) {
    audioEl.src = currentCard.audioUrl;
    audioEl.currentTime = 0;
    audioEl
      .play()
      .then(() => isPlaying.set(true))
      .catch(() => {});
  }

  // React to play/pause toggle
  $: if (audioEl && currentCard?.audioUrl) {
    $isPlaying ? audioEl.play() : audioEl.pause();
  }

  onDestroy(() => {
    if (audioEl) {
      audioEl.pause();
      audioEl.src = "";
    }
  });
</script>

{#if currentCard?.audioUrl}
  <div>
    <audio bind:this={audioEl} hidden controls loop style="width: 100%;">
      <source src={currentCard.audioUrl} type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  </div>
{/if}
