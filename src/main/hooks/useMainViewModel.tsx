import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import Drinker from "../interfaces/drinker";

const useMainViewModel = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    // 현재 총 인원에 대한 state
    const [numOfDrinkers, setNumOfDrinkers] = useState(0);
    // 현재 총 필요한 술의 양에 대한 state
    const [totalAmountDrink, setTotalAmountDrink] = useState(0);

    // 현재 연결된 drinkers에 대한 정보 가져오기
    const { status, data, error, refetch, isFetching } = useQuery(
        ["drinkers"],
        async () => {
            const { data } = await axios.get("/api/drinker", {
                headers: authHeader,
            });

            return data.drinkers;
        },
        {
            initialData: [],
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        if (data) {
            setNumOfDrinkers(data.length);

            setTotalAmountDrink(
                data.reduce((sum: number, drinkers: Drinker) => {
                    return (sum += drinkers.capacity);
                }, 0) / 7.5
            );
        }
    }, [isFetching]);

    return { numOfDrinkers, totalAmountDrink, data, isFetching };
};

export default useMainViewModel;
