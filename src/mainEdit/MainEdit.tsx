import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { customAxios } from "../common/axios/customAxis";
import Button from "../common/components/Button";
import authHeaderSelector from "../common/recoil/authHeaderSelector";
import authTokenState from "../common/recoil/authTokenAtom";

const MainEdit = ({
    id,
    totalCapacity,
    name,
    detail,
}: {
    id: string;
    totalCapacity: number;
    name: string;
    detail: string;
}) => {
    console.log(id);
    const authHeader = useRecoilValue(authHeaderSelector);
    const authToken = useRecoilValue(authTokenState);

    const [inputName, setInputName] = useState(name);
    const [inputDetail, setInputDetail] = useState(detail);
    const [inputCapacity, setInputCapacity] = useState(totalCapacity);

    const changeInputNameHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputName(event.target.value);
    };
    const changeInputDetailHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputDetail(event.target.value);
    };
    const changeInputCapacityHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputCapacity(Number(event.target.value));
    };

    // 수정하기 버튼 눌렀을 때 실행될 useQuery (Axios)
    const { status, data, error, refetch, isFetching } = useQuery(
        ["patch/drinkers"],
        async () => {
            const { data } = await customAxios.patch(
                `/drinker/${id}`,
                {
                    totalCapacity: inputCapacity,
                    name: inputName,
                    detail: inputDetail,
                },
                {
                    headers: authHeader,
                }
            );

            return data;
        },
        {
            initialData: [],
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    // 수정하기 버튼 눌렀을 때 실행될 useQuery (Axios)
    const {
        status: delStatus,
        data: delData,
        error: delError,
        refetch: delRefetch,
        isFetching: delIsFetching,
    } = useQuery(
        ["delete/drinkers"],
        async () => {
            const { data: delData } = await customAxios.delete(
                `/drinker/${id}`,
                {
                    headers: authHeader,
                }
            );

            return delData;
        },
        {
            initialData: [],
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    // 수정완료 버튼 클릭 시
    const editHandler = () => {
        refetch();
    };

    // 삭제하기 버튼 클릭 시
    const deleteHandler = () => {
        delRefetch();
    };

    return (
        <>
            <input
                type="checkbox"
                id={`my-modal-${id}`}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor={`my-modal-${id}`}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>

                    <div className="flex flex-col m-2">
                        <h3 className="text-3xl font-bold mb-10 text-center">
                            수정하기
                        </h3>

                        <div className="form-control mb-10 flex flex-col">
                            <label className="input-group mb-2 justify-center">
                                <span>이름</span>
                                <input
                                    type="text"
                                    placeholder="이름을 입력하세요."
                                    className="input input-bordered"
                                    value={inputName}
                                    onChange={changeInputNameHandler}
                                />
                            </label>
                            <label className="input-group mb-2 justify-center">
                                <span>설명</span>
                                <input
                                    type="text"
                                    placeholder="설명을 입력하세요."
                                    className="input input-bordered"
                                    value={inputDetail}
                                    onChange={changeInputDetailHandler}
                                />
                            </label>
                            <label className="input-group justify-center">
                                <span>주량</span>
                                <input
                                    type="number"
                                    placeholder="00"
                                    className="input input-bordered"
                                    value={inputCapacity}
                                    onChange={changeInputCapacityHandler}
                                />
                            </label>
                        </div>

                        <div className="flex flex-row justify-center">
                            <label
                                onClick={editHandler}
                                htmlFor={`my-modal-${id}`}
                                className="btn btn-primary text-lg mr-2.5"
                            >
                                수정완료
                            </label>
                            <label
                                onClick={deleteHandler}
                                htmlFor={`my-modal-${id}`}
                                className="btn btn-secondary text-lg ml-2.5"
                            >
                                삭제하기
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainEdit;
