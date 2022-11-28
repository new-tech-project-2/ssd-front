import { ReactElement, useEffect, useState } from "react";
import Button from "../common/components/Button";
import alertSound from "./sound/alertSound.mp3";
import ReactDOM from "react-dom";
import classes from "./CSS/modal.module.css";

const Backdrop = () => {
    return <div className={classes.backdrop} />;
};

const OverAlarm = ({ overDrink }: { overDrink: string[] }) => {
    const [isAlarm, setIsAlarm] = useState(false);
    const alertAudio = new Audio(alertSound);

    useEffect(() => {
        console.log(overDrink, isAlarm);
        if (overDrink.length !== 0) {
            setIsAlarm(true);
            const playPromise = alertAudio.play();
            playPromise
                .then(() => {
                    // automatic play() start
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return () => {
            setIsAlarm(false);
        };
    }, [overDrink]);

    const stopAlarmHandler = () => {
        setIsAlarm(false);
    };

    const portalElement: HTMLElement = document.getElementById("modal-root")!;

    return (
        <>
            {isAlarm && (
                <>
                    {ReactDOM.createPortal(<Backdrop />, portalElement)}
                    <div className="flex w-full h-full absolute"></div>
                    <div className="z-30">
                        <div className="card bg-base-100 shadow-xl fixed top-1/3 w-3/4">
                            <div className="card-body">
                                <h3 className="font-bold text-4xl mb-2">
                                    과음 경고
                                </h3>
                                <div className="py-4 text-xl">
                                    <p>{`${overDrink}님이 주량 한계에 도달하셨습니다.`}</p>
                                    <p>건전한 음주를 위하여</p>
                                    <p>과음에 주의하세요!</p>
                                </div>
                                <Button onClick={stopAlarmHandler}>확인</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OverAlarm;
