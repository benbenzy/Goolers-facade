import React from 'react';

function Footer() {
  return (
    <div className="flex flex-row justify-between p-4 mt-10">
      <div className="font-semibold text-slate-400 text-xs">
        Mtoto<span className="text-red-400">Sharp</span>{' '}
        <span className="text-yellow-600">Foundation </span>
      </div>
      <div className="text-xs text text-slate-400">
        All rights reserved <span>@copyright 2024</span>
      </div>
    </div>
  );
}

export default Footer;
