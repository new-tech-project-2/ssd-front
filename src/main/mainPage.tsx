import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import RegisteredUsers from "./components/RegisteredUsers";
import Drinker from "./interfaces/drinker";

const MainPage = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const { status, data, error, refetch, isFetching } = useQuery(
        ["drinkers"],
        async () => {
            const { data } = await axios.get("/drinkers", {
                headers: authHeader,
            });

            console.log(data);

            return data.drinkers;
        },
        { initialData: [] }
    );

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1>술잔 등록하기</h1>
                <span>SSD에 NFC 술잔을 인식해주세요.</span>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <img />
                        <span>4인</span>
                    </div>
                    <div className="flex flex-col">
                        <img />
                        <span>2.1병</span>
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
