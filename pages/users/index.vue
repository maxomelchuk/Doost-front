<template>
  <div class="text-center m-10 p-10">
    <div class="users" v-if="users">
      <div v-for="user in users" :to="'/users/' + user._id">
        <NuxtLink class="user" :to="'/users/' + user._id">
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
          </div></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
let axios: any = null;
let users = ref();
onMounted(() => {
  axios = useAxios();
  getUsers();
});
async function getUsers() {
  try {
    const response = await axios.get("/api/users");
    if (response) {
      users.value = response.data;
    }
  } catch (error) {
    alert(error);
  }
}
</script>
<style scoped lang="scss">
@use "@/assets/variables";
.users {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .user {
    margin: 20px 15px;
    display: flex;
    gap: 20px;
    border-radius: 30px;
    border: 2px solid variables.$secondary-color;
    width: 400px;
    cursor: pointer;
    padding: 10px;
    flex-basis: 25%;

    .avatar {
      width: 100px;
    }
    .name {
      margin-bottom: 20px;
    }
  }
}
</style>
