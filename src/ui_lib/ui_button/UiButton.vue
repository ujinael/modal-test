<template>
<button class="ui_button cursor-pointer">
<slot>
</slot>
</button>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.ui_button{
    display: inline-block;
    --border-color:var(--color-default);
    --button-bg-color:var(--color-default);
    color:var(--color-text-headers);
    letter-spacing: 1px;
    box-shadow: .5px .5px 2px var(--color-shadows);

    border-radius: var(--border-radius-common);
    background-color: var(--button-bg-color);
    border:1px solid var(--border-color);
    padding: .5em 1em;
}
.accept{
    --border-color:var(--color-accept);
    --button-bg-color: var(--color-accept);
}
.cancel{
    --border-color:var(--color-danger);
    --button-bg-color: var(--color-danger);
}
</style>