<template>
  <div>
    <Transition name="fade">
      <TrModal
        v-show="showModal"
        title="Password Reset"
        :content="`Password reset email was sent to: ${email}`"
        btnText="Back Home"
        @close-modal="closeModal"
      ></TrModal>
    </Transition>
    <Transition name="fade">
      <LoadingSpinner v-show="isLoading" />
    </Transition>
    <form class="auth-form">
      <h3>Forgot Password</h3>

      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required />

      <TrButton @click="handleSubmit" label="Reset Password" />
      <Transition name="fade">
        <div v-if="error" class="error caption">{{ error }}</div>
      </Transition>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TrButton from "@/components/TrButton.vue";
import TrModal from "@/components/TrModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  setup() {
    const email = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    const showModal = ref(false);
    const isLoading = ref(false);

    const closeModal = () => {
      showModal.value = false;
      email.value = "";
      router.push("/");
    };

    const handleSubmit = async () => {
      try {
        isLoading.value = true;
        await store.dispatch("resetPassword", {
          email: email.value,
        });
        isLoading.value = false;
        showModal.value = true;
        // redirect the logged in user back to home page
        // router.push("/");
      } catch (e) {
        console.log(e.message);
        isLoading.value = false;
        error.value = e.message;
      }
    };

    return {
      handleSubmit,
      email,
      error,
      showModal,
      closeModal,
      isLoading,
    };
  },
  components: {
    TrButton,
    TrModal,
    LoadingSpinner,
  },
};
</script>
