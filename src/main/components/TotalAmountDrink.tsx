import React from "react";
import { GiWineBottle } from "react-icons/gi";

const TotalAmountDrink = ({
    totalAmountDrink,
}: {
    totalAmountDrink: Number;
}) => {
    return (
        <div className="flex flex-col">
            <div className="btn btn-secondary btn-circle w-16 h-16 m-2">
                <GiWineBottle className="text-3xl" />
            </div>
            <span className="text-center font-semibold">
                {`${totalAmountDrink}병`}
            </span>
        </div>
    );
};

export default TotalAmountDrink;
