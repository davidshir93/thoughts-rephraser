<template>
  <div class="home">
    <TrButton :disabled="!user" label="Add A Thought" />
    <ThoughtCard
      v-for="thought in thoughts"
      :key="thought.id"
      :id="thought.id"
      :original="thought.original"
      :rephrased="thought.rephrased"
      :distortions="thought.distortions"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ThoughtCard from "@/components/ThoughtCard.vue";
import TrButton from "@/components/TrButton/Button.vue";

import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();

    const thoughts = computed(() => store.state.thoughts);
    const user = computed(() => store.state.user);
    return {
      thoughts,
      user,
    };
  },
  name: "HomeView",
  components: {
    ThoughtCard,
    TrButton,
  },
};
</script>
