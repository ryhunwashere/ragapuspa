<script lang="ts">
  export let href: string;
  export let text: string;
</script>

<a class="link-button" href={href}>{text}</a>

<style>
  .link-button {
    display: block;
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: invert(0%);
    border-radius: 8px;
    font-size: 4rem;
    padding: 1rem;
    line-height: 1;
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-weight: bold;
    transition: 0.2s ease;
  }

  .link-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: invert(30%);
    color: rgb(255, 255, 255);
  }

  @media (max-width: 1024px) {
    .link-button {
      transform: translateY(10vh);
      font-size: 4rem;
      padding: 1rem;
    }
  }

  @media (max-width: 767px) {
    .link-button {
      transform: translateY(5vh);
      font-size: 2rem;
      padding: 1rem;
    }
  }
</style>
