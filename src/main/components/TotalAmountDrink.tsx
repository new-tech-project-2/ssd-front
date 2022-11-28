import { GiWineBottle } from "react-icons/gi";

const TotalAmountDrink = ({
    totalAmountDrink,
}: {
    totalAmountDrink: number;
}) => {
    return (
        <div className="flex flex-col">
            <div className="btn btn-secondary btn-circle w-16 h-16 m-2">
                <GiWineBottle className="text-3xl" />
            </div>
            <span className="text-center font-semibold">
                {`${Math.ceil(totalAmountDrink)}병`}
            </span>
        </div>
    );
};

export default TotalAmountDrink;
