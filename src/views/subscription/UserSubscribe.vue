<template>
  <form>
    <form-group>
      <span-label>Tarifa</span-label>
      <select>
        <option v-for="rate in gymRates" v-bind:key="rate.id">
          {{ rate.nombre }}
        </option>
      </select>
    </form-group>

    <form-group>
      <button-submit>Suscribirme</button-submit>
    </form-group>
  </form>
</template>

<script>
  import axios from 'axios'
  import { useGymStore } from '@/stores/gym.js'
  import FormGroup from '@/components/forms/FormGroup.vue'
  import SpanLabel from '@/components/forms/SpanLabel.vue'
  import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'

  export default {
    name: "UserSubscribe",
    components: { ButtonSubmit, SpanLabel, FormGroup },

    data() {
      return {
        gymRates: [],
        newSubscription: {
          tarifa: null
        }
      }
    },

    mounted() {
      axios.get(
        import.meta.env.VITE_SERVICE_BASE_URL +
        "gimnasios/" + useGymStore().gymSelected.id + "/tarifas"
      )
        .then(response => {
          this.gymRates = response.data
        })
        .catch(() => {})
    }
  }
</script>