import { ReactNode } from "react";

const Button = ({
    children,
    isEnable = true,
    onClick,
    className = "",
}: {
    children: ReactNode;
    isEnable?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}) => {
    return (
        <button
            className={`btn btn-primary text-xl ${className || ""} ${
                isEnable ? "btn-active" : "btn-disabled"
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
