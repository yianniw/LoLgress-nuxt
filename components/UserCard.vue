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
    <div class="mastery-score pa-2">
      {{ score }} / {{ maxScore }}
      <div class="progress-bar">
        <div class="progress-indicator" :style="{ width: (score / maxScore) * 100 + '%'}">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#user-card {
  display: flex;
  gap: 8px;
}

.profile-icon {
  height: 80px;
  width: 80px;
  background-color: var(--neutral);
  border-radius: 50%;
  padding: 4px;
  box-shadow: var(--shadow);
}

.mastery-score {
  background-color: var(--neutral);
  border-radius: 10px;
}

.progress-bar {
  width: 200px;
  border: 1px solid #2A9D8F;
  box-shadow: var(--shadow);
}

.progress-indicator {
  background: #2A9D8F;
  height: 16px;
}
</style>