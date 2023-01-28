<template>
  <nav>
    <h1>Thoughts Rephraser</h1>
    <template v-if="authIsReady">
      <!-- for all users -->
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <!-- for logged in users -->
      <div v-if="userFullName">
        <span v-text="userFullName"></span>
        <button @click="handleLogout">Logout</button>
      </div>
      <!-- for logged out users -->
      <div v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
      <router-link to="/about">About</router-link>
    </template>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const handleLogout = () => {
      store.dispatch("logout");
    };

    const authIsReady = computed(() => store.state.authIsReady);

    return {
      handleLogout,
      authIsReady,
      userFullName: computed(() =>
        store.state.user?.firstName
          ? store.state.user?.firstName + " " + store.state.user?.lastName
          : ""
      ),
    };
  },
};
</script>
