import { ref, watch } from 'vue'

export function useDebounceValue(value, delay = 300) {
  const debouncedValue = ref(value)

  let timeout

  watch(value, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = value
    }, delay)
  })

  return debouncedValue
}
