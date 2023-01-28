<template>
  <div class="app-content-wrapper">
    <Navbar />
    <router-view v-if="authIsReady" />
    <LoadingSpinner v-else />
  </div>
</template>

<script>
import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const authIsReady = computed(() => store.state.authIsReady);
    return { authIsReady };
  },
  components: { Navbar, LoadingSpinner },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:wght@300;400;500;600&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("./style.scss");
.app-content-wrapper {
  margin: 0.66rem auto;
  max-width: 1312px;
  padding: 1.33rem;
}
</style>
