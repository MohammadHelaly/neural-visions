import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/api/client/query-client";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
