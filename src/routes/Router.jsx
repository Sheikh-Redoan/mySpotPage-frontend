import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPage from "@/pages/DashboardPage";
import CalendarPage from "@/pages/CalendarPage";
import ServicePage from "@/pages/ServicePage";
import TimePage from "@/pages/TimePage";
import ClientPage from "@/pages/ClientPage";
import SettingsPage from "@/pages/SettingsPage";
import Authentication from "@/layout/Authentication";
import Signin from "@/pages/authentication/Signin";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import VerifyNumber from "@/pages/authentication/VerifyNumber";
import ResetPassword from "@/pages/authentication/ResetPassword";
import ResetSuccessfull from "@/pages/authentication/ResetSuccessfull";
import Signup from "@/pages/authentication/Signup";
import SignupVerifyNumber from "@/pages/authentication/SignupVerifyNumber";
import SetupSignup from "@/pages/authentication/SetupSignup";
import SignupSuccessfull from "@/pages/authentication/SignupSuccessfull";
import OnboardLayout from "@/layout/OnboardLayout";
import SetUpBusiness from "@/pages/onboarding/SetUpBusiness";
import SetUpLocation from "../pages/onboarding/SetUpLocation";
import SetupLocationServices1 from "../pages/onboarding/solo/SetupLocationServices1";
import SetupLocationServices2 from "../pages/onboarding/solo/SetupLocationServices2";
import SetupTeamLocationServices1 from "../pages/onboarding/team/SetupTeamLocationServices1";
import SetupTeamLocationServices2 from "../pages/onboarding/team/SetupTeamLocationServices2";
import SetUpService from "../pages/onboarding/SetUpService";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/service-menu",
        element: <ServicePage />,
      },
      {
        path: "/pricing",
        element: <TimePage />,
      },
      {
        path: "/client-management",
        element: <ClientPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/onboard",
    element: <OnboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SetUpBusiness />,
      },
      {
        path: "setup-location",
        element: <SetUpLocation />,
      },
      {
        path: "setup-services1",
        element: <SetupLocationServices1 />,
      },
      {
        path: "setup-services2",
        element: <SetupLocationServices2 />,
      },
      {
        path: "setup-teamservices1",
        element: <SetupTeamLocationServices1 />,
      },
      {
        path: "setup-teamservices2",
        element: <SetupTeamLocationServices2 />,
      },
      {
        path: "service",
        element: <SetUpService />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-number",
    element: <VerifyNumber />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-successfull",
    element: <ResetSuccessfull />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup-verify-number",
    element: <SignupVerifyNumber />,
  },
  {
    path: "/setup-signup",
    element: <SetupSignup />,
  },
  {
    path: "/signup-successfull",
    element: <SignupSuccessfull />,
  },
]);
