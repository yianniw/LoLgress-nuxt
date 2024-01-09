<script setup lang="ts">
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");

async function login() {
  try {
    await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    await navigateTo({ path: '/dev/dashboard' });
  } catch(error: any) {
    console.log(error);
  }
}
</script>

<template>
  <NuxtLayout name="default">
    <template v-slot:content>
      <div class="page">
        <input v-model="email"/>
        <input v-model="password"/>
        <button @click="login()">Sign in</button>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;

  align-items: center;
  justify-content: center;
}
</style>