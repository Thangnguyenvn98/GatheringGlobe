import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SocketProvider } from "./components/providers/socket-provider.tsx";
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </SocketProvider>
  </React.StrictMode>
);
