import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout/layout";

const InvoiceDetailsPage = React.lazy(
  () => import("@/pages/invoice-details-page/invoice-details-page")
);

const InvoicesPage = React.lazy(
  () => import("@/pages/invoices-page/invoices-page")
);

const InvoicePage = React.lazy(
  () => import("@/pages/invoice-page/invoice-page")
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <InvoicesPage />,
        },
        {
          path: "/:id",
          element: <InvoiceDetailsPage />,
        },
        {
          path: "/new",
          element: <InvoicePage />,
        },
        {
          path: "/:id/edit",
          element: <InvoicePage />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
