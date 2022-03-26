<template>
  <div>
    <transition name="fade">
      <div v-if="!isSend" class="min-w-screen min-h-screen flex flex-col items-center justify-center mt-40  md:px-20 xl:px-40  z-40">
        <img
          class="flex-none hover:scale-110 transform transition cursor-pointer -mt-80 h-80 mb-10 hidden lg:flex"
          src="@/assets/images/logo.png"
        >
        <div class="bg-primary/10 p-10 rounded-xl w-full lg:w-auto">
          <div class="flex flex-col">
            <div class="flex flex-row gap-4 justify-between items-center">
              <h1 class="text-black text-2xl font-bold mb-2">
                Pre-order
              </h1>
              <p class="text-black font-bold mb-2 opacity-50">
                (49,99 euro)
              </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-4 lg:min-w-2xl">
              <Input v-model="firstName" class="" placeholder="Voornaam" label="Voornaam" />
              <Input v-model="lastName" class="" placeholder="Achternaam" label="Achternaam" />
              <Input v-model="email" class="" placeholder="Email" label="E-mailadres" />
              <Input v-model="amount" class="" placeholder="Aantal" label="Aantal" />
              <textarea v-model="extra" class="bg-white px-4 py-2 shadow-secondary shadow-2xl rounded-xl w-full lg:col-span-2 mt-4 min-h-40" placeholder="Andere info" />

              <div class="w-full flex justify-end lg:col-span-2">
                <Button :disabled="disabled" :loading="formLoading" :valid="!disabled" class="px-8" @click="sendForm">
                  Pre-order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="min-w-screen min-h-screen flex items-center justify-center flex-col">
        <div class="flex flex-row items-center justify-center left-1/2 transform -translate-x-1/2 absolute mb-20">
          <div class="bg-primary rounded-full flex items-center justify-center checkmark-circle-1">
            <div class="bg-white rounded-full flex items-center justify-center checkmark-circle-2">
              <svg
                class="w-8vw h-8vw md:w-3vw md:h-3vw"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              ><g
                class="checkmark"
                fill="none"
                stroke="rgba(182, 197, 184)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="5"
              ><path d="M2 20l10 8L30 4" /></g></svg>
            </div>
          </div>
        </div>
        <div class="text-black mt-50 font-bold">
          We nemen contact met u op voor verdere informatie!
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const isSend = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const amount = ref(1)
const extra = ref('')
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

const disabled = computed(() => {
  return !(firstName.value && lastName.value && email.value && amount.value && amount.value > 0 && validateEmail(email.value))
})

const formLoading = ref(false)
const sendForm = async() => {
  formLoading.value = true
  const templateParams = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    extra: extra.value,
    amount: amount.value,

  }

  axios.defaults.baseURL = 'https://api.emailjs.com/api/v1.0/'
  const response = await axios.post('/email/send',
    {
      service_id: 'privoli',
      template_id: 'template_z7zt015',
      user_id: 'user_Vr5uZFMf393eBPSP0JmH0',
      template_params: templateParams,
    })
    .then((response) => {
      isSend.value = true
      formLoading.value = false
    }).catch((error) => {
      console.error(error)
      formLoading.value = false
    })
}
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 1rem;
  height: 1rem;;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 1rem;
  height: 1rem;
  margin-top: 3px;
  border-radius: 50%;
  border: 2px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .title-font {
  font-family: interstate, sans-serif;
  font-style: normal;
 }

 .checkmark-circle-1 {
    animation: w80 0.5s ease forwards;
    animation-delay: 0.2s;

}
@keyframes w80 {
    from { width: 0px; height: 0px; }
    to { width: 24vw; height: 24vw; }
}

.checkmark-circle-2 {
  animation: w56 0.5s ease forwards;
  animation-delay: 0.45s;
  width: 0px;
}
@keyframes w56 {
    from { width: 0px; height: 0px; }
    to { width: 18vw; height: 18vw; }
}

.checkmark {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: dash 0.5s linear forwards;
  animation-delay: 0.75s;

}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.top-calc {
  top: calc(50vh - 24vw)
}

@media (min-width: 768px) {
  .checkmark-circle-1 {
    animation: w80 0.5s ease forwards;
    animation-delay: 0.2s;

}
@keyframes w80 {
    from { width: 0px; height: 0px; }
    to { width: 8vw; height: 8vw; }
}

.checkmark-circle-2 {
  animation: w56 0.5s ease forwards;
  animation-delay: 0.45s;
  width: 0px;
}
@keyframes w56 {
    from { width: 0px; height: 0px; }
    to { width: 6vw; height: 6vw; }
}

.checkmark {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: dash 0.5s linear forwards;
  animation-delay: 0.75s;

}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.top-calc {
  top: calc(50vh - 8vw)
}

}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 10px;
}
.lds-ellipsis div {
  position: absolute;
  top: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}
</style>
