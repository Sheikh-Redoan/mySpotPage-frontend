// Assuming Container and Breadcrumb exist in your project structure
import { PiStorefrontLight } from "react-icons/pi";
import confirm_product from "../../assets/images/confirm.jpg";
import Breadcrumb from "../../components/client/Breadcrumb";
import ConfirmDetails from "../../components/client/ConfirmDetails";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { FaStar } from "react-icons/fa";

const ConfirmPage = () => {
  const [open, setOpen] = useState(false);
  // Sample data to pass to ConfirmDetails.
  // In a real application, this data would come from API calls, Redux store, or React Context.
  const storeData = {
    storeName: "TCL Beauty Studio 01",
    rating: "4.8",
    reviewsCount: "12.5K reviews",
    location: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    staffName: "John Doe",
    appointmentDateTime: "06 Jan 2025, 11:00",
    bookingNote:
      "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
    services: [
      {
        id: 1,
        image: confirm_product, // Using the dummy image for all services
        name: "Classic Ombre",
        options: "Smooth / Scalp treatment",
        duration: "2h45m",
        price: "₪70.00",
      },
      {
        id: 2,
        image: confirm_product,
        name: "Reverse Ombre",
        options: "Shadow Root",
        duration: "3h30m",
        price: "₪100.00",
      },
      {
        id: 3,
        image: confirm_product,
        name: "Balayage with Toner",
        options: "30m",
        duration: "30m",
        price: "₪100.00",
      },
      // Add more services here if needed to test "Show more"
      // {
      //   id: 4,
      //   image: confirm_product,
      //   name: "Hair Cut",
      //   options: "Short Hair",
      //   duration: "1h00m",
      //   price: "₪50.00",
      // },
    ],
    subtotal: "₪270.00",
    vatIncluded: "(includes ₪48.60 VAT)",
    discountPercentage: "20% OFF",
    discountAmount: "-₪54.00",
    total: "₪216.00",
    paymentInstruction: "You will pay at the appointment location",
  };

  return (
    <section className="md:py-8">
      <Container className="">
        {/* Pass isAddressPage as true to show "Enter address" and "Select staff" in the breadcrumb */}
        <Breadcrumb breadcrumbs={getBreadcrumbs()} />
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 mt-6">
          <div className="p-5 bg-white rounded-xl flex-1 w-full lg:w-auto">
            <h2 className="text-Boulder-950 text-base font-semibold leading-normal mb-4">
              Confirm
            </h2>
            <div className="px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2 mb-4">
              <PiStorefrontLight className="text-primary01 text-[24px] flex-shrink-0" />
              <p className="text-violet-500 text-base font-semibold leading-normal">
                You will pay at the appointment location
              </p>
            </div>
            <div>
              <p className="text-neutral-700 text-sm font-normal leading-tight mb-1">
                Booking note
              </p>
              <div className="px-3 py-2 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-200 flex items-start gap-2 w-full min-h-[125px]">
                <h3 className="flex-1 text-zinc-700 text-sm font-normal leading-tight">
                  {storeData.bookingNote}
                </h3>
              </div>
            </div>
          </div>

            <ConfirmDetails
              className="w-full lg:w-80 p-4 flex-shrink-0 max-md:hidden"
              storeName={storeData.storeName}
              rating={storeData.rating}
              reviewsCount={storeData.reviewsCount}
              location={storeData.location}
              staffName={storeData.staffName}
              appointmentDateTime={storeData.appointmentDateTime}
              bookingNote={storeData.bookingNote}
              services={storeData.services}
              subtotal={storeData.subtotal}
              vatIncluded={storeData.vatIncluded}
              discountPercentage={storeData.discountPercentage}
              discountAmount={storeData.discountAmount}
              total={storeData.total}
              paymentInstruction={storeData.paymentInstruction}
              buttonTittle={"Complete"}
            />
        </div>
      </Container>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="bg-white p-4 shadow fixed bottom-0 w-full z-50">
          <div className="flex items-end justify-between">
            <div>
              {storeData.storeName && (
                <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
                  {storeData.storeName}
                </h3>
              )}
              {(storeData.rating || storeData.reviewsCount) && (
                <div className="flex gap-1 items-center">
                  {storeData.rating && <FaStar className="text-[#FFD056]" />}
                  {storeData.rating && (
                    <p className="text-black text-sm font-normal leading-tight">
                      {storeData.rating}
                    </p>
                  )}
                  {storeData.reviewsCount && (
                    <p className="text-description text-sm font-normal underline leading-tight">
                      ({storeData.reviewsCount})
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="self-end">
              <Button
                type="text"
                className="w-full"
                onClick={() => setOpen(true)}
              >
                See detail{" "}
                {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
            </div>
          </div>
          <div className="border-b border-b-gray-200 my-3" />

          {/* Price details */}
          <div className="flex flex-col gap-[12px] w-full justify-center items-start">
            {storeData.total && (
              <div className="flex justify-between items-start w-full">
                <p className="w-full max-w-48 text-description text-sm font-normal   leading-tight">
                  Total
                </p>
                <p className="text-right text-violet-500 text-lg font-semibold   leading-relaxed">
                  {storeData.total}
                </p>
              </div>
            )}
          </div>

          <Button
            color="default"
            variant="solid"
            className="w-full my-2"
            disabled
          >
            Continue
          </Button>

          {storeData.paymentInstruction && (
            <p className="self-stretch text-center text-description text-xs font-normal   leading-none">
              {storeData.paymentInstruction}
            </p>
          )}
        </div>

        <Drawer
          placement={"bottom"}
          closable={false}
          title="Summary"
          extra={
            <Button type="text" onClick={() => setOpen(false)}>
              <X size={22} className="" />
            </Button>
          }
          height="80%"
          onClose={() => setOpen(false)}
          open={open}
          className="rounded-t-lg"
        >
          <ConfirmDetails
            className="w-full"
            storeName={storeData.storeName}
            rating={storeData.rating}
            reviewsCount={storeData.reviewsCount}
            location={storeData.location}
            staffName={storeData.staffName}
            appointmentDateTime={storeData.appointmentDateTime}
            bookingNote={storeData.bookingNote}
            services={storeData.services}
            subtotal={storeData.subtotal}
            vatIncluded={storeData.vatIncluded}
            discountPercentage={storeData.discountPercentage}
            discountAmount={storeData.discountAmount}
            total={storeData.total}
            paymentInstruction={storeData.paymentInstruction}
            buttonTittle={"Complete"}
          />
        </Drawer>
        <style>
          {`
          .ant-drawer-body {
            padding: 0;
          }
        `}
        </style>
      </div>
    </section>
  );
};

export default ConfirmPage;
