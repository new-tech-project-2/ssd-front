import { ReactNode } from "react";

const Button = ({
    children,
    isEnable = true,
    onClick,
}: {
    children: ReactNode;
    isEnable?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button
            className={`btn btn-primary btn-wide text-xl ${
                isEnable ? "btn-active" : "btn-disabled"
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
