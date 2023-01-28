<template>
  <div class="modal-container">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <TrButton @click="closeModal" :label="btnText" />
    </div>
  </div>
</template>

<script>
import TrButton from "./TrButton.vue";
export default {
  name: "TrModal",
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
  },
  components: {
    TrButton,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    return {
      closeModal() {
        emit("closeModal");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--overlay-darkness);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.66rem;
    background: var(--bg-color);
    padding: 1rem;
    border-radius: 1rem;
    button {
      margin-top: 0.66rem;
    }
  }
}
</style>
