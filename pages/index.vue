<template>
 <Stories title="All stories"  />
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
});
</script>