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
      <div className="MonogramInputs">
        <fieldset>
          <legend>Your Name</legend>
          <span class="field">
            <input
              type="text"
              maxLength="10"
              onInput={(e) => setMonogram(e.target.value)}
              value={monogram}
            />
            <span>ⓘ Case sensitive, Max 10 characters.</span>
          </span>
        </fieldset>
      </div>
    );
  }
  if (handleize(style) === "heart") {
    return;
  }

  return (
    <div className="MonogramInputs">
      <fieldset>
        <legend>Your Initials</legend>
        <span class="field">
          <input
            type="text"
            maxLength="1"
            onInput={(e) => setFirstInitial(e.target.value)}
            value={firstInitial}
          />
          <span>First</span>
        </span>
        <span class="field">
          <input
            type="text"
            maxLength="1"
            onChange={(e) => setMiddleInitial(e.target.value)}
            value={middleInitial}
          />
          <span>Middle</span>
        </span>
        <span class="field">
          <input
            type="text"
            maxLength="1"
            onChange={(e) => setLastInitial(e.target.value)}
            value={lastInitial}
          />
          <span>Last</span>
        </span>
      </fieldset>
    </div>
  );
};

export default MonogramInputs;
