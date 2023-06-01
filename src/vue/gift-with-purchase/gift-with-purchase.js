/* global theme */

import { createApp } from "vue";
import GiftWithPurchase from "./GiftWithPurchase.vue";

// if the theme setting is unchecked, bail
if (theme.gwpData.enabled) {
  createApp(GiftWithPurchase, theme.gwpData).mount("#GiftWithPurchase");
}
