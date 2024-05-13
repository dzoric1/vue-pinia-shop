import { ref, watch } from 'vue'

export function useDebounceRefValue(value, delay = 300) {
  const debouncedValue = ref(value.value)

  let timeout

  watch(value, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = value.value
    }, delay)
  })

  return debouncedValue
}
