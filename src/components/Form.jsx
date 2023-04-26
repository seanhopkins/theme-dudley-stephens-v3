import { useState } from "preact/hooks";

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

  document.addEventListener("ajaxProduct:added", () => {
    setMonogramUuid(crypto.randomUUID());
  });

  document.addEventListener("variant:change", (e) => {
    setParentProductVariantId(e.detail.variant.id);
    setMonogramFor(e.detail.variant.name);
  });

  const onChange = (e) => {
    setStyle(e.target.dataset.title);
  };

  return (
    <form action="/cart/add" method="POST" onChange={onChange}>
      {data.monogram_product.variants.map((variant, index) => (
        <>
          <label for={variant.id}>{variant.title}</label>
          <input
            type="radio"
            name="items[0][id]"
            id={variant.id}
            value={variant.id}
            checked={index === 0 ? true : false}
            data-title={variant.title}
          />
        </>
      ))}

      <input type="text" name="monogram" id="monogram" value="Dudley" />
      <input type="text" name="first" id="first" value="A" />
      <input type="text" name="middle" id="middle" value="B" />
      <input type="text" name="last" id="last" value="C" />

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
        value="
          {%- if parent_type_handle == 'kids' -%}
            Left Chest
          {%- 
            elsif parent_type_handle == 'accessories' 
            or parent_type_handle == 'kids-accessories' 
          -%}
            Opposite pineapple (left side)
          {%- else -%}
            Left Sleeve
          {%- endif -%}
        "
      />
      <input type="hidden" name="items[0][properties][_Gift wrap]" value="No" />
      <input type="hidden" name="items[0][properties][Monogram]" value="" />

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
        value="
          {%- if parent_type_handle == 'kids' -%}
            Left Chest
          {%- 
            elsif parent_type_handle == 'accessories' 
            or parent_type_handle == 'kids-accessories' 
          -%}
            Opposite pineapple (left side)
          {%- else -%}
            Left Sleeve
          {%- endif -%}
        "
      />
      <input type="hidden" name="items[1][properties][Monogram]" value="" />

      <button class="btn monogram__add-to-cart">Submit</button>
    </form>
  );
};

export default Form;
