import { RawAxiosRequestHeaders } from "axios";
import { selector } from "recoil";
import authTokenState from "./authTokenAtom";

const authHeaderSelector = selector<RawAxiosRequestHeaders>({
    key: "authHeader",
    get: ({ get }) => {
        const token = get(authTokenState);
        return { drinkerToken: `${token}` };
    },
});

export default authHeaderSelector;
