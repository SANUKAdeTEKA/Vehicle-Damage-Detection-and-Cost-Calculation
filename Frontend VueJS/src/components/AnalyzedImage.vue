<template>
  <div class="p-10 border-b border-gray-300">
    <img :src="displayedImage" class="max-w-full h-auto" alt="API Image" />
    <p v-if="!apiImage" class="text-gray-700">Analyze an Image</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      apiImage: "", // Original API image URL
      defaultImage: require("../assets/nullimage.png"), // Default image URL
    };
  },
  computed: {
    displayedImage() {
      return this.apiImage ? this.apiImage : this.defaultImage;
    },
  },
  async created() {
    await this.fetchApiImage();
  },
  methods: {
    async fetchApiImage() {
      try {
        const response = await axios.get("https://example.com/api/image");
        this.apiImage = response.data.image_url; // Assuming API returns image URL
      } catch (error) {
        console.error("Error fetching API image:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
