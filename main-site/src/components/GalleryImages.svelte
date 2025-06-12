<script>
  export let urls = [];
  const width = "320";
  const format = "webp";

  function transform(url) {
    return url.replace(`/upload/`, `/upload/w_${width},f_${format},q_auto/`);
  }
</script>

<div class="gallery">
  {#each urls as { url, public_id }}
    <img src={transform(url)} alt={public_id} loading="lazy" />
  {/each}
</div>

<style>
    img {
        width: 100%;
        object-fit: contain;
        border-radius: 15px;
    }
    .gallery {
        columns: 320px;
    }
</style>
