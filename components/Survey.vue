<template>
  <div class="swiper-container">
    <swiper
      :navigation="true"
      :pagination="{ type: 'fraction' }"
      :modules="modules"
      class="mySwiper survey"
    >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">{{ survey[0].question }}</div>
          <div class="slide-options">
            <div
              v-for="item in survey[0].options"
              :key="item"
              @click="collectAnswer($event, 0, item)"
            >
              {{ item }}
            </div>
          </div>
        </div></swiper-slide
      >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">
            {{ survey[1].question }}
          </div>
          <div class="slide-options">
            <div
              v-for="item in survey[1].options"
              :key="item"
              :class="{ active: survey[1].picked === item }"
              @click="collectAnswer($event, 1, item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="slide-notes">
            There will be no judgment here. Providing honest answers will enable
            us to tailor a customized starting point for you.
          </div>
        </div></swiper-slide
      >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">{{ survey[2].question }}</div>
          <div class="slide-options">
            <div
              v-for="item in survey[2].options"
              :key="item"
              :class="{ active: survey[2].picked === item }"
              @click="collectAnswer($event, 2, item)"
            >
              {{ item }}
            </div>
          </div>
        </div></swiper-slide
      >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">{{ survey[3].question }}</div>
          <div class="slide-options">
            <input type="number" class="input" v-model="survey[3].picked" />
          </div>
          <div class="slide-notes">
            It may feel personal but we only ask to make sure we can create the
            most suitable plan for you.
          </div>
        </div></swiper-slide
      >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">{{ survey[4].question }}</div>
          <div class="slide-options">
            <input type="number" class="input" v-model="survey[4].picked" />
          </div>
          <div class="slide-notes">
            It may feel personal but we only ask to make sure we can create the
            most suitable plan for you.
          </div>
        </div></swiper-slide
      >
      <swiper-slide
        ><div class="slide">
          <div class="slide-title">{{ survey[5].question }}</div>
          <div class="slide-options">
            <input type="number" class="input" v-model="survey[5].picked" />
          </div>
          <div class="slide-notes">
            It may feel personal but we only ask to make sure we can create the
            most suitable plan for you.
          </div>
        </div></swiper-slide
      ><swiper-slide
        ><div class="slide">
          <div class="slide-title">It's done! Your plan is ready</div>
          <div class="slide-options">
            <img src="/survey_finish.svg" size="60" class="" alt="" />
          </div>
          <div class="slide-notes">
            Based on your answers, we have created a personalized weed fasting
            plan for you. You can now access your plan and start your journey
            towards your goal.
          </div>
          <button @click="goToAuth()">Sign in</button>
        </div></swiper-slide
      >
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const emit = defineEmits(["goToAuth"]);
const modules = [Pagination, Navigation];
const survey: any = ref([
  {
    key: "goals",
    question: "Choose your goals:",
    options: [
      "Smoke less",
      "Knowing how much I smoke",
      "Giving my body a break",
      "More smoke free days",
    ],
    picked: [],
  },
  {
    key: "amount",
    question: "How much do you smoke on average per week?",
    options: ["1-3g", "3-6g", "6-9g", "10g+"],
    picked: null,
  },
  {
    key: "frequencyTarget",
    question: "How often would you like to consume?",
    options: ["Daily", "1-3 days a week", "3-5 days a week", "Weekends only"],
    picked: null,
  },
  {
    key: "age",
    question: "What is your age?",
    options: [],
    picked: 25,
  },
  {
    key: "weight",
    question: "What is your weight?",
    options: [],
    picked: 80,
  },
  {
    key: "height",
    question: "What is your height?",
    options: [],
    picked: 170,
  },
]);

function collectAnswer(event: any, index: number = 0, option: string) {
  let item = survey.value[index];
  if (item.key === survey.value[0].key) {
    if (!item.picked.includes(option)) {
      item.picked.push(option);
    } else {
      let index = item.picked.indexOf(option);
      item.picked.splice(index, 1);
    }
    event.target.classList.toggle("active");
  } else {
    item.picked = option;
  }
}
function goToAuth() {
  const data = survey.value.map((item: any) => {
    return {
      question: item.question,
      answer: Array.isArray(item.picked) ? item.picked.join(", ") : item.picked,
    };
  });
  emit("goToAuth", data);
}
</script>

<style scoped lang="scss">
@use "@/assets/variables";

.swiper-container {
  margin: 0 auto;
  width: 500px;
  height: 600px;
  background-color: variables.$bg-violet;
  border-radius: 30px;

  .survey {
    .slide {
      padding: 0px 55px;
      color: white;
      width: 100%;
      border-radius: 30px;
      .slide-title {
        font-size: 30px;
        margin-bottom: 30px;
      }
      .slide-options {
        input {
          width: 80px;
        }
        img {
          width: 120px;
          margin: 20px auto;
        }
        div {
          border: 1px solid white;
          padding: 5px;
          margin: 5px 0;
          border-radius: 30px;
          cursor: pointer;
        }
        div:hover {
          background-color: variables.$bg-gray;
          transition: all 0.2s linear;
        }
      }
      .slide-notes {
        // position: absolute;
        // bottom: 0;
        margin: 30px 0;
      }
      button {
        border: 1px solid white;
        padding: 5px;
        margin: 5px 0;
        border-radius: 30px;
        width: 100%;
      }
    }
  }
  input {
    text-align: center;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  .active {
    background-color: variables.$primary-color;
  }
  .swiper {
    width: 500px;
    height: 600px;
    border-radius: 30px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: variables.$bg-violet;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
