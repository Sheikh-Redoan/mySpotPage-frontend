import Calender from "../../../components/calender/Calender";
import {
  MOCK_EVENTS,
  specialDatesData,
} from "../../../components/calender/mockdata";
import Breadcrumb from "../../../components/client/Breadcrumb";
import AppointmentActionsBtn from "../../../components/client/client-appointment/AppointmentActionsBtn";
import { getBreadcrumbs } from "../../../lib/staticData";

export default function ClientAppointmentCalForProvider() {
  return (
    <section>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client information",
            link: "/dashboard/add-booking-by-provider",
          },
          {
            name: "Select Services",
            link: "/dashboard/add-booking-by-provider/select-services",
          },
          {
            name: "Select staff",
            link: "/dashboard/add-booking-by-provider/select-staff",
          },
          {
            name: "Select Time",
            link: "/dashboard/add-booking-by-provider/select-time",
          },
          {
            name: "Confirm",
            link: "/dashboard/add-booking-by-provider/confirm",
          },
        ])}
      />
      <Calender
        selectTimeFromProvider={true}
        events={MOCK_EVENTS}
        resources={specialDatesData}
      />

      <AppointmentActionsBtn to="/dashboard/add-booking-by-provider/confirm" />
    </section>
  );
}
