import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import AllAppoimtment from "./AllAppointment";
import BlacklistsOverview from "./BlacklistsOverview";
import PendingBookings from "./PendingBookings";
import WaitlistsOverview from "./WaitlistsOverview";
import { Modal } from "antd";
import SettingsBookingsRules from "../../components/calendarManagement/SettingsBookingsRules";

const items = [
  {
    key: "1",
    label: "All Appointments",
  },
  {
    key: "2",
    label: "Pending Bookings",
  },
  {
    key: "3",
    label: "Waitlists Overview",
  },
  {
    key: "4",
    label: "Blacklists Overview",
  },
];

function CalendarManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("bookings-details")) {
      return;
    }

    switch (location.pathname) {
      case "/dashboard/calendar":
        setActiveTabKey("1");
        break;
      case "/dashboard/calendar/pending-bookings":
        setActiveTabKey("2");
        break;
      case "/dashboard/calendar/waitlist":
        setActiveTabKey("3");
        break;
      case "/dashboard/calendar/blacklist":
        setActiveTabKey("4");
        break;
      default:
        setActiveTabKey("1");
    }
  }, [location.pathname]);

  const onChange = (key) => {
    setActiveTabKey(key);

    switch (key) {
      case "1":
        navigate("/dashboard/calendar");
        break;
      case "2":
        navigate("/dashboard/calendar/pending-bookings");
        break;
      case "3":
        navigate("/dashboard/calendar/waitlist");
        break;
      case "4":
        navigate("/dashboard/calendar/blacklist");
        break;
      default:
        navigate("/dashboard/calendar");
    }
  };

  const renderContent = () => {
    if (location.pathname.includes("bookings-details")) {
      return <Outlet />;
    }

    switch (activeTabKey) {
      case "1":
        // AllAppoimtment now renders the CustomStaffCalendar internally
        return <AllAppoimtment />;
      case "2":
        return <PendingBookings />;
      case "3":
        return <WaitlistsOverview />;
      case "4":
        return <BlacklistsOverview />;
      default:
        return <AllAppoimtment />;
    }
  };

  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between ">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="custom-client-tabs"
        />

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/add-booking-by-provider"
            type="button"
            className="inline-flex items-center px-3 py-2 gap-2 text-sm font-semibold text-white bg-primary01 border border-primary01 rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H12.75V20.25C12.75 20.4489 12.671 20.6397 12.5303 20.7803C12.3897 20.921 12.1989 21 12 21C11.8011 21 11.6103 20.921 11.4697 20.7803C11.329 20.6397 11.25 20.4489 11.25 20.25V12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H11.25V3.75C11.25 3.55109 11.329 3.36032 11.4697 3.21967C11.6103 3.07902 11.8011 3 12 3C12.1989 3 12.3897 3.07902 12.5303 3.21967C12.671 3.36032 12.75 3.55109 12.75 3.75V11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z"
                fill="white"
              />
            </svg>
            Add Booking
          </Link>

          <button
            type="button"
            className="inline-flex items-center px-3 py-2 gap-2 text-sm font-semibold border border-[#242528] rounded-lg focus:ring-2 focus:ring-[#242528] focus:ring-offset-2 cursor-pointer"
            onClick={() => setSettingsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.0016 7.49998C11.1116 7.49998 10.2416 7.7639 9.50158 8.25837C8.76156 8.75284 8.18478 9.45564 7.84419 10.2779C7.50359 11.1002 7.41448 12.005 7.58811 12.8779C7.76174 13.7508 8.19033 14.5526 8.81966 15.182C9.449 15.8113 10.2508 16.2399 11.1237 16.4135C11.9967 16.5871 12.9015 16.498 13.7237 16.1574C14.546 15.8168 15.2488 15.2401 15.7433 14.5C16.2377 13.76 16.5016 12.89 16.5016 12C16.5004 10.8069 16.0259 9.66302 15.1823 8.81937C14.3386 7.97573 13.1947 7.50122 12.0016 7.49998ZM12.0016 15C11.4083 15 10.8283 14.824 10.3349 14.4944C9.84159 14.1647 9.45707 13.6962 9.23 13.148C9.00294 12.5999 8.94353 11.9967 9.05929 11.4147C9.17504 10.8328 9.46076 10.2982 9.88032 9.87866C10.2999 9.4591 10.8344 9.17338 11.4164 9.05763C11.9983 8.94187 12.6015 9.00128 13.1497 9.22834C13.6979 9.45541 14.1664 9.83992 14.4961 10.3333C14.8257 10.8266 15.0016 11.4066 15.0016 12C15.0016 12.7956 14.6856 13.5587 14.123 14.1213C13.5604 14.6839 12.7973 15 12.0016 15ZM22.3085 10.0509C22.2876 9.94531 22.2442 9.84543 22.1813 9.75807C22.1184 9.67072 22.0374 9.59793 21.9438 9.54467L19.1473 7.95092L19.136 4.79904C19.1357 4.6905 19.1118 4.58331 19.066 4.4849C19.0202 4.38649 18.9535 4.29919 18.8707 4.22904C17.8563 3.37095 16.6881 2.71336 15.4282 2.29123C15.329 2.25765 15.2238 2.24522 15.1195 2.25475C15.0152 2.26428 14.9141 2.29555 14.8226 2.34654L12.0016 3.92342L9.17789 2.34373C9.08635 2.29245 8.98506 2.26094 8.88058 2.25125C8.7761 2.24156 8.67074 2.2539 8.57133 2.28748C7.31241 2.71269 6.14554 3.37279 5.13258 4.23279C5.04986 4.30284 4.98331 4.38999 4.93751 4.48823C4.89171 4.58647 4.86774 4.69347 4.86727 4.80186L4.85321 7.95654L2.05664 9.55029C1.96308 9.60356 1.88209 9.67634 1.81916 9.7637C1.75623 9.85105 1.71285 9.95093 1.69196 10.0565C1.43601 11.3427 1.43601 12.6667 1.69196 13.9528C1.71285 14.0584 1.75623 14.1583 1.81916 14.2456C1.88209 14.333 1.96308 14.4058 2.05664 14.459L4.85321 16.0528L4.86446 19.2047C4.8648 19.3132 4.88869 19.4204 4.9345 19.5188C4.98031 19.6172 5.04693 19.7045 5.12977 19.7747C6.14421 20.6328 7.31241 21.2904 8.57227 21.7125C8.67148 21.7461 8.77663 21.7585 8.88094 21.749C8.98525 21.7394 9.0864 21.7082 9.17789 21.6572L12.0016 20.0765L14.8254 21.6562C14.9371 21.7185 15.0631 21.7508 15.191 21.75C15.2729 21.75 15.3543 21.7367 15.432 21.7106C16.6907 21.286 17.8576 20.6265 18.8707 19.7672C18.9534 19.6971 19.02 19.61 19.0658 19.5117C19.1116 19.4135 19.1355 19.3065 19.136 19.1981L19.1501 16.0434L21.9466 14.4497C22.0402 14.3964 22.1212 14.3236 22.1841 14.2363C22.2471 14.1489 22.2904 14.049 22.3113 13.9434C22.5658 12.6583 22.5649 11.3357 22.3085 10.0509ZM20.9023 13.3237L18.2238 14.8472C18.1065 14.9139 18.0093 15.0111 17.9426 15.1284C17.8882 15.2222 17.831 15.3215 17.7729 15.4153C17.6985 15.5335 17.6589 15.6703 17.6585 15.81L17.6445 18.8334C16.9245 19.3988 16.1225 19.8509 15.266 20.174L12.5641 18.6684C12.452 18.6064 12.3258 18.5741 12.1976 18.5747H12.1798C12.0663 18.5747 11.952 18.5747 11.8385 18.5747C11.7044 18.5713 11.5717 18.6037 11.4541 18.6684L8.75039 20.1778C7.89212 19.8571 7.08785 19.4072 6.36539 18.8437L6.35508 15.825C6.35462 15.685 6.315 15.548 6.24071 15.4294C6.18258 15.3356 6.12539 15.2419 6.07196 15.1425C6.0057 15.0233 5.90854 14.9242 5.79071 14.8556L3.10946 13.3284C2.97071 12.4507 2.97071 11.5567 3.10946 10.679L5.78321 9.15279C5.90056 9.08607 5.99773 8.9889 6.06446 8.87154C6.11883 8.77779 6.17602 8.67842 6.23414 8.58467C6.30855 8.46644 6.34818 8.32967 6.34852 8.18998L6.36258 5.16654C7.08251 4.60118 7.88457 4.14909 8.74102 3.82592L11.4391 5.33154C11.5566 5.39663 11.6893 5.42901 11.8235 5.42529C11.937 5.42529 12.0513 5.42529 12.1648 5.42529C12.2989 5.42865 12.4316 5.39629 12.5491 5.33154L15.2529 3.82217C16.1112 4.14286 16.9154 4.59274 17.6379 5.15623L17.6482 8.17498C17.6487 8.31495 17.6883 8.45199 17.7626 8.57061C17.8207 8.66436 17.8779 8.75811 17.9313 8.85748C17.9976 8.97665 18.0947 9.07575 18.2126 9.14436L20.8938 10.6715C21.0344 11.5499 21.036 12.4449 20.8985 13.3237H20.9023Z"
                fill="#242528"
              />
            </svg>
            Settings
          </button>
        </div>
      </div>

      {renderContent()}

      {/* Settings Modal */}
      <Modal
        open={settingsModalOpen}
        onCancel={() => setSettingsModalOpen(false)}
        footer={null}
        closable={true}
        className="!rounded-2xl !max-w-xl z-50"
        centered
      >
        <SettingsBookingsRules/>
      </Modal>
    </div>
  );
}

export default CalendarManagementPage;
