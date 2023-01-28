<template>
  <form action="handleSumbit" class="new-thoguht-form">
    <div class="inputs-container">
      <div class="right-side original">
        <p>Original</p>
        <p class="caption">
          Write down what you are thinking now, no filters please :)
        </p>
        <textarea
          name="original"
          id="original"
          rows="10"
          @input="onOriginalInputChange"
        ></textarea>
      </div>
      <div class="left-side rephrased">
        <p>Rephrased</p>
        <p class="caption">
          Try to rephrased your original thought to get rid of those cognitive
          distortions!
        </p>
        <textarea
          name="rephrased"
          id="rephrased"
          rows="10"
          @input="onRephrasedInputChange"
        ></textarea>
      </div>
    </div>
    <div class="distortions-tags-container">
      <div class="left-side">
        <TransitionGroup name="list">
          <TrPill
            v-for="word in originalDistortions"
            :key="word"
            :label="DISTORTIONS_NAMES[word]"
            state="regular"
          ></TrPill>
        </TransitionGroup>
      </div>
      <div class="right-side">
        <TransitionGroup name="list">
          <TrPill
            v-for="word in rephrasedDistortions"
            :key="word"
            :label="DISTORTIONS_NAMES[word]"
            state="regular"
          ></TrPill>
        </TransitionGroup>
      </div>
    </div>
    <div class="bottom">
      <div class="right-side">
        <Transition name="fade">
          <div v-if="error" class="error caption">{{ error }}</div>
        </Transition>
        <tr-button label="Submit" @click="handleSumbit" />
      </div>
    </div>
  </form>
</template>

<script>
import TrPill from "./TrPill.vue";
import TrButton from "./TrButton.vue";
import { DISTORTIONS_DICTIONARY, DISTORTIONS_NAMES } from "../const";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "NewThoughtForm",
  components: {
    TrPill,
    TrButton,
  },
  emits: ["click"],
  setup() {
    const original = ref("");
    const rephrased = ref("");
    const originalDistortions = ref(new Set());
    const rephrasedDistortions = ref(new Set());

    const error = ref("");

    const keyWords = Object.keys(DISTORTIONS_DICTIONARY);
    const store = useStore();
    function checkDistortionsInText(source, text) {
      if (source === "original") originalDistortions.value.clear();
      if (source === "rephrased") rephrasedDistortions.value.clear();
      text.split(" ").forEach((word) => {
        keyWords.forEach((keyWord) => {
          if (keyWord === word) {
            if (source === "original") {
              originalDistortions.value.add(...DISTORTIONS_DICTIONARY[word]);
            } else if (source === "rephrased") {
              rephrasedDistortions.value.add(...DISTORTIONS_DICTIONARY[word]);
            }
          }
        });
      });
    }
    function onOriginalInputChange(event) {
      const stringToCheck = event.target.value;
      checkDistortionsInText("original", stringToCheck);
      original.value = stringToCheck;
    }
    function onRephrasedInputChange(event) {
      const stringToCheck = event.target.value;
      checkDistortionsInText("rephrased", stringToCheck);
      rephrased.value = stringToCheck;
    }
    const formIsValid = computed(() => {
      if (
        original.value &&
        rephrased.value &&
        rephrasedDistortions.value.size < 1
      )
        return true;
      return false;
    });
    function handleSumbit() {
      console.log("submitting form with");
      console.log("original", original.value);
      console.log("rephrased", rephrased.value);
      console.log("distortions", originalDistortions.value);
      if (formIsValid.value) {
        error.value = "";
        const distObj = {};
        originalDistortions.value.forEach((distortion) => {
          distObj[distortion] = "";
        });
        const payload = {
          original: original.value,
          rephrased: rephrased.value,
          distortions: distObj,
        };
        store.dispatch("addThought", payload);
      } else {
        error.value = "Please check the form";
      }
    }
    return {
      original,
      rephrased,
      originalDistortions,
      rephrasedDistortions,
      error,
      DISTORTIONS_NAMES,
      DISTORTIONS_DICTIONARY,
      onOriginalInputChange,
      onRephrasedInputChange,
      handleSumbit,
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
  .distortions-tags-container {
    display: flex;
    align-items: center;
    width: 100%;
    .left-side,
    .right-side {
      display: flex;
      gap: 0.66rem;
      flex-wrap: wrap;
      padding: 0.66rem 0;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
      align-items: center;
      gap: 0.66rem;
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
  transition: all 0.5s ease 0.3s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
