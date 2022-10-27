const DrinkerState = ({
    name,
    detail,
    totalCapacity,
    currentDrinks,
}: {
    name: string;
    detail: string;
    totalCapacity: number;
    currentDrinks: number;
}) => {
    return (
        <div className="card shadow-md">
            <div className="card-body flex flex-row justify-between p-3">
                <div className="flex flex-col mx-4 w-36">
                    <span className="font-bold truncate">{name}</span>
                    <span className="truncate">{detail}</span>
                </div>
                <div className="card-title mx-4 shrink-0">
                    <span className="text-3xl text-accent font-bold mb-1">
                        {`${currentDrinks}/${totalCapacity}잔`}
                    </span>
                </div>
            </div>
            <img />
        </div>
    );
};

export default DrinkerState;
