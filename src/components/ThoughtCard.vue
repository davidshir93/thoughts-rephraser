<template>
  <div class="thoguhts-grid-container">
    <div class="thought-card">
      <TrTabs></TrTabs>
      <p>{{ text }}</p>

      <TrPill
        v-for="word in Object.keys(distortions)"
        :key="word.id"
        :label="word"
        state="regular"
      ></TrPill>
    </div>
  </div>
</template>

<script>
import TrPill from "./TrPill.vue";
import TrTabs from "./TrTabs.vue";

export default {
  name: "ThoughtCard",
  components: {
    TrPill,
    TrTabs,
  },
  props: {
    id: Number,
    original: String,
    rephrased: String,
    distortions: Object,
  },
  data() {
    return {
      text: this.original,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.thought-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 416px;
  padding: 1.33rem;
  background-color: var(--secondary-color);
  border-radius: 1rem;
}
</style>
