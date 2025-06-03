import {
  AvatarIcon,
  BookingIcon,
  BusinessIcon,
  LocationIcon,
  NoteIcon,
  SubscriptionIcon,
} from "../../assets/icons/icons";

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
    path: "/client/basic-info",
    title: "Basic Information",
    icon: AvatarIcon,
  },
  {
    path: "/client/booking-info",
    title: "Booking Information",
    icon: BookingIcon,
  },
  {
    path: "/client/provider-notes",
    title: "Provider Notes",
    icon: NoteIcon,
  },
];
