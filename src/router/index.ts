import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserView from '@/views/user/UserView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import BikeListView from '@/views/bike/BikeListView.vue'
import BikeView from '@/views/bike/BikeView.vue'
import BikeNew from '@/views/bike/BikeNew.vue'
import BikeEdit from '@/views/bike/BikeEdit.vue'
import ContactView from '@/views/ContactView.vue'
import NewReservation from '@/views/reservation/NewReservation.vue'
import ReservationListView from '@/views/reservation/ReservationListView.vue'
import UserEdit from '@/views/user/UserEdit.vue'
import ReservationDetails from '@/views/reservation/ReservationDetails.vue'


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
      path: '/user/edit',
      name: 'profile',
      component: UserEdit,
      meta: { 
        title: 'Edit user',
        requiresAuth: true 
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
      path: '/reservation',
      name: 'reservation',
      component: ReservationListView,
      meta: {
        title: 'Reservations',
        requiresAuth: true
      }
    },
    {
      path: '/reservation/:id/details',
      name: 'details-reservation',
      component: ReservationDetails,
      meta: {
        title: 'Reservations details',
        requiresAuth: true
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
      path: '/bikes/:id/reservation',
      name: 'bike-reservation',
      component: NewReservation,
      meta: {
        title: 'Bike-reservation'
      }
    },
    {
      path: '/bikes/new',
      name: 'bike-create',
      component: BikeNew,
      meta: {
        title: 'Add new bike',
        requiresAuth: true
      },
    },
    {
      path: '/bikes/edit/:id',
      name: 'bike-edit',
      component: BikeEdit,
      meta: {
        title: 'Edit bike'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    document.title = `${to.meta.title} / E-Poslovanje 2025`;
    next();
  }

})

export default router
