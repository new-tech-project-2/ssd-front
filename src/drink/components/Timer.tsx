import { useEffect, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";

// 숫자 2자리 string으로 변환
const padNumber = (num: number, len: number) => {
    return String(num).padStart(len, "0");
};

const Timer = () => {
    // time관련 state, ref
    const [min, setMin] = useState(padNumber(0, 2));
    const [sec, setSec] = useState(padNumber(0, 2));

    // 1초씩 줄어드는 effect
    useEffect(() => {
        let time = 0;
        const id = setInterval(() => {
            time += 1;
            setSec(padNumber(time % 60, 2));
            setMin(padNumber(Math.floor(time / 60) % 60, 2));
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex flex-row items-center">
            <div className="btn btn-primary btn-circle w-16 h-16">
                <MdTimer className="text-3xl" />
            </div>
            <div className="h-16 m-2 flex items-center">
                <span className="text-center text-3xl font-semibold">
                    {`${min}:${sec}`}
                </span>
            </div>
        </div>
    );
};

export default Timer;
