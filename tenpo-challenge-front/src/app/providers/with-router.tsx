import { ProtectedRoute } from "@processes/auth/session-guard/ui/ProtectedRoute";
import { PublicRoute } from "@processes/auth/session-guard/ui/PublicRoute";
import { MainLayout } from "@widgets/main-layout/ui/MainLayout";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const DashboardPage = React.lazy(() => import("@pages/dashboard"));
const LoginPage = lazy(() => import("@pages/login"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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

export const WithRouter = () => <RouterProvider router={router} />;
