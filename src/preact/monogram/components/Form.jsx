import { useState, useEffect } from "preact/hooks";
import { handleize } from "../utils";
import MonogramButtons from "./MonogramButtons";
import MonogramInputs from "./MonogramInputs";
import HiddenLineItemProperties from "./HiddenLineItemProperties";
import MonogramSubmit from "./MonogramSubmit";

const Form = ({ data }) => {
  const [style, setStyle] = useState(
    data.monogram_product_initial_variant.title
  );
  const [monogram, setMonogram] = useState("Dudley");
  const [firstInitial, setFirstInitial] = useState("A");
  const [middleInitial, setMiddleInitial] = useState("B");
  const [lastInitial, setLastInitial] = useState("C");

  const textOverlay = document.querySelector(
    "monogram-customizer .text-overlay"
  );

  useEffect(() => {
    if (!textOverlay) return;

    textOverlay.classList.remove("classic", "block", "monogram", "heart");
    textOverlay.classList.add(handleize(style));

    // need to use spans for ability to style individual letters
    textOverlay.innerHTML =
      handleize(style) === "block"
        ? monogram
        : handleize(style) === "heart"
        ? '<img src="https://cdn.shopify.com/s/files/1/0833/2853/files/heart-zoom.jpg?v=1714071299">'
          : `<span class="first">${firstInitial.toUpperCase()}</span><span class="middle">${middleInitial.toUpperCase()}</span><span class="last">${lastInitial.toUpperCase()}</span>`;
  }, [style, monogram, firstInitial, middleInitial, lastInitial]);

  return (
    <form action="/cart/add" method="POST">
      <MonogramButtons data={data} style={style} setStyle={setStyle} />
      <MonogramInputs
        style={style}
        monogram={monogram}
        firstInitial={firstInitial}
        middleInitial={middleInitial}
        lastInitial={lastInitial}
        setMonogram={setMonogram}
        setFirstInitial={setFirstInitial}
        setMiddleInitial={setMiddleInitial}
        setLastInitial={setLastInitial}
      />
      <HiddenLineItemProperties
        data={data}
        style={style}
        monogram={monogram}
        firstInitial={firstInitial}
        middleInitial={middleInitial}
        lastInitial={lastInitial}
      />
      <MonogramSubmit
        style={style}
        monogram={monogram}
        firstInitial={firstInitial}
        middleInitial={middleInitial}
        lastInitial={lastInitial}
      />
    </form>
  );
};

export default Form;
