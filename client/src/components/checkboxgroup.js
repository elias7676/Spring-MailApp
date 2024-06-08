import React, { useState } from "react";
import "../index1.css";

const CheckboxGroup = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  return (
    <div>
      <h2>Sort Data</h2>
      <label
        className="container-row"
        style={{ justifyContent: "space-between" }}
      >
        <input
          type="checkbox"
          checked={selectedCheckbox === "checkbox1"}
          onChange={() => handleCheckboxChange("checkbox1")}
        />
        <h3 style={{ paddingLeft: "1px" }}>Monthly</h3>
      </label>
      <label className="container-row">
        <input
          type="checkbox"
          checked={selectedCheckbox === "checkbox2"}
          onChange={() => handleCheckboxChange("checkbox2")}
        />
        <h3 style={{ paddingLeft: "1px" }}>Yearly</h3>
      </label>
      <label className="container-row" style={{ paddingLeft: "1px" }}>
        <input
          paddingLeft="20px"
          type="checkbox"
          checked={selectedCheckbox === "checkbox3"}
          onChange={() => handleCheckboxChange("checkbox3")}
        />
        <h3 style={{ paddingLeft: "1px" }}>Term </h3>
      </label>
    </div>
  );
};

export default CheckboxGroup;
