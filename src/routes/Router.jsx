import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPage from "@/pages/DashboardPage";
import CalendarPage from "@/pages/CalendarPage";
import ServicePage from "@/pages/ServicePage";
import TimePage from "@/pages/TimePage";
import ClientPage from "@/pages/ClientPage";
import SettingsPage from "@/pages/SettingsPage";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: '/calendar',
                element: <CalendarPage/>
            },
            {
                path: '/service-menu',
                element: <ServicePage/>
            },
            {
                path: '/pricing',
                element: <TimePage/>
            },
            {
                path: '/client-management',
                element: <ClientPage/>
            },
            {
                path: '/settings',
                element: <SettingsPage/>
            },
        ]
    }
])