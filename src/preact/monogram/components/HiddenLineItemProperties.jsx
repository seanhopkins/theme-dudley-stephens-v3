import { useState } from "preact/hooks";
import { handleize } from "../utils";

const HiddenLineItemProperties = ({
  data,
  style,
  monogram,
  firstInitial,
  middleInitial,
  lastInitial,
}) => {
  const [parentProductVariantId, setParentProductVariantId] = useState(
    data.parent_product_initial_variant.id
  );
  const [monogramUuid, setMonogramUuid] = useState(crypto.randomUUID());
  const [monogramFor, setMonogramFor] = useState(
    `${data.parent_product.title} - ${data.parent_product_initial_variant.title}`
  );

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

  function setMonogramLineItemProperty() {
    if (handleize(style) === "classic") {
      return (
        firstInitial.toUpperCase() +
        middleInitial.toUpperCase() +
        lastInitial.toUpperCase()
      );
    }

    if (handleize(style) === "block") {
      return monogram;
    }
    if (handleize(style) === "heart") {
      return "heart";
    }

    if (handleize(style) === "monogram") {
      return (
        firstInitial.toUpperCase() +
        lastInitial.toUpperCase() +
        middleInitial.toUpperCase()
      );
    }
  }

  return (
    <>
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
        value={setMonogramLineItemProperty()}
      />

      {/* Parent product */}
      <input type="hidden" name="items[1][id]" value={parentProductVariantId} />
      <input type="hidden" name="items[1][quantity]" value="1" />
      <input
        type="hidden"
        name="items[1][properties][_Monogram ID]"
        value={monogramUuid}
      />
      <input type="hidden" name="items[1][properties][_LPROP]" value="final-sale" />
      <input type="hidden" name="items[1][properties][Style]" value={style} />
      <input
        type="hidden"
        name="items[1][properties][_Location]"
        value={location()}
      />
      <input
        type="hidden"
        name="items[1][properties][Monogram]"
        value={setMonogramLineItemProperty()}
      />

      {/* Conditional Monogram-2 for specific products */}
      {(data.parent_product.id === 7099776991274 || data.parent_product.id === 7099775451178) && (
        <input
          type="hidden"
          name="items[1][properties][Monogram-2]"
          value="Flag"
        />
      )}
    </>
  );
};

export default HiddenLineItemProperties;
