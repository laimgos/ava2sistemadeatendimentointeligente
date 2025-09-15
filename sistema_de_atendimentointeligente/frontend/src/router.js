import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard }
];
const router = createRouter({ history: createWebHistory(), routes });
export default router;
