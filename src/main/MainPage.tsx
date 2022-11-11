import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { customAxios } from "../common/axios/customAxis";
import Button from "../common/components/Button";
import LoadingBar from "../common/components/LoadingBar";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import NumOfDrinkers from "./components/NumOfDrinkers";
import RegisteredUsers from "./components/RegisteredUsers";
import TotalAmountDrink from "./components/TotalAmountDrink";
import useMainViewModel from "./hooks/useMainViewModel";

const MainPage = () => {
    const authHeader = useRecoilValue(authHeaderSelector);
    const { numOfDrinkers, totalAmountDrink, data, isFetching, ws } =
        useMainViewModel();
    const navigate = useNavigate();

    const startClickHandler = () => {
        // console.log(ws);
        if (ws.current?.readyState === 1 && ws.current != null) {
            console.log("send!!");
            ws.current?.send(`startDispenser:${"dispenser01"}`);
            console.log("sent!!");

            // ws.current.onmessage = (msg: MessageEvent) => {
            //     console.log(msg);
            //     switch (msg.data) {
            //         case "술자리가 시작되었습니다!":
            //             // native 연결
            //             console.log("페이지 변화");
            //             navigate("/main");
            //             break;
            //         case "dispenser01에 술잔이 등록되었습니다":
            //             break;
            //     }
            // };
        }
    };

    return (
        <div className="m-10 flex flex-col">
            <div className="mb-5 flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">술잔 등록하기</h1>
                <span className="mb-3 text-2xl text-gray-500">
                    SSD에 NFC 술잔을 인식해주세요.
                </span>
                <div className="mb-3 flex flex-row justify-evenly">
                    <NumOfDrinkers numOfDrinkers={numOfDrinkers} />
                    <TotalAmountDrink totalAmountDrink={totalAmountDrink} />
                </div>
            </div>
            <RegisteredUsers drinkers={data} />
            {isFetching && <LoadingBar />}
            <div className="flex justify-center py-5">
                <Button
                    className="btn-wide"
                    // onClick={(_) => {
                    //     customAxios.post(
                    //         "/dispenser",
                    //         {},
                    //         {
                    //             headers: authHeader,
                    //         }
                    //     );
                    //     navigate("/drink");
                    // }}
                    onClick={startClickHandler}
                >
                    시작하기
                </Button>
            </div>
        </div>
    );
};

export default MainPage;
