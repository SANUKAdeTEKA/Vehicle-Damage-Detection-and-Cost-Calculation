<template>
  <div class="admin-panel">
    <!-- Navigation Bar -->
    <Navigation />

    <!-- Main Content: Divided into Left and Right Sections -->
    <div class="content flex">
      <!-- Left Side: Retrieve Form -->
      <div class="left-section">
        <form @submit.prevent="retrieveForm" class="form-container">
          <div class="mb-4">
            <label for="retrieve-id" class="block text-sm font-medium text-off-white">Retrieve Vehicle Information by ID</label>
            <input type="text" id="retrieve-id" class="input-field mt-1 p-2 w-full border rounded-md" v-model="retrieveId" placeholder="Vehicle ID" />
            <p v-if="errors.retrieveId" class="error">{{ errors.retrieveId }}</p>
          </div>
          <button type="submit" class="submit-button">Retrieve Vehicle Information</button>
          <button type="button" class="delete-button ml-4" @click="deleteForm">Delete Vehicle</button>
        </form>

        <!-- Display retrieved vehicle data -->
        <div v-if="retrievedData" class="form-container mt-6">
          <h3 class="text-off-white">Retrieved Vehicle Data:</h3>
          <p class="text-off-white">Brand: {{ retrievedData.name }}</p>
          <p class="text-off-white">Model: {{ retrievedData.description }}</p>
          <p class="text-off-white">Year: {{ retrievedData.price }}</p>
        </div>
      </div>

      <!-- Vertical Divider Line -->
      <div class="divider"></div>

      <!-- Right Side: Add/Update Form -->
      <div class="right-section">
        <form @submit.prevent="submitForm" class="form-container">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-off-white">Brand</label>
            <input type="text" id="name" class="input-field mt-1 p-2 w-full border rounded-md" v-model="formData.name" placeholder="Vehicle Brand" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-off-white">Model</label>
            <input type="text" id="description" class="input-field mt-1 p-2 w-full border rounded-md" v-model="formData.description" placeholder="Exact Vehicle Model" />
            <p v-if="errors.description" class="error">{{ errors.description }}</p>
          </div>

          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-off-white">Year</label>
            <input type="text" id="price" class="input-field mt-1 p-2 w-full border rounded-md" v-model="formData.price" placeholder="Year of Manufacture" />
            <p v-if="errors.price" class="error">{{ errors.price }}</p>
          </div>

          <button type="submit" class="submit-button">Add Vehicle to the Database</button>
          <button type="button" class="submit-button ml-4" @click="updateForm">Update Vehicle</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navigation from "@/components/Navigation.vue";

export default {
  name: 'AdminPanel',
  components: {
    Navigation
  },
  data() {
    return {
      formData: {
        name: '',
        price: '',
        description: ''
      },
      retrieveId: '',
      retrievedData: null,
      errors: {}
    };
  },
  methods: {
    validateInput() {
      const errors = {};
      if (!this.formData.name) errors.name = 'Name is required';
      if (!this.formData.price || isNaN(parseFloat(this.formData.price))) errors.price = 'Price is required and must be a number';
      if (!this.formData.description) errors.description = 'Description is required';
      return errors;
    },
    async submitForm() {
      const errors = this.validateInput();
      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      }

      try {
        await axios.post('http://127.0.0.1:8000/api/products', this.formData);
        console.log('Product added successfully');
        this.formData = { name: '', price: '', description: '' };
        this.errors = {};
      } catch (error) {
        console.error('An error occurred while adding the product:', error);
      }
    },
    async retrieveForm() {
      if (!this.retrieveId) {
        this.errors.retrieveId = 'Vehicle ID is required';
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${this.retrieveId}`);
        this.retrievedData = response.data;
        this.errors = {};
      } catch (error) {
        console.error('An error occurred while retrieving the product:', error);
        this.errors.retrieveId = 'Vehicle not found';
      }
    },
    async updateForm() {
      if (!this.retrieveId) {
        this.errors.retrieveId = 'Vehicle ID is required';
        return;
      }

      try {
        await axios.put(`http://127.0.0.1:8000/api/products/${this.retrieveId}`, this.formData);
        console.log('Product updated successfully');
        this.formData = { name: '', price: '', description: '' };
        this.errors = {};
      } catch (error) {
        console.error('An error occurred while updating the product:', error);
      }
    },
    async deleteForm() {
      if (!this.retrieveId) {
        this.errors.retrieveId = 'Vehicle ID is required';
        return;
      }

      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${this.retrieveId}`);
        console.log('Product deleted successfully');
        this.retrieveId = '';
        this.retrievedData = null;
        this.errors = {};
      } catch (error) {
        console.error('An error occurred while deleting the product:', error);
      }
    }
  }
};
</script>

<style scoped>
.admin-panel {
  font-family: 'Ubuntu', sans-serif;
  background-image: url('../assets/bg15.png'); /* Replace with your background image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: auto; /* Enable scrolling if content exceeds viewport */
}

.content {
  display: flex;
  height: calc(100vh - 60px); /* Adjust based on your navigation bar height */
}

.left-section {
  flex: 1;
  padding: 20px;
}

.right-section {
  flex: 1;
  padding: 20px;
}

.divider {
  transform: translateY(9%);
  width: 1px;
  background-color: #ccc;
  height: 75%;
  margin: 0 1rem; /* Adjust margin as needed */
}

.form-container {
  background-color: rgba(255, 255, 255, 0.041); /* Maroon color with 80% opacity */
  backdrop-filter: blur(10px); /* Apply blur effect to the background */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  width: 60%; /* Set the width to 100% to fill the container */
  height: auto; /* Set the height to auto */
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto; /* Center the form */
}

.text-off-white {
  color: #f8f8ff; /* Off-white color */
}

.error {
  color: rgb(255, 0, 89);
}

.input-field {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
}

.submit-button {
  padding: 10px 20px;
  background-color: #3b74c3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #255fb3; /* Slightly darker blue on hover */
}

.ml-4 {
  margin-left: 10px;
}

.delete-button {
  padding: 10px 20px;
  background-color: rgb(255, 126, 103); /* Red color using RGB */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: rgb(255, 0, 89); /* Slightly darker red on hover */
}
</style>