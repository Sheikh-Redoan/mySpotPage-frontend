import Breadcrumb from "../../components/client/Breadcrumb";
import StaffCard from "../../components/client/StaffCard";
import Container from "./Container";

export default function SelectStaff() {
  return (
    <section className="bg-[#F9FAFC]">
      <Container>
        <Breadcrumb />
        <div className="flex justify-between w-full gap-8">
          <div className="flex-1 bg-white rounded-lg p-5">
            <h2 className="text-xl font-semibold font-golos">Select staff</h2>

            <div className="grid grid-cols-4 gap-3 py-5">
              <StaffCard />
              <StaffCard />
              <StaffCard />
              <StaffCard />
            </div>
          </div>
          <div className="w-1/5 bg-white rounded-lg">Confirm card</div>
        </div>
      </Container>
    </section>
  );
}
