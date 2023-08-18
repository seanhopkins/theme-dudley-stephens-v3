import { handleize } from "../utils";

const MonogramButtons = ({ data, style, setStyle }) => {
  // only show block option for kids products
  const visibleMonogramVariants = data.monogram_product.variants.filter(
    (variant) =>
      handleize(variant.title).includes("block") &&
      !handleize(data.parent_product.type).includes("kids")
        ? false
        : true
  );


  // FYI, if it's easier to process, lines 5 => 11 could be rewrriten like this:
  // const visibleMonogramVariants = data.monogram_product.variants.filter(
  //   (variant) => {

  //     if (
  //       handleize(variant.title).includes("block") &&
  //       !handleize(data.parent_product.type).includes("kids")
  //     ) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // );

  return (
    <div className="MonogramButtons">
      {visibleMonogramVariants.map((variant) => (
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
      ))}
    </div>
  );
};

export default MonogramButtons;
