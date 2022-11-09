const DrinkerState = ({
    drinkerName,
    detail,
    totalCapacity,
    currentDrink,
}: {
    drinkerName: string;
    detail: string;
    totalCapacity: number;
    currentDrink: number;
}) => {
    return (
        <div className="card shadow-md">
            <div className="card-body flex flex-row justify-between p-3">
                <div className="flex flex-col mx-4 w-36">
                    <span className="font-bold truncate">{drinkerName}</span>
                    <span className="truncate">{detail}</span>
                </div>
                <div className="card-title mx-4 shrink-0">
                    <span className="text-3xl text-accent font-bold mb-1">
                        {`${currentDrink}/${totalCapacity}잔`}
                    </span>
                </div>
            </div>
            <img />
        </div>
    );
};

export default DrinkerState;
