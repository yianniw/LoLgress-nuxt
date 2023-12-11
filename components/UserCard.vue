<script setup>
const store = useStore();

const score = ref(0);
const maxScore = ref(0);

onMounted(() => {
  const getMasteryScore = () => {
    // TODO: user data does not always include all champs
    store.getUser().champion.forEach(champ => {
      score.value += champ.championLevel;
      maxScore.value += 7;
    });
  };
  getMasteryScore();
})

const getProfileIcon = () => {
  return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${store.getUser().info.profileIconId}.png`
}
</script>

<template>
  <div id="user-card" class="pa-2">
    <img class="profile-icon" :src="getProfileIcon()" />
    <!-- TODO: player level badge -->
    <div class="mastery-score text-center pa-2">
      {{ score }} / {{ maxScore }}
      <div class="progress-bar">
        <div class="progress-indicator" :style="{ width: (score / maxScore) * 100 + '%'}" />
      </div>
      <!-- TODO: what should text do when it doesn't fit the screen? -->
      Total Mastery Score
    </div>
  </div>
</template>

<style scoped>
#user-card {
  display: flex;
  gap: 8px;
  align-items: center;
  max-height: 96px;
}

.profile-icon {
  background-color: var(--neutral);
  border-radius: 50%;
  padding: 4px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  overflow: hidden;
}

.mastery-score {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  background-color: var(--neutral);
  border-radius: 10px;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border);
}

.progress-bar {
  border: 1px solid #2A9D8F;
  box-shadow: var(--shadow);
}

.progress-indicator {
  background: #2A9D8F;
  height: 16px;
}
</style>