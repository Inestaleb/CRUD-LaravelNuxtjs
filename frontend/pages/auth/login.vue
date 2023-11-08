<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-200	">
        <div class="max-w-md w-full px-4 py-8 bg-white shadow rounded-lg">
            <h1 class="text-2xl font-semibold mb-4  text-center	text-sky-700">Login</h1>

            <form @submit.prevent="login">

                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input type="email" id="email" v-model="form.email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                        :class="{ 'border-red-500': errors.email }" required />
                    <div class="text-red-500 text-sm" v-if="errors.email">
                        {{ errors.email[0] }}
                    </div>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-600">Password</label>
                    <input type="password" id="password" v-model="form.password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                        :class="{ 'border-red-500': errors.password }" required />
                    <div class="text-red-500 text-sm" v-if="errors.password">
                        {{ errors.password[0] }}
                    </div>
                </div>
                <div class="mt-6">
                    <input type="submit"
                        class="w-full px-4 py-2 text-white rounded-md focus:outline-none bg-sky-500 hover:bg-sky-700"
                        value="log in
" />

                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    middleware:'guest',
    data() {
        return {
            form: {
               
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async login() {
            await this.$auth.login({ data: this.form });
                this.$router.push({ name: 'index' });

        }
    }
}
</script>