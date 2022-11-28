import DrinkerState from "./DrinkerState";
import Drinker from "../../main/interfaces/drinker";

const DrinksStates = ({ drinkers }: { drinkers: Drinker[] }) => {
    return (
        <div className="">
            <span className="text-2xl">현재 상태</span>
            {drinkers.map((registeredUser: Drinker) => {
                return (
                    <DrinkerState
                        key={registeredUser.glassId}
                        {...registeredUser}
                    />
                );
            })}
        </div>
    );
};

export default DrinksStates;
