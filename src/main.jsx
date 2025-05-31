import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// react query components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import StateContextProvider from "./provider/StateContextProvider";
import { store } from "./redux/store";
import { routes } from "./routes/Router";

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
