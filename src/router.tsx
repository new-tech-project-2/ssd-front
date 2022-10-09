import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AuthPage from "./pages/authPage";
import SplashPage from "./pages/splashPage";
import MainPage from "./pages/mainPage";

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
