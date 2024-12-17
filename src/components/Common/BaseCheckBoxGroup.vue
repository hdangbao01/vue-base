<script setup>
import { computed, onMounted } from 'vue';

import BaseCheckBox from '@/components/Common/BaseCheckBox.vue';

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue', 'listData'])

const isSelected = computed(() => (optionId) => {
    return props.modelValue.includes(optionId)
})

const handleChange = (event) => {
    let updatedModelValue = [...props.modelValue]

    const index = updatedModelValue.indexOf(event.target.value)
    if (index > -1) {
        updatedModelValue.splice(index, 1)
    } else {
        updatedModelValue.push(event.target.value)
    }

    emit('update:modelValue', updatedModelValue)
}
</script>

<template>
    <div v-for="item in listData" :key="item.id">
        <BaseCheckBox
            :modelValue="isSelected(item.id)"
            :labelField="item.name"
            :description="item.price"
            @change="handleChange"
            :defaultValue="item.id"
        ></BaseCheckBox>
    </div>
</template>

<style scoped>
</style>