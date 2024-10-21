import React from "react";
interface props {
  page: number;
}

function Pagination({ page }: props) {
  return (
    <div className="flex flex-row justify-between items-center w-full mt-5 ">
      <button
        className={`p-1 bg-slate-600 rounded-md hover:bg-slate-400 
          
          ${page === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
        Previous
      </button>
      <button
        className={`p-1 cursor-pointer  bg-slate-600 rounded-md hover:bg-slate-400
        `}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
