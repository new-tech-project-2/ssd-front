import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export const DeviceTest = () => {
    const [tmpText, setTmpText] = useState("");
    const [dispenserToken, setDispenserToken] = useState("");
    const [drinkerId, setDrinkerId] = useState(0);
    useEffect(() => {
        if (dispenserToken.length == 0) return;
        const socket = io({
            path: "/socket/dispenser",
            query: { dispenserToken },
        });

        return () => {
            socket.close();
        };
    }, [dispenserToken]);
    const handleDeviceReg = () => {
        setDispenserToken(tmpText);
    };
    const handleDrinkerReg = () => {
        axios.post(`/api/drinker/${drinkerId}`, { dispenserToken });
        setDrinkerId(drinkerId + 1);
    };
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                {dispenserToken.length == 0 ? (
                    <>
                        <input
                            type="text"
                            placeholder="디바이스 토큰(4글자 이상)"
                            className="input-bordered input w-full max-w-xs"
                            onChange={(e) => setTmpText(e.target.value)}
                        />
                        <button className="btn" onClick={handleDeviceReg}>
                            디바이스 인증하기
                        </button>
                    </>
                ) : (
                    <div>
                        <button className="btn" onClick={handleDrinkerReg}>
                            술잔 추가하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
