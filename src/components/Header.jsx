import React from 'react';

import PrawNav from "./Nav";

// the header
export default function Header() {

  return (
    <header className='mb-5 pb-5'>
      {/* icon */}
      {/* <div id="icon">
        <img src="/logo192.png" alt="Icon" />
      </div> */}

      <PrawNav />
    </header>
  );
}
