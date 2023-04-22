import React, { useState } from 'react';

function FaqDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="faq-dropdown bg-terciario  rounded-xl px-3 py-6 mx-8 text-sm text-center mb-10  sm:w-full sm:mx-0  ">
      <div className="faq-question text-xl font-semibold text-blanco hover:cursor-pointer " onClick={toggleDropdown}>
        {props.question}
        <i className={`fa fa-angle-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="faq-answer text-center font-light text-blanco mt-5  text-sm sm:h-auto ">
          {props.answer}
        </div>
      )}
    </div>
  );
}

export default FaqDropDown;