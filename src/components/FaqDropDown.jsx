import React, { useState } from 'react';

function FaqDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="faq-dropdown bg-terciario  rounded-xl p-5 mx-5 text-center mb-5">
      <div className="faq-question font-semibold text-blanco" onClick={toggleDropdown}>
        {props.question}
        <i className={`fa fa-angle-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="faq-answer font-light text-blanco mt-5  text-sm">
          {props.answer}
        </div>
      )}
    </div>
  );
}

export default FaqDropDown;