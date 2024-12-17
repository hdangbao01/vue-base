<script setup>
import BaseInput from '@/components/Common/BaseInput.vue'
import BaseButton from '@/components/Common/BaseButton.vue'
</script>

<template>
    <div class="test-wrapper">
        <div>Test Page</div>
        <BaseInput
            labelField="Basic"
            nameField="Basic"
            isRequired
        />
        <BaseInput
            labelField="Disabled"
            nameField="Disabled"
            isDisabled
        />
        <BaseInput
            labelField="Search"
            nameField="Search"
            type="search"
        />
        <BaseInput
            labelField="TextArea"
            nameField="TextArea"
            textArea
        />
        <div class="flex gap-4">
            <BaseButton title="Primary"></BaseButton>
            <BaseButton title="Secondary" variant="secondary"></BaseButton>
            <BaseButton title="Warning" variant="warning"></BaseButton>
        </div>
    </div>
</template>

<style scoped>
.test-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
}
</style>