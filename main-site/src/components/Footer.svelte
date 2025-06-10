<footer>
  <div class="footer-text">
    <p style="font-size:1.5rem; font-weight: 500; padding-bottom: 0.5rem;">
      Ragapuspa
    </p>
    <p style="padding-bottom: 0.5rem;">Copyright © 2025 Ragapuspa</p>
    <p>
      All original sources of derivative works based on Touhou Project belongs
      to Jun'ya Ota (ZUN) and Team Shanghai Alice.
    </p>
  </div>
</footer>

<style>
  footer {
    background-image: url("/reimu_terbang.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    height: 150px;
    width: 100vw;
    padding: 0%;

    display: flex;
    justify-content: left;
    align-items: left;
    text-align: left;

    position: relative;
    overflow: hidden; /* Ensure pseudo-element doesn't spill out */
  }

  /* Pseudo-element overlay for darkening or filtering */
  footer::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  .footer-text {
    position: relative;
    padding: 2rem;
  }
</style>
