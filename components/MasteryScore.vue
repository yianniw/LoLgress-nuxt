<script setup lang="ts">
const store = useStore();

const score = ref({
  current: 0,
  max: 0,
  string: '',
});

const calcScores = () => {
  store.$user().champion.forEach((champ: Champion) => {
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
  <YCard color="var(--neutral)">
    <div class="text-center pa-2">
      <span>Mastery Score</span>
      <div class="progress-bar ma-2">
        <span>{{ score.current }} / {{ score.max }}</span>
        <div class="progress-indicator" :style="{ width: score.string }" />
      </div>
    </div>
  </YCard>
</template>

<style scoped>
.progress-bar {
  position: relative;
  border: 1px solid #2A9D8F;
  box-shadow: var(--shadow);

  & span {
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.progress-indicator {
  background: #2A9D8F;
  height: 16px;
  width: 10px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>