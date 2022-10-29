import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../common/axios/customAxis";
import { useRecoilValue } from "recoil";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import authTokenState from "../common/recoil/authTokenAtom";
import Button from "../common/components/Button";
import DrinksStates from "./components/DrinkersStates";
import DrinkStatePrev from "./components/DrinkStatePrev";
import Timer from "./components/Timer";
import Drinker from "../main/interfaces/drinker";

const DrinkPage = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const authToken = useRecoilValue(authTokenState);

    const navigate = useNavigate();

    // 현재 사용자들이 마신 술잔의 수에 대한 state
    const [currentNumOfGlasses, setCurrentNumOfGlass] = useState();
    // 사용자들의 총 주량
    let totalNumOfGlasses = 0;

    // 현재 연결된 drinkers에 대한 정보 가져오기
    const { status, data, error, refetch, isFetching } = useQuery(
        ["drinkers"],
        async () => {
            const { data } = await customAxios.get("/drinker", {
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
            totalNumOfGlasses = data.reduce(
                (sum: number, drinkers: Drinker) => {
                    console.log();
                    return (sum += drinkers.totalCapacity);
                },
                0
            );
        }
    }, [isFetching]);

    return (
        <div className="m-10 flex flex-col">
            <div className="mb-5 flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">술자리 진행 중</h1>
                <span className="mb-3 text-2xl text-gray-500">
                    안전은 SSD가 책임질게요.
                </span>
                <div className="mb-3 flex flex-row justify-between">
                    {/* 마신 총 잔 수 */}
                    <DrinkStatePrev totalNumOfGlasses={totalNumOfGlasses} />
                    {/* 타이머 */}
                    <Timer />
                </div>
            </div>
            {/* 현재 유저별 드링크 상태 */}
            <DrinksStates drinkers={data} />
            {/* {isFetching && <LoadingBar />} */}
            <div className="flex justify-center py-5">
                <Button
                    className="btn-wide"
                    onClick={(_) => {
                        navigate("/");
                    }}
                >
                    중지하기
                </Button>
            </div>
        </div>
    );
};

export default DrinkPage;
