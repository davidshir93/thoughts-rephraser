<template>
  <div class="home">
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
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();

    const thoughts = computed(() => store.state.thoughts);

    return {
      thoughts,
    };
  },
  name: "HomeView",
  components: {
    ThoughtCard,
  },
};
</script>
