

<template>
  <header>
   <UiButton class="accept" @click="openModal">Открыть модальное окно</UiButton>
  </header>

  <main>
<ul>
<li v-for="req in requests">
{{ `${req.firstName} ${req.phone}` }}
</li>
</ul>
  </main>
  <UiModalContainer/>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RequestForm } from './modules/request';
import { UiModalContainer, useModal } from './plugins/modal';
import { UiButton } from './ui_lib';
import { RequestEntity } from './modules/request/entities';
const {modal,hideModal} = useModal()
const requests = ref<RequestEntity[]>([])
const openModal = ()=>{
modal.show(RequestForm,{
  onSave:(req:RequestEntity)=>{
requests.value.push(req)
hideModal()
  },
  onClose:()=>{
hideModal()

  }

})

}
</script>
<style scoped>
header {
  display: block;
  padding: 1rem;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding:2rem;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
