<template>
  <form class="space-y-4">
    <form-group>
      <div class="flex">
        <button id="states-button" data-dropdown-toggle="dropdown-states" class="flex-shrink-0 inline-flex
       items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300
       rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
        dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button"
        >
          <p class="inline-flex items-center">
            {{ rateTypes[rateTypeSelected].name }}
            <caret-down-filled></caret-down-filled>
          </p>
        </button>
        <div id="dropdown-states" class="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
            <li>
              <div class="cursor-pointer inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
             dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                   @click="rateTypeSelected=0"
              >
                {{ rateTypes[0].name }}
              </div>
            </li>
            <li>
              <div class=" cursor-pointer inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                   @click="rateTypeSelected=1"
              >
                {{ rateTypes[1].name }}
              </div>
            </li>
          </ul>
        </div>
        <select v-model="newSubscription.tarifa" id="states" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="-1" selected="selected">Elige una tarifa</option>
          <option :value="rate.id" v-for="rate in getGymRateByType()" v-bind:key="rate.id">
            {{ rate.nombre }}
          </option>
        </select>
      </div>
      <small-error v-if="message">{{ message }}</small-error>
    </form-group>

    <form-group>
      <button-submit @button-submit="createUserSubscription">Suscribirme</button-submit>
    </form-group>
  </form>
</template>

<script>
  import FormGroup from '@/components/forms/FormGroup.vue'
  import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
  import axios from 'axios'
  import { useGymStore } from '@/stores/gym.js'
  import SmallError from '@/components/forms/SmallError.vue'
  import { mapState } from 'pinia'
  import { useValidationStore } from '@/stores/validation.js'
  import CaretDownFilled from '@/components/icons/CaretDownFilled.vue'

  export default {
    name: "UserSubscribe",
    components: { CaretDownFilled, SmallError, ButtonSubmit, FormGroup },
    props: {
      yaSuscrito: {
        default: false
      }
    },
    emits: ["userSubscriptionCreated"],

    data() {
      return {
        gymRates: [],
        rateTypes: [
          {
            "name": "Suscripción",
            "value": "suscripcion"
          },
          {
            "name": "Abono",
            "value": "abono"
          }
        ],
        rateTypeSelected: 0,
        newSubscription: {
          tarifa: -1
        }
      }
    },

    computed: {
        ...mapState(useValidationStore, {
          message: 'message',
          errors: 'errors'
        })
    },

    mounted() {
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL +
      "gimnasios/" + useGymStore().gymSelected.id + "/tarifas")
        .then(response => {
          this.gymRates = response.data
        })
        .catch(() => {})
    },

    methods: {
      createUserSubscription() {
        axios.post(import.meta.env.VITE_SERVICE_BASE_URL +
          "gimnasios/" + useGymStore().gymSelected.id + "/suscripciones",
        this.newSubscription)
          .then(response => {
            console.log("ResponseDelCallback:")
            console.log(response.data)
            this.$emit("userSubscriptionCreated", response.data)
          })
          .catch(() => {})
      },

      getGymRateByType(){
        return this.gymRates.filter(item => item.tipo === this.rateTypes[this.rateTypeSelected].value)
      }
    }
  }
</script>