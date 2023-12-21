<script setup lang="ts">
const store = useStore();

const score = ref({
  current: 0,
  max: 0,
  string: '',
});

const calcScores = () => {
  store.getUser().champion.forEach((champ: Champion) => {
    score.value.max += 7;
    score.value.current += champ.championLevel;
  });

  // delay the value so CSS Transition property sees a change in the variable
  setTimeout(() => {
    let percent = Math.round(score.value.current / score.value.max * 100);
    score.value.string = percent + '%';
  }, 250);
};
calcScores();
</script>

<template>
  <div class="container text-center">
    <span>{{ score.current }} / {{ score.max }}</span>
    <div class="progress-bar mx-2">
      <div class="progress-indicator" :style="{ width: score.string }"/>
    </div>
    <span>Mastery Score</span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 96px;
  max-height: 96px;
  
  gap: 4px;
  background-color: var(--neutral);
  border-radius: 10px;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border);

  & span {
    padding-block: 4px;
  }
}

.progress-bar {
  border: 1px solid #2A9D8F;
  box-shadow: var(--shadow);
}

.progress-indicator {
  background: #2A9D8F;
  height: 16px;
  width: 10px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>