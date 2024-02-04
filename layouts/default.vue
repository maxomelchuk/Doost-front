<template>
  <div class="relative h-full min-h-screen pb-[80px]">
    <Navbar
      @auth="changeAuthShow($event)"
      @startNow="changeSurveyShow($event)"
    />
    <Transition name="slide-up" mode="out-in">
      <Auth
        v-if="authShow"
        :signup="isSignup"
        :survey="surveyAnswers"
        @close="authShow = false"
        class="auth"
      />
    </Transition>

    <Transition name="slide-up" mode="out-in">
      <Survey class="survey" v-if="surveyShow" @goToAuth="goToAuth($event)" />
    </Transition>

    <slot></slot>

    <Footer />
  </div>
</template>
<script setup lang="ts">
let isSignup = ref(true);
let authShow = ref(false);
let surveyShow = ref(false);
let surveyAnswers = ref([]);

function changeAuthShow(value: boolean) {
  authShow.value = !authShow.value;
  isSignup.value = value;
  surveyShow.value = false;
}
function changeSurveyShow(value: boolean) {
  surveyShow.value = !surveyShow.value;
  authShow.value = false;
}
function goToAuth(data: any) {
  surveyAnswers.value = data;
  changeAuthShow(true);
}
</script>
<style scoped lang="scss">
.auth,
.survey {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 11;
}
</style>
