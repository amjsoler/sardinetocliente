import { useUserStore } from '@/stores/user'
import { useValidationStore } from '@/stores/validation'
import { createRouter, createWebHistory } from 'vue-router'

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
  const validationStore = useValidationStore()
  console.log(validationStore.message)
  //Vac�o el global state de validaciones
  //store.dispatch("vaciarValidacionesAction");

  //Cierro modales que puedan quedar abiertos
  //globalHelpers.cerrarTodosLosModalesAbiertos();

  //Veo si recibo el firebasetoken y lo almaceno
  /*if(to.query.firebasetoken && (!store.state.firebasetoken || store.state.firebasetoken != to.query.firebasetoken)){
    store.dispatch("almacenarFirebaseTokenAction", to.query.firebasetoken);
  }*/

  //Comprobamos si la ruta de destino precisa autenticaci�n
  /* if (to.matched.some((record) => record.meta.requiresAuth)) {
    //const userStore = useUserStore();

    //console.log("HOLI"  + userStore.user.id);

    console.log("router/index.js: requiresAuth detected. Checking...");

    //Primero sincronizo tokens
    sincronizarTokens();

    //Si el token de store y el token de localstorage est�n establecidos continuo la redirecci�n
    if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth") &&
        store.state.tokenAuth === window.localStorage.getItem("tokenAuth")) {
      console.log("router/index.js: Tenemos token en state y storage por tanto dejo continuar");
      next();
    } else {
      console.log("router/index.js: No hab�a token, redirijo al login");
      //Si ninguna de las dos fuentes tiene el token, redirijo al inicio de sesi�n
      next({name: "IniciarSesion"});
    }
  } else {
    //Compruebo si la ruta precisa acceder como invitado
    if (to.matched.some((record) => record.meta.requiresGuest)) {
      console.log("router/index.js: Redirect con requiresGuest...");
      //Si ninguna de las dos fuentes tiene el token, estoy como invitado, as� que prosigo
      if (!store.state.tokenAuth && !window.localStorage.getItem("tokenAuth")) {
        console.log("router/index.js: No hay toquen en ning�n sitio, dejo continuar porque es invitado.");
        next();
      } else {
        sincronizarTokens();
        console.log("router/index.js: He encontrado alg�n token, redirijo al perfil");
        //Si no, redirijo a la cuenta de usuario
        next({name: "MisDecimos"});
      }
    } else {
      sincronizarTokens();
      console.log("router/index.js: La ruta destino no tiene ning�n guard, dejo continuar");
      next();
    }
  } */
  next()
})

/*
function sincronizarTokens(){
  if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth")) {
    if (store.state.tokenAuth !== window.localStorage.getItem("tokenAuth")) {
      //Si hay token en las dos fuentes pero son distintos, significa que se han desincronizado por alguna raz�n, los borro y redirijo a login
      store.dispatch("cerrarSesionAction");
    }
  }else{
    if(store.state.tokenAuth){
      store.dispatch("almacenarTokenSesionAction", store.state.tokenAuth);
    }else{
      if (window.localStorage.getItem("tokenAuth")) {
        store.dispatch("almacenarTokenSesionAction", window.localStorage.getItem("tokenAuth"));
      }
    }
  }
}*/

export default router
