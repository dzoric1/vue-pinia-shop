<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const minAngle = ref(0)
    const maxAngle = ref(480)
    const startBackground = ref('0')
    const widthBackground = ref('100%')

    const sliderMin = computed({
      get: () => minAngle.value,
      set: (val) => {
        val = parseInt(val)
        if (val > maxAngle.value) {
          maxAngle.value = val
        }
        minAngle.value = val
        console.log(val / 480)
        startBackground.value = `${(val / 480) * 100}%`
        widthBackground.value = `${(maxAngle.value / 480) * 100 - (minAngle.value / 480) * 100}%`
      }
    })

    const sliderMax = computed({
      get: () => maxAngle.value,
      set: (val) => {
        val = parseInt(val)
        if (val < minAngle.value) {
          minAngle.value = val
        }
        maxAngle.value = val
        console.log(val / 480)
        startBackground.value = `${(minAngle.value / 480) * 100}%`
        widthBackground.value = `${(val / 480) * 100 - (minAngle.value / 480) * 100}%`
      }
    })

    return {
      minAngle,
      maxAngle,
      sliderMin,
      sliderMax,
      // backgroundStart,
      // backgroundEnd,
      startBackground,
      widthBackground
    }
  }
}
</script>

<template>
  <div class="range-slider">
    <input
      type="range"
      min="0"
      max="480"
      step="10"
      v-model.number="sliderMin"
    />
    <input
      type="number"
      min="0"
      max="480"
      step="10"
      v-model.number="sliderMin"
    />
    <input
      type="range"
      min="0"
      max="480"
      step="10"
      v-model.number="sliderMax"
    />
    <input
      type="number"
      min="0"
      max="480"
      step="10"
      v-model.number="sliderMax"
    />
    <span class="range-slider__active"></span>
  </div>
</template>

<style scoped>
.range-slider {
  position: relative;
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
}

.range-slider input[type='range'] {
  position: absolute;
  left: 0;
  bottom: 0;
}

.range-slider__active {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--light-green);
  /* background: linear-gradient(to right, #ff0000 50%, #0000ff 50%); */
  /* left: 41.2%; */
  left: v-bind(startBackground);
  width: v-bind(widthBackground);
}

input[type='number'] {
  padding: 10px;
  border: none;
  border-radius: 6px;
  text-align: center;
  color: var(--text-gray);
  background: rgba(93, 136, 150, 0.08);
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number']:invalid,
input[type='number']:out-of-range {
  border: 2px solid var(--red);
}

input[type='range'] {
  appearance: none;
  width: 100%;
}

input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: #bdbdbd;
  border-radius: 2px;
  box-shadow: none;
  border: 0;
}

input[type='range']::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  height: 19px;
  width: 19px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 2px 11px 0 rgba(12, 12, 13, 0.2);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9px;
}
</style>
