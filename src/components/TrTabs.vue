<template>
  <div class="tabs-container">
    <div
      v-for="tab in localTabs"
      :key="tab.name"
      class="tab caption"
      :class="{
        active: tab.state === 'active',
        bold: tab.state === 'active',
      }"
      @click="onClick(tab)"
    >
      {{ tab.displayName }}
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "TrPill",

  props: {
    tabs: {
      type: Array,
      default: () => [
        {
          name: "tab1",
          displayName: "Tab 1",
          state: "active",
        },
        {
          name: "tab2",
          displayName: "Tab 2",
          state: "inactive",
        },
        {
          name: "tab3",
          displayName: "Tab 3",
          state: "inactive",
        },
      ],
    },
  },

  emits: ["click"],

  setup(props, { emit }) {
    props = reactive(props);
    const localTabs = reactive(props.tabs);
    console.log(localTabs);
    return {
      localTabs,
      onClick(newTab) {
        localTabs.find((tab) => tab.name == newTab.name).state = "active";
        localTabs
          .filter((tab) => tab.name !== newTab.name)
          .map((tab) => (tab.state = "inactive"));
        emit("click", newTab.name);
      },
    };
  },
};
</script>

<style scoped lang="scss">
.tabs-container {
  display: flex;
  .tab {
    text-align: center;
    width: fit-content;
    padding: 4px 16px;
    cursor: pointer;
    border-bottom: 2px solid var(--secondary-color);

    transition: all 300ms ease-in-out;

    &.active {
      border-bottom: 2px solid var(--text-color);
    }
    &:hover {
      border-bottom: 2px solid var(--bg-color);
    }
  }
}
</style>
