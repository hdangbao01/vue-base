<script setup>
import { computed } from "vue"

const props = defineProps(['name'])

const modules = import.meta.glob("/src/assets/icons/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
})

const svg = computed(() => {
    return modules["/src/assets/icons/" + (props.name ?? "") + ".svg"] ?? null;
})
</script>

<template>
    <div class="icon-svg" v-html="svg" v-if="svg"></div>
</template>

<style scoped>
.icon-svg {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>