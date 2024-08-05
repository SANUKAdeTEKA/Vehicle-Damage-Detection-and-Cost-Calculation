import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/adminpanel',
    name: 'AdminPanel',
    component: () => import('@/views/AdminPanel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/RegBox.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/LoginBox.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
