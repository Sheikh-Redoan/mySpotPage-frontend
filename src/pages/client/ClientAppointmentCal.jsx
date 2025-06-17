import dayjs from "dayjs";
import Calender from "../../components/calender/Calender";
import {
  MOCK_EVENTS,
  MOCK_RESOURCES,
} from "../../components/calender/mockdata";
import Breadcrumb from "../../components/client/Breadcrumb";
import AppointmentActionsBtn from "../../components/client/client-appointment/AppointmentActionsBtn";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";
import "/src/styles/fullCalender.css";

let eventGuid = 0;
let todayStr = dayjs().format("YYYY-MM-DD");

const specialDatesData = [
  { date: "2025-05-01", isBusy: true },
  { date: "2025-05-02", isBusy: true },
  { date: "2025-05-06", sale: "🔥 25% OFF" },
  { date: "2025-05-08", isBusy: true },
  { date: "2025-05-09", isBusy: true },
  { date: "2025-05-14", sale: "🔥 25% OFF" },
  { date: "2025-06-15", sale: "🔥 10% OFF", isBusy: true },
  { date: "2025-05-16", isBusy: true },
  { date: "2025-06-17", isBusy: true },
  { date: "2025-06-22", isBusy: true },
  { date: "2025-06-23", isBusy: true },
  { date: "2025-06-30", sale: "🔥 50% OFF" },
  { date: "2025-07-01", sale: "🔥 50% OFF" },
  { date: "2025-07-02", sale: "🔥 50% OFF" },
];

export const INITIAL_EVENTS = [
  {
    id: `event-${eventGuid++}`,
    title: "All-day event",
    start: todayStr,
  },
  {
    id: `event-${eventGuid++}`,
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export default function ClientAppointmentCal() {
  return (
    <section className="bg-[#F9FAFC] py-4 md:py-8">
      <Container>
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Select staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />

        <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
          <Calender
            events={MOCK_EVENTS}
            resources={MOCK_RESOURCES}
            selectTimeFromProvider={true}
            applyFilter={false}
          />

            <AppointmentActionsBtn to="/service-provider-info/confirm" />

          {/* Mobile View */}
          <div className="md:hidden">
            
          </div>
        </div>
      </Container>
    </section>
  );
}
