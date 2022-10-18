import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const authTokenState = atom({
    key: "authToken",
    default: "",
    // eslint-disable-next-line camelcase
    effects_UNSTABLE: [persistAtom],
});

export default authTokenState;
