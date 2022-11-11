import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";

const useMainEditModel = ({
    id,
    totalCapacity,
    drinkerName,
    detail,
}: {
    id: string;
    totalCapacity: number;
    drinkerName: string;
    detail: string;
}) => {
    const authHeader = useRecoilValue(authHeaderSelector);

    const [inputName, setInputName] = useState(drinkerName);
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

    // 수정하기 버튼 눌렀을 때 실행될 useQuery (Axios), 수정 후 백엔드 서버에서 자동으로 바뀐 값들에 대해 message 전달함 (socket)
    const { refetch: updateRefetch } = useQuery(
        ["patch/updateglass"],
        async () => {
            const { data: updateData } = await customAxios.patch(
                `/glass/${id}`,
                {
                    drinkerName: inputName,
                    totalCapacity: inputCapacity,
                    detail: inputDetail,
                },
                {
                    headers: authHeader,
                }
            );

            return updateData;
        },
        {
            initialData: [],
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    // 삭제하기 버튼 눌렀을 때 실행될 useQuery (Axios)
    const { refetch: delRefetch } = useQuery(
        ["delete/deleteglass"],
        async () => {
            const { data: delData } = await customAxios.delete(
                `/glass/deleteglass/${id}`,
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
        updateRefetch();
    };

    // 삭제하기 버튼 클릭 시
    const deleteHandler = () => {
        delRefetch();
    };

    return {
        inputName,
        changeInputNameHandler,
        inputDetail,
        changeInputDetailHandler,
        inputCapacity,
        changeInputCapacityHandler,
        editHandler,
        deleteHandler,
    };
};

export default useMainEditModel;
