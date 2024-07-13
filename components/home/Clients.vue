<template>
  <section class="mt-10 px-3 md:px-16 text-center">
    <h3
      data-aos="fade-up"
      data-aos-duration="400"
      class="text-3xl font-semibold"
    >
      Our Clients
    </h3>
    <p class="text-2xl mt-2">
      We rethink business growth for you through our collective experience with
      strategic partner ecosystem.
    </p>
    <div
      data-aos="fade-right"
      data-aos-duration="400"
      class="grid mt-6 gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
    >
      <Usaid class="w-full h-32" />
      <KpTourism class="w-full h-32" />
      <Dai class="w-full h-32" />
      <NiceOne class="w-full h-32" />
      <KpFederal class="w-full h-32" />
      <kpAuthority class="w-full h-32" />
      <Cemco class="w-full h-32" />
      <Clavebit class="w-full h-32" />
      <Sandia class="w-full h-32" />
      <Erisp class="w-full h-32" />
      <Smeda class="w-full h-32" />
      <Etea class="w-full h-32" />
      <Bits class="w-full h-32" />
      <WorldBank class="w-full h-32" />
      <KpLivestock class="w-full h-32" />
      <Unodc class="w-full h-32" />
    </div>
  </section>
</template>
<script>
const components = {
  Usaid: () => import("@/components/logos/company/usaid.vue"),
  Dai: () => import("@/components/logos/company/dai.vue"),
  NiceOne: () => import("@/components/logos/company/niceone.vue"),
  KpFederal: () => import("@/components/logos/company/kpFederal.vue"),
  kpAuthority: () => import("@/components/logos/company/kpAuthority.vue"),
  Cemco: () => import("@/components/logos/company/cemco.vue"),
  Clavebit: () => import("@/components/logos/company/clavebit.vue"),
  Sandia: () => import("@/components/logos/company/sandia.vue"),
  Erisp: () => import("@/components/logos/company/erisp.vue"),
  Smeda: () => import("@/components/logos/company/smeda.vue"),
  Etea: () => import("@/components/logos/company/etea.vue"),
  KpTourism: () => import("@/components/logos/company/kpTourism.vue"),
  Bits: () => import("@/components/logos/company/bits.vue"),
  WorldBank: () => import("@/components/logos/company/worldBank.vue"),
  KpLivestock: () => import("@/components/logos/company/kpLivestock.vue"),
  Unodc: () => import("@/components/logos/company/unodc.vue"),
};
export default {
  components,
};
</script>
