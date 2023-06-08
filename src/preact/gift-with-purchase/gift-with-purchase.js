import "preact/debug";
import { render } from "preact";
import Test from "./components/Test";

const gwp = document.querySelector("#GiftWithPurchase");

if (theme.gwpData.enabled) {
  render(<Test data={theme.gwpData} />, gwp);
}
