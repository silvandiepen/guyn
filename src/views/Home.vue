<script setup lang="ts">
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useBemm } from "bemm";

import ColorItems from "../components/ColorItems.vue";
import ColorMatches from "../components/ColorMatches.vue";
import ColorShades from "../components/ColorShades.vue";
import ColorPicker from "../components/ColorPicker.vue";
import InputRange from "../components/InputRange.vue";
import {
  HEX,
  isHex,
  CMYK,
  rgbToHex,
  cmykToHex,
  hslToHex,
  instanceOfHSL,
  instanceOfRGB,
} from "@sil/color";

const block = ref("color");

const { bemm, classes } = useBemm(block.value);
const route = useRoute();
const router = useRouter();

const colorData = ref();
const color = ref<string>((route.params.color as string) || "#000000");

const newHex = ref<HEX>("#000000");
const newRgb = ref({ r: "0", g: "0", b: "0" });
const newHsl = ref({ h: "0", s: "0", l: "0" });
const newCmyk = ref({ c: "0", m: "0", y: "0", k: "0" });

const getColor = async () => {
  const clr = color.value.replace("#", "");
  const response = await fetch(
    import.meta.env.VITE_FUNCTIONS_URL + ".netlify/functions/api/?color=" + clr
  );
  colorData.value = await response.json();
  console.log(colorData.value);
};

const changeHex = () => {
  if (isHex(newHex.value)) {
    goToColor(newHex.value);
  }
};
const changeRgb = () => {
  const fixedRgb = {
    r: parseInt(newRgb.value.r),
    g: parseInt(newRgb.value.g),
    b: parseInt(newRgb.value.b),
  };
  if (instanceOfRGB(fixedRgb)) {
    const tempHex = rgbToHex(fixedRgb);
    goToColor(tempHex);
  }
};
const changeHsl = () => {
  const fixedHsl = {
    h: parseInt(newHsl.value.h) as Number,
    s: parseInt(newHsl.value.s),
    l: parseInt(newHsl.value.l),
  };
  if (instanceOfHSL(fixedHsl)) {
    const tempHex = hslToHex(fixedHsl);
    goToColor(tempHex);
  }
};
const changeCmyk = () => {
  // if (isCMYK(newCmyk.value)) {
  const fixedCmyk = {
    c: parseInt(newCmyk.value.c),
    m: parseInt(newCmyk.value.m),
    y: parseInt(newCmyk.value.y),
    k: parseInt(newCmyk.value.k),
  };
  goToColor(cmykToHex(fixedCmyk as CMYK));
  // }
};

watch(
  () => colorData.value,
  () => {
    newHex.value = colorData.value.hex;
    newRgb.value = {
      r: `${colorData.value.rgb.r}`,
      g: `${colorData.value.rgb.g}`,
      b: `${colorData.value.rgb.b}`,
    };
    newHsl.value = {
      h: `${colorData.value.hsl.h}`,
      s: `${colorData.value.hsl.s}`,
      l: `${colorData.value.hsl.l}`,
    };
    newCmyk.value = {
      c: `${colorData.value.cmyk.c}`,
      m: `${colorData.value.cmyk.m}`,
      y: `${colorData.value.cmyk.y}`,
      k: `${colorData.value.cmyk.k}`,
    };
  }
);
watch(
  () => color.value,
  () => {
    getColor();

    router.push({
      name: "color",
      params: { color: color.value.replace("#", "") },
    });
    // console.log(colorData)
  }
);

onMounted(async () => {
  getColor();
});

const goToColor = (input: string) => {
  color.value = input;
};
</script>

