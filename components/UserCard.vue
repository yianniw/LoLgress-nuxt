<script setup lang="ts">
const store = useStore();

const getProfileIcon = () => {
  return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${store.$user().info.profileIconId}.png`
}

const refreshIcon = computed(() => timeRemaining.value <= 0 ? 'ic:baseline-update' : 'ic:baseline-update-disabled');

const timer = ref();
const timeRemaining = ref();
const timeRemainingString = computed(() =>  {
  if(timeRemaining.value <= 0) return 'Update Available!';
  return `Next Update: ${Math.floor(timeRemaining.value / 60)}:${(timeRemaining.value % 60) < 10 ? '0' : ''}${timeRemaining.value % 60}`;
});

onMounted(() => {
  function startCountdown() {
    const lastUpdate = new Date(store.$user().lastUpdate);
    const nextUpdate = new Date(lastUpdate.getTime() + (10 * 60000));

    timer.value = setInterval(function() {
        let delta = nextUpdate.getTime() - Date.now();
        timeRemaining.value = Math.floor(delta / 1000);
    }, 250);
  }

  startCountdown();
});

watch(timeRemaining, (remaining) => {
  if(remaining <= 0) {
    clearInterval(timer.value);
  }
});

async function refreshPage() {
  if(timeRemaining.value <= 0)
    reloadNuxtApp();
}
</script>

<template>
  <YCard :header="{ title: `${store.$user().gameName}#${store.$user().tagLine}` }" color="var(--primary)" class="">
    <div class="container pa-2">

      <div class="profile-icon-container">
        <img :src="getProfileIcon()" />
        <div class="profile-level-badge">
          <span title="Summoner Level">{{ store.$user().info.summonerLevel }}</span>
        </div>
      </div>

      <div class="refresh-container desktop">
        <YButton
          :icon="refreshIcon"
          :disabled="timeRemaining > 0"
          class="refresh-button"
          @click="refreshPage()"
        >
          Update
        </YButton>
        <span :style="{ fontSize: '12px' }">{{ timeRemainingString }}</span>
      </div>
      <MasteryScore class="mobile"/>
    </div>
  </YCard>
</template>

<style scoped>
.container {
  display: flex;
  gap: 12px;
}

.profile-icon-container {
  position: relative;

  @media only screen and (max-width: 960px) {
    min-height: 80px;
    max-height: 80px;
    min-width: 80px;
    max-width: 80px;
  }


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

    bottom: -2px;
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

.refresh-container {
  margin-block: auto;
  display: block;
  text-align: center;
  @media only screen and (min-width: 960px) {
    margin-inline: auto;
  }
}

.score-container {
  display: block;
  width: 100%;
}

@media only screen and (max-width: 960px) {
  .desktop {
    display: none;
  }

  .profile-icon-container {
    --mobile-size: 80px;
    min-height: var(--mobile-size);
    max-height: var(--mobile-size);
    min-width: var(--mobile-size);
    max-width: var(--mobile-size);
  }
}

@media only screen and (min-width: 960px) {
  .mobile {
    display: none;
  }

  .profile-icon-container {
    --desktop-size: 120px;
    min-height: var(--desktop-size);
    max-height: var(--desktop-size);
    min-width: var(--desktop-size);
    max-width: var(--desktop-size);
  }
}
</style>