import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./auth/AuthPage";

import MainPage from "./main/MainPage";
import SplashPage from "./pages/splashPage";

export const router = createBrowserRouter([
    { path: "/", element: <SplashPage /> },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/main",
        element: <MainPage />,
    },
    {
        path: "/drink",
    },
]);
