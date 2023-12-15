<script setup>
const store = useStore();
const champs = ref(store.getChamps());
const props = defineProps({
  contentHeight: String
});

const getSortSymbol = (sortMethod) => {
  if(store.getUser().sortMethod !== sortMethod)
    return;

  if(store.getUser().sortMethod === 'name')
    return store.getUser().sortOrder === 'ascending' ? 'A→Z' : 'Z→A';

  return store.getUser().sortOrder === 'ascending' ? '↑' : '↓';
}

const getProgress = (champ) => {
  const mastered = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/star-filled.png';
  const empty = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/milestone-empty.png';
  const filled = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/milestone-filled.png';

  if(champ.championLevel === 7) {
    return `<img src='${mastered}' title='Mastered!' />`
  } else if(champ.championLevel === 6) {
    let tokensLeft = champ.tokensEarned;
    let html = '';
    for(let i = 0; i < 3; i++) {
      html += `<img src='${tokensLeft-- > 0 ? filled : empty}' title='${champ.tokensEarned}/3 tokens earned' />`
    }
    return html;
  } else if(champ.championLevel === 5) {
    let tokensLeft = champ.tokensEarned;
    let html = '';
    for(let i = 0; i < 2; i++) {
      html += `<img src='${tokensLeft-- > 0 ? filled : empty}' title='${champ.tokensEarned}/2 tokens earned' />`
    }
    return html;
  } else if(champ.championLevel === 0) {
    return "No Progress"
  } else {
    return `${champ.championPoints} / ${champ.championPoints + champ.championPointsUntilNextLevel}`
  }
}

const getChestGrantedSymbol = (champ) => {
  const available = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-loot/global/default/assets/profile_icons/chest_available.png';
  const granted = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-loot/global/default/assets/profile_icons/chest_unavailable.png';

  return champ.chestGranted ? `<img src='${granted}' title='Already Earned'/>` : `<img src='${available}' title='Chest Available'/>`;
}
</script>

<template>
  <Card title="Champion Table" align="center">
    <div class="root" :style="{ height: contentHeight }">
      <table class="champ-table">
        <tr>
          <th @click="store.sortChamps('name')"></th>
          <th v-if="!store.screen.isMobile" @click="store.sortChamps('name')">Name {{ getSortSymbol('name') }}</th>
          <th @click="store.sortChamps('progress')">Progress {{ getSortSymbol('progress') }}</th>
          <th @click="store.sortChamps('points')">Points {{ getSortSymbol('points') }}</th>
          <th @click="store.sortChamps('level')">Level {{ getSortSymbol('level') }}</th>
          <th>Chest?</th>
        </tr>
        <tbody>
          <tr v-for="champ in champs">
            <td class="champ-icon-td"><img class="champ-icon" :src="store.getChampIcon(champ.championId)" /></td>
            <td v-if="!store.screen.isMobile" class="champ-name-td">{{ champ.championInfo.name }}</td>
            <td><div class="champ-prog-td" v-html="getProgress(champ)" /></td>
            <td class="champ-data-td">{{ champ.championPoints }}</td>
            <td class="champ-data-td">{{ champ.championLevel }}</td>
            <td><div class="champ-chest-td" v-html="getChestGrantedSymbol(champ)" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style scoped>
.root {
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.champ-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & th {
    position: sticky;
    top: 0;
    border-right: 1px solid var(--border);
    background-color: var(--primary-darker);
  }

  & th:last-child {
    border-right: none;
  }

  & th:hover {
    background-color: var(--primary-light);
    cursor: pointer;
    user-select: none;
    transition: 0.225s;
  }

  & td {
    align-items: center;
  }

  & th,
  & td {
    border-bottom: 1px solid var(--border);
  }

  & tr:nth-child(even) {
    background-color: var(--primary-dark);
  }
  
  & tr:hover {
    background-color: var(--primary-light);
  }
}

.champ-icon-td {
  height: 36px;
  width: 36px;
}

.champ-icon {
  display: block;
  height: inherit;
  width: inherit;
}

.champ-data-td {
  text-align: center;
}

.champ-prog-td {
  display: flex;
  gap: 5px;
  justify-content: center;

  &:deep() img {
    height: 20px;
    width: 20px;
  }
}

.champ-chest-td {
  display: flex;
  justify-content: center;
}
</style>