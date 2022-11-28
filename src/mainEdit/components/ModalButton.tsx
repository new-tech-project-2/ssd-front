const ModalButton = ({
    onClick,
    htmlFor,
    className,
    title,
}: {
    onClick?: React.MouseEventHandler<HTMLLabelElement> | undefined;
    htmlFor: string;
    className?: string;
    title: string;
}) => {
    return (
        <label
            onClick={onClick}
            htmlFor={htmlFor}
            className={`btn text-lg mx-2.5 ${className}`}
        >
            {title}
        </label>
    );
};

export default ModalButton;
