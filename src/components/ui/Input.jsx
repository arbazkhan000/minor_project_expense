import React from "react";

const Input = React.forwardRef(
    ({ className = "", type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={`
          flex h-10 w-full rounded-md
          border border-gray-300 bg-white text-black
          px-3 py-2 text-base
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
                {...props}
            />
        );
    },
);

Input.displayName = "Input";

export default Input;
