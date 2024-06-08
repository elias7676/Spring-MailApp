import React, { useState } from "react";
import "./../drop.css";

const Dropdown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`dropdown-container ${isOpen ? "open" : ""}`}
      onClick={toggleDropdown}
    >
      <div>
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedOption ? selectedOption : placeholder}
          <i className={`arrow ${isOpen ? "up" : "down"}`} />
        </div>
        {isOpen && (
          <div className="options-container">
            {options.map((option, index) => (
              <div
                key={index}
                className="option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
