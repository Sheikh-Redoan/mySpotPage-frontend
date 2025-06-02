import { imageProvider } from "./imageProvider";

export const dashboardTabs = [
  {
    id: 0,
    name: "Dashboard",
    imagePink: imageProvider.ChartLinePink,
    imageWhite: imageProvider.ChartLineWhite,
    link: "/dashboard",
  },
  {
    id: 1,
    name: "Calendar Management",
    imagePink: imageProvider.CalendarPink,
    imageWhite: imageProvider.CalendarWhite,
    link: "/dashboard/calendar",
  },
  {
    id: 2,
    name: "Service Menu",
    imagePink: imageProvider.ServicePink,
    imageWhite: imageProvider.ServiceWhite,
    link: "/dashboard/service-menu",
  },
  {
    id: 3,
    name: "Time-based Pricing",
    imagePink: imageProvider.PricingPink,
    imageWhite: imageProvider.PricingWhite,
    link: "/dashboard/pricing",
  },
  {
    id: 4,
    name: "Seller Menu",
    imagePink: imageProvider.seller_pink,
    imageWhite: imageProvider.seller_white,
    link: "/dashboard/seller-management",
  },
  {
    id: 5,
    name: "Client Management",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/dashboard/client-management",
  },
  {
    id: 6,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "/dashboard/settings",
  },
];

export const adminTabs = [
  {
    id: 0,
    name: "User Management",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/admin/user-management",
  },
  {
    id: 1,
    name: "Data Management",
    imagePink: imageProvider.database,
    imageWhite: imageProvider.databaseCol,
    link: "/admin/data-management",
  },
  {
    id: 5,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "/admin/admin-settings",
  },
];

export const profileMainTabs = [
  {
    id: 0,
    name: "User Management",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/admin/user-management",
  },
  {
    id: 1,
    name: "Data Management",
    imagePink: imageProvider.database,
    imageWhite: imageProvider.databaseCol,
    link: "/admin/data-management/service-classification",
  },
  {
    id: 2,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "/admin/admin-settings",
  },
];

export const profileTabs = [
  {
    id: 0,
    name: "Basic Information",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleBlack,
    link: "/my-profile/basic-information",
  },
  {
    id: 1,
    name: "Security",
    imagePink: imageProvider.securityPink,
    imageWhite: imageProvider.securityBlack,
    link: "/my-profile/security",
  },
];

export const accountManagementProfileTabs = [
  {
    id: 0,
    name: "Basic Information",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleBlack,
    link: "basic-information",
  },
  {
    id: 1,
    name: "Security",
    imagePink: imageProvider.securityPink,
    imageWhite: imageProvider.securityBlack,
    link: "security",
  },
];

export const userManagementTabs = [
  {
    id: 0,
    name: "Basic Information",
    imagePink: imageProvider.buildingCol,
    imageWhite: imageProvider.building,
    link: "business-information",
  },
  {
    id: 1,
    name: "Subscription",
    imagePink: imageProvider.cardCol,
    imageWhite: imageProvider.card,
    link: "subscription",
  },
];

export const dataManagementTabs = [
  {
    id: 0,
    name: "Service Classification ",
    // imagePink: imageProvider.buildingCol,
    // imageWhite: imageProvider.building,
    link: "/admin/data-management/service-classification",
  },
  {
    id: 1,
    name: "Menu Category",
    // imagePink: imageProvider.cardCol,
    // imageWhite: imageProvider.card,
    link: "/admin/data-management/menu-category",
  },
];

// Initial breadcrumbs
export const breadcrumbs = [
  {
    name: "Service",
    link: "/service-provider-info",
  },
  {
    name: "Select time",
    link: "/service-provider-info/select-time",
  },
  {
    name: "Confirm",
    link: "/service-provider-info/confirm",
  },
];

// Reusable utility function to insert breadcrumb at a given index
export const getBreadcrumbs = (from, to, breadcrumb) => {
  if (!breadcrumb) return [...breadcrumbs];
  const data = [...breadcrumbs];
  // Mutate and return the updated breadcrumbs array
  data.splice(from, to, ...breadcrumb);
  return [...data]; // Return a cloned updated array
};
