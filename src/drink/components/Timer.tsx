import { MdTimer } from "react-icons/md";

const Timer = () => {
    return (
        <div className="flex flex-row items-center">
            <div className="btn btn-primary btn-circle w-16 h-16">
                <MdTimer className="text-3xl" />
            </div>
            <div className="h-16 m-2 flex items-center">
                <span className="text-center text-3xl font-semibold">
                    05:10
                </span>
            </div>
        </div>
    );
};

export default Timer;
