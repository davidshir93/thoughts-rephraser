<template>
  <nav>
    <h1>Thoughts Rephraser</h1>
    <template v-if="authIsReady">
      <!-- for all users -->
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <!-- for logged in users -->
      <div>
        <span v-text="user"></span>
        <button @click="handleLogout">Logout</button>
      </div>
      <!-- for logged out users -->
      <div>
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
      user: computed(() => store.state.user.email),
    };
  },
};
</script>
