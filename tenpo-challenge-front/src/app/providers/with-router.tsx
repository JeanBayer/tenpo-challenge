import MainLayout from "@/pages/layout/MainLayout";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const DashboardPage = React.lazy(() => import("@/pages/dashboard"));
const LoginPage = lazy(() => import("@/pages/login"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const withRouter = (component: () => React.ReactNode) => () =>
  <RouterProvider router={router} />;
