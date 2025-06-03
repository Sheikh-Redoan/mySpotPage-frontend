import {
  BusinessIcon,
  LocationIcon,
  SubscriptionIcon,
} from "../../assets/icons/icons";
import { imageProvider } from "../../lib/imageProvider";

export const settingsNavItems = [
  {
    path: "/dashboard/settings",
    title: "Business Info",
    icon: BusinessIcon,
    end: false,
  },
  {
    path: "/dashboard/settings/location",
    title: "Location",
    icon: LocationIcon,
  },
  {
    path: "/dashboard/settings/subscription",
    title: "Subscription",
    icon: SubscriptionIcon,
  },
];

export const clientNavItems = [
  {
    link: "basic-info",
    name: "Basic Information",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleBlack,
  },
  {
    link: "booking-info",
    name: "Booking Information",
    imagePink: imageProvider.bookingActive,
    imageWhite: imageProvider.booking,
  },
  {
    link: "provider-notes",
    name: "Provider Notes",
    imagePink: imageProvider.noteActive,
    imageWhite: imageProvider.note,
  },
];
