import { useEffect, useState } from "react";
import Button from "../common/components/Button";

const OverAlarm = ({ overDrink }: { overDrink: string[] }) => {
    const [isAlarm, setIsAlarm] = useState(false);

    useEffect(() => {
        console.log(overDrink, isAlarm);
        if (overDrink.length !== 0) {
            setIsAlarm(true);
        }

        return () => {
            setIsAlarm(false);
        };
    }, [overDrink]);

    const stopAlarmHandler = () => {
        setIsAlarm(false);
    };

    return (
        <>
            {isAlarm && (
                <>
                    <div className="flex w-full h-full absolute"></div>
                    <div className="card bg-base-100 shadow-xl fixed top-1/3 w-3/4">
                        <div className="card-body">
                            <h3 className="font-bold text-4xl mb-2">
                                과음 경고
                            </h3>
                            <div className="py-4 text-xl">
                                <p>{`${overDrink}님이 주량 한계에 도달하셨습니다.`}</p>
                                <p>30초 안에 확인을 누르지 않으면</p>
                                <p>술 공급이 중단될 수 있습니다.</p>
                            </div>
                            <Button onClick={stopAlarmHandler}>확인</Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OverAlarm;
