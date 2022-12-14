import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import authTokenState from "../../common/recoil/authTokenAtom";
import Drinker from "../../main/interfaces/drinker";

const useDrinkPageModel = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const authToken = useRecoilValue(authTokenState);

    const navigate = useNavigate();

    // 현재 사용자들이 마신 술잔의 수에 대한 state
    const [currentNumOfGlasses, setCurrentNumOfGlasses] = useState(0);
    // 사용자들의 총 주량 (api response 가공 후 수정, 수정 후 자식 컴포넌트에 전달하기 위해 상태로 관리 -> TODO:다른방법)
    const [totalNumOfGlasses, setTotalNumOfGlasses] = useState(0);

    // 과음 상태에 대한 state (과음한 사람들 이름 리스트)
    const [overDrink, setOverDrink] = useState<string[]>([]);

    // socket
    const socketUrl = `${process.env.REACT_APP_SOCKET_ROUTE}`;
    const ws = useRef<WebSocket | null>(null);

    // 현재 연결된 drinkers에 대한 정보 가져오기
    const { data, refetch, isFetching } = useQuery(
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

    // api response(data) 받은 뒤, 사용자들의 총 주량 값 변경
    useEffect(() => {
        if (data) {
            setTotalNumOfGlasses(
                data.reduce((sum: number, drinker: Drinker) => {
                    return (sum += drinker.totalCapacity);
                }, 0)
            );
        }
    }, [data]);

    // refetch 후, 사용자들의 현재 마신 술잔 수 값 변경
    useEffect(() => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].currentDrink === data[i].totalCapacity + 1) {
                    setOverDrink((prev: string[]) => {
                        return [...prev, data[i].drinkerName];
                    });
                }
            }

            setCurrentNumOfGlasses(
                data.reduce((sum: number, drinker: Drinker) => {
                    return (sum += drinker.currentDrink);
                }, 0)
            );
        }

        return () => {
            setOverDrink([]);
        };
    }, [isFetching]);

    // 누군가 술을 마시는 경우를 대비해 socket 연결 후, change message에 대해 듣고 있도록
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
                case "stop":
                    navigate("/main");
                    break;
            }
        };

        return () => {
            ws.current?.close();
            console.log("닫힘");
        };
    }, []);

    // 중지하기 버튼 클릭 시
    const stopHandler = () => {
        if (ws.current != null && ws.current?.readyState === 1) {
            ws.current.send(
                JSON.stringify({
                    eventType: "stopDispenser",
                    dispenserId: "dispenser01",
                })
            );
        }
    };

    return {
        currentNumOfGlasses,
        totalNumOfGlasses,
        isFetching,
        data,
        stopHandler,
        overDrink,
    };
};

export default useDrinkPageModel;
