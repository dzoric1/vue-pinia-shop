<script setup>
defineProps({
  isShow: Boolean
})
</script>

<template>
  <Transition name="popup">
    <div class="popup" v-if="isShow" @click.self="$emit('close')">
      <div class="popup__body">
        <button class="popup__close" @click="$emit('close')"></button>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  display: flex;
  transition: opacity 0.3s ease;
  padding: 0 20px;
}

.popup__close {
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &::after,
  &::before {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #bdbdbd;
    pointer-events: all;
    border-radius: 2px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    opacity: 0.7;
  }
}

.popup__body {
  position: relative;
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 750px;
  margin: auto;
  padding: 30px;
}

.popup-enter-from {
  opacity: 0;
}
.popup-leave-to {
  opacity: 0;
}
</style>
