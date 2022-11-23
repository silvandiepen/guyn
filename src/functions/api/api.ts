import { Handler } from "@netlify/functions";
import { toHex, toCMYK, toRGB, toHSL } from "@sil/color";

export const handler: Handler = async (event:any) => {
  let input = "#cccccc";
  if (event.queryStringParameters) {
    const { color = input } = event.queryStringParameters;
    input = color;
  }

  const output = {
    hex: toHex(input),
    cmyk: toCMYK(input),
    rgb: toRGB(input),
    hsl: toHSL(input),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };
};
