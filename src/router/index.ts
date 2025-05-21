import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesListView from '@/views/MoviesListView.vue'
import CinemaView from '@/views/cinema/CinemaView.vue'
import EditCinema from '@/views/cinema/EditCinema.vue'
import CreateCinema from '@/views/cinema/CreateCinema.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserView from '@/views/user/UserView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import BikeListView from '@/views/bike/BikeListView.vue'
import BikeView from '@/views/bike/BikeView.vue'
import BikeNew from '@/views/bike/BikeNew.vue'
import BikeEdit from '@/views/bike/BikeEdit.vue'
import ContactView from '@/views/ContactView.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register'
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
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {
        title: 'User Profile'
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
      path: '/bikes',
      name: 'bikes',
      component: BikeListView,
      meta: {
        title: 'Bikes'
      }
    },
    {
      path: '/bikes/:id',
      name: 'bike-details',
      component: BikeView,
      meta: {
        title: 'Bike-details'
      }
    },
    {
      path: '/bikes/new',
      name: 'bike-create',
      component: BikeNew,
      meta: {
        title: 'Add new bike'
      }
    },
    {
      path: '/bikes/edit/:id',
      name: 'bike-edit',
      component: BikeEdit,
      meta: {
        title: 'Edit bike'
      }
    },
    /* {
      path: '/cinema',
      name: 'cinema',
      component: CinemaView,
      meta: {
        title: 'Cinemas'
      }
    },
    {
      path: '/cinema/new',
      name: 'new-cinema',
      component: CreateCinema,
      meta: {
        title: 'New Cinema'
      }
    },
    {
      path: '/cinema/:id',
      name: 'edit-cinema',
      component: EditCinema,
      meta: {
        title: 'Edit cinema'
      }
    }, */
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta) {
    document.title = `${to.meta.title} / E-Poslovanje 2025`;
  }
  next();
})

export default router
