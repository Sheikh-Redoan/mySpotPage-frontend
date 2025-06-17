import { Outlet } from "react-router";

const AddBookingByProvider = () => {
  return (
    <div className="md:p-4">
      {/* All form Form Step for add booking by Provider */}
      <Outlet />
    </div>
  );
};

export default AddBookingByProvider;
