import Authentication from "@/layout/Authentication";
import OnboardLayout from "@/layout/OnboardLayout";
import CalendarPage from "@/pages/CalendarPage";
import ClientPage from "@/pages/ClientPage";
import DashboardPage from "@/pages/DashboardPage";
import ServicePage from "@/pages/ServicePage";
import TimePage from "@/pages/TimePage";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import ResetPassword from "@/pages/authentication/ResetPassword";
import ResetSuccessfull from "@/pages/authentication/ResetSuccessfull";
import SetupSignup from "@/pages/authentication/SetupSignup";
import Signin from "@/pages/authentication/Signin";
import Signup from "@/pages/authentication/Signup";
import SignupSuccessfull from "@/pages/authentication/SignupSuccessfull";
import SignupVerifyNumber from "@/pages/authentication/SignupVerifyNumber";
import VerifyNumber from "@/pages/authentication/VerifyNumber";
import SetUpBusiness from "@/pages/onboarding/SetUpBusiness";
import { createBrowserRouter } from "react-router";
import ClientInformation from "../components/CalenderClientInformation/ClientInformation";
import BusinessInfo from "../components/SettingsPages/BusinessInfo";
import Location from "../components/SettingsPages/Location";
import Subscription from "../components/SettingsPages/Subscription";
import AddCard from "../components/SettingsPages/UpgradePlan/AddCard";
import CancelSubscription from "../components/SettingsPages/UpgradePlan/CancelSubscription";
import CheckOut from "../components/SettingsPages/UpgradePlan/CheckOut";
import SuccessDowngrade from "../components/SettingsPages/UpgradePlan/SuccessDowngrade";
import SuccessUpgrade from "../components/SettingsPages/UpgradePlan/SuccessUpgrade";
import Upgradeplan from "../components/SettingsPages/UpgradePlan/Upgradeplan";
import AllAppoimtment from "../components/calendarManagement/AllAppointment";
import ClientLayout from "../layout/ClientLayout";
import MainLayout from "../layout/MainLayout";
import BasicInfo from "../pages/BasicInfo";
import BookingInfo from "../pages/BookingInfo";
import DynamicSubSideBarLayout from "../pages/DynamicSubSideBarLayout";
import ErrorPage from "../pages/ErrorPage";
import ProviderNotes from "../pages/ProviderNotes";
import {
  clientNavItems,
  settingsNavItems,
} from "../pages/layout/subSidebarObj";
import ServiceTable from "../pages/onboarding/ServiceTable";
import SetUpLocation from "../pages/onboarding/SetUpLocation";
import SetUpService from "../pages/onboarding/SetUpService";
import SuccessNotifications from "../pages/onboarding/SuccessNotifications";
import SetupLocationServices1 from "../pages/onboarding/solo/SetupLocationServices1";
import SetupLocationServices2 from "../pages/onboarding/solo/SetupLocationServices2";
import SetupTeamLocationServices1 from "../pages/onboarding/team/SetupTeamLocationServices1";
import SetupTeamLocationServices2 from "../pages/onboarding/team/SetupTeamLocationServices2";
import ServiceProviderInfo from "../pages/ServiceProviderInfo/ServiceProviderInfo";

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
        children: [
          {
            path: "/calendar",
            element: <AllAppoimtment></AllAppoimtment>,
          },
        ],
      },
      {
        path: "/ClientInformation",
        element: <ClientInformation></ClientInformation>,
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
        path: "/client",
        element: (
          <DynamicSubSideBarLayout
            indexPath="/client/basic-info"
            items={clientNavItems}
          />
        ),
        children: [
          {
            path: "basic-info",
            element: <BasicInfo />,
          },
          {
            path: "booking-info",
            element: <BookingInfo />,
          },
          {
            path: "provider-notes",
            element: <ProviderNotes />,
          },
        ],
      },
      {
        path: "/settings",
        element: (
          <DynamicSubSideBarLayout
            indexPath="/settings"
            items={settingsNavItems}
          />
        ),
        children: [
          {
            index: true,
            element: <BusinessInfo />,
          },
          {
            path: "location",
            element: <Location />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
        ],
      },
    ],
  },

  {
    path: "/service-provider-info",
    element: <ClientLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ServiceProviderInfo />,
      },
      {
        path: "service",
        element: <div>Service Page</div>,
      },
      {
        path: "select-staff",
        element: <div>Select Staff</div>,
      },
      {
        path: "select-time",
        element: <div>Select Time</div>,
      },
      {
        path: "confirm",
        element: <div>Confirm page</div>,
      },
      {
        path: "confirmation",
        element: <div>Confirmation page</div>,
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
      {
        path: "service-table",
        element: <ServiceTable />,
      },
    ],
  },

  {
    path: "/success-notification",
    element: <SuccessNotifications />,
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
  {
    path: "/upgrade-plan",
    element: <Upgradeplan />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/success-upgrade",
    element: <SuccessUpgrade />,
  },
  {
    path: "/success-downgrade",
    element: <SuccessDowngrade />,
  },
  {
    path: "/cancel-subscription",
    element: <CancelSubscription />,
  },
  {
    path: "/add-card",
    element: <AddCard />,
  },
]);
