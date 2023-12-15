// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },

  modules: [
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
  
})
