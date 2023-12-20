<script setup>
const store = useStore();

const getProfileIcon = () => {
  return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${store.getUser().info.profileIconId}.png`
}
</script>

<template>
  <Card :title="`${store.getUser().gameName}#${store.getUser().tagLine}`" align="center">
  <!-- <Card :title="`WWWWWWWWWWWWWWWW#WWWWW`" align="center"> -->
    <div class="container pa-2">
      <div class="profile-icon-container">
        <img :src="getProfileIcon()" />
        <div class="profile-level-badge">
          <span title="Summoner Level">{{ store.getUser().info.summonerLevel }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.container {
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
</style>