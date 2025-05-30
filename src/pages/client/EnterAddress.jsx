import AddressForm from "../../components/client/AddressForm";
import Breadcrumb from "../../components/client/Breadcrumb";
import ConfirmDetails from "../../components/client/ConfirmDetails";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";

export default function EnterAddress() {
  return (
    <section>
      <Container>
        <Breadcrumb
          isAddressPage={true}
          isStaffPage={true}
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Enter Address",
              link: "/service-provider-info/enter-address",
            },
            {
              name: "Select Staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />
        <div className="flex justify-between flex-col lg:flex-row w-full gap-8">
          <div className="flex-1 bg-white rounded-xl p-5">
            <h2 className="text-xl font-semibold font-golos">Enter Address</h2>

            <AddressForm />
          </div>

          <ConfirmDetails
            className="w-ull lg:w-1/4 p-4"
            staffName={"John Doe"}
            storeName="TCL Beauty Studio 01"
            appointmentDateTime={"06 Jan 2025, 11:00"}
            bookingNote={
              "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture."
            }
            services={[]}
            subtotal={0}
            vatIncluded={0}
            discountPercentage={0}
            discountAmount={0}
            total={0}
            paymentInstruction={""}
            buttonTittle={"Continue"}
          />
        </div>
      </Container>
    </section>
  );
}
