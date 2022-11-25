<script setup lang="ts">
import { useBemm } from "bemm";
import { useI18n } from "vue-i18n";

const props = defineProps({
  color: {
    type: Object,
    default: ()=>{},
    required: true,
  },
  total: {
    type: Number,
    default: 255,
    required: false,
  },
  block: {
    type: String,
    default: "",
  },
});

const {bemm, classes } = useBemm(props.block);
const { t } = useI18n({
});

const getPercentage = (input: number, outOf = props.total) => {
  return Math.round((100 / outOf) * input * 100) / 100;
};
</script>

<template>
  <li :class="bemm('item')" v-for="key, idx in Object.keys(props.color)" :key="idx" :style="`--percentage: ${1 / 100 * getPercentage(props.color[key])}`">
    <span :class="classes('label',['label',key])"> {{ t(`color.${key}`) }} </span>
    <span :class="bemm('value')"> {{ props.color[key] }}</span>
    <span :class="bemm('percentage')"> {{ getPercentage(props.color[key]) }}%</span>
  </li>
</template>

