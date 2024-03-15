import React from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    console.log("Number is:", value);
    setCurrentNOE(value);

    let errorText;
    if (isNaN(value)) {
      errorText = "Value is not a number";
      setErrorAlert(errorText);
    } else if (value > 50) {
      errorText = "Minimum value is 1 event";
      setErrorAlert(errorText);
    } else {
      errorText = "";
      setErrorAlert(errorText);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        data-testid="number-of-events-input"
        type="text"
        className="number-of-events-input"
        defaultValue={32}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
