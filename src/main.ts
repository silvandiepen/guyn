import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      color: {
        r: "Red",
        g: "Green",
        b: "Blue",
        c: "Cyan",
        m: "Magenta",
        y: "Yellow",
        k: "Black",
        h: "Hue",
        s: "Saturation",
        l: "Lightness",
      },
    },
    nl: {
      color: {
        r: "Rood",
        g: "Groen",
        b: "Blauw",
        c: "Cyaan",
        m: "Magenta",
        y: "Geel",
        k: "Zwart",
        h: "Tint",
        s: "Verzadiging",
        l: "Lichtheid",
      },
    },
  },
});

app.use(router);
app.use(i18n);
app.mount("#app");
