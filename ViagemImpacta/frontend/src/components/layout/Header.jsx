import React from 'react';

function Header({ children }) {
  return (
    <header className="w-full bg-blue-800 text-white py-4 px-6 shadow-md">
      {children}
    </header>
  );
}

export default Header;
