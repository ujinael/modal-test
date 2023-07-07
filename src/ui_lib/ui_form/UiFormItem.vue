<template>
<div class="ui_form__item">
<label class="ui_form__item__label" v-if="label">
{{ label }}
</label>
<slot >
</slot>
<span class="ui_form__item__errors"
v-if="errors"
>{{ errorString }}</span>
</div>
</template>
<script setup lang="ts">
import {type ErrorObject } from '@vuelidate/core';
import { computed } from 'vue';

const props = defineProps<{
    label?:string
    errors?:ErrorObject[]
}>()
const errorString = computed(()=>{
 if(props.errors)return props.errors.map(e=>e.$message.toString()).join('\n')   
else return undefined
})
</script>
<style scoped lang="scss">
.ui_form__item{
    display: flex;
    flex-direction: column;
    gap: .2em;
    &__label{
        padding:0 .5em;
        line-height: 1em;
        font-size: .8em;
        color: var(--color-text-accent);
    }
    &__errors{
        font-size: .8em;
        color: var(--color-text-errors);
    }
}
</style>