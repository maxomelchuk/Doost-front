<template>
  <footer class="footer">
    <div>© Doost, 2024</div>
  </footer>
</template>

<script setup></script>
<style scoped lang="scss">
@use "@/assets/variables";
footer {
  height: 80px;
  width: 100%;
  z-index: 99;
  box-shadow: 0 0 30px -10px variables.$secondary-color;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
