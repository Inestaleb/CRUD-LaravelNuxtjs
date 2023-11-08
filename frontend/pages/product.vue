<template>
    <div>
        <div class="text-center text-5xl font-bold mt-10 text-blue-600 ">
            <h1>Products</h1>
        </div>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="text-right  mt-10 mb-5">
                    <button @click="addProduct()"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">
                        Add New Product
                    </button>
                </div>
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">

                    <table class="min-w-full border-collapse block md:table">
                        <thead class="block md:table-header-group">
                            <tr
                                class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                <th
                                    class="bg-grey-300 p-2 text-blue-600 font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                    ID
                                </th>
                                <th
                                    class="bg-grey-300 p-2 text-blue-600 font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                    Quantité
                                </th>
                                <th
                                    class="bg-grey-300 p-2 text-blue-600 font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                    Name
                                </th>
                                <th
                                    class="bg-grey-300 p-2 text-blue-600 font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                    Price
                                </th>
                                <th
                                    class="bg-grey-300 p-2 text-blue-600 font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="block md:table-row-group">
                            <tr v-for="(product, index) in products" :key="index"
                                class="bg-slate-100 border border-grey-500 md:border-none block md:table-row cursor-pointer">
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">name</span>{{ product.id }}
                                </td>

                                <!-- Show image -->
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">Quantité</span>{{ product.qte }}
                                </td>

                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">name</span>{{ product.name }}
                                </td>

                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">price</span>{{ product.price }}
                                </td>
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <button @click="editProduct(product)"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                                        Edit
                                    </button>

                                    <button @click="doubleConfirmDelete(product.id)"
                                      class="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">
                                        Delete
                                    </button>
                                </td>
                                <EditProductForm v-if="showEditForm" :product="selectedProduct" :products="products"
                                    @close="closeEditForm" />
                                <addProductForm v-if="showAddForm" @close="closeAddForm" />
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import EditProductForm from './EditProductForm.vue';
import addProductForm from './addProductForm.vue'
export default {
    middleware:'auth',
    data() {
        return {
            products: [],
            showEditForm: false,
            showAddForm: false,
            selectedProduct: null,
        };
    },

    mounted() {
        this.fetchProducts();
    },

    methods: {
        async fetchProducts() {
            try {
                const response = await this.$axios.get("/products");
                this.products = response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        editProduct(product) {
            this.selectedProduct = { ...product };
            this.showEditForm = true;
        },
        addProduct() {

            this.showAddForm = true;
        },
        closeEditForm() {
            this.showEditForm = false;
        },
        closeAddForm() {
            this.showAddForm = false;
        },
        async doubleConfirmDelete(id) {
            const { value: confirm } = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d9534f',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (confirm) {
                
                this.deleteProduct(id);
            
               await Swal.fire({
                    icon: 'success',
                    title: 'Product deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              
            
            } else {
                
            }
        },

        async deleteProduct(id) {
            try {
                const response = await this.$axios.delete(`/products/${id}`);
                this.products = this.products.filter(product => product.id !== id);
            } catch (error) {
                console.error("Error deleting product:", error);

            }
        },


    },
    components: {
        EditProductForm,
        addProductForm
    },
};
</script>
