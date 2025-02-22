import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        onChange={onChange}
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
      />

      {value && (
        <IoMdClose
          className="text-xl cursor-pointer text-slate-400 hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="cursor-pointer text-slate-400 hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
