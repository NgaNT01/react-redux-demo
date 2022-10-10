import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Team from "../components/Team";
import User from "../components/User";
import MainLayout, { loader as mainLayoutLoader } from "../layout/MainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        loader: mainLayoutLoader,
        children: [
            {
                path: 'user',
                element: <User />,
            },
            {
                path: 'team',
                element: <Team />
            },
        ],
    }
]);

const RoutesApp = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default RoutesApp;