<template>
  <main
    v-if="colorData"
    :class="bemm('container')"
    :style="`
    --color: ${colorData.hex}; 
    --color-text: ${colorData.text};  
    --color-text-contra: ${colorData.text_contra}; 
    --shadow: ${colorData.darken[2]};
    --background: ${colorData.brightness > 50 ? colorData.darken[1] : colorData.lighten[1]}`"
  >
    <div :class="bemm()">
    <ColorPicker :block="block" v-model="color"></ColorPicker>
      <h1>{{ colorData.name }}</h1>
    

      <article :class="classes('rgb', 'space')">
        <header :class="bemm('header')">
          <h4>HEX</h4>
        </header>
        <ul :class="bemm('list')">
          <li :class="bemm('item')">
            <input
              :class="bemm('hex-control')"
              type="text"
              v-model="newHex"
              @change="changeHex"
            />
          </li>
        </ul>
      </article>

      <article :class="classes('rgb', 'space')">
        <header :class="bemm('header')">
          <h4>BRIGHTNESS</h4>
          <div :class="bemm('code')">{{ colorData.brightness }}%</div>
        </header>
      </article>

      <article :class="classes('rgb', 'space')">
        <header :class="bemm('header')">
          <h4>RGB</h4>
          <div :class="bemm('code')">
            rgb({{ colorData.rgb.r }}, {{ colorData.rgb.g }},
            {{ colorData.rgb.b }})
          </div>
        </header>
        <ul :class="bemm('list')">
          <ColorItems :block="block" :color="colorData.rgb" />
        </ul>
        <div :class="bemm('controls')">
          <InputRange
            label="Red"
            :min="0"
            :max="255"
            v-model="newRgb.r"
            @change="changeRgb"
          />
          <InputRange
            label="Green"
            :min="0"
            :max="255"
            v-model="newRgb.g"
            @change="changeRgb"
          />
          <InputRange
            label="Blue"
            :min="0"
            :max="255"
            v-model="newRgb.b"
            @change="changeRgb"
          />
        </div>
      </article>
      <div :class="classes('cmyk', 'space')" v-if="colorData">
        <header :class="bemm('header')">
          <h4>CMYK</h4>
          <div :class="bemm('code')">
            C{{ colorData.cmyk.c }} M{{ colorData.cmyk.m }} Y{{
              colorData.cmyk.y
            }}
            K{{ colorData.cmyk.k }}
          </div>
        </header>
        <ul :class="bemm('list')">
          <ColorItems :block="block" :color="colorData.cmyk" />
        </ul>

        <div :class="bemm('controls')">
          <InputRange
            label="Cyan"
            :min="0"
            :max="100"
            v-model="newCmyk.c"
            @change="changeCmyk"
          />
          <InputRange
            label="Magenta"
            :min="0"
            :max="100"
            v-model="newCmyk.m"
            @change="changeCmyk"
          />
          <InputRange
            label="Yellow"
            :min="0"
            :max="100"
            v-model="newCmyk.y"
            @change="changeCmyk"
          />
          <InputRange
            label="Black"
            :min="0"
            :max="100"
            v-model="newCmyk.k"
            @change="changeCmyk"
          />
        </div>
      </div>
      <div :class="classes('hsl', 'space')">
        <header :class="bemm('header')">
          <h4>HSL</h4>
          <div :class="bemm('code')">
            hsl({{ colorData.hsl.h }}, {{ colorData.hsl.s }},
            {{ colorData.hsl.l }})
          </div>
        </header>
        <ul :class="bemm('list')">
          <ColorItems :block="block" :color="colorData.hsl" />
        </ul>
        <div :class="bemm('controls')">
          <InputRange
            label="Hue"
            :min="0"
            :max="360"
            v-model="newHsl.h"
            @change="changeHsl"
          />
          <InputRange
            label="Saturation"
            :min="0"
            :max="100"
            v-model="newHsl.s"
            @change="changeHsl"
          />
          <InputRange
            label="Lightness"
            :min="0"
            :max="100"
            v-model="newHsl.l"
            @change="changeHsl"
          />
        </div>
      </div>

      <ColorMatches
        :block="block"
        :onClick="goToColor"
        :items="colorData.matchingColors"
      />
      <ColorShades
        :block="block"
        :onClick="goToColor"
        :items="colorData.darken"
      />
      <ColorShades
        :block="block"
        :onClick="goToColor"
        :items="colorData.lighten"
      />
    </div>
  </main>
</template>

<style lang="scss">
.color {
  $b: &;
  color: var(--color-text);
  border-radius: 0.5em;
  position: relative;
  width: 640px;
  max-width: 100%;

  &__space {
    width: 100%;
    padding: 2em;
    & + & {
      border-top: 2px solid var(--shadow);
      margin-top: 1em;
    }
  }

  &__hex-control {
    width: 100%;
    padding: 1em 0;
    border-radius: 0.5em;
    border: none;
    background-color: transparent;
    font-size: 1em;
    color: var(--color-text);
    &:focus {
      border: none;
      padding: 1em;
      color: var(--color-text-contra);
      background-color: var(--color-text);
      outline: none;
    }
  }

  &__container {
    background-color: var(--color);
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8vw 0;
  }

  &__item {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    // display: table;
    span {
      width: 33.33%;
      text-align: left;
      // display: table-cell;
    }
  }
  &__label {
    white-space: nowrap;
    &::before {
      content: "";
      display: inline-block;
      border-radius: 50%;
      opacity: var(--percentage);
      width: 0.75em;
      height: 0.75em;
      margin-right: 0.25em;
    }
    &--r::before {
      background-color: red;
    }
    &--g::before {
      background-color: green;
    }
    &--b::before {
      background-color: blue;
    }
    &--c::before {
      background-color: cyan;
    }
    &--m::before {
      background-color: magenta;
    }
    &--y::before {
      background-color: yellow;
    }
    &--k::before {
      background-color: black;
    }
    &--l::before {
      background-color: white;
    }
  }


  &__controls {
    margin-top: 1em;
  }
  &__header {
    display: flex;
    gap: 1em;
  }
  &__code {
    opacity: 0.5;
  }
}
</style>
