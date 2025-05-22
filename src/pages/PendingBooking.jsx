import CustomEmptyTable from "../components/DashboardPageComponents/shared/CustomEmptyTable";

const PendingBooking = () => {
  return (
    <div>
      <CustomEmptyTable
        title="No Pending Bookings Found"
        description="There are no bookings waiting for confirmation. Check other booking statuses for more details."
      />
    </div>
  );
};

export default PendingBooking;
