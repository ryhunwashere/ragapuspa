<script>
  export let urls = [];

  const width = "600";
  const format = "webp";
  const quality = "auto:low";

  function transform(url) {
    return url.replace(`/upload/`, `/upload/w_${width},f_${format},q_${quality}/`);
  }
</script>

<div class="gallery">
  {#each urls as { url, public_id }, i}
    <img
      src={transform(url)}
      alt={public_id}
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
