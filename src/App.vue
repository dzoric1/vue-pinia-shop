<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'
import AppBreadcrumbs from './components/AppBreadcrumbs.vue'
</script>

<template>
  <AppHeader />
  <main>
    <AppBreadcrumbs />
    <RouterView />
  </main>
</template>

<style lang="scss"></style>
