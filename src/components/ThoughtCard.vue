<template>
  <div class="thought-card" :class="cardInEditMode ? 'edit-mode' : ''">
    <div class="editing-icons-container" v-if="editableCard">
      <i class="material-icons" @click="deleteThought">delete</i>
      <i class="material-icons" @click="editThought">edit</i>
    </div>
    <TrTabs :tabs="tabs" @click="changeTab"></TrTabs>
    <Transition name="fade" mode="out-in">
      <p v-if="selectedTab === 'original'" class="bold">{{ original }}</p>
      <p v-else-if="selectedTab === 'rephrased'" class="bold">
        {{ rephrased }}
      </p>
    </Transition>
    <div class="distortions-tags-container">
      <TrPill
        v-for="word in distortions"
        :key="word.id"
        :label="DISTORTIONS_NAMES[word]"
        state="regular"
      ></TrPill>
    </div>

    <p class="caption created-by">Created by {{ fullName }}</p>
  </div>
</template>

<script>
import TrPill from "./TrPill.vue";
import TrTabs from "./TrTabs.vue";
import { TABS_THOGUHT_STATES, DISTORTIONS_NAMES } from "../const";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ThoughtCard",
  components: {
    TrPill,
    TrTabs,
  },
  props: {
    id: String,
    original: String,
    rephrased: String,
    distortions: Object,
    createdBy: String,
    firstName: String,
    lastName: String,
  },
  emits: ["click"],
  setup(props) {
    const store = useStore();

    const selectedTab = ref("original");
    function changeTab(newTab) {
      selectedTab.value = newTab;
    }

    const fullName = computed(() => props.firstName + " " + props.lastName);
    const editableCard = computed(
      () => props.createdBy === store.state.user?.uid
    );

    const cardInEditMode = computed(
      () => store.state.currentThought?.id === props.id
    );

    const deleteThought = async () => {
      await store.dispatch("deleteThoguht", props.id);
    };

    const editThought = async () => {
      await store.dispatch("editThoguht", props.id);
    };

    return {
      selectedTab,
      changeTab,
      DISTORTIONS_NAMES,
      tabs: ref(JSON.parse(JSON.stringify(TABS_THOGUHT_STATES))),
      fullName,
      editableCard,
      deleteThought,
      editThought,
      cardInEditMode,
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
  padding: 1.33rem;
  padding-bottom: 3rem;
  background-color: var(--secondary-color);
  border-radius: 1rem;
  transition: all 300ms ease;
  height: 100%;
  position: relative;
  &.edit-mode {
    pointer-events: none;
    &::after {
      width: 100%;
      height: 100%;
      content: "Thought is in Edit Mode";
      z-index: 11;
      animation: fadeIn 300ms ease forwards;
      background-color: var(--bg-color);
      position: absolute;
      top: 0;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .editing-icons-container {
    opacity: 0;
    position: absolute;
    right: 0.66rem;
    top: 0.66rem;
    transition: opacity 300ms ease;
    display: flex;
    gap: 0.33rem;
    .material-icons {
      background: var(--bg-color);
      border-radius: 1rem;
      padding: 0.33rem;
      font-size: 0.66rem;
      cursor: pointer;
      transition: all 300ms ease;
      &:hover {
        background: var(--text-color);
        color: var(--bg-color);
      }
    }
  }
  &:hover {
    .editing-icons-container {
      opacity: 1;
    }
  }

  .distortions-tags-container {
    display: flex;
    gap: 0.33rem;
    flex-direction: revert;
    flex-wrap: wrap;
    justify-content: center;
  }

  .created-by {
    position: absolute;
    bottom: 1rem;
  }
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
