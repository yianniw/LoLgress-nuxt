// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-icon',
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
