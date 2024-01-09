<script setup lang="ts">
const supabase = useSupabaseClient();

async function signOut() {
  const result = await supabase.auth.signOut();
  console.log(result);
  await navigateTo({ path: '/' });
}
</script>

<template>
  <NuxtLayout name="default">
    <template v-slot:content>
      <div>dashboard</div>
      <button @click="signOut()">Sign out</button>
    </template>
  </NuxtLayout>
</template>

<style scoped>
</style>