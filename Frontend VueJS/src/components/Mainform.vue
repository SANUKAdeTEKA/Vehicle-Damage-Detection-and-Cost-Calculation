<template>
  <div class="max-w-md mx-auto mt-10 font-sans">
    <form @submit.prevent="handleSubmit" class="form-container shadow-md px-8 pt-6 pb-8 mb-4 resize">
      <!-- Image Upload Section -->
      <div class="mb-4">
        <h2 class="form-title">Upload Image</h2>
        <input
            ref="imageInput"
            @change="handleImageUpload"
            class="input-field"
            id="image"
            type="file"
        />
      </div>

      <!-- Form Fields -->
      <div class="mb-4">
        <label class="form-label" for="brand">
          Brand
        </label>
        <input
            v-model="form.brand"
            class="input-field"
            id="brand"
            type="text"
            placeholder="Brand"
        />
      </div>
      <div class="mb-4">
        <label class="form-label" for="model">
          Model
        </label>
        <input
            v-model="form.model"
            class="input-field"
            id="model"
            type="text"
            placeholder="Model"
        />
      </div>
      <div class="mb-4">
        <label class="form-label" for="year">
          Year
        </label>
        <input
            v-model="form.year"
            class="input-field"
            id="year"
            type="text"
            placeholder="Year"
        />
      </div>

      <!-- Submit Button -->
      <div class="flex items-center justify-between">
        <button class="submit-button" type="submit">
          Analyze
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      form: {
        brand: '',
        model: '',
        year: '',
        image: null // to store uploaded image file
      },
      predictions: null
    };
  },
  methods: {
    async handleSubmit() {
      // Handle form submission logic
      if (!this.file) {
        alert('Please select an image first.');
        return;
      }

      let formData = new FormData();
      formData.append('image', this.file);

      try {
        let response = await axios.post('http://127.0.0.1:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.predictions = response.data;
        console.log("Predicitons: " ,this.predictions)

        // Emit event to parent component with form data and predictions
        this.$emit('predictions-loaded', {
          brand: this.form.brand,
          model: this.form.model,
          year: this.form.year,
          predictions: this.predictions
        });
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    },
    handleImageUpload(event) {
      this.file = event.target.files[0];
      // Convert the selected file to a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result; // Store the data URL
        this.form.image = imageData; // Update form.image with data URL
        this.$emit('image-uploaded', imageData); // Emit event to parent component
      };
      reader.readAsDataURL(this.file);
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: rgba(255, 255, 255, 0.041); /* Maroon color with 80% opacity */
  backdrop-filter: blur(10px); /* Apply blur effect to the background */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  width: 500px; /* Set the width to 500px */
  height: auto; /* Set the height to 450px */
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #b0c4de; /* light steel blue color */
}

.input-field {
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: #f0f0f0; /* Off-white color */
}

.form-label {
  display: block;
  color: #f0f0f0; /* Off-white color */
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.submit-button {
  background-color: #3b74c3; /* Blue color */
  color: #f0f0f0; /* Off-white color */
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #255fb3; /* Slightly darker blue on hover */
}
</style>
