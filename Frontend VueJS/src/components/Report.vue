<template>
  <div class="max-w-md mx-auto p-6 form-container bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-200">Damage Calculation Report</h2>
    <div v-if="showDefault">
      <!-- Default labels with values -->
      <div v-for="(point, index) in defaultPoints" :key="index" class="mb-2">
        <span class="font-medium text-off-white">{{ point.label }}</span>
        <span class="font-medium text-off-white">{{ point.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    brand: String,
    model: String,
    year: String,
    damagePoints: Array,
    predictions: Object,
  },
  data() {
    return {
      showDefault: true,
      defaultPoints: [
        { label: "Brand: ", value: this.brand || "" },
        { label: "Model: ", value: this.model || "" },
        { label: "Year: ", value: this.year || "" },
        { label: "Dents: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Crack: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Broken Lamp: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Shattered Glass: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Scratch: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Damaged Tires: ", value: "0" },  // Updated to show count instead of 0.00
        { label: "Total Damages: ", value: "0" },
      ],
    };
  },
  watch: {
    brand(newVal) {
      this.defaultPoints[0].value = newVal;
    },
    model(newVal) {
      this.defaultPoints[1].value = newVal;
    },
    year(newVal) {
      this.defaultPoints[2].value = newVal;
    },
    predictions: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.results) {
          this.updateDamagePoints(newVal.results);
        }
      },
    },
  },
  methods: {
    updateDamagePoints(results) {
      // Initialize default values
      let damageCounts = {
        scratch: 0,
        tyre_flat: 0,
        glass: 0,
        lamp_broken: 0,
        dent: 0,
        crack: 0,
      };

      // Count occurrences based on predictions
      results.forEach(result => {
        const damageType = result.name.replace(' ', '_'); // Ensure consistency in naming
        if (damageCounts.hasOwnProperty(damageType)) {
          damageCounts[damageType]++;
        }
      });

      // Update default points with counts
      this.defaultPoints[3].value = damageCounts.dent.toString();  // Convert to string to display as text
      this.defaultPoints[4].value = damageCounts.crack.toString();
      this.defaultPoints[5].value = damageCounts.lamp_broken.toString();
      this.defaultPoints[6].value = damageCounts.glass.toString();
      this.defaultPoints[7].value = damageCounts.scratch.toString();
      this.defaultPoints[8].value = damageCounts.tyre_flat.toString();

      // Calculate total cost as a simple example (sum of counts)
      const totalCost = Object.values(damageCounts).reduce((acc, val) => acc + val, 0);
      this.defaultPoints[9].value = totalCost;
    },
  },
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

.text-off-white {
  color: rgba(255, 255, 255, 0.8); /* Off-white color with 80% opacity */
}
</style>
