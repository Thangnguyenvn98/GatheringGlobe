import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SocketProvider } from "./components/providers/socket-provider.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
          <App />
      </QueryClientProvider>
    </SocketProvider>
  </React.StrictMode>
);
