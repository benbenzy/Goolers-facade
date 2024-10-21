import React from 'react';

interface props {
  title: string;
  icon: any;
  value?: number | string;
  range?: string;
  comment?: string;
  active?: boolean;
  click?: () => void;
}

function Card({ title, icon, value, range, comment, active, click }: props) {
  return (
    <div
      onClick={click}
      className="flex flex-row bg-slate-800 gap-2 rounded-md hover:bg-slate-600 p-5 cursor-pointer w-full "
    >
      {icon}
      <div className="flex flex-col gap-2 items-center ">
        <span className=" semi-bold text-lg capitalize">{title}</span>
        <span className=" font-bold text-xl">{value?.toLocaleString()}</span>
        <span className=" text-sm">
          <span
            className={`font-light ${
              range?.startsWith('-') ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {range}
          </span>
          {comment}
        </span>
      </div>
    </div>
  );
}

export default Card;
