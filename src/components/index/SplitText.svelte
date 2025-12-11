<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let text: string;

  let container: HTMLSpanElement;

  onMount(() => {
    const chars = container.querySelectorAll(".char");
    gsap.from(chars, {
      opacity: 0,
      y: -500,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.5
    });
  });
</script>

<style>
  .char {
    display: inline-block;
    white-space: pre;
    font-weight: 700;
  }
</style>

<span bind:this={container}>
  {#each text.split("") as char}
    <span class="char">{char}</span>
  {/each}
</span>
