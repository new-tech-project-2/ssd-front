import { ReactNode } from "react";

const Button = ({
    children,
    isEnable = true,
}: {
    children: ReactNode;
    isEnable?: boolean;
}) => {
    return (
        <button
            className={`btn btn-primary btn-wide text-xl ${
                isEnable ? "btn-active" : "btn-disabled"
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
