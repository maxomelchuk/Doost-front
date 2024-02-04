<template>
  <div>
    <Transition name="slide-up" mode="out-in">
      <div class="signup" v-if="isSignup">
        <button class="change-btn" @click="isSignup = false">
          Go to SignIn
        </button>
        <h2 class="title pb-[30px]">Create Account</h2>
        <div class="social">
          <img src="/social-icons/facebook-1-svgrepo-com.svg" alt="" />
          <img src="/social-icons/google-color-svgrepo-com.svg" alt="" />
          <img src="/social-icons/linkedin-svgrepo-com.svg" alt="" />
        </div>
        <div class="text-center py-[20px]">
          or use your email for registration
        </div>
        <div class="form">
          <div class="pt-[10px]">
            <p class="pb-1">Name</p>
            <input
              v-model="name"
              @change="validateName()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidName }"
              placeholder="Enter your email"
              type="email"
              required
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorNameText }}
            </div>
          </div>
          <div class="pt-[10px]">
            <p class="pb-1">Email</p>
            <input
              v-model="email"
              @change="validateEmail()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidEmail }"
              placeholder="Enter your email"
              type="email"
              required
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorEmailText }}
            </div>
          </div>
          <div class="pt-[10px]">
            <p class="pb-1">Password</p>
            <input
              v-model="password"
              @change="validatePassword()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidPassword }"
              placeholder="Enter your email"
              type="email"
              required
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorPasswordText }}
            </div>
          </div>
          <button class="button mt-[40px]" @click="auth()">Sign Up</button>
        </div>
      </div>
      <div class="signin" v-else>
        <button class="change-btn" @click="isSignup = true">
          Go to SignUp
        </button>

        <h2 class="title pb-[30px]">Sign In</h2>
        <div class="social">
          <img src="/social-icons/facebook-1-svgrepo-com.svg" alt="" />
          <img src="/social-icons/google-color-svgrepo-com.svg" alt="" />
          <img src="/social-icons/linkedin-svgrepo-com.svg" alt="" />
        </div>
        <div class="text-center py-[20px]">or use your account</div>
        <div class="form">
          <div class="pt-[10px]">
            <p class="pb-1">Email</p>
            <input
              v-model="email"
              @change="validateEmail()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidEmail }"
              placeholder="Enter your email"
              type="email"
              required
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorEmailText }}
            </div>
          </div>
          <div class="pt-[10px]">
            <p class="pb-1">Password</p>
            <input
              v-model="password"
              @change="validatePassword()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidPassword }"
              placeholder="Enter your email"
              type="email"
              required
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorPasswordText }}
            </div>
          </div>
          <button class="button mt-[40px]" @click="auth()">Sign In</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const axios = useAxios();
const emit = defineEmits(["close"]);
const props = defineProps({
  signup: {
    type: Boolean,
    required: true,
  },
  survey: {
    type: Array,
    required: true,
  },
});
const { signup, survey } = props;
let isSignup = ref(signup);
let errorEmailText: Ref<string> = ref("");
let errorNameText: Ref<string> = ref("");
let errorPasswordText: Ref<string> = ref("");
let email: Ref<string> = ref("");
let name: Ref<string> = ref("");
let password: Ref<string> = ref("");
let isValidEmail: Ref<boolean> = ref(true);
let isValidName: Ref<boolean> = ref(true);
let isValidPassword: Ref<boolean> = ref(true);

onMounted(() => {});
async function auth() {
  validateEmail();
  validatePassword();
  validateName();
  if (isValidName && isValidPassword && isValidEmail.value) {
    try {
      if (isSignup.value) {
        const data = {
          name: name.value,
          email: email.value,
          password: password.value,
          survey: survey,
        };

        const response = await axios.post("/auth/signup", data);
        if (response) {
          email.value = "";
          name.value = "";
          password.value = "";
          localStorage.setItem("token", response.data.token);
          emit("close");
        }
      } else {
        const data = { email: email.value, password: password.value };

        const response = await axios.post("/auth/login", data);
        if (response) {
          email.value = "";
          name.value = "";
          password.value = "";
          localStorage.setItem("token", response.data.token);
        }
      }
    } catch (error) {
      alert(error);
    }
  }
}

function validateEmail() {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  isValidEmail.value = EMAIL_REGEXP.test(email.value);
  if (!isValidEmail.value) {
    errorEmailText.value = "*Invalid email";
  } else {
    errorEmailText.value = "";
  }
}
function validateName() {
  if (!name.value) {
    isValidName.value = false;
    errorNameText.value = "*Please enter your name";
  } else {
    isValidName.value = true;
    errorNameText.value = "";
  }
}
function validatePassword() {
  if (password.value && password.value.length >= 4) {
    isValidPassword.value = true;
    errorPasswordText.value = "";
  } else {
    isValidPassword.value = false;
    errorPasswordText.value = "*Must be more than 4 characters";
  }
}
</script>
<style scoped lang="scss">
@use "@/assets/variables";
.signup,
.signin {
  z-index: 10;
  width: 600px;
  min-height: 300px;
  background-color: white;
  box-shadow: 0 0 30px -10px variables.$secondary-color;
  border-radius: 20px;
  margin: 30px auto;
  padding: 60px 0;
  position: relative;
}
.title {
  font-size: 30px;
  text-align: center;
}
.social {
  display: flex;
  justify-content: center;
  gap: 30px;
  img {
    width: 40px;
    height: 40px;
    display: block;
  }
}
.change-btn {
  color: variables.$secondary-color;
  text-decoration: underline;
  position: absolute;
  left: 20px;
  top: 20px;
}
.form {
  width: 500px;
  margin: 0 auto;
}
.button {
  width: 100%;
}
</style>
