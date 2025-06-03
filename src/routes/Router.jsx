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
  dataManagementTabs,
  profileTabs,
  staffSettingsTabs,
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
import AllAppointment from "../pages/calenderManagement/AllAppointment";
import PendingBookings from "../pages/calenderManagement/PendingBookings";
import WaitlistsOverview from "../pages/calenderManagement/WaitlistsOverview";
import BlacklistsOverview from "../pages/calenderManagement/BlacklistsOverview";
import BookingsDetailsOfEachStatus from "../pages/calenderManagement/BookingsDetailsOfEachStatus";

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
          <MainLayout />
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
      {
        path: "calendar",
        element: <CalendarManagementPage />,
        children: [
          {
            index: true,
            element: <AllAppointment />,
          },
          {
            path: "pending-bookings",
            element: <PendingBookings />,
          },
          {
            path: "waitlist",
            element: <WaitlistsOverview />,
          },
          {
            path: "blacklist",
            element: <BlacklistsOverview />,
          },
          {
            path: "bookings-details/:id",
            element: <BookingsDetailsOfEachStatus />,
          },
        ],
      },
      {
        path: "add-booking-by-provider",
        element: <AddBookingByProvider />,
        children: [
          { index: true, element: <ClientInfoFormPage /> },
          { path: "select-services", element: <ServicesPageForProvider /> },
          { path: "select-staff", element: <SelectStaffForProvider /> },
          { path: "select-time", element: <ClientAppointmentCalForProvider /> },
          { path: "confirm", element: <ConfirmPageForProvider /> },
          { path: "confirmation", element: <ConfirmBooking /> },
        ],
      },
      { path: "service-menu", element: <ServicePage /> },
      { path: "pricing", element: <TimePage /> },
      { path: "client-management", element: <ClientPage /> },
      { path: "staff-management", element: <StaffManagement /> }, // Staff management for seller
      {
        path: "staff-settings",
        element: <MyProfileLayout tabs={staffSettingsTabs} />,
        children: [
          { index: true, element: <div>Modal</div> },
          {
            path: "basic-information",
            element: <BusinessInfo />,
          },
          { path: "location", element: <Location /> },
          { path: "subscription", element: <Subscription /> },
        ],
      },

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
    path: "/admin", // This is the base path for admin sections
    element: (
      <ProtectedRoute>
        <AdminRoute>
          {/* MainLayout for admin dashboard, renders its children via <Outlet /> */}
          <MainLayout />
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="user-management" replace />, // Redirect to user-management by default
      },
      // --- User Management Section ---
      {
        path: "user-management", // Nested under /admin/user-management
        element: <Outlet />, // This Outlet will render the children of 'user-management'
        children: [
          {
            index: true,
            element: <UserManagement />, // /admin/user-management
          },
          {
            path: ":name", // e.g., /admin/user-management/john-doe
            // MyProfileLayout will be the 'element' for this level
            // It will then render its children via its OWN <Outlet />
            element: <MyProfileLayout tabs={userManagementTabs} />,
            children: [
              {
                path: "business-information", // e.g., /admin/user-management/john-doe/business-information
                element: <BasicInformation />, // BasicInformation is now a direct child element
              },
              {
                path: "subscription", // e.g., /admin/user-management/john-doe/subscription
                element: <Subscriptions />, // Subscriptions is now a direct child element
              },
            ],
          },
        ],
      },
      // --- Account Management Section ---
      {
        path: "account-management", // Nested under /admin/account-management
        element: <Outlet />, // This Outlet will render the children of 'account-management'
        children: [
          {
            index: true,
            element: <AccountManagement />, // /admin/account-management
          },
          {
            path: ":name", // e.g., /admin/account-management/acme-corp
            // MyProfileLayout for account-specific profile
            element: <MyProfileLayout tabs={accountManagementProfileTabs} />, // Correctly using accountManagementProfileTabs
            children: [
              {
                path: "basic-information", // e.g., /admin/account-management/acme-corp/basic-information
                element: <ProfileBesicInformation />,
              },
              {
                path: "security", // e.g., /admin/account-management/acme-corp/security
                element: <ProfileSecurity />,
              },
            ],
          },
        ],
      },
      // --- Data Management Section ---
      {
        path: "data-management", // Nested under /admin/data-management
        element: <Outlet />, // This Outlet will render the children of 'data-management'
        children: [
          {
            index: true,
            element: <Navigate to="service-classification" replace />,
          },
          {
            path: "service-classification", // e.g., /admin/data-management/service-classification
            element: <MyProfileLayout tabs={dataManagementTabs} />, // Correctly using dataManagementTabs
            children: [
              {
                index: true,
                element: <ServiceClassification />, // /admin/data-management/service-classification
              },
            ],
          },
          {
            path: "menu-category", // e.g., /admin/data-management/menu-category
            element: <MyProfileLayout tabs={dataManagementTabs} />, // Correctly using dataManagementTabs
            children: [
              {
                index: true,
                element: <MenuCategory />, // /admin/data-management/menu-category
              },
            ],
          },
        ],
      },
    ],
  },

  // User Profile Management (Accessible by all authenticated users, potentially with different views)
  {
    path: "my-profile",
    element: (
      <ProtectedRoute>
        <MainLayout activeTab="my-profile" />
        {/* MainLayout expects <Outlet /> to render children */}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="basic-information" />,
      },
      {
        path: "basic-information",
        element: <MyProfileLayout tabs={profileTabs} />,
        children: [
          {
            index: true,
            element: <ProfileBesicInformation />,
          },
        ],
      },
      {
        path: "security",
        element: <MyProfileLayout tabs={profileTabs} />,
        children: [
          {
            index: true,
            element: <ProfileSecurity />,
          },
        ],
      },
    ],
  }, // Forbidden Page
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
