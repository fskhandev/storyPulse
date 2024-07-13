<template>
  <footer class="">
    <div
      class="bg-[#EFF0F2] px-3 md:px-12 py-10 footer-contents flex justify-between flex-wrap gap-6"
    >
      <div class="left-side">
        <nuxt-img class="w-72" src="/images/blackLogo.png" alt="" />
        <!-- <div class="max-w-96 mt-3">
          <p class="text-lg md:pl-1 mb-2">
            Subscribe to stay tuned for news and latest updates. Let's do it!
          </p>
          <div class="flex">
            <input
              type="text"
              placeholder="Enter Your Email Address"
              class="text-base text-slate-700 focus:outline-none focus:border-none px-2 text-sm md:text-base md:px-4 w-full py-2.5 md:py-3"
            />
            <button
              class="bg-[#F76236] text-white text-sm md:text-base px-8 py-2.5 md:py-3"
            >
              Subscribe
            </button>
          </div>
        </div> -->
      </div>

      <div class="center-side-content3 mt-3 md:mt-6">
        <h3 class="font-bold text-xl mb-4 pb-2">Company</h3>
        <ul class="md:flex space-y-3 md:space-y-0">
          <nuxt-link
            class="block md:border-r md:pr-3 md:border-slate-600"
            to="#"
            >Who We Are</nuxt-link
          >
          <nuxt-link
            class="block md:border-r md:px-3 md:border-slate-600"
            to="#"
            >Our Global Presence</nuxt-link
          >
          <nuxt-link
            class="block md:border-r md:px-3 md:border-slate-600"
            to="#"
            >Ngen Careers</nuxt-link
          >
          <li class="block md:px-3">Brochures and Profile</li>
        </ul>
      </div>

      <div class="right-side-social mt-3 md:mt-6">
        <h3 class="font-bold text-xl mb-4 pb-2">Follow Us</h3>
        <div class="social-images flex gap-5">
          <a
            target="_blank"
            href="https://www.facebook.com/nextgcircle?mibextid=LQQJ4d"
          >
          </a>

          <a
            target="_blank"
            href="https://www.instagram.com/ngc_fzc?igsh=MTlrN2Y3cDk1aGJ5dQ=="
          >
          </a>
        </div>
      </div>
    </div>
    <div
      class="bg-black flex flex-wrap gap-4 justify-between py-5 text-white px-12"
    >
      <ul class="flex gap-5">
        <li>Privacy Policy</li>
        <li>Terms</li>
        <li>Licenses</li>
      </ul>
      <p class="">©2012 Next Generation Circle . All Rights Reserved</p>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
footer h3 {
  position: relative;
  text-decoration: none;
  color: black;
}

footer h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: black;
}
</style>
