<template>
  <div class="canvas-paper font-sans">
    <Navigation />
    <div class="home flex">
      <!-- Left Side -->
      <div class="sticky-nav w-1/2 flex flex-col min-h-full">
        <!-- Main Form -->
        <div class="flex-1">
          <MainForm 
            ref="mainForm" 
            @predictions-loaded="handlePredictionsLoaded" 
            @image-uploaded="handleImageUploaded" 
          />
        </div>
        <!-- Display Uploaded Image -->
        <div class="flex-1 p-10">
          <DisplayImage :imageData="uploadedImage" />
        </div>
      </div>

      <!-- Vertical Divider Line -->
      <div class="w-px"></div>

      <!-- Right Side -->
      <div class="w-1/2 p-10 flex flex-col">
        <!-- Top Part: Report Component -->
        <div class="flex-1">
          <Report
            ref="reportComponent"
            :brand="formData.brand"
            :model="formData.model"
            :year="formData.year"
            :damagePoints="damagePoints"
            :predictions="predictionsData" 
          />
          <div class="flex justify-center mt-4">
            <button @click="downloadReport" class="button-download-report">Download Report</button>
          </div>
        </div>
        <!-- Bottom Part: Display Image from API -->
        <div class="flex-5 p-10">
          <img :src="apiImage" class="max-w-full h-auto" alt="API Image" v-if="apiImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainForm from "@/components/Mainform.vue";
import DisplayImage from "@/components/UploadedImage.vue";
import Report from "@/components/Report.vue";
import Navigation from "@/components/Navigation.vue";
import axios from "axios";
import jsPDF from "jspdf";

export default {
  name: "Home",
  components: {
    MainForm,
    DisplayImage,
    Report,
    Navigation,
  },
  data() {
    return {
      uploadedImage: null,
      formData: {
        brand: "",
        model: "",
        year: "",
      },
      predictionsData: null,
      damagePoints: [],
      apiImage: "",
      reportVisible: false,
    };
  },
  methods: {
    handleImageUploaded(imageData) {
      this.uploadedImage = imageData;
    },
    handlePredictionsLoaded(data) {
      this.formData = {
        brand: data.brand,
        model: data.model,
        year: data.year
      };
      this.predictionsData = data.predictions;
      this.fetchApiImage(data.predictions.image_path);
      this.reportVisible = true; // Show the report and download button after fetching data
    },
    async fetchApiImage(imagePath) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/image/${imagePath}`, {
          responseType: "arraybuffer", // Ensure response is treated as binary data
        });

        // Convert binary data to base64 data URL
        const imageBase64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageDataURL = `data:image/jpeg;base64,${imageBase64}`;
        
        this.apiImage = imageDataURL; // Set the processed image data for display
      } catch (error) {
        console.error("Error fetching API image:", error);
      }
    },
    downloadReport() {
      const doc = new jsPDF();

      doc.setFontSize(12);
      doc.text("Report", 10, 10);
      doc.text(`Brand: ${this.formData.brand}`, 10, 20);
      doc.text(`Model: ${this.formData.model}`, 10, 30);
      doc.text(`Year: ${this.formData.year}`, 10, 40);
 // Count occurrences of each damage type
 let damageCounts = {
    scratch: 0,
    tyre_flat: 0,
    glass: 0,
    lamp_broken: 0,
    dent: 0,
    crack: 0,
  };

  this.predictionsData.results.forEach(result => {
    const damageType = result.name.replace(' ', '_'); // Ensure consistency in naming
    if (damageCounts.hasOwnProperty(damageType)) {
      damageCounts[damageType]++;
    }
  });

  // Add counts to the PDF
  let yPosition = 50;
  Object.keys(damageCounts).forEach((damage, index) => {
    doc.text(`${damage.replace('_', ' ')}: ${damageCounts[damage]}`, 10, yPosition);
    yPosition += 10;
  });

      doc.save("report.pdf");
    },
  },
};
</script>

<style scoped>
.canvas-paper {
  min-height: 100vh;
  position: relative;
  background-image: url('../assets/bg15.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home {
  flex: 1;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sticky-nav {
  position: sticky;
  top: 0;
  height: 100%;
}

.w-px {
  position: absolute;
  top: 65%;
  transform: translateY(-50%);
  width: 1px;
  height: 110%;
  background-color: #ccc;
  margin: 0 1rem;
}

.button-download-report {
  cursor: pointer;
  background-color: #3b74c3;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  width: 100%;
  max-width: 200px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.button-download-report:hover {
  background-color: #255fb3;
}
</style>
