import Calender from "../../components/calender/Calender";
import {
  MOCK_EVENTS,
  MOCK_RESOURCES,
} from "../../components/calender/mockdata";

export default function AllAppointment() {
  return <Calender events={MOCK_EVENTS} resources={MOCK_RESOURCES} />;
}
