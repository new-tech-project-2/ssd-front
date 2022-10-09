import { ChangeEventHandler } from "react";

export const PrimaryTextField = ({
    label,
    placeholder,
    onChange,
}: {
    label: string;
    placeholder: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
    return (
        <div>
            <label className="label">
                <span className="label-text ">{label}</span>
            </label>
            <input
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                className="input input-bordered input-primary input-lg w-full max-w-xs"
            />
        </div>
    );
};
