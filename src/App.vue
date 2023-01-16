<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/NavBar";

export default {
  components: { Navbar },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:wght@300;400;500;600&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1312px;
  margin: 0.66rem auto;
  overflow-x: hidden !important;
  padding: 1.33rem;
  background-color: rgb(225, 245, 255);
  border-radius: 1.33rem;
  width: 100%;
  height: calc(100vh - 2.33rem);
  position: relative;
}

/* navbar TODO: STYLE THIS */
nav {
  display: flex;
  align-items: center;
}
nav h1 {
  margin-right: auto;
}
nav a,
nav button,
nav span {
  margin-left: 20px;
}
nav a {
  color: #444;
  text-decoration: none;
  font-weight: bold;
}
nav span {
  color: #777;
}
button {
  background: #00dba4;
  border: 0;
  padding: 6px 10px;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
}

// TODO: Style this

/* forms */
label {
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
}
form button {
  display: block;
  margin-top: 20px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  box-sizing: border-box;
  font-size: 24px;
}

h1 {
  font-size: 2.33rem;
  text-align: center;
}

h2 {
  font-size: 1.66rem;
}

.caption {
  font-size: 0.66rem;
  line-height: 1rem;
}

/* On screens that are 870px or less */
@media screen and (max-width: 870px) {
  * {
    font-size: 16px;
  }
  #app {
    max-width: 640px !important;
  }
}

@media screen and (max-width: 500px) {
  * {
    font-size: 14px;
  }
  #app {
    max-width: 100%;
  }
}

@media screen and (max-width: 330px) {
  * {
    font-size: 14px;
  }
  #app {
    /* display: none; */
    padding: 0;
  }
  #app::before {
    content: "Please give me more space...";
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    text-align: center;
    z-index: 100;
  }
}
</style>
