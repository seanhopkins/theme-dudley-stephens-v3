import "preact/debug";
import { render } from "preact";
import Test from "./components/Test";

const gwp = document.querySelector("#GiftWithPurchase");

console.log(gwp);

render(<h1>test</h1>, gwp);

