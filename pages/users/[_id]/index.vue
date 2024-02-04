<template>
  <div class="text-center m-10 p-10 relative">
    <div class="user" v-if="user">
      <div class="user-info">
        <div class="avatar">
          <img v-if="user.avatar" :src="user.avatar" alt="" />
          <img v-else src="/avatar-male-man.svg" alt="" />
        </div>
        <div class="text-left">
          <h3 class="name">{{ user.name }}</h3>
          <div class="email">Email: {{ user.email }}</div>
          <div class="created">
            Created: {{ new Date(user.createdAt).toDateString() }}
          </div>
        </div>
        <div class="action">
          <button @click="edit = true"><img src="/edit.svg" alt="" /></button>
          <button @click="deleteUser()">
            <img src="/trash-bin.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="table-data">
        <div class="plan" v-if="user.generatedPlan">
          <h3>Generated plan for you</h3>
          <p>{{ user.generatedPlan }}</p>
        </div>
        <div class="achievents">
          <div v-for="category in user.achievements">
            <img src="/trophy.svg" alt="" />
            <h1 class="category">
              {{ category.category.split("_").join(" ").toUpperCase() }}
            </h1>
            <div class="achievement-list">
              <div v-for="item in category.achievements">
                <h2>
                  {{ item.customId.split("_").join(" ").toUpperCase() }}
                </h2>
                <img src="/achievement.svg" alt="" />

                <div>Current value: {{ item.currentValue }}</div>
                <div>Condition max: {{ item.conditionMax }}</div>
                <div>Level: {{ item.level }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditUser
      class="mx-auto"
      :user="user"
      v-if="edit"
      @close="edit = false"
      @update="
        edit = false;
        getUser();
      "
    />
  </div>
</template>
<script setup lang="ts">
let edit = ref(false);
let axios: any = null;
const id: Ref<any> = ref(null);
let user = ref();
onMounted(() => {
  const route = useRoute();
  id.value = route.params._id;
  axios = useAxios();
  getUser();
});
async function getUser() {
  try {
    const response = await axios.get("/api/users/" + id.value);
    if (response) {
      user.value = response.data;
      console.log(response.data);
    }
  } catch (error) {
    alert(error);
  }
}
async function deleteUser() {
  try {
    const response = await axios.delete(
      "/api/users/" + id.value + "?type=hard"
    );
    if (response) {
      useRouter().push({ path: "/users" });
    }
  } catch (error) {
    alert(error);
  }
}
</script>
<style scoped lang="scss">
@use "@/assets/variables";
.user {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  .user-info {
    display: flex;
    gap: 30px;
    .action {
      position: absolute;
      right: 0;
      top: 0;
      button {
        img {
          width: 30px;
          margin: 0 10px;
        }
      }
    }
    .avatar {
      width: 300px;
      height: 300px;
    }
    .name {
      margin-bottom: 20px;
    }
  }
}
.achievents {
  text-align: center;
  width: 100%;
  margin-top: 30px;
  > div > img {
    width: 150px;
    margin: 0 auto;
  }
  .achievement-list {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    img {
      width: 60px;
      margin: 0 auto;
    }
  }
}
</style>
