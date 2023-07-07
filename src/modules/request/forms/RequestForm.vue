<template>
  <form class="request_form" novalidate @submit.prevent="onSubmit">
    <UiFormItem label="Имя" :errors="v$.firstName.$errors">
      <input
        class="ui_input"
        type="text"
        v-model="formObject.firstName"
        placeholder="не более 100 символов"
      />
    </UiFormItem>
    <UiFormItem label="Фамилия" :errors="v$.lastName.$errors">
      <input
        class="ui_input"
        type="text"
        placeholder="не более 100 символов"
        v-model="formObject.lastName"
      />
    </UiFormItem>
    <UiFormItem label="Телефон" :errors="v$.phone.$errors">
      <input
        class="ui_input"
        placeholder="+7 (___) ___ __ __"
        v-phone-mask="'+7 (___) ___ __ __'"
        type="tel"
        v-model="formObject.phone"
      />
    </UiFormItem>
    <UiFormItem label="Почта" :errors="v$.email.$errors">
      <input class="ui_input" placeholder="some@example.ru" type="email" v-model="formObject.email" />
    </UiFormItem>
    <UiFormItem label="Сообщение" :errors="v$.message.$errors">
      <textarea
        class="ui_input"
        type="text"
        v-model="formObject.message"
        placeholder="не более 500 символов"
      />
    </UiFormItem>

    <div class="buttons">
      <UiButton class="accept" type="submit">Сохранить</UiButton>
      <UiButton class="cancel" @click.stop="emit('close')">Отмена</UiButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { RequestEntity } from "../entities";
import { required, email, maxLength, minLength, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { UiFormItem, UiButton } from "@/ui_lib";
const emit = defineEmits<{
  (event: "save", formObject: RequestEntity): void;
  (event: "close"): void;

}>();
const formObject = ref(new RequestEntity("", "", "", "", ""));
const normalizePhoneNumber = (phone:string)=>{
 let value = phone.replaceAll(" ","").replaceAll(/[^0-9]/g,"")
  if(value.length > 11)value = value.slice(0,11)
return value
}
const checkRussianNumber = (value:string)=>{
   if(!helpers.req(value))return true
  value = normalizePhoneNumber(value)
  if(value.length<11)return false
  if(value.at(0)?.match(/[7,8]/))return true
  else return false
}
const rules = computed<Record<keyof RequestEntity, any>>(() => ({
  firstName: {
    required:helpers.withMessage('Это поле не должно быть пустым', required),
    maxLength:helpers.withMessage('Введено более 100 символов', maxLength(100)),
    minLeght:helpers.withMessage('Введено менее 3 символов', minLength(3)),
  },
  lastName: {
    maxLength:helpers.withMessage('Введено более 100 символов', maxLength(100)),
    minLeght:helpers.withMessage('Введено менее 3 символов', minLength(3)),
  },
  phone: {
    required:helpers.withMessage('Это поле не должно быть пустым', required),
    onlyRussian:helpers.withMessage('Допустимы только российские номера', checkRussianNumber)
  },
  email: {
    required:helpers.withMessage('Это поле не должно быть пустым', required),
    email:helpers.withMessage('Укажите по примеру some@example.ru', email),
  },
  message: {
    maxLength:helpers.withMessage('Введено более 500 символов', maxLength(500)),
  },
}));

const v$ = useVuelidate(rules, formObject);
const onSubmit = async (e: Event) => {
  const valid = await v$.value.$validate();
  if (!valid) return;
  emit("save", {...formObject.value,phone:normalizePhoneNumber(formObject.value.phone)});
};
</script>
<style scoped lang="scss">
.request_form {
 width: 500px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  max-height: 700px;
  overflow-y: auto;
}
.buttons {
  display: flex;
  gap: 2rem;
}
</style>
