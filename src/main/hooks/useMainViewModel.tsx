import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import authTokenState from "../../common/recoil/authTokenAtom";
import Drinker from "../interfaces/drinker";
import { useNavigate } from "react-router-dom";

const useMainViewModel = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const authToken = useRecoilValue(authTokenState);
    // 현재 총 인원에 대한 state
    const [numOfDrinkers, setNumOfDrinkers] = useState(0);
    // 현재 총 필요한 술의 양에 대한 state
    const [totalAmountDrink, setTotalAmountDrink] = useState(0);

    // socket
    const socketUrl = `${process.env.REACT_APP_SOCKET_ROUTE}`;
    const ws = useRef<WebSocket | null>(null);

    const navigate = useNavigate();

    // 현재 연결된 drinkers에 대한 정보 가져오기
    const { status, data, error, refetch, isFetching } = useQuery(
        ["get/glass"],
        async () => {
            const { data } = await customAxios.get("/glass", {
                headers: authHeader,
            });

            return data;
        },
        {
            initialData: [],
            refetchOnWindowFocus: false,
        }
    );

    const startClickHandler = () => {
        if (ws.current != null && ws.current?.readyState === 1) {
            ws.current.send(
                JSON.stringify({
                    eventType: "startDispenser",
                    dispenserId: "dispenser01",
                })
            );
        }
    };

    useEffect(() => {
        ws.current = new WebSocket(socketUrl);
        ws.current.onopen = () => {
            console.log("open!!");
            ws.current?.send(
                JSON.stringify({
                    eventType: "drinkerLogin",
                    dispenserId: "dispenser01",
                })
            );
        };
        ws.current.onerror = (message) => {
            console.log("error!!");
            console.log(message);
        };
        ws.current.onclose = (msg) => {
            console.log("close!!");
            console.log(msg);
        };
        ws.current.onmessage = (msg: MessageEvent) => {
            const data = JSON.parse(msg.data);
            switch (data.eventType) {
                case "change":
                    refetch();
                    break;
                case "start":
                    navigate("/drink");
                    break;
            }
        };

        return () => {
            ws.current?.close();
            console.log("닫힘");
        };
    }, []);

    useEffect(() => {
        if (data) {
            setNumOfDrinkers(data.length);

            setTotalAmountDrink(
                data.reduce((sum: number, drinker: Drinker) => {
                    return (sum += drinker.totalCapacity);
                }, 0) / 7.5
            );
        }
    }, [isFetching]);

    return {
        numOfDrinkers,
        totalAmountDrink,
        data,
        isFetching,
        startClickHandler,
    };
};

export default useMainViewModel;
