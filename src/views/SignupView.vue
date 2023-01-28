<template>
  <form class="auth-form">
    <h3>Sign up</h3>
    <p>Already have an account? <router-link to="login">login</router-link></p>

    <label for="firstName">First Name:</label>
    <input type="text" name="firstName" v-model="firstName" required />

    <label for="lastName">Last Name:</label>
    <input type="text" name="lastName" v-model="lastName" required />

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <TrButton @click="handleSubmit" label="Sign up" />

    <Transition name="fade">
      <div v-if="error" class="error caption">{{ error }}</div>
    </Transition>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TrButton from "@/components/TrButton.vue";

export default {
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    const formFilled = computed(() => {
      if (firstName.value && lastName.value && email.value && password.value)
        return true;
      return false;
    });

    const handleSubmit = async () => {
      if (formFilled.value) {
        error.value = "";
        try {
          await store.dispatch("signup", {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
          });
          // redirect the logged in user back to home page
          router.push("/");
        } catch (e) {
          console.log(e.message);
          error.value = e.message;
        }
      } else {
        error.value = "Please fill out all the required fields";
      }
    };

    return {
      handleSubmit,
      firstName,
      lastName,
      email,
      password,
      error,
    };
  },
  components: {
    TrButton,
  },
};
</script>

<style lang="scss" scoped></style>
