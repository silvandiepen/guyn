<template>
  <div :class="bemm()">
    <label :class="bemm('label')" v-if="label">{{ label }}</label>
    <input
      :class="bemm('control')"
      type="range"
      v-model="value"
      :min="min"
      :max="max"
    />
    <div :class="bemm('value')">
      <input
        :class="bemm('control2')"
        type="number"
        v-model="value"
        :min="min"
        :max="max"
      />
    </div>
  </div>
</template>

<script setup type="ts">
import { useBemm} from "bemm";
import { computed } from "@vue/runtime-core";


const { bemm } = useBemm('input-range');


const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: 0,
        required: true
    },
    min:{
        type: Number,
        default: 0
    },
    max:{
        type: Number,
        default: 100
    },
    label:{
        type: String,
         default: null
    }
})

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss">
.input-range {
  display: flex;
  &__label {
    min-width: 25%;
  }
  &__value {
    width: 15%;
    padding: 0 1em;
  }
  &__control2 {
    color: var(--color-text);
    background-color: transparent;
    border-radius: 4px;
    border: none;
    padding: 0.5em;
    &:focus {
      outline: none;
      background-color: var(--color-text);
      color: var(--color-text-contra);
    }
  }

  &__control {
    -webkit-appearance: none;
    width: 100%;
    background-color: transparent;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      //   width: 100%;
      height: 0.75em;
      cursor: pointer;
      background-color: red;
      animate: 0.2s;
      //   box-shadow: 1px 1px 1px #000000;
      background: var(--shadow);
      border-radius: 5px;
      //   border: 1px solid #000000;
    }
    &::-webkit-slider-thumb {
      //   box-shadow: 1px 1px 1px #000000;
      //   border: 1px solid #000000;
      height: 1.25em;
      width: 1.25em;
      border-radius: 50%;
      background: var(--color-text);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -0.25em;
    }
    &:focus::-webkit-slider-runnable-track {
      background: var(--color-text-contra);
    }
    // &::-moz-range-track {
    //   width: 100%;
    //   height: 10px;
    //   cursor: pointer;
    //   animate: 0.2s;
    //   box-shadow: 1px 1px 1px #000000;
    //   background: #3071a9;
    //   border-radius: 5px;
    //   border: 1px solid #000000;
    // }
    // &::-moz-range-thumb {
    //   box-shadow: 1px 1px 1px #000000;
    //   border: 1px solid #000000;
    //   height: 30px;
    //   width: 15px;
    //   border-radius: 5px;
    //   background: #ffffff;
    //   cursor: pointer;
    // }
    // &::-ms-track {
    //   width: 100%;
    //   height: 10px;
    //   cursor: pointer;
    //   animate: 0.2s;
    //   background: transparent;
    //   border-color: transparent;
    //   color: transparent;
    // }
    // &::-ms-fill-lower {
    //   background: #3071a9;
    //   border: 1px solid #000000;
    //   border-radius: 10px;
    //   box-shadow: 1px 1px 1px #000000;
    // }
    // &::-ms-fill-upper {
    //   background: #3071a9;
    //   border: 1px solid #000000;
    //   border-radius: 10px;
    //   box-shadow: 1px 1px 1px #000000;
    // }
    // &::-ms-thumb {
    //   margin-top: 1px;
    //   box-shadow: 1px 1px 1px #000000;
    //   border: 1px solid #000000;
    //   height: 30px;
    //   width: 15px;
    //   border-radius: 5px;
    //   background: #ffffff;
    //   cursor: pointer;
    // }
    // &:focus::-ms-fill-lower {
    //   background: #3071a9;
    // }
    // &:focus::-ms-fill-upper {
    //   background: #3071a9;
    // }
  }
}
</style>
