<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScroll: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    });
  },
};
</script>
