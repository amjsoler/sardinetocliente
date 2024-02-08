<template>
    <container-with-brand-head include-brand="false">
        <h1 class="text-lg text-center font-bold dark:text-white">
          {{$t("createGym.title")}}
        </h1>
        <form class="space-y-6">
          <form-group>
            <span-label>{{$t("createGym.form.name")}}</span-label>
            <variable-input input-type="text" v-model="newGym.nombre" />
            <small-error field-name="nombre" />
          </form-group>

          <form-group>
            <span-label>{{$t("createGym.form.direccion")}}</span-label>
            <variable-input input-type="text" v-model="newGym.direccion" />
            <small-error field-name="direccion" />
          </form-group>

          <form-group>
            <span-label>{{$t("createGym.form.descripcion")}}</span-label>
            <variable-input input-type="descripcion" v-model="newGym.descripcion" />
            <small-error field-name="descripcion" />
          </form-group>

          <!-- TODO: meter un select file aquí para subir la imagen directamente -->
          <form-group>
            <span-label>{{$t("createGym.form.logo")}}</span-label>
            <variable-input input-type="logo" v-model="newGym.logo" />
            <small-error field-name="logo" />
          </form-group>


          <button-submit processing-id="create-gym-submit" @button-submit="crearGimnasio">
            {{$t("createGym.form.submit")}}
          </button-submit>
        </form>
    </container-with-brand-head>
</template>

<script>
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { useGymStore } from '@/stores/gym.js'
import router from '@/router/index.js'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import ContainerWithBrandHead from '@/components/containers/ContainerWithBrandHead.vue'

export default {
  name: "CreateGym",
  components: { ContainerWithBrandHead, VariableInput, ButtonSubmit, SmallError, SpanLabel, FormGroup },
  data() {
    return {
      newGym: {
        nombre: "",
        direccion: "",
        descripcion: "",
        logo: ""
      }
    }
  },

  methods: {
    async crearGimnasio() {
      const result = await useGymStore().actionCreateGym(this.newGym)

      removeIdFromProcessing("create-gym-submit")

      if(result) {
        router.push({ name: "GymClasses" })
      }
    }
  }
}
</script>