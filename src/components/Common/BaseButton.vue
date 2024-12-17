<script setup>
import { reactive } from 'vue';

const props = defineProps({
    title: String,
    type: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'primary'
    },
    width: {
        type: String,
        default: "auto",
    },
    disabled: {
        type: Boolean,
        default: false
    },
    outline: {
        type: Boolean,
        default: false
    },
})

const styleObject = reactive({
})
</script>

<template>
    <button 
        class="button"
        :class="[{ 'outline': outline, 'disabled' : disabled }, variant]"
        @click.stop="$emit('onClick')"
        :disabled="disabled"
        :type="type"
    >
        <slot></slot>
        {{ title }}
        <slot name="right-icon"></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    @include font-small();
    width: v-bind("props.width");
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 20px;
    outline: none;
    border: none;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    transition: color 0.2s, background-color 0.2s;
}

.primary {
    color: $Base-White;
    background-color: $Primary-400;

    // &:hover {
    //     color: $Primary-600;
    //     background-color: $Primary-100;
    // }
}

.secondary {
    color: $Base-White;
    background: $Primary-200;

    // &:hover {
    //     background-color: $Gray-modern-100;
    // }
}

.warning {
    color: $Base-White;
    background: $Error-600;

    // &:hover {
    //     color: $Error-600;
    //     background-color: $Error-200;
    // }
}

.disabled {
    color: $Gray-modern-400;
    background-color: $Gray-modern-100;

    // &:hover {
    //     background-color: $Gray-modern-100;
    // }
}

.outline {
    border: 1px solid $Gray-modern-300;
}
</style>