<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: auto;
  width: 100%;
  border: 1px solid rgba(93, 136, 150, 0.08);
  height: 200px;

  span {
    display: inline-block;
    width: 16px;
    border-radius: 4px;
    background: var(--red);
    animation: loader 0.8s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      animation-delay: -0.24s;
    }
    &:nth-child(2) {
      animation-delay: -0.12s;
    }
    &:nth-child(3) {
      animation-delay: 0;
    }
  }
}
@keyframes loader {
  0% {
    height: 80px;
  }
  50%,
  100% {
    height: 40px;
  }
}
</style>
