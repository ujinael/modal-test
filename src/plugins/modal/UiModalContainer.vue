<template>
<div class="ui-modal__container">
<TransitionGroup name="fade">
<UiModal v-for="dialog,index in container.modals" :key="index" @close="dialog.closeCallBack">
<component :is='dialog.modal'></component>
</UiModal>
</TransitionGroup>
</div>
</template>
<script setup lang="ts">
import {UiModal} from "./components"
import {useModal} from "./modalPlugin"
const {modal:container} =  useModal()
</script>
<style scoped lang="scss">
@import "@/assets/styles/transitions/fade.transition.scss";
</style>