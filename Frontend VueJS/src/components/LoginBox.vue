<template>
  <div class="home">
    <Navigation />
    <div class="mt-8 font-sans">
      <h1 class="text-3xl font-semibold mb-6 text-center text-off-white">Sign in</h1>
      <form class="max-w-sm mx-auto my-8 form-container" @submit.prevent="signInWithEmailAndPassword">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-off-white">Email</label>
          <input type="email" v-model="email" id="email" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-off-white">Password</label>
          <input type="password" v-model="password" id="password" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <button class="sign-in-button mt-4 text-off-white px-4 py-2 rounded-md focus:outline-none focus:ring transition duration-300 hover:bg-rose-900"
                @click="signInWithEmail">
          Sign In
        </button>
        <br>
        <button class="sign-in-button flex items-center mt-4 text-off-white px-4 py-2 rounded-md focus:outline-none focus:ring transition duration-300 hover:bg-rose-900"
                @click="signInWithGoogle">
          <img src="../assets/google.png" alt="Google Icon" class="w-6 h-6 mr-2">
          <span class="ml-1">Sign In with Google</span>
        </button>
        <br>
        <br>
        <div>
          <router-link to="/register" class="text-text focus:outline-none rounded-lg text-sm p-2.5">
            New to AccuDamage?
          </router-link>
        </div>
      </form>
      <br>
      <br>
      <div class="flex justify-center items-center mt-4 text-error">
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation
  },
  name: "Register",
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async signInWithEmail() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.message = 'Sign in with email successful!';
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        this.message = 'Recheck your email or password credentials.';
      }
    },
    async signInWithGoogle() {
      const auth = getAuth();
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        this.message = 'Sign in with google successful!';
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        this.message = 'Sign in with google failed.';
      }
    },
  }
}
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
  background-color: rgba(255, 255, 255, 0.041);
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

.text-text:hover {
  color: #FF7E67FF; /* Off-white color */
}

.text-text {
  color: #f8f8ff; /* Off-white color */
}

.sign-in-button {
  background-color: #3b74c3;
}
.sign-in-button:hover {
  background-color: #255fb3 ;
}
</style>