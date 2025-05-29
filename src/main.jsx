import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "/src/styles/fullCalender.css";

// react query components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { routes } from "./routes/Router";
import StateContextProvider from "./provider/StateContextProvider";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Create a client
const queryClient = new QueryClient();

const theme = {
  token: {
    colorPrimary: "#866BE7",
    borderRadius: 6,
    fontFamily: '"Golos Text", sans-serif',
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StateContextProvider>
          <ConfigProvider theme={theme}>
            <RouterProvider router={routes}></RouterProvider>
          </ConfigProvider>
        </StateContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
