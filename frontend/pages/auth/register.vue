<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-200	">
        <div class="max-w-md w-full px-4 py-8 bg-white shadow rounded-lg">
            <h1 class="text-2xl font-semibold mb-4 text-center	text-sky-700	">Registration</h1>

            <form @submit.prevent="register">

                <div class="mb-4">
                    <label for="name" class="block text-gray-600">Name</label>
                    <input type="text" id="name" v-model="form.name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                        :class="{ 'border-red-500': errors.name }" required />
                    <div class="text-red-500 text-sm" v-if="errors.name">
                        {{ errors.name[0] }}
                    </div>
                </div>
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
                        class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        value="Register
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
                name: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async register() {
            if (!this.form.email || !this.form.password) {

                return;
            }

            try {
                await this.$axios.post('/auth/register', this.form);
                await this.$auth.login({ data: this.form });
                this.$router.push({ name: 'index' });
            } catch (error) {

                console.error('Registration failed:', error);

            }

        }
    }
}
</script>