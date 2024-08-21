import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

// Importing components
import Root from "./routes/root";

// Lazy load routes if necessary
const Home = lazy(() => import("./routes/Home/Home"));
const Photography = lazy(() => import("./routes/Photography/Photography"));
const Collection = lazy(
  () => import("./routes/Photography/Collection/Collection")
);
const Album = lazy(() => import("./routes/Photography/Album/Album"));
const Admin = lazy(() => import("./routes/Admin/Admin/Admin.tsx"));
const Dashboard = lazy(() => import("./routes/Admin/Dashboard/Dashboard.tsx"));
const Upload = lazy(() => import("./routes/Admin/Upload/Upload.tsx"));
const CollectionsPanel = lazy(
  () => import("./routes/Admin/Collections/CollectionsPanel.tsx")
);
const AlbumsPanel = lazy(() => import("./routes/Admin/Albums/AlbumsPanel.tsx"));
const Development = lazy(
  () => import("./routes/Development/Development/Development.tsx")
);
const Articles = lazy(() => import("./routes/Articles/Articles.tsx"));
const Article = lazy(() => import("./routes/Articles/Article/Article.tsx"));
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
      {
        path: "articles",
        element: <Articles />,
        children: [
          {
            path: "article/:articleId",
            element: <Article />,
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
