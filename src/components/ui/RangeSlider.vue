<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  max: Number,
  label: String,
  valueName: String
})

console.log(props)

const minAngle = ref(0)
const maxAngle = ref(props.max)
const startBackground = ref('0')
const widthBackground = ref('100%')

const sliderMin = computed({
  get: () => minAngle.value,
  set: (val) => {
    val = parseInt(val)
    if (val > maxAngle.value) {
      maxAngle.value = val
    }
    if (val < 0) {
      minAngle.value = 0
    } else {
      minAngle.value = val
    }
    startBackground.value = `${(val / props.max) * 100}%`
    widthBackground.value = `${(maxAngle.value / props.max) * 100 - (minAngle.value / props.max) * 100}%`
  }
})

const sliderMax = computed({
  get: () => maxAngle.value,
  set: (val) => {
    val = parseInt(val)
    if (val < minAngle.value) {
      minAngle.value = val
    }
    if (val > props.max) {
      maxAngle.value = props.max
    } else {
      maxAngle.value = val
    }
    startBackground.value = `${(minAngle.value / props.max) * 100}%`
    widthBackground.value = `${(val / props.max) * 100 - (minAngle.value / props.max) * 100}%`
  }
})
</script>

<template>
  <div class="range-slider">
    <h3 class="range-slider__title">{{ label }}</h3>
    <div class="range-slider__numbers">
      <div class="range-slider__input-number">
        <span>от</span>
        <input
          type="number"
          min="0"
          :max="max"
          step="1"
          v-model.number="sliderMin"
          @change="sliderMin = parseInt(sliderMin)"
        />
        <span>{{ valueName }}</span>
      </div>
      <div class="range-slider__input-number">
        <span>до</span>
        <input
          type="number"
          min="0"
          :max="max"
          step="1"
          v-model.number="sliderMax"
          @change="sliderMax = parseInt(sliderMax)"
        />
        <span>{{ valueName }}</span>
      </div>
    </div>
    <div class="range-slider__range">
      <input
        type="range"
        min="0"
        :max="max"
        step="10"
        v-model.number="sliderMin"
      />
      <input
        type="range"
        min="0"
        :max="max"
        step="10"
        v-model.number="sliderMax"
      />
      <span class="range-slider__active-bar"></span>
    </div>
  </div>
</template>

<style scoped>
.range-slider {
  position: relative;
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
}

.range-slider__title {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
}

.range-slider__range {
  position: relative;
}

.range-slider__numbers {
  display: flex;
  width: 100%;
  gap: 7px;
  color: var(--text-gray);
  margin-bottom: 23px;
}

.range-slider__input-number {
  width: 100%;
  display: grid;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 6px;
  background: rgba(93, 136, 150, 0.08);
}

.range-slider input[type='range'] {
  position: absolute;
  left: 0;
  bottom: 0;
}

.range-slider__active-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--light-green);
  left: v-bind(startBackground);
  width: v-bind(widthBackground);
  max-width: 100%;
}

input[type='number'] {
  text-align: center;
  border: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  line-height: 120%;
  color: var(--text-gray);
}

input[type='number']:invalid,
input[type='number']:out-of-range {
  font-weight: 600;
  color: var(--red);
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
  height: 18px;
  width: 18px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 2px 11px 0 rgba(12, 12, 13, 0.2);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9px;
}
</style>
