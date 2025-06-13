<footer>
  <div class="footer-text">
    <p>Copyright © 2025 Ragapuspa</p>
    <p>
      All original sources of derivative works based on Touhou Project belongs
      to Jun'ya Ota (ZUN) and Team Shanghai Alice.
    </p>
    <p style="font-size:0.7rem; padding-top: 2rem;">
      Website made by Ryhun using Astro framework.
    </p>
  </div>
</footer>

<style>
  footer {
    background-image: url("https://res.cloudinary.com/djow2j0qk/image/upload/w_500,f_webp,q_auto:eco/v1749816121/hd_baum_nareko_wfc1cx.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;

    width: 100%;
    min-height: 100px;
    padding: 1rem;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;

    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

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
    z-index: 1;
  }

  p {
    padding: 0.2rem;
  }
</style>
