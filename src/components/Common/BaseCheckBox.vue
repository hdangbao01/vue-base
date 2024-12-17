<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    data: Object,    
    modelValue: {
        type: Boolean,
        default: false
    },
    labelField: String,
    defaultValue: String,
})

const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
    <label class="container-checkbox">
        <div v-if="labelField">{{ labelField }}</div>
        <input 
            v-model="innerValue" 
            type="checkbox"
            @input.stop="$emit('change', $event)"
            :disabled="isDisabled"
            @change.prevent.stop
            :value="defaultValue"
        >
        <div class="checkmark"></div>
    </label>
</template>

<style lang="scss" scoped>
.container-checkbox {
    @include text-style(14px, 20px, 500, $Gray-modern-800);
    position: relative;
    width: auto;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    justify-content: flex-end;
}

.container-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    border: 1px solid $Gray-modern-400;
    background-color: $Success-Base-White;
}

.container-checkbox:hover input ~ .checkmark {
    background-color: $Gray-modern-100;
}

.container-checkbox input:checked ~ .checkmark {
    background-color: $Primary-500;
    border-color: $Primary-500;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.container-checkbox input:checked ~ .checkmark:after {
    display: block;
}

.container-checkbox .checkmark:after {
    left: 6px;
    top: 2px;
    width: 6px;
    height: 11px;
    border: solid $Success-Base-White;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>