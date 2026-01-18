import React from "react";

const VARIANT_CLASSES = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline hover:text-blue-800",
};

const SIZE_CLASSES = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10 p-0",
};

const Button = React.forwardRef(
    (
        {
            variant = "default",
            size = "default",
            className = "",
            disabled = false,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={`
          inline-flex items-center justify-center gap-2
          rounded-md font-medium transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          ${VARIANT_CLASSES[variant]}
          ${SIZE_CLASSES[size]}
          ${className}
        `}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
