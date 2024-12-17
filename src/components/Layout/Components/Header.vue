<script setup>
import { useRouter } from 'vue-router'

import IconSvg from '@/components/Common/IconSvg.vue'

const router = useRouter()
</script>

<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__logo">
                <IconSvg class="logo" name="logo"></IconSvg>
            </div>
            <nav class="header__nav-bar">
                <div class="header__nav-item" @click="router.push('/')">Home</div>
                <div class="header__nav-item" @click="router.push('/login')">Login</div>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    z-index: 9;
    color: light-dark($Light-Text, $Dark-Text);

    &__wrapper {
        width: 100%;
        max-width: 1200px;
        height: $Height-Header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
    }
    
    &__logo {
        padding: 10px 12px;
        border-radius: 16px;

        .logo {
            width: 40px;
            height: 40px;
        }
    }
    
    &__nav-bar {
        @include text-style(16px, 24px, 600, $Base-Black);
        display: flex;
        background-color: $Base-Black;
        color: $Base-White;
        border-radius: 16px;
        padding: 0 14px;
    }
    
    &__nav-item {
        cursor: pointer;
        padding: 14px 16px;
    }
}
</style>
