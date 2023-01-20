<template>
  <div :class="classes" @click="onClick" :style="style">
    {{ label }}
  </div>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "TrPill",

  props: {
    label: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      validator: function (value) {
        return ["regular", "hover", "crossed"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
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

<style scoped lang="scss">
.pill {
  border-radius: 247px;
  text-align: center;
  width: fit-content;

  background-color: white;
  padding: 4px 16px;
  border: 1px solid #000000;
}
.pill--hover,
.pill:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
}
.pill--crossed {
  text-decoration-line: line-through;
}
</style>
