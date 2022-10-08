import {createBrowserRouter} from "react-router-dom";
import React from 'react';
import HomePage from "./pages/homePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
]);