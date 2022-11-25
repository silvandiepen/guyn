<template>
  <div :class="bemm('picker')">
    <input type="color" id="color-changer" v-model="value" />
    <label for="color-changer"></label>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from "bemm";
import { computed } from "@vue/runtime-core";

const props = defineProps({
  modelValue: {
    type: String,
    default: "#ffffff",
  },
  block: {
    type: String,
    default: "block",
  },
});
const { bemm } = useBemm(props.block);

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
.color {
  &__picker {
    position: absolute;
    top: 0;
    right: 0%;
    transform: translateY(-50%) translateX(50%);
    input {
      visibility: hidden;
      position: absolute;
    }
    label {
      background-color: var(--color);
      box-shadow: 0 0 0 2px var(--color-text), 5px 5px 0 0 var(--shadow);
      display: block;
      width: 3em;
      height: 3em;
      border-radius: 50%;
    }
  }
}
</style>
