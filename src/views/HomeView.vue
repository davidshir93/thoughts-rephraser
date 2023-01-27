<template>
  <div class="home">
    <TrModal
      v-if="showModal"
      title="Test Modal"
      content="I hate you so much right now"
      btnText="Got it"
      @closeModal="closeModal"
    ></TrModal>
    <TrButton :disabled="!user" label="Add A Thought" />
    <new-thought-form></new-thought-form>
    <div class="thoguhts-grid-container">
      <ThoughtCard
        v-for="thought in thoughts"
        :key="thought.id"
        :id="thought.id"
        :original="thought.original"
        :rephrased="thought.rephrased"
        :distortions="thought.distortions"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThoughtCard from "@/components/ThoughtCard.vue";
import TrButton from "@/components/TrButton.vue";
import NewThoughtForm from "@/components/NewThoughtForm.vue";
import TrModal from "@/components/TrModal.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  setup() {
    const store = useStore();

    const thoughts = computed(() => store.state.thoughts);
    const user = computed(() => store.state.user);

    const showModal = ref(true);

    const closeModal = () => {
      console.log("close modal from home view");
      showModal.value = false;
    };
    return {
      thoughts,
      user,
      showModal,
      closeModal,
    };
  },
  name: "HomeView",
  components: {
    ThoughtCard,
    TrButton,
    NewThoughtForm,
    TrModal,
  },
};
</script>

<style lang="scss">
.thoguhts-grid-container {
  display: flex;
  gap: 1rem;
  margin: 1.33rem 0;
}
</style>
