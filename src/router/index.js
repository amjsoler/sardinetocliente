import { createRouter, createWebHistory } from 'vue-router'
import { useValidationStore } from '@/stores/validation.js'
import { useUserStore } from '@/stores/user.js'

import AccountVerify from '@/views/authentication/AccountVerify.vue'
import AccountRecovery from '@/views/authentication/AccountRecovery.vue'
import RegisterUser from '@/views/authentication/RegisterUser.vue'
import LoginUser from '@/views/authentication/LoginUser.vue'
import GymClasses from '@/views/class/GymClasses.vue'
import MyGyms from '@/views/Gym/MyGyms.vue'
import { useGymStore } from '@/stores/gym.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginUser',
      component: LoginUser,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'RegisterUser',
      component: RegisterUser,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/account-recovery',
      name: 'AccountRecovery',
      component: AccountRecovery
    },
    {
      path: '/account-verify',
      name: 'AccountVerify',
      component: AccountVerify,
      meta: {
        requiresAuth: true
      }
    },

    ///
    //GYms
    ///
    {
      path: '/my-gyms',
      name: 'MyGyms',
      component: MyGyms,
      meta: {
        requiresAuth: true
      }
    },

    ///
    //Classes
    ///
    {
      path: '/gym-classes',
      name: 'GymClasses',
      component: GymClasses,
      meta: {
        requiresAuth: true,
        requiresSelectedGym:true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //Vacío el store de validaciones
  const validationStore = useValidationStore()
  validationStore.$reset()

  //Veo si recibo el firebasetoken y lo almaceno
  /*if(to.query.firebasetoken && (!store.state.firebasetoken || store.state.firebasetoken != to.query.firebasetoken)){
    store.dispatch("almacenarFirebaseTokenAction", to.query.firebasetoken);
  }*/

  var primerRequires = false;
  //Comprobamos si la ruta de destino precisa autenticación
   if (!primerRequires && to.matched.some((record) => record.meta.requiresAuth)) {
     console.log("router/index.js: requiresAuth detected. Checking...");
    const userStore = useUserStore()

    //Compruebo si hay token en el user, si lo hay, dejo seguir, si no, redirijo al login
     if(!userStore.user || !userStore.user.access_token){
       console.log("router/index.js: No hay token, redirijo al login")
       primerRequires = true;

       next({name: "LoginUser"});
     }
  }

  if (!primerRequires && to.matched.some((record) => record.meta.requiresGuest)) {
    console.log("router/index.js: requiresGuest detected. Checking...");
    const userStore = useUserStore()

    if(userStore.user && userStore.user.access_token){
      console.log("router/index.js: Hay un token guardado, redirijo a mygyms")
      primerRequires = true;

      next({name: "MyGyms"})
    }
  }

  if (!primerRequires && to.matched.some((record) => record.meta.requiresSelectedGym)) {
    console.log("router/index.js: requiresSelectedGym detected. Checking...");
    const gymStore = useGymStore()

    if(!gymStore.gymSelected){
      console.log("router/index.js: No hay gym seleccionado. Redirijo a myGyms")
      primerRequires = true;

      next({name: "MyGyms"})
    }
  }

  if(!primerRequires){
    next();
  }
})

export default router
