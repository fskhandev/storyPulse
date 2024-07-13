<template>
  <section class="services my-8 md:mt-0">
    <div class="grid md:grid-cols-2 md:gap-4 gap-3">
      <div class="w-full px-3 md:px-10 flex items-center">
        <div>
          <h2 class="uppercase mt-2 font-semibold text-2xl text-[#B2B2B2]">
            Services
          </h2>
          <div class="relative">
            <nuxt-img
              data-aos="fade-right"
              data-aos-duration="300"
              class="absolute max-w-72 md:max-w-[450px]"
              src="/images/services.png"
              alt=""
            />
            <h2
              class="font-semibold mt-3 md:mt-4 lg:text-5xl !leading-snug text-3xl"
            >
              Empowering our worldwide clients to adopt modern technology,
              rethink processes, and elevate experiences.
            </h2>
          </div>
        </div>
      </div>

      <div class="md:border-l">
        <div
          data-aos="fade-up"
          data-aos-duration="400"
          class="text-justify px-3 md:px-10 py-4 md:border-b"
        >
          <h2 class="font-heading font-semibold text-3xl mt-4">Digital</h2>
          <p class="font-paragraph mt-2">
            we specialize in providing extensive digital services tailored to
            meet the unique needs of our clients. Our range of digital services
            encompasses web and mobile app development, software solutions,
            digital marketing, e-commerce platforms, and IT consulting.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="400"
          class="md:border-b px-3 md:px-10 py-4"
        >
          <h2 class="font-heading font-semibold text-3xl">Data & AI</h2>
          <p class="font-paragraph mt-2">
            From developing custom AI algorithms to implementing scalable data
            infrastructure, we offer end-to-end solutions. Our services include
            data analytics, machine learning, artificial intelligence, data
            visualization, and predictive modeling.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="400"
          class="md:border-b px-3 md:px-10 py-4"
        >
          <h2 class="font-heading font-semibold text-3xl">Branding</h2>
          <p class="font-paragraph mt-2">
            Our branding services include logo design, brand strategy
            development, brand messaging, visual identity creation, and brand
            guidelines. We work closely with our clients to understand their
            unique brand vision and target audience, ensuring that every aspect
            of the branding process aligns with their business objectives.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
