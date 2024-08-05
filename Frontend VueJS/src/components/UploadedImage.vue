<template>
    <div class="max-w-md mx-auto mt-10">
      <div v-if="imageData">
        <img :src="imageData" alt="Uploaded Image" class="max-w-full mb-4" :style="imageStyles" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageData: {
        type: String,
        default: ''
      }
    },
    computed: {
      imageStyles() {
        if (this.imageData) {
          return {
            maxWidth: '1000px',
            maxHeight: '150px',
            width: 'auto',
            height: 'auto'
          };
        } else {
          return {};
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  