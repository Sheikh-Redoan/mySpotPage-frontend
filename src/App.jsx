import "./index.css";
import "./theme-variables.css";

// react query components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import StateContextProvider from "./provider/StateContextProvider";
import { selectLanguage } from "./redux/features/languageSlice";
import { routes } from "./routes/Router";

// Create a client
const queryClient = new QueryClient();

const theme = {
  cssVar: true,
  token: {
    colorPrimary: "#866be7",
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

const translations = {
  locale: "en",
};

export default function App() {
  const language = useSelector(selectLanguage);

  return (
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <ConfigProvider
          theme={theme}
          locale={language.languageCode}
          direction={language.direction}>
          {/* Use the useTranslate hook to access translation functions */}
          <RouterProvider router={routes}></RouterProvider>
        </ConfigProvider>
      </StateContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
