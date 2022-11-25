<template>
  <div :class="bemm('shades')">
    <span
      v-for="(c, idx) in items"
      :key="idx"
      :style="`background-color: ${c}`"
      @click="onClick(c)"
      :data-label="c"
    >
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { useBemm } from "bemm";

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: [],
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  block: {
    type: String,
    default: "block",
  },
});
const { bemm } = useBemm(props.block);
</script>

<style lang="scss">
.color {
  &__shades {
    width: 100%;
    height: 2em;
    display: flex;
    span {
      width: 100%;
      display: block;
      height: 100%;
      width: 10vw;
      position: relative;
      &:hover {
        &::before {
          padding: 0.5em;
          position: absolute;
          top: calc(100% + 1em);
          background-color: var(--background);
          color: var(--color-text);
          border-radius: 5px;
          content: attr((data-label));
        }
      }
    }
  }
}
</style>
