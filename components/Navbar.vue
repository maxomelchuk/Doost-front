<template>
  <div class="border-bottom nav bg-white">
    <nav
      class="relative flex h-[80px] items-center justify-between z-10 mx-auto max-w-[960px] px-[15px]"
    >
      <NuxtLink to="/">
        <div class="flex items-center">
          <img class="w-[40px] mb-[8px]" src="/logo.svg" alt="" />
          <div class="text-4xl text-[#64855b] ml-5">Doost</div>
        </div>
      </NuxtLink>

      <div class="flex gap-[30px]">
        <div class="nav-menu xl:flex gap-[20px] font-semibold self-center">
          <NuxtLink to="/users"> Teammates </NuxtLink>
        </div>
        <div class="xl:flex gap-[20px] font-semibold self-center">
          <button class="hover:text-[#806dff]" @click="$emit('auth', false)">
            Auth
          </button>
        </div>
        <div class="hidden lg:block">
          <button class="start-btn button" @click="$emit('startNow')">
            Start now
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {});
</script>
<style scoped lang="scss">
@use "@/assets/variables";
.nav {
  position: sticky;
  top: 0;
  z-index: 99;
  box-shadow: 0 0 30px -10px variables.$secondary-color;
}
.menu {
  position: absolute;
  width: 100%;
  max-width: 480px;
  top: 100%;
  right: 0px;
  padding: 20px 0 40px 0;
  z-index: 10;
  background-color: white;
  border-top: 1px solid #e5e9ee;
  box-shadow: inset 0px 1.3px 5px 0px #0000001a;
}
.menu-item {
  @include variables.text(24px, 600, 165%);
  color: variables.$primary-color;
  border-radius: variables.$radius;
}
.shadow {
  box-shadow: 0 0 10px 10px black;
}

.start-btn {
  background-color: variables.$bg-gray;
  height: 44px;
  width: 145px;
  @include variables.text(16px, 700, 165%);
  color: variables.$text-color-primary;
  transition: all 0.2s ease-out;
  color: white;

  &:hover {
    background-color: variables.$primary-color;
  }
  &:active {
    margin-top: 2px;
  }
}
.nav-menu-item,
.nav-menu a {
  @include variables.text(16px, 600, 140%);
  &:hover {
    color: variables.$primary-color;
  }
}
</style>
