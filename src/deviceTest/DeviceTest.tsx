import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { customAxios } from "../common/axios/customAxis";
export const DeviceTest = () => {
    const [tmpText, setTmpText] = useState("");
    const [dispenserToken, setDispenserToken] = useState("");
    const [start, setStart] = useState(false);
    useEffect(() => {
        if (dispenserToken.length == 0) return;
        const socket = io(`${process.env.REACT_APP_API_ROUTE}`, {
            path: "/socket/dispenser",
            query: { dispenserToken },
        });
        socket.on("start", () => {
            setStart(true);
        });
        socket.on("stop", () => {
            setStart(false);
        });
        return () => {
            socket.close();
        };
    }, [dispenserToken]);
    const handleDeviceReg = () => {
        setDispenserToken(tmpText);
    };
    const handleDrinkerReg = () => {
        customAxios.post(`/drinker/${Date.now()}`, { dispenserToken });
    };

    const handleDrink = () => {
        customAxios.patch(`/drinker/drink`, { dispenserToken });
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
                ) : start ? (
                    <div>
                        <button className="btn" onClick={handleDrink}>
                            술 마시기
                        </button>
                    </div>
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
