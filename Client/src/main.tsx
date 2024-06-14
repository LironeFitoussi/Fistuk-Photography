import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';

import Root from "./routes/root";

// Routes

import Home from "./routes/Home/Home";
import Photography from "./routes/Photography/Photography";

// Photography Routes
import Collection from "./routes/Photography/Collection/Collection";
import Album from "./routes/Photography/Album/Album";

// Admin Routes
import Admin from "./routes/Admin/Admin/Admin.tsx";
import Dashboard from "./routes/Admin/Dashboard/Dashboard.tsx";
import Upload from "./routes/Admin/Upload/Upload.tsx";
import CollectionsPanel from "./routes/Admin/Collections/CollectionsPanel.tsx";
import AlbumsPanel from "./routes/Admin/Albums/AlbumsPanel.tsx";

// Development Routes
import Development from "./routes/Development/Development/Development.tsx";

// Error page
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Home
      {
        path: "/",
        element: <Home />,
      },
      // Photography
      {
        path: "photography",
        element: <Photography />,
      },
      {
        path: "collections/:collectionId",
        element: <Collection />,
      },
      {
        path: "albums/:albumId",
        element: <Album />,
      },

      // Admin
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "upload",
            element: <Upload />,
          },
          {
            path: "collections",
            element: <CollectionsPanel />,
          },
          {
            path: "albums",
            element: <AlbumsPanel />,
          },
        ],
      },

      // Development
      {
        path: "development",
        element: <Development />,
        children: [
          {
            path: "test",
            element: <div>Test</div>,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-wiiihf2b73be6pfl.us.auth0.com"
    clientId="OQwRGSX8LmjzFaOTwjKc2qfRFuuBFAJH"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Auth0Provider>
);
