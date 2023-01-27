<template>
  <form class="auth-form">
    <h3>Forgot Password</h3>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <TrButton @click="handleSubmit" label="Reset Password" />
    <div v-if="error" class="error">{{ error }}}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TrButton from "@/components/TrButton.vue";

export default {
  setup() {
    const email = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch("resetPassword", {
          email: email.value,
        });
        // redirect the logged in user back to home page
        router.push("/");
      } catch (e) {
        console.log(e.message);
        error.value = e.message;
      }
    };

    return { handleSubmit, email, error };
  },
  components: {
    TrButton,
  },
};
</script>
