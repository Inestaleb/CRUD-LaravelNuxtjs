<template>
  <div>
    <nav class="bg-blue-500 p-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div>
            <ul class="flex space-x-4">
              <nuxt-link to="/" class="text-white hover:text-gray-300 font-bold">My Nuxt App</nuxt-link>
              <nuxt-link to="/dashboard" v-if="authenticated" class="text-white hover:text-gray-300">Dashboard</nuxt-link>
              <nuxt-link to="/product" v-if="authenticated" class="text-white hover:text-gray-300">Product</nuxt-link>
            </ul>
          </div>
          <template v-if="authenticated">
            <div class="relative" @click="toggleDropdown">
              <button class="bg-blue-500 text-white px-3 py-2 rounded">
                {{ user.name }}
              </button>
              <div v-if="showDropdown" class="absolute right-0 mt-2 py-2 bg-white w-100 border border-gray-200 rounded-lg shadow-md z-50">
                <button @click="signout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                  Sign Out
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <ul class="flex space-x-4">
              <li><nuxt-link to="/auth/login" class="text-white hover:text-gray-300">Login</nuxt-link></li>
              <li><nuxt-link to="/auth/register" class="text-white hover:text-gray-300">Register</nuxt-link></li>
            </ul>
          </template>
          
          <!-- Logout button in the navbar -->
         

        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDropdown: false,
    }
  },
  methods: {
    signout() {
      this.$auth.logout();
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  }
}
</script>