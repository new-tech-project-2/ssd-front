import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import authTokenState from "../../common/recoil/authTokenAtom";
import Drinker from "../interfaces/drinker";

const useMainViewModel = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const authToken = useRecoilValue(authTokenState);
    // 현재 총 인원에 대한 state
    const [numOfDrinkers, setNumOfDrinkers] = useState(0);
    // 현재 총 필요한 술의 양에 대한 state
    const [totalAmountDrink, setTotalAmountDrink] = useState(0);

    // 현재 연결된 drinkers에 대한 정보 가져오기
    const { status, data, error, refetch, isFetching } = useQuery(
        ["get/getglass"],
        async () => {
            const { data } = await customAxios.get("/glass/getglass", {
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
        const socket = io(`${process.env.REACT_APP_API_ROUTE}`, {
            path: "/socket/user",
            query: { authToken },
        });
        socket.on("change", () => {
            refetch();
        });
        return () => {
            socket.close();
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

    return { numOfDrinkers, totalAmountDrink, data, isFetching };
};

export default useMainViewModel;
