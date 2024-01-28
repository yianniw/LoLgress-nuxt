<script setup lang="ts">
const supabase = useSupabaseClient();
const user = ref();
const email = ref();

onMounted(async () => {
  const sessionResult = await supabase.auth.getSession();
  if(!sessionResult.data.session) return;
  user.value = sessionResult.data.session.user;
  email.value = sessionResult.data.session.user.email;
});

async function fetchChampionSummaries() {
  try{
    await $fetch('/api/actions/fetchChampionSummaries', {
      method: 'POST',
      body: { user: user.value }
    });
  } catch (error: any) { console.log(error); }
}

async function fetchChampionIcons() {
  try{
    await $fetch('/api/actions/fetchChampionIcons', {
      method: 'POST',
      body: { user: user.value }
    });
  } catch (error: any) { console.log(error); }
}

async function fetchProgMasteryIcons() {
  try{
    await $fetch('/api/actions/fetchProgMasteryIcons', {
      method: 'POST',
      body: { user: user.value }
    });
  } catch (error: any) { console.log(error); }
}

async function signOut() {
  const result = await supabase.auth.signOut();
  console.log(result);
  await navigateTo({ path: '/' });
}
</script>

<template>
  <div class="page">
    <div class="row">
      <YCard :header="{ title: 'Preferences'}" color="var(--primary)">
        <div class="pa-4">
          <div class="row">
            <span>{{ email }}</span>
            <div :style="{ flexGrow: 1 }" />
            <YButton @click="signOut()">Sign out</YButton>
          </div>
        </div>
      </YCard>

      <YCard :header="{ title: 'Actions' }" color="var(--primary)">
        <div class="pa-4">
          <div class="row">
            <span>Fetch Resources</span>
            <div :style="{ flexGrow: 1 }" /><YButton>Fetch Challenges Configuration</YButton>
          </div>
          <div class="row pt-4"><div :style="{ flexGrow: 1 }" /><YButton @click="fetchChampionSummaries()">Fetch Champion Summaries</YButton></div>
          <div class="row pt-4"><div :style="{ flexGrow: 1 }" /><YButton @click="fetchChampionIcons()">Fetch Champion Icons</YButton></div>
          <div class="row pt-4"><div :style="{ flexGrow: 1 }" /><YButton @click="fetchProgMasteryIcons()">Fetch ProgMastery Icons</YButton></div>
          <div class="row pt-4"><div :style="{ flexGrow: 1 }" /><YButton>Fetch All Resources</YButton></div>
        </div>
      </YCard>
    </div>

    <div class="row">
      <YCard color="var(--primary)">

      </YCard>
      <YCard color="var(--primary)">

      </YCard>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  padding-block: 16px;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  width: 100%;
  
  span {
    align-self: center;
  }
}
</style>