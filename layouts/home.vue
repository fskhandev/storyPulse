<template>
  <div>
    <slot />
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
      if (window.scrollY > 200) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    });
  },
};
</script>
