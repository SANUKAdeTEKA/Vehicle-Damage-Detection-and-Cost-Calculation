<template>
  <div class="home">
    <Navigation />
    <div class="mt-8 font-sans">
      <h1 class="text-3xl font-semibold mb-6 text-center text-off-white">Register</h1>
      <form @submit.prevent="register" class="max-w-sm mx-auto my-8 form-container">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-off-white">Email</label>
          <input type="email" id="email" v-model="email" required
                 class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-off-white">Password</label>
          <input type="password" id="password" v-model="password" required
                 class="mt-1 p-2 w-full border rounded-md">
        </div>
        <button type="submit" class="sign-in-button mt-4 text-off-white px-4 py-2 rounded-md focus:outline-none focus:ring transition duration-300 hover:bg-rose-900">
          Register
        </button>
        <br>
        <div class="mt-4">
          <router-link to="/login" class="text-text focus:outline-none rounded-lg text-sm p-2.5">
            Already have an account?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
          .then(() => {
            console.log("Registered successfully");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.code);
            alert("Sorry, you could not sign up: " + error.message);
          });
    },
  },
};
</script>

<style scoped>
.home {
  background-image: url('../assets/bg15.png'); /* Replace with your background image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  font-family: 'Ubuntu', sans-serif;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.041); /* Maroon color with 80% opacity */
  backdrop-filter: blur(10px); /* Apply blur effect to the background */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  width: 500px; /* Set the width to 500px */
  height: 400px; /* Set the height to 450px */
  padding: 20px;
  border-radius: 10px;
}

.text-off-white {
  color: #f8f8ff; /* Off-white color */
}

.text-text {
  color: #f8f8ff; /* Off-white color */
}

.text-text:hover {
  color: #FF7E67FF; /* Off-white color */
}

.sign-in-button {
  background-color: #3b74c3;
}

.sign-in-button:hover {
  background-color: #255fb3 ;
}
</style>