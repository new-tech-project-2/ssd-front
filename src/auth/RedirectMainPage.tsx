import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectMainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/drink");
    }, []);

    return <></>;
};

export default RedirectMainPage;
