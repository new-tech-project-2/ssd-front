const InputBox = ({
    title,
    type,
    value,
    onChange,
}: {
    title: string;
    type: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
    return (
        <label className="input-group mb-2 justify-center">
            <span className="w-15 shrink-0">{title}</span>
            <input
                type={type}
                placeholder={`${title}을 입력하세요.`}
                className="input input-bordered"
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default InputBox;
