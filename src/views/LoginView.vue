<template>
  <form class="auth-form">
    <h3>Login</h3>
    <p>Don't have an account? <router-link to="signup">signup</router-link></p>
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <TrButton @click="handleSubmit" label="Login" />
    <p>
      Forgot Password?
      <router-link to="forgot-password">click here</router-link>
    </p>

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
    const password = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      // console.log(email.value, password.value);
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        // redirect the logged in user back to home page
        router.push("/");
      } catch (e) {
        console.log(e.message);
        error.value = e.message;
      }
    };

    return { handleSubmit, email, password, error };
  },
  components: {
    TrButton,
  },
};
</script>
