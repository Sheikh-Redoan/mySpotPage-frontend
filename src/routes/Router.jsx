// src/routes/index.jsx (or wherever your routes are defined)

import OnboardLayout from "@/layout/OnboardLayout";
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
import { createBrowserRouter, Navigate, Outlet } from "react-router"; // Use react-router-dom for Navigate and Outlet
import BusinessInfo from "../components/SettingsPages/BusinessInfo";
import Location from "../components/SettingsPages/Location";
import Subscription from "../components/SettingsPages/Subscription";
import AddCard from "../components/SettingsPages/UpgradePlan/AddCard";
import CancelSubscription from "../components/SettingsPages/UpgradePlan/CancelSubscription";
import CheckOut from "../components/SettingsPages/UpgradePlan/CheckOut";
import SuccessDowngrade from "../components/SettingsPages/UpgradePlan/SuccessDowngrade";
import SuccessUpgrade from "../components/SettingsPages/UpgradePlan/SuccessUpgrade";
import Upgradeplan from "../components/SettingsPages/UpgradePlan/Upgradeplan";
import ClientLayout from "../layout/ClientLayout";
import MainLayout from "../layout/MainLayout";
import {
  accountManagementProfileTabs,
  adminTabs,
  dashboardTabs,
  dataManagementTabs,
  profileMainTabs,
  profileTabs,
  userManagementTabs,
} from "../lib/staticData";
import BasicInfo from "../pages/BasicInfo";
import BookingInfo from "../pages/BookingInfo";
import DynamicSubSideBarLayout from "../pages/DynamicSubSideBarLayout";
import ErrorPage from "../pages/ErrorPage";
import ForbiddenPage from "../pages/ForbiddenPage";
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

// Adjust path
import AccountManagement from "../pages/admin/AccountManagement";
import MenuCategory from "../pages/admin/MenuCategory";
import ServiceClassification from "../pages/admin/ServiceClassification";
import Subscriptions from "../pages/admin/Subscriptions";
import CalendarManagementPage from "../pages/calenderManagement/CalendarManagementPage";
import AddBookingByProvider from "../pages/calenderManagement/addBookingByProvider/AddBookingByProvider";
import ClientAppointmentCalForProvider from "../pages/calenderManagement/addBookingByProvider/ClientAppointmentCalForProvider";
import ClientInfoFormPage from "../pages/calenderManagement/addBookingByProvider/ClientInfoFormPage";
import ConfirmPageForProvider from "../pages/calenderManagement/addBookingByProvider/ConfirmPageForProvider";
import SelectStaffForProvider from "../pages/calenderManagement/addBookingByProvider/SelectStaffForProvider";
import ServicesPageForProvider from "../pages/calenderManagement/addBookingByProvider/ServicesPageForProvider";
import ClientAppointmentCal from "../pages/client/ClientAppointmentCal";

import Authentication from "../layout/Authentication";
import AdminRoute from "../pages/layout/AdminRoute";
import ClientOnlyRoute from "../pages/layout/ClientOnlyRoute";
import ProtectedRoute from "../pages/layout/ProtectedRoute";
import SellerRoute from "../pages/layout/SellerRoute";
import OTPVerificationPage from "../pages/onboarding/OTPVerificationPage";
import StaffInformationPage from "../pages/onboarding/StaffInformationPage";
import StaffSecurityPage from "../pages/onboarding/StaffSecurityPage";
import StaffServicesPage from "../pages/onboarding/StaffServicesPage";
import StaffWorkingHoursPage from "../pages/onboarding/StaffWorkingHoursPage";

