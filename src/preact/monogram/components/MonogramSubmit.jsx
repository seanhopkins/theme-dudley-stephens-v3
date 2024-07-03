import { handleize } from "../utils";

const MonogramSubmit = ({
  style,
  monogram,
  firstInitial,
  middleInitial,
  lastInitial,
}) => {
  const Button = () => {
    if (handleize(style) === "block" || handleize(style) === "heart") {
      if (monogram) {
        return <button class="btn monogram__add-to-cart">Submit</button>;
      }
    } else if (handleize(style) === "classic") {
      if (firstInitial || middleInitial || lastInitial) {
        return <button class="btn monogram__add-to-cart">Submit</button>;
      }
    } else {
      if (firstInitial && middleInitial && lastInitial) {
        return <button class="btn monogram__add-to-cart">Submit</button>;
      }
    }

    return (
      <>
        <button class="btn monogram__add-to-cart" type="button" disabled>
          ERROR
        </button>
        <span className="monogram__error-message">
          {theme.strings.monogramErrorMessage}
        </span>
      </>
    );
  };

  return (
    <div className="MonogramSubmit">
      <Button />
    </div>
  );
};

export default MonogramSubmit;
