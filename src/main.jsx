import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./theme-variables.css";

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
  cssVar: true,
  token: {
    colorPrimary: "#866be7",
    borderRadius: "var(--border-radius)",
    fontFamily: '"Golos Text", sans-serif',
  },
  components: {
    Segmented: {
      itemSelectedBg: "var(--selected-bg)",
      itemHoverBg: "var(--hover-bg)",
      itemSelectedColor: "var(--item-selected-color)",
      itemActiveBg: "#ffff",
      trackBg: "#fff",
      itemColor: "#000",
      trackPadding: "var(--track-padding)",
    },
    Button: {
      colorPrimary: "#866be7",
      colorPrimaryHover: "#866be7",
      colorPrimaryActive: "#866be7",
      defaultBg: "#fff",
      defaultActiveColor: "#fff",
      colorPrimaryText: "#fff",
      borderRadius: "var(--border-radius)",
    },
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
