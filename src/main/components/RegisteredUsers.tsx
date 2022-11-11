import { useRecoilValue } from "recoil";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import Drinker from "../interfaces/drinker";
import RegisteredUser from "./RegisteredUser";

const RegisteredUsers = ({ drinkers }: { drinkers: Drinker[] }) => {
    const authHeader = useRecoilValue(authHeaderSelector);
    return (
        <div className="">
            <span className="text-2xl">등록된 술잔들</span>
            <button
                className="btn glass"
                onClick={() => {
                    customAxios.delete("/drinker", { headers: authHeader });
                }}
            >
                삭제
            </button>
            {drinkers.map((registeredUser: Drinker) => {
                return (
                    <RegisteredUser
                        key={registeredUser.glassId}
                        {...registeredUser}
                    />
                );
            })}
        </div>
    );
};

export default RegisteredUsers;
