<script>
  export let urls = [];

  const WIDTH = "500";
  const FORMAT = "webp";
  const QUALITY = "auto:low";

  function transform(url) {
    return url.replace(`/upload/`, `/upload/w_${WIDTH},f_${FORMAT},q_${QUALITY}/`);
  }
</script>

<div class="gallery">
  {#each urls as { imageUrl, imagePublicId }, i}
    <img
      src={transform(imageUrl)}
      alt={imagePublicId}
      loading="lazy"
      class="fade-in"
      style="animation-delay: {i * 30}ms"
    />
  {/each}
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

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
</style>
