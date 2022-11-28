import { useRecoilValue } from "recoil";
import { customAxios } from "../../common/axios/customAxis";
import authHeaderSelector from "../../common/recoil/authHeaderSelector";
import Drinker from "../interfaces/drinker";
import RegisteredUser from "./RegisteredUser";
import Button from "../../common/components/Button";

const RegisteredUsers = ({ drinkers }: { drinkers: Drinker[] }) => {
    const authHeader = useRecoilValue(authHeaderSelector);
    return (
        <div className="">
            <div className="flex flex-row items-center justify-between">
                <span className="text-2xl">등록된 술잔들</span>
                {/* <button
                className="btn glass"
                onClick={() => {
                    customAxios.delete("/drinker", { headers: authHeader });
                }}
            >
                삭제
            </button> */}
                <Button
                    className="w-28 btn-secondary"
                    onClick={() => {
                        customAxios.delete("/drinker", { headers: authHeader });
                    }}
                >
                    전체 삭제
                </Button>
            </div>

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
