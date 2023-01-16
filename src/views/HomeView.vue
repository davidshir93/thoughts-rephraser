<template>
  <div class="home">
    <ThoughtCard
      id="1"
      original="String"
      rephrased="String"
      :distortions="dis"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ThoughtCard from "@/components/ThoughtCard.vue";

export default {
  name: "HomeView",
  components: {
    ThoughtCard,
  },
  data() {
    return {
      dis: {
        blackAndWhiteThinking: ["total", "at all", "never"],
        catastrophizing: ["mess", "I'll never"],
        overgeneralizing: ["at all", "never"],
      },
    };
  },
};
</script>
