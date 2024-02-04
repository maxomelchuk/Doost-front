<template>
  <NuxtLayout>
    <div class="py-[20px] text-center xl:px-[100px]">
      <div
        class="max-w-[960px] xl:flex xl:justify-between xl:w-full xl:mx-auto"
      >
        <div class="xl:my-auto">
          <h1 class="text-[54px] lg:text-[110px] mt-[40px] xl:text-left">
            {{ error.statusCode }}
          </h1>
          <p class="text-[20px] mt-0 xl:text-left">Sorry, the Page not found</p>
          <div class="mt-[40px] hidden xl:block">
            <NuxtLink to="/">
              <button class="button">
                <h4 class="text-white">Back to Home</h4>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="px-[20px] mb-[60px] block xl:hidden">
        <NuxtLink to="/">
          <button class="button mx-auto my-[20px]">
            <h4 class="text-white">Back to Home</h4>
          </button>
        </NuxtLink>
      </div>
    </div></NuxtLayout
  >
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});
</script>
<style scoped lang="scss">
@use "@/assets/variables";

button {
  width: 100%;
  max-width: variables.$block-width;
  height: 58px;
}
</style>
