import AddressForm from "../../components/client/AddressForm";
import Breadcrumb from "../../components/client/Breadcrumb";
import Container from "./Container";

export default function EnterAddress() {
  return (
    <section>
      <Container>
        <Breadcrumb isAddressPage={true} />
        <h2 className="text-xl font-semibold font-golos">Enter Address</h2>

        <AddressForm />
      </Container>
    </section>
  );
}
