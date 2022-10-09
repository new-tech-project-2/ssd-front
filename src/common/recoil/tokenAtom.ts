import { atom } from "recoil";

const tokenState = atom({
    key: "token",
    default: "",
});

export default tokenState;
