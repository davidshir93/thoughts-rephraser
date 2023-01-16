<template>
  <div :class="classes" @click="onClick" :style="style">
    {{ label }}
  </div>
</template>

<script>
import "./pill.css";
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
