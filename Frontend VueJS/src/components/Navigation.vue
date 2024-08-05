<template>
  <nav class="bg-blur dark:bg-white-900 sticky top-0 z-10">
    <div class="max-w-screen-100% flex items-center justify-between ml-4 md:ml-10 mr-4 md:mr-10 p-2 md:p-4 font-sans">
      <!-- Logo -->
      <router-link to="/">
        <img src="../assets/finallogo.png" class="h-10 md:h-12" />
      </router-link>

      <!-- Title -->
      <div class="flex-grow text-center">
        <h1 class="text-2xl font-bold">Vehicle Damage Cost Detection System</h1>
      </div>

      <!-- Navigation Links -->
      <div class="md:flex hidden">
        <ul class="flex flex-col p-0 md:p-0 mt-2 md:mt-4 font-medium border border-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <!-- Add Products (Shown for specific user on specific page) -->
          <li v-if="isSpecificUser && !isAdminPanelPage">
            <router-link
                to="/adminpanel"
                class="block py-1 md:py-2 px-2 md:px-3 adminpanel rounded md:p-0"
            >
              Admin Panel
            </router-link>
          </li>
        </ul>
      </div>

      <!-- User Profile and Sign Out Button -->
      <div v-if="user" class="flex items-center font-sans">
        <img
            v-if="user.photoURL"
            @click="toggleProfilePopup"
            :src="user.photoURL"
            class="h-10 w-10 rounded-full cursor-pointer"
            alt="Profile Pic"
        />
        <img
            v-else
            src="../assets/user.png"
            @click="toggleProfilePopup"
            class="h-10 w-10 rounded-full cursor-pointer"
            alt="Default Profile Pic"
        />
        <transition name="fade">
          <div v-if="showProfilePopup" class="profile-popup">
            <p v-if="user" class="text-white text-sm mb-4">
              <center>Logged in as : <br>{{ user.email }}</center>
            </p>
            <button @click="signOut" class="text-white bg-btnback focus:outline-none rounded-lg text-sm p-2.5 font-thin">
              Sign Out
            </button>
          </div>
        </transition>
        <span class="mx-2"></span>
      </div>

      <!-- Login Link (Shown on specific pages) -->
      <div v-else class="flex">
        <router-link
            v-if="!isRegisterOrLoginPage"
            to="/login"
            class="text-white bg-btnback focus:outline-none rounded-lg text-sm p-2.5 font-thin"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  data() {
    return {
      user: null,
      showProfilePopup: false,
    };
  },
  computed: {
    isRegisterOrLoginPage() {
      return this.$route.name === "Register" || this.$route.name === "Login";
    },
    isSpecificUser() {
      // Replace 'specific_user_email@example.com' with the specific user's email
      return this.user && this.user.email === 'rajithkarunaratne@gmail.com';
    },
    isAdminPanelPage() {
      return this.$route.path === '/adminpanel';
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });

    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    goToBottomOfPage() {
      this.$router.push("/");
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            this.user = null;
            this.$router.push("/");
          })
          .catch((error) => {
            console.error(error);
          });
    },
    handleScroll() {
      this.closeProfilePopup();
    },
    openProfilePopup() {
      this.showProfilePopup = true;
    },
    closeProfilePopup() {
      this.showProfilePopup = false;
    },
    toggleProfilePopup() {
      this.showProfilePopup = !this.showProfilePopup;
      if (this.showProfilePopup) {
        window.addEventListener('scroll', this.handleScroll);
      } else {
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
  },
};
</script>

<style scoped>
nav {
  backdrop-filter: blur(10px); /* Adjust the blur intensity as needed */
  background-color: rgba(255, 255, 255, 0.26); /* Semi-transparent background */
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
}
@media (max-width: 767px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }
  ul {
    width: 100%;
    padding-left: 0;
  }
  li {
    margin-bottom: 1rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.adminpanel:hover {
  color: #FF7E67FF; /* Off-white color */
}

.adminpanel {
  color: rgb(255, 0, 89); /* Off-white color */
}
.profile-popup {
  backdrop-filter: blur(10px); /* Increased blur intensity */
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(41, 92, 159, 0.56); /* Semi-transparent background */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 300px;
  height: 150px;
  z-index: 10;
  margin-right: 10px;
  margin-top: 10px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 400;
}
.profile-popup button {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 150px;
}
.bg-btnback {
  background-color: rgb(16, 55, 113); /* Blue color using RGB */
}
</style>