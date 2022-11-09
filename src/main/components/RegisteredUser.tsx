import { BiEditAlt } from "react-icons/bi";
import MainEdit from "../../mainEdit/MainEdit";

const RegisteredUser = ({
    id,
    totalCapacity,
    drinkerName,
    detail,
}: {
    id: string;
    totalCapacity: number;
    drinkerName: string;
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
                    <span className="font-bold mb-1 truncate">
                        {drinkerName}
                    </span>
                    <span className="truncate">{detail}</span>
                </div>
                <div className="card-action">
                    <label
                        htmlFor={`modal-${id}`}
                        className="btn modal-button btn-secondary ml-1 rounded-lg w-14 h-14 shrink-0"
                    >
                        <BiEditAlt className="text-2xl" />
                    </label>
                </div>
            </div>

            <MainEdit
                id={id}
                totalCapacity={totalCapacity}
                drinkerName={drinkerName}
                detail={detail}
            />
        </div>
    );
};

export default RegisteredUser;
