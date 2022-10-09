import { useEffect } from "react";
import { useNavigate } from "react-router";

const SplashPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/auth");
    });
    return <div></div>;
};

export default SplashPage;
