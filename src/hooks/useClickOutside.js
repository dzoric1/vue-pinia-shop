import { onMounted, onUnmounted, ref } from 'vue'

export default function useClickOutside(elementRef, callback) {
  function handleClick(event) {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
}
