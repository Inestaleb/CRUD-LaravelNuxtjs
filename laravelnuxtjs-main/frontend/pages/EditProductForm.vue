<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Edit Product</h2>
            <form @submit.prevent="saveChanges">
                <div class="mb-4">
                    <label for="editName" class="block font-medium">qte:</label>
                    <input v-model="editedProduct.qte" type="text" id="editqte" class="w-full border rounded-lg p-2">
                </div>
                <div class="mb-4">
                    <label for="editName" class="block font-medium">Name:</label>
                    <input v-model="editedProduct.name" type="text" id="editName" class="w-full border rounded-lg p-2">
                </div>
                <div class="mb-4">
                    <label for="editPrice" class="block font-medium">Price:</label>
                    <input v-model="editedProduct.price" type="number" id="editPrice" class="w-full border rounded-lg p-2">
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
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
    props: {
        product: Object,
        products: Array,
    },

    data() {
        return {
            editedProduct: { ...this.product },
        };
    },

    methods: {
        async saveChanges() {
            try {
                await this.$axios.post(`/products/${this.editedProduct.id}`, this.editedProduct);
                const updatedProductIndex = this.products.findIndex(product => product.id === this.editedProduct.id);
                if (updatedProductIndex !== -1) {
                    this.products.splice(updatedProductIndex, 1, this.editedProduct);
                }

                await Swal.fire({
                    icon: 'success',
                    title: 'Product edit successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$emit('close');
                 
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },

        cancelEdit() {
            this.editedProduct = { ...this.product };
            this.$emit('close');
        },
    },
};
</script>

  