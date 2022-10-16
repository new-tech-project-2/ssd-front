import { useEffect } from "react";
import { io } from "socket.io-client";
export const DeviceTest = () => {
    useEffect(() => {
        const socket = io("/socket/dispenser");

        return () => {
            socket.close();
        };
    }, []);
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input-bordered input w-full max-w-xs"
                />
                <button className="btn">Button</button>
            </div>
        </div>
    );
};
