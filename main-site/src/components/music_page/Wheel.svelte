<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Draggable from "gsap/Draggable";
  import InertiaPlugin from "gsap/InertiaPlugin";

  export let cards = [];

  let wheelEl;

  onMount(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    Draggable.create(wheelEl, {
      type: "y",
      inertia: true,
      edgeResistance: 0.75,

      bounds: () => {
        const parentHeight = wheelEl.parentElement.clientHeight;
        const contentHeight = wheelEl.scrollHeight;
        const scrollable = contentHeight - parentHeight;

        return {
          minY: scrollable > 0 ? -scrollable : 0,
          maxY: 0,
        };
      },

      onDrag: function () {
        gsap.set(wheelEl, { y: this.y });
      },
      onThrowUpdate: function () {
        gsap.set(wheelEl, { y: this.y });
      },
      onThrowComplete: function () {
        // Clamp the value if it went too far
        const bounds = this.vars.bounds();
        if (this.y < bounds.minY) {
          this.endDrag();
          gsap.to(wheelEl, {
            y: bounds.minY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else if (this.y > bounds.maxY) {
          this.endDrag();
          gsap.to(wheelEl, {
            y: bounds.maxY,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  });
</script>

<div class="wheel" bind:this={wheelEl}>
  <div style="height:40vh"></div>
  {#each cards as card}
    <div class="card">{card.title}</div>
  {/each}
  <div style="height:40vh"></div>
</div>

<style>
  .wheel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    width: 100%;
    position: relative;

    will-change: transform;
    touch-action: none;
    user-select: none;
    cursor: grab;
  }

  .card {
    width: 100%;
    background-color: azure;
    height: 140px;
    padding: 10px;
    text-align: left;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    box-shadow: 0px 0px 20px rgb(0, 0, 0);
  }
</style>
