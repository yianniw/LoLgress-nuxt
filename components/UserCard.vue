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
  <Card :title="`${store.getUser().gameName}#${store.getUser().tagLine}`" align="center">
  <!-- <Card :title="`WWWWWWWWWWWWWWWW#WWWWW`" align="center"> -->
    <div class="root pa-2">

      <div class="profile-icon-container">
        <img :src="getProfileIcon()" />
        <div class="profile-level-badge">
          <!-- TODO: animate on page load -->
          <span title="Summoner Level">{{ store.getUser().info.summonerLevel }}</span>
        </div>
      </div>

      <div class="mastery-score-container text-center">
        <span>{{ score }} / {{ maxScore }}</span>
        <div class="progress-bar mx-2">
          <div class="progress-indicator" :style="{ width: (score / maxScore) * 100 + '%'}" />
        </div>
        <span>Mastery Score</span>
      </div>

    </div>
  </Card>
</template>

<style scoped>
.root {
  display: flex;
  gap: 12px;
  align-items: center;
}

.profile-icon-container {
  position: relative;
  min-height: 96px;
  max-height: 96px;
  min-width: 96px;
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

.mastery-score-container {
  display: flex;
  flex-direction: column;
  min-height: 96px;
  max-height: 96px;
  
  width: 100%;
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
}
</style>