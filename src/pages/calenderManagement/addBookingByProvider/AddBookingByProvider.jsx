import React from "react";
import Container from "../../client/Container";
import Breadcrumb from "../../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../../lib/staticData";

const AddBookingByProvider = () => {
  return (
    <Container>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client information",
            link: "/client-info",
          },
          {
            name: "Select Services",
            link: "/service-provider-info/select-staff",
          },
          {
            name: "Select staff",
            link: "/service-provider-info/select-staff",
          },
          {
            name: "Select Time",
            link: "/service-provider-info/select-staff",
          },
          {
            name: "Confirm",
            link: "/service-provider-info/select-staff",
          },
        ])}
      />

      {/* Client Information Form */}
    </Container>
  );
};

export default AddBookingByProvider;
