<template>
  <div class="tabs-container">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="classes"
      @click="onClick"
      :style="style"
    >
      {{ tab.displayName }}
    </div>
  </div>
</template>

<script>
import "./tabs.scss";
import { reactive, computed } from "vue";

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
    return {
      classes: computed(() => ({
        pill: true,
        caption: true,
        [`pill--${props.state || "regular"}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit("click");
      },
    };
  },
};
</script>
