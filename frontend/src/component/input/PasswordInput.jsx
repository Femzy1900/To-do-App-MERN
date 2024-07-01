import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassoword, setIsShowPassword] = useState(false);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassoword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] rounded px-5 mb-3">
      <input
        type={isShowPassoword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassoword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => togglePassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
