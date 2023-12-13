<script setup>
const store = useStore();

const score = ref(0);
const maxScore = ref(0);

onMounted(() => {
  const getMasteryScore = () => {
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
    <div class="profile-icon-container">
      <img :src="getProfileIcon()" />
      <div class="profile-level-badge">
        <span title="Summoner Level">{{ store.getUser().info.summonerLevel }}</span>
      </div>
    </div>
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
  gap: 12px;
  align-items: center;
}

.profile-icon-container {
  position: relative;
  min-height: 96px;
  min-width: 96px;
  max-height: 96px;
  max-width: 96px;

  & img {
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
    border-radius: 50%;
    outline: 1px solid var(--border);
    padding: 4px;
    background-color: var(--neutral);
    box-sizing: border-box;
    box-shadow: var(--shadow);
  }

  & .profile-level-badge {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    bottom: -6px;
    left: 0;
    width: 100%;

    & span {
      user-select: none;
      font-size: 16px;
      text-align: center;

      background-color: rgba(40, 44, 52, .85);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding-inline: 8px;
      box-shadow: var(--shadow);
    }
  }
}

.arrow-left {
  width: 0; 
  height: 0; 
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent; 
  
  border-right: 10px solid var(--neutral); 
}

.arrow-right {
  width: 0; 
  height: 0; 
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent; 
  
  border-left: 10px solid var(--neutral);
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