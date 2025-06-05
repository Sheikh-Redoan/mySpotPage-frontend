import Calender from "../../../components/calender/Calender";
import {
  MOCK_EVENTS,
  specialDatesData,
} from "../../../components/calender/mockdata";

export default function ClientAppointmentCalForProvider() {
  return (
    <Calender
      selectTimeFromProvider={true}
      events={MOCK_EVENTS}
      resources={specialDatesData}
    />
  );
}
