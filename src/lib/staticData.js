import { imageProvider } from "./imageProvider";

export const dashboardTabs = [
  {
    id: 0,
    name: "Dashboard",
    imagePink: imageProvider.ChartLinePink,
    imageWhite: imageProvider.ChartLineWhite,
    link: "/",
  },
  {
    id: 1,
    name: "Calendar Management",
    imagePink: imageProvider.CalendarPink,
    imageWhite: imageProvider.CalendarWhite,
    link: "/calendar",
  },
  {
    id: 2,
    name: "Service Menu",
    imagePink: imageProvider.ServicePink,
    imageWhite: imageProvider.ServiceWhite,
    link: "/service-menu",
  },
  {
    id: 3,
    name: "Time-based Pricing",
    imagePink: imageProvider.PricingPink,
    imageWhite: imageProvider.PricingWhite,
    link: "/pricing",
  },
  {
    id: 4,
    name: "Seller Menu",
    imagePink: imageProvider.seller_pink,
    imageWhite: imageProvider.seller_white,
    link: "/seller-management",
  },
  {
    id: 5,
    name: "Client Management",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/client-management",
  },
  {
    id: 6,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "/settings",
  },
];

export const adminTabs = [
  {
    id: 0,
    name: "User Management",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/user-management",
  },
  {
    id: 1,
    name: "Data Management",
    imagePink: imageProvider.database,
    imageWhite: imageProvider.databaseCol,
    link: "data-management",
  },
  {
    id: 5,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "settings",
  },
];
export const profileMainTabs = [
  {
    id: 0,
    name: "My profile",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleWhite,
    link: "/user-management",
  },
  {
    id: 1,
    name: "Data Management",
    imagePink: imageProvider.database,
    imageWhite: imageProvider.databaseCol,
    link: "data-management",
  },
  {
    id: 5,
    name: "Settings",
    imagePink: imageProvider.SettingsPink,
    imageWhite: imageProvider.SettingsWhite,
    link: "settings",
  },
];

export const profileTabs = [
  {
    id: 0,
    name: "Basic Information",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleBlack,
    link: "/profile-management/my-profile/basic-information",
  },
  {
    id: 1,
    name: "Security",
    imagePink: imageProvider.securityPink,
    imageWhite: imageProvider.securityBlack,
    link: "/profile-management/my-profile/security",
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
