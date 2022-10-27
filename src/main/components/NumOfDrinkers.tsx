import { BiSmile } from "react-icons/bi";

const NumOfDrinkers = ({ numOfDrinkers }: { numOfDrinkers: number }) => {
    return (
        <div className="flex flex-col">
            <div className="btn btn-primary btn-circle w-16 h-16 m-2">
                <BiSmile className="text-3xl" />
            </div>
            <span className="text-center font-semibold">{`${numOfDrinkers}인`}</span>
        </div>
    );
};

export default NumOfDrinkers;
