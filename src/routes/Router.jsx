import Authentication from "@/layout/Authentication";
import OnboardLayout from "@/layout/OnboardLayout";
import { dashboardTabs } from "@/lib/staticData";
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
import { adminTabs } from "../lib/staticData";
import BasicInfo from "../pages/BasicInfo";
import BookingInfo from "../pages/BookingInfo";
import DynamicSubSideBarLayout from "../pages/DynamicSubSideBarLayout";
import ErrorPage from "../pages/ErrorPage";
import ProviderNotes from "../pages/ProviderNotes";
import BasicInformation from "../pages/admin/BasicInformation";
import ProfileBesicInformation from "../pages/admin/ProfileBesicInformation";
import ProfileSecurity from "../pages/admin/ProfileSecurity";
import UserManagement from "../pages/admin/UserManagement";
import ConfirmBooking from "../pages/client/ConfirmBooking";
import ConfirmPage from "../pages/client/ConfirmPage";
import ConfirmPending from "../pages/client/ConfirmPending";
import ConfirmStaff from "../pages/client/ConfirmStaff";
import EnterAddress from "../pages/client/EnterAddress";
import SelectStaff from "../pages/client/SelectStaff";
import SelectTime from "../pages/client/SelectTime";
import OurWorkDetails from "../pages/client/ServiceProviderInfo/OurWorkDetails";
import ServiceProviderInfo from "../pages/client/ServiceProviderInfo/ServiceProviderInfo";
import MyProfileLayout from "../pages/layout/MyProfileLayout";
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
import StaffManagement from "../pages/seller/StaffManagement";

import Subscriptions from "../pages/admin/Subscriptions";
import OTPVerificationPage from "../pages/onboarding/OTPVerificationPage";
import StaffInformationPage from "../pages/onboarding/StaffInformationPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout tabs={dashboardTabs} />,
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
        path: "/seller-management",
        element: <StaffManagement />,
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
        path: "enter-address",
        element: <EnterAddress />,
      },
      {
        path: "select-staff",
        element: <SelectStaff />,
      },
      {
        path: "select-time",
        element: <SelectTime />,
      },
      {
        path: "confirm",
        element: <ConfirmPage />,
      },
      {
        path: "confirm-staff",
        element: <ConfirmStaff />,
      },
      {
        path: "confirmation-pending",
        element: <ConfirmPending />,
      },
      {
        path: "confirmation",
        element: <ConfirmBooking />,
      },
    ],
  },
  {
    path: "/user-management",
    element: <MainLayout tabs={adminTabs} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserManagement />,
      },
      {
        path: "data-management",
        element: <UserManagement />,
      },
      {
        path: ":name",
        element: <MyProfileLayout />,
        children: [
          {
            path: "business-information",
            element: <BasicInformation />,
          },
          {
            path: "subscription",
            element: <Subscriptions />,
          },
        ],
      },
      {
        path: "my-profile",
        element: <MyProfileLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProfileBesicInformation />,
          },
          {
            path: "security",
            element: <ProfileSecurity />,
          },
        ],
      },
    ],
  },

  {
    path: "/our-work",
    element: <OurWorkDetails />,
  },

  {
    path: "/onboard", // Main path for general onboarding flows
    element: <OnboardLayout />, // Assuming OnboardLayout handles overall onboarding UI
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
      {
        path: "verify-otp", // Example path for OTP verification
        element: <OTPVerificationPage />,
      },
      {
        path: "staff-info", // Example path for staff information entry
        element: <StaffInformationPage />,
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
