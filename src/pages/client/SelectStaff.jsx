import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/client/Breadcrumb";
import StaffCard from "../../components/client/StaffCard";
import { setSelectedStaff } from "../../redux/features/staffSlice";
import Container from "./Container";

export default function SelectStaff() {
  const { selectedStaff } = useSelector(({ selectedStaff }) => selectedStaff);
  const [staff, setStaff] = useState(staffData);
  const dispatch = useDispatch();

  // log to the console of selected staff from redux store
  console.log(selectedStaff);

  const handleSelect = (staffData) => {
    const updatedStaff = staff.map((item) => ({
      ...item,
      selected: item.id === staffData.id,
    }));
    setStaff(updatedStaff);
    dispatch(setSelectedStaff(staffData));
  };

  return (
    <section className="bg-[#F9FAFC]">
      <Container>
        <Breadcrumb />
        <div className="flex justify-between flex-col lg:flex-row w-full gap-8">
          <div className="flex-1 bg-white rounded-lg p-5">
            <h2 className="text-xl font-semibold font-golos">Select staff</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 py-5">
              {staff.length > 0 ? (
                staff.map((item, index) => (
                  <StaffCard
                    key={index}
                    value={item.id}
                    isActive={item.selected}
                    handleSelect={() => handleSelect(item)}
                    name={item.name}
                    designation={item.designation}
                    picture={item.picture}
                  />
                ))
              ) : (
                // Should be replaced with Empty component
                <p className="text-center text-lg font-semibold">
                  No staff found
                </p>
              )}
            </div>
          </div>
          <div className="w-1/5 bg-white rounded-lg">Confirm card</div>
        </div>
      </Container>
    </section>
  );
}

// Belows are the Mock staff data will be replaced with the real data
import staff1 from "../../assets/images/staff/staff1.jpg";
import staff2 from "../../assets/images/staff/staff2.jpg";
import staff3 from "../../assets/images/staff/staff3.jpg";
import staff4 from "../../assets/images/staff/staff4.jpg";
import staff5 from "../../assets/images/staff/staff5.jpg";
import staff6 from "../../assets/images/staff/staff6.jpg";
import staff7 from "../../assets/images/staff/staff7.jpg";

const staffData = [
  {
    id: "0",
    selected: true,
    name: "Any Staff",
    designation: "Staff will be assigned later",
    picture: null,
  },
  {
    id: "1",
    selected: false,
    name: "Staff1",
    designation: "Junior stylist",
    picture: staff1,
  },
  {
    id: "2",
    selected: false,
    name: "Staff2",
    designation: "Junior stylist",
    picture: staff2,
  },
  {
    id: "3",
    selected: false,
    name: "Staff3",
    designation: "Junior stylist",
    picture: staff3,
  },
  {
    id: "4",
    selected: false,
    name: "Staff4",
    designation: "Junior stylist",
    picture: staff4,
  },
  {
    id: "5",
    selected: false,
    name: "Staff5",
    designation: "Junior stylist",
    picture: staff5,
  },
  {
    id: "6",
    selected: false,
    name: "Staff6",
    designation: "Junior stylist",
    picture: staff6,
  },
  {
    id: "7",
    selected: false,
    name: "Staff7",
    designation: "Junior stylist",
    picture: staff7,
  },
];
