import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import RegisteredUsers from "./components/RegisteredUsers";
import Drinker from "./interfaces/drinker";
import { BiSmile } from "react-icons/bi";
import { GiWineBottle } from "react-icons/gi";

const MainPage = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    // 현재 총 인원에 대한 state
    const [numOfDrinkers, setNumOfDrinkers] = useState(0);
    // 현재 총 필요한 술의 양에 대한 state
    const [totalAmountDrink, setTotalAmountDrink] = useState(0);
    const { status, data, error, refetch, isFetching } = useQuery(
        ["drinkers"],
        async () => {
            const { data } = await axios.get("/drinkers", {
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

    return (
        <div className="flex flex-col m-5">
            <div className="flex flex-col m-5">
                <h1 className="text-4xl font-bold mb-2">술잔 등록하기</h1>
                <span className="text-2xl text-gray-500 mb-5">
                    SSD에 NFC 술잔을 인식해주세요.
                </span>
                <div className="flex flex-row justify-evenly mb-3">
                    <div className="flex flex-col">
                        <div className="btn btn-primary btn-circle w-16 h-16 m-2">
                            <BiSmile className="text-3xl" />
                        </div>
                        <span className="text-center font-semibold">
                            {numOfDrinkers}인
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="btn btn-secondary btn-circle w-16 h-16 m-2">
                            <GiWineBottle className="text-3xl" />
                        </div>
                        <span className="text-center font-semibold">
                            {totalAmountDrink}병
                        </span>
                    </div>
                </div>
            </div>
            {isFetching ? (
                <div>로딩중</div>
            ) : (
                <RegisteredUsers drinkers={data} />
            )}
            <button>시작하기</button>
        </div>
    );
};

export default MainPage;
