<template>
  <div class="home">
    <TrButton :disabled="!user" label="Add A Thought" />
    <new-thought-form></new-thought-form>
    <div v-show="thoughtsLoaded" class="thoguhts-grid-container">
      <ThoughtCard
        v-for="thought in thoughts"
        :key="thought.id"
        :id="thought.id"
        :original="thought.original"
        :rephrased="thought.rephrased"
        :distortions="thought.distortions"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThoughtCard from "@/components/ThoughtCard.vue";
import TrButton from "@/components/TrButton.vue";
import NewThoughtForm from "@/components/NewThoughtForm.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const thoughts = computed(() => store.state.thoughts);
    const user = computed(() => store.state.user);

    const thoughtsLoaded = computed(() => store.state.thoughtsLoaded);

    return {
      thoughts,
      user,
      thoughtsLoaded,
    };
  },
  name: "HomeView",
  components: {
    ThoughtCard,
    TrButton,
    NewThoughtForm,
  },
};
</script>

<style lang="scss">
.thoguhts-grid-container {
  display: flex;
  gap: 1rem;
  margin: 1.33rem 0;
  flex-wrap: wrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
