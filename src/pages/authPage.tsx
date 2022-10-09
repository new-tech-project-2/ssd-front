import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryTextField } from "../common/components/textField";

const AuthPage = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const { status, data, error, refetch } = useQuery(
        ["auth"],
        async () => {
            const { data } = await axios.post("/auth", { token: token });

            return data.success;
        },
        { initialData: false }
    );
    useEffect(() => {
        refetch();
    }, [token]);
    return (
        <div
            className={
                "h-full w-full flex flex-col justify-center items-center px-5"
            }
        >
            <PrimaryTextField
                label="인증 토큰"
                placeholder="인증 토큰을 입력하세요"
                onChange={(event) => {
                    setToken(event.target.value);
                }}
            />
            <p className="text-center text-gray-500 text-xs">
                &copy;2022 최신 기술 프로젝트 2 TEAM SSD
            </p>
            <button
                className={`btn btn-primary ${
                    data ? "btn-active" : "btn-disabled"
                }  btn-wide`}
                onClick={() => {
                    navigate("/main");
                }}
            ></button>
        </div>
    );
};
export default AuthPage;
