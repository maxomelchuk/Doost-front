<template>
  <div class="edit-popup">
    <Transition name="slide-up" mode="out-in">
      <div class="">
        <button class="close" @click="$emit('close')">X</button>
        <h2 class="title pb-[30px]">Edit account information</h2>

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
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorEmailText }}
            </div>
          </div>
          <div class="pt-[10px]">
            <p class="pb-1">New password</p>
            <input
              v-model="newPassword"
              @change="validatePassword()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidPassword }"
              placeholder="Enter your email"
              type="email"
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorPasswordText }}
            </div>
          </div>
          <div class="pt-[10px]">
            <p class="pb-1">Repeat password</p>
            <input
              v-model="repeatPassword"
              @change="validateRepeatPassword()"
              class="input pl-[12px]"
              :class="{ 'input-error': !isValidRepeatPassword }"
              placeholder="Enter your email"
              type="email"
            />
            <div class="textError absolute pl-[8px] pt-[4px]">
              {{ errorRepeatPasswordText }}
            </div>
          </div>
          <button class="button mt-[40px]" @click="updateUser()">Update</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const axios = useAxios();
const emit = defineEmits(["close", "update"]);
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const { user } = props;
let errorEmailText: Ref<string> = ref("");
let errorNameText: Ref<string> = ref("");
let errorPasswordText: Ref<string> = ref("");
let errorRepeatPasswordText: Ref<string> = ref("");
let email: Ref<string> = ref("");
let name: Ref<string> = ref("");
let newPassword: Ref<string> = ref("");
let repeatPassword: Ref<string> = ref("");
let isValidEmail: Ref<boolean> = ref(true);
let isValidName: Ref<boolean> = ref(true);
let isValidPassword: Ref<boolean> = ref(true);
let isValidRepeatPassword: Ref<boolean> = ref(true);

onMounted(() => {
  setData(user);
});
function setData(data: any) {
  email.value = data.email;
  name.value = data.name;
}
async function updateUser() {
  // validateEmail();
  // validatePassword();
  // validateName();
  if (isValidName && isValidPassword && isValidEmail.value) {
    try {
      const data: any = {
        name: name.value,
        email: email.value,
      };
      if (newPassword.value) {
        data["newPassword"] = newPassword.value;
      }

      const response = await axios.put("/api/users/" + user._id, data);
      if (response) {
        emit("update");
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
  if (newPassword.value && newPassword.value.length >= 4) {
    isValidPassword.value = true;
    errorPasswordText.value = "";
  } else {
    isValidPassword.value = false;
    errorPasswordText.value = "*Must be more than 4 characters";
  }
}

function validateRepeatPassword() {
  if (newPassword.value === repeatPassword.value) {
    isValidRepeatPassword.value = true;
    errorRepeatPasswordText.value = "";
  } else {
    isValidRepeatPassword.value = false;
    errorRepeatPasswordText.value = "*Passwords does not equal";
  }
}
</script>
<style scoped lang="scss">
@use "@/assets/variables";

.title {
  font-size: 30px;
  text-align: center;
}

.form {
  width: 500px;
  margin: 0 auto;
  text-align: left;
}
.button {
  width: 100%;
}
.edit-popup {
  position: absolute;
  width: 600px;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: white;
  padding: 60px 30px;
  border-radius: 30px;
  box-shadow: 0 0 30px -10px variables.$secondary-color;
}
.close {
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 30px;
  color: variables.$bg-gray;
}
</style>
