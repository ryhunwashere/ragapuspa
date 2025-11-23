<script lang="ts">
  import { onMount } from "svelte";

  interface ImageItem {
    imageUrlNormal: string;
    imageUrlSmall: string;
    imagePublicId: string;
  }

  export let initial: ImageItem[] = [];

  let images: ImageItem[] = [...initial];
  let chunkSize: number = 8;
  let chunkIndex: number = 1;
  let loading: boolean = false;
  let isSmallScreen: boolean = false;

  // Check screen size once on mount
  onMount(() => {
    isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  });

  async function loadMore() {
    if (loading) return;
    loading = true;

    const all = await fetch("/gallery_items.json").then((r) => r.json());

    const nextChunk = all.slice(
      chunkIndex * chunkSize,
      (chunkIndex + 1) * chunkSize
    );
    if (nextChunk.length > 0) {
      images = [...images, ...nextChunk];
      chunkIndex++;
    }

    loading = false;
  }

  function setupObserver(node: Element) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function handleLoad(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    img.classList.add("fade-in-loaded");
  }
</script>

<div class="gallery">
  {#each images as { imageUrlNormal, imageUrlSmall, imagePublicId }}
    <img
      src={isSmallScreen ? imageUrlSmall : imageUrlNormal}
      alt={imagePublicId}
      loading="lazy"
      class="fade-in"
      on:load={handleLoad}
    />
  {/each}

  <div use:setupObserver class="load-sentinel"></div>

  {#if loading}
    <div class="loading-indicator">
      <div class="spinner"></div>
      <p>Loading more images...</p>
    </div>
  {/if}
</div>

<style>
  .gallery {
    columns: 320px;
    column-gap: 1rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 10px;
  }

  img {
    width: 100%;
    margin-bottom: 1rem;
    object-fit: contain;
    border-radius: 15px;
    display: block;
    break-inside: avoid; /* prevent image breaking across columns */
  }

  .fade-in {
    opacity: 0;
    animation: fadeIn 0.4s ease-in forwards;
  }

  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
    color: #777;
    font-size: 0.9rem;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 0.5rem;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
