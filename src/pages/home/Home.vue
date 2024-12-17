<script setup>
</script>

<template>
    <div class="home-wrapper">
        <div class="home-wrapper__top">
            <div class="home-wrapper__title">Home</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-wrapper {
    color: light-dark($Light-Text, $Dark-Text);

    &__top {
        // background: url(/src/assets/svg/background.svg) no-repeat;
        background-size: cover;
        justify-content: center;
        width: 100%;
        height: 100vh;
        min-height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__title {
        @include text-style(16px, 24px, 600, $Base-White);
        background-color: $Base-Black;
        padding: 18px 32px;
    }

    &__section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 32px 0;
    }
}
</style>