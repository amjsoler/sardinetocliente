<template>
  <div class="min-h-dvh backdrop-blur fixed top-0 w-full">
    <square-rounded-x-filled @click="$emit('closeEvent')" class="absolute right-2 top-2 w-12 h-12"/>

    <div v-if="modelValue && modelValue.nombre" class="bg-input-background-400 mt-16 rounded-lg w-auto mx-3 px-4 py-2 text-2xl text-center">
      {{ modelValue.nombre}}
    </div>

    <div class="flex flex-row gap-3">
      <div v-if="modelValue && modelValue.fechayhora" class="flex-grow flex flex-row justify-center text-3xl bg-input-background-400 mt-3 rounded-lg w-auto ml-3 px-4 py-2">
        {{ new Date(modelValue.fechayhora).getHours() }}:{{ new Date(modelValue.fechayhora).getMinutes() }}h
      </div>

      <div v-if="modelValue && modelValue.plazas" class="flex flex-row justify-center flex-grow text-3xl bg-input-background-400 mt-3 rounded-lg w-auto mr-3 px-4 py-2">
        15/16<span><users-icon width="35px" height="35px"/></span>
      </div>
    </div>

    <div class="flex flex-row flex-wrap justify-center flex-grow text-3xl bg-input-background-400 mt-3 rounded-lg w-auto mr-3 px-4 py-2">
      <img class="rounded-full border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
      <img class="rounded-full ml-[-10px] border-2 border-white size-10" src="@/assets/img.png" alt="logo de un usuario que participa en la clase" />
    </div>

    <div v-if="modelValue && modelValue.descripcion" class="bg-input-background-400 mt-3 rounded-lg w-auto mx-3 px-4 py-2 text-balance">
      {{ modelValue.descripcion }}
    </div>

    <div class="fixed bottom-3 w-full">
      <div class="rounded-lg w-auto mx-3 text-balance">
        <button-submit @button-submit="participateInClass()">
          ¡Me apunto!
        </button-submit>
      </div>
    </div>
  </div>
</template>

<script>
import SquareRoundedXFilled from '@/components/icons/SquareRoundedXFilled.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import axios from 'axios'

export default {
  name: "ClassVisor",
  components: { ButtonSubmit, UsersIcon, SquareRoundedXFilled },
  emits: ["closeEvent"],
  props: ["modelValue"],

  methods: {
    participateInClass(){
      axios.get(import.meta.env.VITE_SERVICE_BASE_URL+"gimnasios/"+this.modelValue.gimnasio+"/clases/"+this.modelValue.id+"/apuntarse")
        .then(response => {
          console.log(response)
        })
        .catch(() => {

        })
    }
  }
}
</script>