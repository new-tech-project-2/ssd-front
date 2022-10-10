import Drinker from "../interfaces/drinker";
import RegisteredUser from "./RegisteredUser";

const RegisteredUsers = ({ drinkers }: { drinkers: Drinker[] }) => {
    return (
        <div>
            <span>등록된 술잔들</span>
            {drinkers.map((registeredUser: Drinker) => {
                return (
                    <RegisteredUser
                        key={registeredUser.id}
                        {...registeredUser}
                    />
                );
            })}
        </div>
    );
};

export default RegisteredUsers;
