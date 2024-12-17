<script setup>
const props = defineProps(['title', 'data', 'isLink', 'isPrice', 'isTime'])
</script>

<template>
    <div class="label-text">
        <div class="label-text__title">{{ title }}</div>
        <a :href="data" target="_blank" v-if="isLink">
            <div class="label-text__link">{{ data ? data : '-' }}</div>
        </a>
        <div class="label-text__data" v-else-if="isPrice">{{ data ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data) : '-' }}</div>
        <div class="label-text__data" v-else-if="isTime">{{ data ? `${data} ${isTime}` : '-' }}</div>
        <div class="label-text__data" v-else>{{ data ? data : '-' }}</div>
    </div>
</template>

<style lang="scss" scoped>
.label-text {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__title {
        @include text-style(14px, 20px, 500, $Gray-modern-600);
    }
    
    &__data {
        @include text-style(14px, 20px, 500, $Gray-modern-800);
    }

    &__link {        
        @include text-style(14px, 20px, 500, $Blue-indigo-600);

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>