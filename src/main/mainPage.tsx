import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import RegisteredUsers from "./components/RegisteredUsers";
import Drinker from "./interfaces/drinker";
import LoadingBar from "../common/components/LoadingBar";
import NumOfDrinkers from "./components/NumOfDrinkers";
import TotalAmountDrink from "./components/TotalAmountDrink";
import Button from "../common/components/Button";
import useMainViewModel from "./hooks/useMainViewModel";

const MainPage = () => {
    const { numOfDrinkers, totalAmountDrink, data, isFetching } =
        useMainViewModel();

    return (
        <div className="flex flex-col m-10">
            <div className="flex flex-col mb-5">
                <h1 className="text-4xl font-bold mb-2">술잔 등록하기</h1>
                <span className="text-2xl text-gray-500 mb-3">
                    SSD에 NFC 술잔을 인식해주세요.
                </span>
                <div className="flex flex-row justify-evenly mb-3">
                    <NumOfDrinkers numOfDrinkers={numOfDrinkers} />
                    <TotalAmountDrink totalAmountDrink={totalAmountDrink} />
                </div>
            </div>
            <RegisteredUsers drinkers={data} />
            {isFetching && <LoadingBar />}
            <div className="py-5 flex justify-center">
                <Button>시작하기</Button>
            </div>
        </div>
    );
};

export default MainPage;
