import React from 'react';

function Button({ children, ...props }) {
  return (
    <button {...props} className={`py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ${props.className || ''}`}>
      {children}
    </button>
  );
}

export default Button;
