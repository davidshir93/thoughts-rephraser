<template>
  <div class="home">
    <new-thought-form></new-thought-form>
    <div v-show="thoughtsLoaded" class="thoguhts-grid-container">
      <TransitionGroup name="list" class="thought-card">
        <ThoughtCard
          v-for="thought in thoughts"
          :key="thought.id"
          :id="thought.id"
          :original="thought.original"
          :rephrased="thought.rephrased"
          :distortions="thought.distortions"
          :firstName="thought.firstName"
          :lastName="thought.lastName"
          :createdBy="thought.createdBy"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThoughtCard from "@/components/ThoughtCard.vue";
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
    NewThoughtForm,
  },
};
</script>

<style lang="scss">
.thoguhts-grid-container {
  display: grid;
  margin: 1.33rem 0;
  gap: 1rem;
}

@media (min-width: 600px) {
  .thoguhts-grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .thoguhts-grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
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
