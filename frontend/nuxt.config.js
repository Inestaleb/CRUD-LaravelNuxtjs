export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router:{
    middleware:[
      'clearValidationErrors',
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/mixins/validation',
    './plugins/mixins/user',
    './plugins/axios'
  ],
  auth: {
    strategies: {
      local: { 
        endpoints:{
           login:{
            url: 'auth/login', method:'post',propertyName:'token',
           },
           user:{
            url: 'me', method:'get',propertyName:'data'
           },
           logout:{
            url:'auth/logout',method:'get'
           }
        }
       },
      
    },
    redirect:{
       login:'auth/login',
       home:'/'
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",

  ],
  axios:{
    baseURL: 'http://127.0.0.1:8000/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS:true,
  }
}
