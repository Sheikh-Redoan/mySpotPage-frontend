import { imageProvider } from "./imageProvider";

export const dashboardTabs = [
    {
      "id": 0,
      "name": "Dashboard",
      "imagePink": imageProvider.ChartLinePink,
      "imageWhite": imageProvider.ChartLineWhite,
      "link": '/'
    },
    {
      "id": 1,
      "name": "Calendar Management",
      "imagePink": imageProvider.CalendarPink,
      "imageWhite": imageProvider.CalendarWhite,
      "link": '/calendar'
    },
    {
      "id": 2,
      "name": "Service Menu",
      "imagePink": imageProvider.ServicePink,
      "imageWhite": imageProvider.ServiceWhite,
      "link": '/service-menu'
    },
    {
      "id": 3,
      "name": "Time-based Pricing",
      "imagePink": imageProvider.PricingPink,
      "imageWhite": imageProvider.PricingWhite,
      "link": '/pricing'
    },
    {
      "id": 4,
      "name": "Seller Menu",
      "imagePink": imageProvider.seller_pink,
      "imageWhite": imageProvider.seller_white,
      "link": '/seller-management'
    },
    {
      "id": 5,
      "name": "Client Management",
      "imagePink": imageProvider.PeoplePink,
      "imageWhite": imageProvider.PeopleWhite,
      "link": '/client-management'
    },
    {
      "id": 6,
      "name": "Settings",
      "imagePink": imageProvider.SettingsPink,
      "imageWhite": imageProvider.SettingsWhite,
      "link": '/settings'
    }
  ]
  