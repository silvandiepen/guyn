<template>
  <div :class="bemm('matches')">
    <div :class="bemm('match')" v-for="(key, idx) in Object.keys(items)" :key="idx">
      <div
        :class="bemm('match-item')"
        v-for="(clr, idy) in items[key]"
        :key="idy"
        :style="`--color: ${clr}`"
        @click="onClick(clr)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from "bemm";

const props = defineProps({
  items: {
    type: Object,
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
  &__matches {
    display: flex;
    flex-direction: column;
  }
  &__match {
    display: flex;
  }
  &__match-item {
    height: 1em;
    display: block;
    width: 100%;
    background-color: var(--color);
  }
}
</style>
