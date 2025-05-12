import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesListView from '@/views/MoviesListView.vue'
import CinemaView from '@/views/CinemaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/movie/:link',
      name: 'movie',
      component: MovieView,
      meta: {
        title: 'Movie'
      }
    },
    {
      path: '/movieslist',
      name: 'movieslist',
      component: MoviesListView,
      meta: {
        title: 'Movies'
      }
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: CinemaView,
      meta: {
        title: 'Cinemas'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta){
    document.title = `${to.meta.title} / E-Poslovanje 2025`;
  }
  next();
})

export default router
