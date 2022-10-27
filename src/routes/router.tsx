import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../auth/AuthPage";
import { DeviceTest } from "../deviceTest/DeviceTest";
import DrinkPage from "../drink/DrinkPage";
import MainPage from "../main/MainPage";
export const authenticRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/drink",
        element: <DrinkPage />,
    },
    {
        path: "/device",
        element: <DeviceTest />,
    },
]);

export const needAuthRotuer = createBrowserRouter([
    {
        path: "/",
        element: <AuthPage />,
    },
    {
        path: "/device",
        element: <DeviceTest />,
    },
]);
