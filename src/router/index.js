import { createRouter, createWebHistory } from 'vue-router'
import { useValidationStore } from '@/stores/validation.js'
import { useUserStore } from '@/stores/user.js'

import AccountVerify from '@/views/authentication/AccountVerify.vue'
import AccountRecovery from '@/views/authentication/AccountRecovery.vue'
import RegisterUser from '@/views/authentication/RegisterUser.vue'
import LoginUser from '@/views/authentication/LoginUser.vue'
import GymClasses from '@/views/class/GymClasses.vue'
import ForbiddenResource from '@/views/ForbiddenResource.vue'
import CreateGym from '@/views/Gym/CreateGym.vue'
import UserInvite from '@/views/Gym/admin/UserInvite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EnterUrl',
      redirect: to => {
        return {name: "GymClasses"}
      }
    },
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
      path: '/create-gym',
      name: 'CreateGym',
      component: CreateGym,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user-invite',
      name: 'UserInvite',
      component: UserInvite,
      meta: {
        requiresAuth: true,
        gymHeader: true
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
        gymHeader: true
      }
    },

    /// Rutas de sistema
    {
      path: '/fobidden',
      name: 'ForbiddenResource',
      component: ForbiddenResource
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

  if(!primerRequires){
    next();
  }
})

export default router
