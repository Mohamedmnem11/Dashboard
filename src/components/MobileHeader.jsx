import React from 'react';

const MobileHeader = ({ toggleSidebar, title }) => {
  return (
    <div className="lg:hidden bg-white shadow-sm p-4 flex items-center">
      <button 
        onClick={toggleSidebar}
        className="mr-4 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
    </div>
  );
};

export default MobileHeader;