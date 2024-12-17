
<script setup>
import { computed } from 'vue'

import Header from './Components/Header.vue'
</script>

<template>
  <div class="default-layout">
    <Header></Header>
    
    <div class="body-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  // overflow: hidden;
}

.body-content {
  width: 100%;
  min-height: 100vh;
  background-color: $Gray-modern-400;
}
</style>