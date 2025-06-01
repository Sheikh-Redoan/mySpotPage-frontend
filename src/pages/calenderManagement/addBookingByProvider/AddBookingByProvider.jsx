import React from "react";
import Container from "../../client/Container";
import Breadcrumb from "../../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../../lib/staticData";
import { Outlet } from "react-router";

const AddBookingByProvider = () => {
  return (
    <Container>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client information",
            link: "/add-booking-by-provider",
          },
          {
            name: "Select Services",
            link: "/add-booking-by-provider/select-services",
          },
          {
            name: "Select staff",
            link: "/add-booking-by-provider/select-staff",
          },
          {
            name: "Select Time",
            link: "/add-booking-by-provider/select-time",
          },
          {
            name: "Confirm",
            link: "/add-booking-by-provider/confirm",
          },
        ])}
      />

      {/* All form Form Step for add booking by Provider */}
        <Outlet />
    </Container>
  );
};

export default AddBookingByProvider;
