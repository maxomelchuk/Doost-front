<template>
  <div>
    <svg
      class="spinner mx-auto"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
@use "@/assets/variables";

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: rotator 1.4s linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  color: variables.$primary-color;
  animation: dash 1.4s ease-in-out infinite,
    colors (1.4s * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: variables.$primary-color;
  }
  100% {
    stroke: variables.$primary-color;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 187/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
