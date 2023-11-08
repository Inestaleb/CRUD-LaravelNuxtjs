<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Edit Product</h2>
            <form @submit.prevent="addNewProduct">
                <div class="mb-4">
                    <label for="qte" class="block font-medium">qte:</label>
                    <input v-model="newProduct.qte" type="text" id="editqte" class="w-full border rounded-lg p-2"
                        name="qte">
                </div>
                <div class="mb-4">
                    <label for="name" class="block font-medium">Name:</label>
                    <input v-model="newProduct.name" type="text" id="editName" class="w-full border rounded-lg p-2"
                        name="name">
                </div>
                <div class="mb-4">
                    <label for="price" class="block font-medium">Price:</label>
                    <input v-model="newProduct.price" type="number" id="editPrice" class="w-full border rounded-lg p-2"
                        name="price">
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
                <button type="button" @click="cancelEdit"
                    class="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2">Cancel</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
export default {
    middleware:'auth',
    data() {
        return {
            products: [],
            newProduct: {
                name: '',
                price: 0,
                qte: ''
            }
        };
    },
    methods: {
        async addNewProduct() {
            try {
                const response = await this.$axios.post('/create', this.newProduct);
                const createdProduct = response.data;
                this.products.push(createdProduct);

                this.newProduct = {
                    name: '',
                    price: 0,
                    qte: ''
                };

                // Show a success alert
                await Swal.fire({
                    icon: 'success',
                    title: 'Product added successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$emit('close');
                window.location.reload();

            } catch (error) {
                console.error("Error adding new product:", error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the product',
                });
            }
        },

        cancelEdit() {
            this.$emit('close');
        }
    }
};
</script>
  