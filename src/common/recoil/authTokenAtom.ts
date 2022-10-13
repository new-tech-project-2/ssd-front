import { atom } from "recoil";

const authTokenState = atom({
    key: "authToken",
    default: "",
});

export default authTokenState;
