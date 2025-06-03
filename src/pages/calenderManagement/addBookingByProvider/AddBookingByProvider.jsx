import { Outlet } from "react-router";
import Container from "../../client/Container";

const AddBookingByProvider = () => {
  return (
    <Container className="">
      {/* All form Form Step for add booking by Provider */}
      <Outlet />
    </Container>
  );
};

export default AddBookingByProvider;
