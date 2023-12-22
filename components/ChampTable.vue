<script setup lang="ts">
const props = defineProps({
  contentHeight: String
});

const store = useStore();
const champUtil = useChampUtil();

const sortOrder = ref("descending");
const sortMethod = ref("points");
const champs = store.getUser().champion;

const sortChamps = (method: string) => {
  if(method === sortMethod.value) {
    sortOrder.value === "descending"
      ? sortOrder.value = "ascending"
      : sortOrder.value = "descending";
  } else {
    sortOrder.value = "descending";
  }

  sortMethod.value = method;
  champUtil.sortChamps(champs, sortMethod.value, sortOrder.value);
}

const getSortSymbol = (method: string) => {
  if(method !== sortMethod.value)
    return "";

  if(sortMethod.value === "name")
    return sortOrder.value === "ascending" ? "A→Z" : "Z→A";

  return sortOrder.value === "ascending" ? "↑" : "↓";
}

const getProgress = (champ: Champion) => {
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

const getChestGrantedSymbol = (champ: Champion) => {
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
          <th
            @click="sortChamps('name')"
            :class="`${sortMethod === 'name' ? 'selected' : ''} `"></th>
          <th
            @click="sortChamps('name')"
            :class="`${sortMethod === 'name' ? 'selected' : ''} optional`">
            Name
            <span class="optional">{{ getSortSymbol('name') }}</span>
          </th>
          <th
            @click="sortChamps('progress')"
            :class="`${sortMethod === 'progress' ? 'selected' : ''} `">
            Progress
            <span class="optional">{{ getSortSymbol('progress') }}</span>
          </th>
          <th
            @click="sortChamps('points')"
            :class="`${sortMethod === 'points' ? 'selected' : ''} `">
            Points
            <span class="optional">{{ getSortSymbol('points') }}</span>
          </th>
          <th
            @click="sortChamps('level')"
            :class="`${sortMethod === 'level' ? 'selected' : ''} `">
            Level
            <span class="optional">{{ getSortSymbol('level') }}</span>
          </th>
          <th
            @click="sortChamps('chest')"
            :class="`${sortMethod === 'chest' ? 'selected' : ''} `">
            Chest
            <span class="optional">{{ getSortSymbol('chest') }}</span>
          </th>
        </tr>
        <tbody>
          <tr v-for="champ in champs">
            <td class="champ-icon-td"><img class="champ-icon" :src="champUtil.getChampIcon(champ.championId)" /></td>
            <td class="champ-name-td optional">{{ champ.championInfo.name }}</td>
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

.selected {
  background-color: var(--primary-light) !important;
}

.optional {
  @media only screen and (max-width: 960px) {
    display: none;
  }
}
</style>