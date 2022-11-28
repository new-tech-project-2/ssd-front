import { ChangeEventHandler } from "react";
export const PrimaryTextField = ({
    label,
    placeholder,
    isError = true,
    errorMessage = "",
    onChange,
}: {
    label: string;
    placeholder: string;
    isError?: boolean;
    errorMessage?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
    return (
        <div className="flex flex-col w-full">
            <input
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                className={`input input-bordered ${
                    isError ? "input-error" : "input-primary"
                } input-lg w-full`}
            />
            <label className="pt-2 pl-4">
                <span
                    className={`${isError ? "text-error" : "text-transparent"}`}
                >
                    {errorMessage}
                </span>
            </label>
        </div>
    );
};
