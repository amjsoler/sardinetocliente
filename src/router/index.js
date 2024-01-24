import { useValidationStore } from '@/stores/validation'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginUser',
      component: () => import('@/views/authentication/LoginUser.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'RegisterUser',
      component: () => import('@/views/authentication/RegisterUser.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/account-recovery',
      name: 'AccountRecovery',
      component: () => import('@/views/authentication/AccountRecovery.vue')
    },

    ///
    //GYms
    ///
    {
      path: '/my-gyms',
      name: 'MyGyms',
      component: () => import('@/views/gym/MyGyms.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //Vacío el store de validaciones
  const validationStore = useValidationStore();
  validationStore.$state.value = {}

  //Cierro modales que puedan quedar abiertos
  //globalHelpers.cerrarTodosLosModalesAbiertos();

  //Veo si recibo el firebasetoken y lo almaceno
  /*if(to.query.firebasetoken && (!store.state.firebasetoken || store.state.firebasetoken != to.query.firebasetoken)){
    store.dispatch("almacenarFirebaseTokenAction", to.query.firebasetoken);
  }*/

  //Comprobamos si la ruta de destino precisa autenticación
   if (to.matched.some((record) => record.meta.requiresAuth)) {
     console.log("router/index.js: requiresAuth detected. Checking...");
    const userStore = useUserStore()

    //Compruebo si hay token en el user, si lo hay dejo seguir, si no, redirijo al login
     console.log(userStore.user.access_token)
     if(userStore.user && userStore.user.access_token){
       next()
     }else{
       next({name: "LoginUser"});
     }
  }

  else if (to.matched.some((record) => record.meta.requiresGuest)) {
    console.log("router/index.js: Redirect con requiresGuest...");

    const userStore = useUserStore()
console.log(userStore.user)
    if(!userStore.user || !userStore.user.access_token){
      console.log("Entro al if")
      next()
    }else{
      next({name: "MyGyms"})
    }
  }

  else{
    next()
   }
})

export default router
