import Button from "../common/components/Button";
import DrinksStates from "./components/DrinkersStates";
import DrinkStatePrev from "./components/DrinkStatePrev";
import Timer from "./components/Timer";
import LoadingBar from "../common/components/LoadingBar";
import useDrinkPageModel from "./hooks/useDrinkPageModel";
import OverAlarm from "../alarm/OverAlarm";

const DrinkPage = () => {
    const {
        currentNumOfGlasses,
        totalNumOfGlasses,
        isFetching,
        data,
        stopHandler,
        overDrink,
    } = useDrinkPageModel();

    return (
        <div className="m-10 flex flex-col">
            <div className="mb-5 flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">술자리 진행 중</h1>
                <span className="mb-3 text-2xl text-gray-500">
                    안전은 SSD가 책임질게요.
                </span>
                <div className="mb-3 flex flex-row justify-between">
                    <DrinkStatePrev
                        curruntNumOfGlasses={currentNumOfGlasses}
                        totalNumOfGlasses={totalNumOfGlasses}
                    />
                    <Timer />
                </div>
            </div>
            {isFetching && <LoadingBar />}
            {!isFetching && <DrinksStates drinkers={data} />}
            <div className="flex justify-center py-5">
                <Button className="btn-wide" onClick={stopHandler}>
                    중지하기
                </Button>
            </div>
            <OverAlarm overDrink={overDrink} />
        </div>
    );
};

export default DrinkPage;
