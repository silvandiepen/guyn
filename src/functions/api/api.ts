import type { Handler } from "@netlify/functions";
import {
  toHex,
  toCMYK,
  toRGB,
  rgbToHex,
  hslToRgb,
  toHSL,
  getBrightness,
  mix,
  getName,
  toHSV,
} from "@sil/color";
import type { RGB, HSL, HEX } from "@sil/color";
// import { getName } from "./color-name";

export const isHashtaglessHex = (value: string): boolean => {
  if (typeof value !== "string") return false;

  const reg = /^([0-9a-f]{3}){1,2}$/i;
  return reg.test(value);
};

export const handler: Handler = async (event: any) => {
  let input = "#cccccc";
  if (event.queryStringParameters) {
    const { color = input } = event.queryStringParameters;

    input = color;
  }

  if (isHashtaglessHex(input)) {
    input = "#" + input;
  }
  const color = {
    rgb: toRGB(input),
    hex: toHex(input),
    hsl: toHSL(input),
    hsv: toHSV(input),
    cmyk: toCMYK(input),
  };

  const darken = [];
  const lighten = [];
  const black = toRGB("#000000");
  const white = toRGB("#ffffff");

  for (let i = 0; i < 10; i++) {
    darken.push(rgbToHex(mix(color.rgb, black, i * 10) as RGB));
    lighten.push(rgbToHex(mix(color.rgb, white, i * 10) as RGB));
  }


  const matchingColor = (base: HSL, sep = 0): HEX[] => {
    const colors: HEX[] = [];

    for (let i = 0; i < sep; i++) {
      const tempHsl = {
        ...base,
        h: base.h + (360 / sep) * i,
      };
      const rgbColor = hslToRgb(tempHsl as HSL);

      colors.push(toHex(rgbColor));
    }

    return colors;
  };

  const matchingColors = {
    one: matchingColor(color.hsl, 1),
    two: matchingColor(color.hsl, 2),
    three: matchingColor(color.hsl, 3),
    four: matchingColor(color.hsl, 4),
    five: matchingColor(color.hsl, 5),
    six: matchingColor(color.hsl, 6),
    seven: matchingColor(color.hsl, 7),
    eight: matchingColor(color.hsl, 8),
    nine: matchingColor(color.hsl, 9),
    ten: matchingColor(color.hsl, 10),
  };

  const output = {
    name: getName(input),
    ...color,
    text: getBrightness(input) > 50 ? "black" : "white",
    text_contra: getBrightness(input) > 50 ? "white" : "black",
    brightness: getBrightness(input),
    darken,
    lighten,
    matchingColors,
  };

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(output),
  };
};
