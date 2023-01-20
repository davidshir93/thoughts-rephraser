<template>
  <button
    type="button"
    :disabled="disabled"
    :class="classes"
    @click="onClick"
    :style="style"
  >
    {{ label }}
  </button>
</template>

<script>
import "./button.scss";
import { reactive, computed } from "vue";

export default {
  name: "my-button",

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["click"],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "tr-button": true,
        text: true,
        "tr-button--primary": props.primary,
        "tr-button--secondary": !props.primary,
        [`tr-button--${props.size || "medium"}`]: true,
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
