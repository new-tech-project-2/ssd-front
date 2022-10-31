import InputBox from "./components/InputBox";
import ModalButton from "./components/ModalButton";
import useMainEditModel from "./hooks/useMainEditModel";

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
    const {
        inputName,
        changeInputNameHandler,
        inputDetail,
        changeInputDetailHandler,
        inputCapacity,
        changeInputCapacityHandler,
        editHandler,
        deleteHandler,
    } = useMainEditModel({ id, totalCapacity, name, detail });

    return (
        <>
            <input
                type="checkbox"
                id={`modal-${id}`}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <ModalButton
                        htmlFor={`modal-${id}`}
                        className="btn-sm btn-circle absolute right-2 top-2 mx-0 text-sm"
                        title="✕"
                    />

                    <div className="flex flex-col m-2">
                        <h3 className="text-3xl font-bold mb-10 text-center">
                            수정하기
                        </h3>

                        <div className="form-control mb-10 flex flex-col">
                            <InputBox
                                title="이름"
                                type="text"
                                value={inputName}
                                onChange={changeInputNameHandler}
                            />
                            <InputBox
                                title="설명"
                                type="text"
                                value={inputDetail}
                                onChange={changeInputDetailHandler}
                            />
                            <InputBox
                                title="주량"
                                type="number"
                                value={inputCapacity}
                                onChange={changeInputCapacityHandler}
                            />
                        </div>

                        <div className="flex flex-row justify-center">
                            <ModalButton
                                onClick={editHandler}
                                htmlFor={`modal-${id}`}
                                className="btn-primary"
                                title="수정완료"
                            />
                            <ModalButton
                                onClick={deleteHandler}
                                htmlFor={`modal-${id}`}
                                className="btn-secondary"
                                title="삭제하기"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainEdit;
