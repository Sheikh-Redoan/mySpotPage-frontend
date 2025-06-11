import { imageProvider } from "../../lib/imageProvider";

export const settingsNavItems = [
  {
    link: "/dashboard/settings",
    name: "Business Info",
    imagePink: imageProvider.PeoplePink,
    imageWhite: imageProvider.PeopleBlack,
    end: false,
  },
  {
    link: "/dashboard/settings/location",
    name: "Location",
    imagePink: imageProvider.LocationPink,
    imageWhite: imageProvider.LocationBlack,
  },
  {
    link: "/dashboard/settings/subscription",
    name: "Subscription",
    imagePink: imageProvider.SubscriptionPink,
    imageWhite: imageProvider.SubscriptionBlack,
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
