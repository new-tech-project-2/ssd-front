import { BiEditAlt } from "react-icons/bi";

const RegisteredUser = ({
    totalCapacity,
    name,
    detail,
}: {
    totalCapacity: number;
    name: string;
    detail: string;
}) => {
    return (
        <div className="card shadow-md">
            <div className="card-body flex flex-row p-3">
                <div className="card-title mr-1">
                    <span className="text-3xl text-primary shrink-0 w-16">
                        {totalCapacity}잔
                    </span>
                </div>
                <div className="flex flex-col flex-grow mx-1 truncate">
                    <span className="font-bold mb-1 truncate">{name}</span>
                    <span className="truncate">{detail}</span>
                </div>
                <div className="card-action">
                    <button className="btn btn-secondary ml-1 rounded-lg w-14 h-14 shrink-0">
                        <BiEditAlt className="text-2xl" />
                    </button>
                </div>
            </div>
            <img />
        </div>
    );
};

export default RegisteredUser;
