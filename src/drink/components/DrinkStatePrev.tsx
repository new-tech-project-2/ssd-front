import { GiWineBottle } from "react-icons/gi";

const DrinkStatePrev = ({
    totalNumOfGlasses,
}: {
    totalNumOfGlasses: number;
}) => {
    return (
        <div className="flex flex-row items-center">
            <div className="btn btn-secondary btn-circle w-16 h-16">
                <GiWineBottle className="text-3xl" />
            </div>
            <div className="h-16 m-2 flex items-center">
                <span className="text-center text-3xl font-semibold">
                    {`14/${totalNumOfGlasses}`}
                </span>
            </div>
        </div>
    );
};

export default DrinkStatePrev;
