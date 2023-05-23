import { handleize } from "../utils";

const MonogramInputs = ({
  style,
  monogram,
  firstInitial,
  middleInitial,
  lastInitial,
  setMonogram,
  setFirstInitial,
  setMiddleInitial,
  setLastInitial,
}) => {
  if (handleize(style) === "block") {
    return (
      <input
        type="text"
        maxLength="10"
        onInput={(e) => setMonogram(e.target.value)}
        value={monogram}
      />
    );
  }

  return (
    <>
      <input
        type="text"
        maxLength="1"
        onInput={(e) => setFirstInitial(e.target.value)}
        value={firstInitial}
      />
      <input
        type="text"
        maxLength="1"
        onChange={(e) => setMiddleInitial(e.target.value)}
        value={middleInitial}
      />
      <input
        type="text"
        maxLength="1"
        onChange={(e) => setLastInitial(e.target.value)}
        value={lastInitial}
      />
    </>
  );
};

export default MonogramInputs;
