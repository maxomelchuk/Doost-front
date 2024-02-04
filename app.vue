<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
@use "@/assets/variables";

::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: white;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #cecece;

  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #aaaaaa;
  border-radius: 5px;
}
</style>
