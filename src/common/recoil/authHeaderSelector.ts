import { RawAxiosRequestHeaders } from "axios";
import { selector } from "recoil";
import tokenState from "./tokenAtom";

const authHeaderSelector = selector<RawAxiosRequestHeaders>({
    key: "authHeader",
    get: ({ get }) => {
        const token = get(tokenState);
        return { Authentication: `Bearer ${token}` };
    },
});

export default authHeaderSelector;
