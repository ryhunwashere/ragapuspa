<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let text: string;

  let container: HTMLSpanElement;

  onMount(() => {
    const chars = container.querySelectorAll(".char");
    const startingHeight = -(screen.height / 2);
    console.log("starting height: " + startingHeight);

    container.style.transform = `translateY: ${startingHeight}`;

    gsap.fromTo(chars, {
      opacity: 0,
      y: startingHeight,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "power4.out"
    }
  );
  });
</script>

<style>
  .char {
    display: inline-block;
    white-space: pre;
    font-weight: 700;
    opacity: 0;
    transition: opacity 0s, transform 0s;
  }
</style>

<span bind:this={container}>
  {#each text.split("") as char}
    <span class="char">{char}</span>
  {/each}
</span>
