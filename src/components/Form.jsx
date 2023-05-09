import { useState } from "preact/hooks";
import { handleize } from "../utils";

const Form = ({ data }) => {
  console.log(data);

  const [parentProductVariantId, setParentProductVariantId] = useState(
    data.parent_product_initial_variant.id
  );
  const [monogramUuid, setMonogramUuid] = useState(crypto.randomUUID());
  const [monogramFor, setMonogramFor] = useState(
    `${data.parent_product.title} - ${data.parent_product_initial_variant.title}`
  );
  const [style, setStyle] = useState(
    data.monogram_product_initial_variant.title
  );
  const [monogram, setMonogram] = useState("Dudley");
  const [firstInitial, setFirstInitial] = useState("A");
  const [middleInitial, setMiddleInitial] = useState("B");
  const [lastInitial, setLastInitial] = useState("C");

  document.addEventListener("ajaxProduct:added", () => {
    setMonogramUuid(crypto.randomUUID());
  });

  document.addEventListener("variant:change", (e) => {
    setParentProductVariantId(e.detail.variant.id);
    setMonogramFor(e.detail.variant.name);
  });

  function location() {
    const handle = handleize(data.parent_product.type);

    if (handle === "kids") {
      return "Left Chest";
    } else if (handle === "accessories" || handle === "kids-accessories") {
      return "Opposite pineapple (left side)";
    } else {
      return "Left Sleeve";
    }
  }

  return (
    <form action="/cart/add" method="POST">
      {data.monogram_product.variants.map((variant) => (
        <>
          <label for={variant.id}>{variant.title}</label>
          <input
            type="radio"
            name="items[0][id]"
            id={variant.id}
            value={variant.id}
            onChange={() => setStyle(variant.title)}
            checked={style === variant.title}
            data-title={variant.title}
          />
        </>
      ))}

      <input
        type="text"
        onChange={(e) => setMonogram(e.target.value)}
        value={monogram}
      />
      <input
        type="text"
        onChange={(e) => setFirstInitial(e.target.value)}
        value={firstInitial}
      />
      <input
        type="text"
        onChange={(e) => setMiddleInitial(e.target.value)}
        value={middleInitial}
      />
      <input
        type="text"
        onChange={(e) => setLastInitial(e.target.value)}
        value={lastInitial}
      />

      {/* Monogram product */}
      <input type="hidden" name="items[0][quantity]" value="1" />
      <input
        type="hidden"
        name="items[0][properties][_Monogram ID]"
        value={monogramUuid}
      />
      <input
        type="hidden"
        name="items[0][properties][Monogram for]"
        value={monogramFor}
      />
      <input type="hidden" name="items[0][properties][Style]" value={style} />
      <input
        type="hidden"
        name="items[0][properties][_Location]"
        value={location()}
      />
      <input type="hidden" name="items[0][properties][_Gift wrap]" value="No" />
      <input
        type="hidden"
        name="items[0][properties][Monogram]"
        value={monogram + firstInitial + middleInitial + lastInitial}
      />

      {/* Parent product */}
      <input type="hidden" name="items[1][id]" value={parentProductVariantId} />
      <input type="hidden" name="items[1][quantity]" value="1" />
      <input
        type="hidden"
        name="items[1][properties][_Monogram ID]"
        value={monogramUuid}
      />
      <input type="hidden" name="items[1][properties][Style]" value={style} />
      <input
        type="hidden"
        name="items[1][properties][_Location]"
        value={location()}
      />
      <input
        type="hidden"
        name="items[1][properties][Monogram]"
        value={monogram + firstInitial + middleInitial + lastInitial}
      />

      <button class="btn monogram__add-to-cart">Submit</button>
    </form>
  );
};

export default Form;
