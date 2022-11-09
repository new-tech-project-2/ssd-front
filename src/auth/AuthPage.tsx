import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { customAxios } from "../common/axios/customAxis";

import { PrimaryTextField } from "../common/components/TextField";
import authTokenState from "../common/recoil/authTokenAtom";

const AuthPage = () => {
    const [dispenserToken, setDispenserToken] = useState("");

    const setAuthToken = useSetRecoilState(authTokenState);
    const { status, data, error, refetch } = useQuery(
        ["post/login"],
        async () => {
            const { data } = await customAxios.post("/dispenser/login", {
                dispenserToken: dispenserToken,
            });

            return data;
        },
        {
            initialData: { success: false },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        }
    );
    useEffect(() => {
        refetch();
    }, [dispenserToken]);
    return (
        <div
            className={
                "flex h-full w-full flex-col items-center justify-center px-5"
            }
        >
            <div className="flex flex-col flex-1 justify-center">
                <h1 className="pb-10 text-8xl font-black text-primary">SSD</h1>
                {/* <h2 className="pb-10 text-center text-4xl font-bold text-secondary">
                건전하고 <br />
                공정한
                <br />
                술자리를
                <br />
                위하여
            </h2> */}
                <img className="h-48 w-48 pb-10" src="media/logo.svg" />
            </div>
            <div>
                <PrimaryTextField
                    label="인증 토큰"
                    placeholder="인증 토큰을 입력하세요"
                    onChange={(event) => {
                        setDispenserToken(event.target.value);
                    }}
                    errorMessage="인증 토큰이 잘못됐습니다."
                    isError={!data.success}
                />

                <button
                    className={`btn btn-primary text-xl w-full my-16 p-8 content-center ${
                        data.success ? "btn-active" : "btn-disabled"
                    }`}
                    onClick={() => {
                        setAuthToken(data.drinkerToken);
                    }}
                >
                    시작하기
                </button>
            </div>
            <p className="text-center text-gray-500">
                &copy;2022 최신 기술 프로젝트 2 TEAM SSD
            </p>
        </div>
    );
};
export default AuthPage;
