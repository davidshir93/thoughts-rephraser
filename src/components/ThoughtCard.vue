<template>
  <div class="thought-card">
    <p>{{ text }}</p>
    <TrPill
      v-for="word in Object.keys(distortions)"
      :key="word.id"
      :label="word"
      state="regular"
    ></TrPill>
  </div>
</template>

<script>
import TrPill from "../stories/Pill.vue";
export default {
  name: "ThoughtCard",
  components: {
    TrPill,
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
  gap: 16px;
}
</style>
