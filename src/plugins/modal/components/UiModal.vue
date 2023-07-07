<template>
  <div class="ui_modal" @click="onClose">
    <Transition name="fromup">
      <div class="ui_modal__body" @click.stop>
        <UiCloseIcon class="close_btn" @click.stop="onClose" />
        <div class="ui_modal__content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { provide, ref } from "vue";
import UiCloseIcon from "./UiCloseIcon.vue";
const emit = defineEmits<{
  (event: "close",value:Event): void;
}>();
const closeObj = ref<()=>void>()

provide("closeEventRef",closeObj)


const onClose = (event: Event) => {
if(closeObj.value)
closeObj.value()
else
  emit("close", event);
};
</script>
<style scoped lang="scss">
@keyframes fromup {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(0);
    opacity: 1;
  }
}
.ui_modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0000003d;
  backdrop-filter: blur(4px);
  &__body {
    animation: fromup .3s ease-in 1;
    height: 100%;
    width: 100%;
    border-radius: var(--border-radius-common);
    box-shadow: 4px 4px 8px rgb(0, 0, 0);
    background: rgba(179,205,249,.12);
    -webkit-backdrop-filter: blur(44px);
    backdrop-filter: blur(44px);
    position: relative;
  }
  &__content {
    padding: 0.5em;
  }
}
.close_btn {
  width: 15px;
  height: 15px;
  color: var(--color-text-accent);
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
@media screen and (min-width: 767px) {
  .ui_modal {
    &__body {
      min-width: 350px;
      width: fit-content;
      height: fit-content;
    }
    &__content {
      padding: 0.5em;
    }
  }
}
</style>
