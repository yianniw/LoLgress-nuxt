// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-scheduler'
  ],
  
  css: [
    '~/assets/css/main.css',
    '~/assets/css/spacing/index.css',
    '~/assets/css/transitions.css'
  ],

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    // Private keys are only available on the server
    x_riot_token: process.env.X_RIOT_TOKEN,

    // Public keys that are exposed to the client
    public: {
      apiBase: '',
    }
  },

  // hot-reload when modifying css in <style> sections
  vite: {
    server: {
      watch: {
        usePolling: true, 
      },
    },
  },

  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/dev/login',
      callback: '/dev/confirm',
      exclude: ['/', '/about', '/users/*']
    },
  }
  
})
