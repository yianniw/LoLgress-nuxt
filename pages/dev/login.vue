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
    await navigateTo({ path: '/dev/' });
  } catch(error: any) {
    console.log(error);
  }
}
</script>

<template>
  <YCard class="login-card" color="var(--primary)">
    <div class="form pa-8">
      <YInput v-model="email" class="input"></YInput>
      <YInput v-model="password" class="input"></YInput>
      <YButton @click="login()" class="btn">Continue</YButton>
    </div>
  </YCard>
</template>

<style scoped>
.login-card {
  justify-self: center;
  max-width: 800px;
  margin: auto;
}

.input {
  margin-block: 16px;
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-inset);

  &:hover {
    outline: 2px solid var(--primary-light);
  }

  &:focus-within {
    border: 1px solid var(--border-focus);
    outline: 1px solid var(--border-focus);
    box-shadow: var(--shadow);
  }
}

.btn {
  margin-inline: auto !important;
}
</style>