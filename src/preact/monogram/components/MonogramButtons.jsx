import { handleize } from "../utils";

const MonogramButtons = ({ data, style, setStyle }) => {
  // only show block option for kids products
  const visibleMonogramVariants = data.monogram_product.variants.filter(
    (variant) =>
      handleize(variant.title).includes("block") &&
      handleize(data.parent_product.type) !== "kids"
        ? false
        : true
  );

  return visibleMonogramVariants.map((variant) => (
    <>
      <label
        for={variant.id}
        className={style === variant.title ? "active" : ""}
      >
        <img
          src={variant.featured_image.src}
          alt={variant.featured_image.title}
        />
        <p>{variant.title}</p>
      </label>
      <input
        type="radio"
        name="items[0][id]"
        id={variant.id}
        value={variant.id}
        onChange={() => setStyle(variant.title)}
        checked={style === variant.title}
        data-title={variant.title}
        style="display:none;"
      />
    </>
  ));
};

export default MonogramButtons;
