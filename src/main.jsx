import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// react query components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { routes } from "./routes/Router";
import StateContextProvider from "./provider/StateContextProvider";


// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
      <RouterProvider router={routes}>

</RouterProvider>
      </StateContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
