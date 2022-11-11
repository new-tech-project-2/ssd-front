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
    // const socket = new WebSocket("ws://192.168.0.42:8080/ws/socket");
    // const socketUrl = "ws://192.168.0.42:8080/ws/socket/glass";
    const socketUrl = `${process.env.REACT_APP_SOCKET_ROUTE}`;
    const ws = useRef<WebSocket | null>(null);
    const [socketConnected, setSocketConnected] = useState(false);

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

    useEffect(() => {
        ws.current = new WebSocket(socketUrl);
        ws.current.onopen = () => {
            console.log("open!!");
            setSocketConnected(true);
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
            setSocketConnected(false);
            console.log(msg);
        };
        ws.current.onmessage = (msg: MessageEvent) => {
            console.log(msg);
            switch (msg.data) {
                case "술자리가 시작되었습니다!":
                    // native 연결
                    console.log("페이지 변화");
                    navigate("/main");
                    break;
                case "dispenser01에 술잔이 등록되었습니다":
                    refetch();
                    break;
            }
        };
        // const socket = io(`${process.env.REACT_APP_API_ROUTE}`, {
        //     path: "/ws/socker/glass",
        //     query: { authToken },
        // });
        // socket.on("addGlass", () => {
        //     refetch();
        // });
        return () => {
            ws.current?.close();
            setSocketConnected(false);
            console.log("닫힘");
        };
    }, []);
    // useEffect(() => {
    //     console.log("socketConnected");
    //     if (ws.current?.readyState === 1 && ws.current != null) {
    //         console.log("send!!");
    //         ws.current?.send(`startDispenser:${"dispenser01"}`);
    //         console.log(JSON.stringify({ startDispenser: "dispenser01" }));
    //         // ws.current!.onmessage = (msg: MessageEvent) => {
    //         //     console.log(msg);
    //         // };
    //     }
    // }, [socketConnected]);
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

    return { numOfDrinkers, totalAmountDrink, data, isFetching, ws };
};

export default useMainViewModel;
