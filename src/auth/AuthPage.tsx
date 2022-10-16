import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryTextField } from "../common/components/TextField";

const AuthPage = () => {
    const [dispenserToken, setDispenserToken] = useState("");
    const navigate = useNavigate();

    const { status, data, error, refetch } = useQuery(
        ["init"],
        async () => {
            const { data } = await axios.post("/api/init", {
                dispenserToken: dispenserToken,
            });
            return data.success;
        },
        {
            initialData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        }
    );
    useEffect(() => {
        const socket = new WebSocket(
            `ws://${window.location.host}/socket?type=web`
        );
        socket.onopen = () => {
            console.log("소켓 연결");
            socket.send("s");
        };

        socket.onmessage = (event) => {
            console.log(event.data);
        };

        return () => {
            socket.close();
        };
    }, []);
    useEffect(() => {
        refetch();
    }, [dispenserToken]);
    return (
        <div
            className={
                "flex h-full w-full flex-col items-center justify-center px-5"
            }
        >
            <h1 className="pb-10 text-8xl font-black text-primary">SSD</h1>
            <h2 className="pb-10 text-center text-4xl font-bold text-secondary">
                건전하고 <br />
                공정한
                <br />
                술자리를
                <br />
                위하여
            </h2>
            <PrimaryTextField
                label="인증 토큰"
                placeholder="인증 토큰을 입력하세요"
                onChange={(event) => {
                    setDispenserToken(event.target.value);
                }}
                errorMessage="인증 토큰이 잘못됐습니다."
                isError={!data}
            />

            <button
                className={`btn btn-primary btn-wide text-xl ${
                    data ? "btn-active" : "btn-disabled"
                }`}
                onClick={() => {
                    navigate("/main");
                }}
            >
                시작하기
            </button>
            <div className="absolute bottom-5">
                <p className="text-center text-gray-500">
                    &copy;2022 최신 기술 프로젝트 2 TEAM SSD
                </p>
            </div>
        </div>
    );
};
export default AuthPage;
