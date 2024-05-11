<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppBreadcrumbs from './components/AppBreadcrumbs.vue'
import { register } from 'swiper/element/bundle'

register()
</script>

<template>
  <AppHeader />
  <main>
    <AppBreadcrumbs />
    <RouterView />
  </main>
</template>

<style lang="scss"></style>
