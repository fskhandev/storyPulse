<template>
  <div>
    <Header :isScroll="isScroll" />
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isScroll = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      isScroll.value = true;
    } else {
      isScroll.value = false;
    }
  });
});
</script>
