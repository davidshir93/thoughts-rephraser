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
import { reactive, computed } from "vue";

export default {
  name: "TrButton",

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

<style scoped lang="scss">
.tr-button {
  padding: 12px 24px;
  border-radius: 3rem;
  border: 1px solid var(--text-color);
}

.tr-button:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
}

.tr-button--primary {
  background-color: var(--bg-color);
  color: var(--text-color);
}
.tr-button--secondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
</style>