export const routes = createBrowserRouter([
  // Public Routes (Accessible to everyone)
  {
    path: "/",
    element: <ClientLayout />, // Assuming this is the layout for public/client-facing pages
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ServiceProviderInfo />, // Public landing page
      },
      {
        path: "our-work", // Public route
        element: <OurWorkDetails />,
      },
      // Client-specific booking flow (can be accessed by authenticated clients)
      {
        path: "service-provider-info",
        element: (
          <ProtectedRoute>
            <ClientOnlyRoute>
              {/* Ensure only clients can access this specific flow */}
              <Outlet />
            </ClientOnlyRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <SelectStaff />,
          },
          {
            path: "enter-address",
            element: <EnterAddress />,
          },
          {
            path: "select-time",
            element: <ClientAppointmentCal />,
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
    ],
  },

  // Authentication/Onboarding Routes (Generally public, but some steps might be restricted)
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-number", element: <VerifyNumber /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "reset-successfull", element: <ResetSuccessfull /> },
      { path: "signup", element: <Signup /> },
      { path: "signup-verify-number", element: <SignupVerifyNumber /> },
      { path: "setup-signup", element: <SetupSignup /> },
      { path: "signup-successfull", element: <SignupSuccessfull /> },
    ],
  },

  // Individual auth pages outside the /auth nested route
  { path: "/signin", element: <Signin /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-number", element: <VerifyNumber /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/reset-successfull", element: <ResetSuccessfull /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signup-verify-number", element: <SignupVerifyNumber /> },
  { path: "/setup-signup", element: <SetupSignup /> },
  { path: "/signup-successfull", element: <SignupSuccessfull /> },

  // Onboarding Routes (Protected after initial setup, generally for new sellers/staff)
  {
    path: "/onboard",
    element: (
      <ProtectedRoute>
        <OnboardLayout />{" "}
        {/* Assuming OnboardLayout handles overall onboarding UI */}
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SetUpBusiness />,
      },
      { path: "setup-location", element: <SetUpLocation /> },
      { path: "setup-services1", element: <SetupLocationServices1 /> },
      { path: "setup-services2", element: <SetupLocationServices2 /> },
      { path: "setup-teamservices1", element: <SetupTeamLocationServices1 /> },
      { path: "setup-teamservices2", element: <SetupTeamLocationServices2 /> },
      { path: "service", element: <SetUpService /> },
      { path: "service-table", element: <ServiceTable /> },
      { path: "verify-staff-otp", element: <OTPVerificationPage /> },
      { path: "staff-info", element: <StaffInformationPage /> },
      { path: "services-settings", element: <StaffServicesPage /> },
      { path: "working-shift-settings", element: <StaffWorkingHoursPage /> },
      { path: "security-settings", element: <StaffSecurityPage /> },
    ],
  },

  // General Success/Subscription Pages (Can be accessed after certain actions, might need protection)
  { path: "/success-notification", element: <SuccessNotifications /> },
  { path: "/upgrade-plan", element: <Upgradeplan /> }, // Consider if this needs ProtectedRoute
  { path: "/checkout", element: <CheckOut /> }, // Consider if this needs ProtectedRoute
  { path: "/success-upgrade", element: <SuccessUpgrade /> },
  { path: "/success-downgrade", element: <SuccessDowngrade /> },
  { path: "/cancel-subscription", element: <CancelSubscription /> },
  { path: "/add-card", element: <AddCard /> },

  // Seller/Provider Dashboard Routes (Protected by SellerRoute)
  {
    path: "/dashboard", // This is the seller's main dashboard
    element: (
      <ProtectedRoute>
        <SellerRoute>
          <MainLayout tabs={dashboardTabs} />{" "}
          {/* MainLayout for seller dashboard */}
        </SellerRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      { path: "calendar", element: <CalendarManagementPage /> },
      {
        path: "add-booking-by-provider",
        element: <AddBookingByProvider />,
        children: [
          { index: true, element: <ClientInfoFormPage /> },
          { path: "select-services", element: <ServicesPageForProvider /> },
          { path: "select-staff", element: <SelectStaffForProvider /> },
          { path: "select-time", element: <ClientAppointmentCalForProvider /> },
          { path: "confirm", element: <ConfirmPageForProvider /> },
        ],
      },
      { path: "service-menu", element: <ServicePage /> },
      { path: "pricing", element: <TimePage /> },
      { path: "client-management", element: <ClientPage /> },
      { path: "staff-management", element: <StaffManagement /> }, // Staff management for seller
      {
        path: "client",
        element: (
          <DynamicSubSideBarLayout
            indexPath="/dashboard/client/basic-info"
            items={clientNavItems}
          />
        ),
        children: [
          { path: "basic-info", element: <BasicInfo /> },
          { path: "booking-info", element: <BookingInfo /> },
          { path: "provider-notes", element: <ProviderNotes /> },
        ],
      },
      {
        path: "settings",
        element: (
          <DynamicSubSideBarLayout
            indexPath="/dashboard/settings"
            items={settingsNavItems}
          />
        ),
        children: [
          { index: true, element: <BusinessInfo /> },
          { path: "location", element: <Location /> },
          { path: "subscription", element: <Subscription /> },
        ],
      },
      // Consider adding specific routes for subscription changes if they are part of seller settings
      { path: "settings/upgrade-plan", element: <Upgradeplan /> },
      { path: "settings/checkout", element: <CheckOut /> },
      { path: "settings/success-upgrade", element: <SuccessUpgrade /> },
      { path: "settings/success-downgrade", element: <SuccessDowngrade /> },
      { path: "settings/cancel-subscription", element: <CancelSubscription /> },
      { path: "settings/add-card", element: <AddCard /> },
    ],
  },

  // Admin Dashboard Routes (Protected by AdminRoute)
  {
    path: "/admin", // Changed from /user-management to a more general /admin path
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <MainLayout tabs={adminTabs} /> {/* MainLayout for admin dashboard */}
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="user-management" />, // Redirect to user-management by default
      },
      {
        path: "user-management", // Nested under /admin
        element: <Outlet />, // Use Outlet for nested routes
        children: [
          { index: true, element: <UserManagement /> },
          {
            path: ":name", // Use userId for specific user
            element: <MyProfileLayout tabs={userManagementTabs} />,
            children: [
              { path: "business-information", element: <BasicInformation /> },
              { path: "subscription", element: <Subscriptions /> },
            ],
          },
        ],
      },
      {
        path: "account-management", // Nested under /admin
        element: <Outlet />,
        children: [
          { index: true, element: <AccountManagement /> },
          {
            path: ":accountId", // Use accountId for specific account
            element: <MyProfileLayout tabs={accountManagementProfileTabs} />,
            children: [
              {
                path: "basic-information",
                element: <ProfileBesicInformation />,
              },
              { path: "security", element: <ProfileSecurity /> },
            ],
          },
        ],
      },
      {
        path: "data-management", // Nested under /admin
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="service-classification" /> },
          {
            path: "service-classification",
            element: <MyProfileLayout tabs={dataManagementTabs} />,
            children: [{ index: true, element: <ServiceClassification /> }],
          },
          {
            path: "menu-category",
            element: <MyProfileLayout tabs={dataManagementTabs} />,
            children: [{ index: true, element: <MenuCategory /> }],
          },
        ],
      },
    ],
  },

  // User Profile Management (Accessible by all authenticated users, potentially with different views)
  {
    path: "/profile", // Renamed from /profile-management for brevity and clarity
    element: (
      <ProtectedRoute>
        <MainLayout tabs={profileMainTabs} />
        {/* Assuming MainLayout is used for profiles */}
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "my-profile",
        element: <MyProfileLayout tabs={profileTabs} />,
        children: [
          { path: "basic-information", element: <ProfileBesicInformation /> },
          { path: "security", element: <ProfileSecurity /> },
        ],
      },
    ],
  },

  // Forbidden Page
  {
    path: "/forbidden",
    element: <ForbiddenPage />,
  },

  // Catch-all for 404
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
