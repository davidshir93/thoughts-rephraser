<template>
  <div class="thought-card">
    <TrTabs :tabs="tabs" @click="changeTab"></TrTabs>
    <Transition name="fade" mode="out-in">
      <p v-if="selectedTab === 'original'">{{ original }}</p>
      <p v-else-if="selectedTab === 'rephrased'">{{ rephrased }}</p>
    </Transition>
    <TrPill
      v-for="word in Object.keys(distortions)"
      :key="word.id"
      :label="DISTORTIONS_NAMES[word]"
      state="regular"
    ></TrPill>
    <p class="caption">Created by {{ fullName }}</p>
  </div>
</template>

<script>
import TrPill from "./TrPill.vue";
import TrTabs from "./TrTabs.vue";
import { TABS_THOGUHT_STATES, DISTORTIONS_NAMES } from "../const";
import { ref, computed } from "vue";

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
    firstName: String,
    lastName: String,
  },
  emits: ["click"],
  setup(props) {
    const selectedTab = ref("original");
    function changeTab(newTab) {
      selectedTab.value = newTab;
    }

    const fullName = computed(() => props.firstName + " " + props.lastName);

    return {
      selectedTab,
      changeTab,
      DISTORTIONS_NAMES,
      tabs: ref(JSON.parse(JSON.stringify(TABS_THOGUHT_STATES))),
      fullName,
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
  // width: 400px;
  padding: 1.33rem;
  background-color: var(--secondary-color);
  border-radius: 1rem;
  transition: all 300ms ease;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
