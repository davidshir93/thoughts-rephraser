<template>
  <form action="handleSumbit" class="new-thoguht-form">
    <div class="inputs-container">
      <div class="right-side original">
        <p>Original</p>
        <textarea
          name="original"
          id="original"
          rows="10"
          @input="onInputChange"
        ></textarea>
      </div>
      <div class="left-side rephrased">
        <p>Rephrased</p>
        <textarea
          name="rephrased"
          id="rephrased"
          rows="10"
          @input="onInputChange"
        ></textarea>
      </div>
    </div>
    <div class="bottom">
      <div class="left-side">
        <TransitionGroup name="list">
          <TrPill
            v-for="word in distortions"
            :key="word"
            :label="DISTORTIONS_NAMES[word]"
            state="regular"
          ></TrPill>
        </TransitionGroup>
      </div>
      <div class="right-side">
        <tr-button label="Submit">Submit</tr-button>
      </div>
    </div>
  </form>
</template>

<script>
import TrPill from "./TrPill.vue";
import TrButton from "./TrButton.vue";
import { DISTORTIONS_DICTIONARY, DISTORTIONS_NAMES } from "../const";
import { ref } from "vue";
export default {
  name: "NewThoughtForm",
  components: {
    TrPill,
    TrButton,
  },
  emits: ["click"],
  setup() {
    const original = ref("original");
    const rephrased = ref("rephrased");
    const distortions = ref(new Set());
    function onInputChange(event) {
      console.log("check the words", event.target.value);
      const stringToCheck = event.target.value;
      const keyWords = Object.keys(DISTORTIONS_DICTIONARY);
      console.log("stringToCheck", stringToCheck);
      console.log(
        "Object.keys(DISTORTIONS_DICTIONARY)",
        Object.keys(DISTORTIONS_DICTIONARY)
      );
      if (stringToCheck.split(" ").some((word) => keyWords.includes(word))) {
        console.log("DISTORTION!!!");
      }
      stringToCheck.split(" ").forEach((word) => {
        keyWords.forEach((keyWord) => {
          if (keyWord === word) {
            distortions.value.add(...DISTORTIONS_DICTIONARY[word]);
          }
        });
      });
      console.log(distortions.value);
    }
    return {
      original,
      rephrased,
      distortions,
      DISTORTIONS_NAMES,
      DISTORTIONS_DICTIONARY,
      onInputChange,
    };
  },
};
</script>

<style scoped lang="scss">
.new-thoguht-form {
  width: 100%;
  width: 100%;
  padding: 1.33rem;
  background-color: var(--secondary-color);
  border-radius: 1rem;

  .inputs-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    transition: all 300ms ease;
    height: 100%;
  }
  & > * {
    width: 50%;
  }
  .left-side,
  .right-side {
    width: 50%;
    p {
      margin-bottom: 0.66rem;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    width: 100%;
    .left-side {
      display: flex;
      gap: 0.66rem;
      flex-wrap: wrap;
      padding: 0.66rem 0;
    }
    .right-side {
      display: flex;
      justify-content: flex-end;
    }
  }
}

textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// list transition

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
