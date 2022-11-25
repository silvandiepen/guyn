<template>
  <div :class="bemm('matches')">
    <div :class="bemm('match')" v-for="key in Object.keys(items)" :key="key">
      <div
        :class="bemm('match-item')"
        v-for="(clr, key) in items[key]"
        :key="key"
        :style="`--color: ${clr}`"
        @click="onClick(clr)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType } from "vue";
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

onMounted(()=>{
    console.log(props.items)
})
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
