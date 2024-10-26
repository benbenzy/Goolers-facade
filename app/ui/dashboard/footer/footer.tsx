import React from 'react';
import { IoMdFootball } from 'react-icons/io';
import { MdSportsFootball } from 'react-icons/md';

function Footer() {
  return (
    <div className="flex flex-row justify-between p-4 mt-10">
      <div className="flex gap-5 font-semibold items-center text-slate-400 text-xs">
        Goolers<span className="text-red-400">Facade</span>
        <span className="text-yellow-600">
          <IoMdFootball />
        </span>
      </div>
      <div className="text-xs text text-slate-400">
        All rights reserved <span>@copyright 2024</span>
      </div>
    </div>
  );
}

export default Footer;
