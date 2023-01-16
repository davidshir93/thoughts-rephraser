<template>
  <nav>
    <h1>Thoughts Rephraser</h1>
    <!-- for all users -->
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <!-- for logged in users -->
    <div>
      <span>Logged in as...</span>
      <button>Logout</button>
    </div>
    <!-- for logged out users -->
    <div>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {};
</script>
