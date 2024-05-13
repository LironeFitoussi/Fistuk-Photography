import { lazy, Suspense } from 'react';

import 'globalthis/auto';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root from "./routes/root";

// Routes

const Home = lazy(() => import('./routes/Home/Home'));
const Photography = lazy(() => import('./routes/Photography/Photography'));

// Photography Routes
const Collection = lazy(() => import('./routes/Photography/Collection/Collection'));
const Album = lazy(() => import('./routes/Photography/Album/Album'));

// Admin Routes
const Admin = lazy(() => import('./routes/Admin/Admin/Admin.tsx'));
const Dashboard = lazy(() => import('./routes/Admin/Dashboard/Dashboard.tsx'));
const Upload = lazy(() => import('./routes/Admin/Upload/Upload.tsx'));
const CollectionsPanel = lazy(() => import('./routes/Admin/Collections/CollectionsPanel.tsx'));
const AlbumsPanel = lazy(() => import('./routes/Admin/Albums/AlbumsPanel.tsx'));

// Development Routes
const Development = lazy(() => import('./routes/Development/Development/Development.tsx'));

// Error page
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      // Home
      {
        path: "/",
        element: <Home/>,
      },
      // Photography
      {
        path: "photography",
        element: <Photography/>,
      },
      {
        path: "collections/:collectionId",
        element: <Collection/>,
      },
      {
        path: "albums/:albumId",
        element: <Album/>,
      },

      // Admin
      {
        path: 'admin',
        element: <Admin/>,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard/>,
          },
          {
            path: 'upload',
            element: <Upload/>,
          },
          {
            path: 'collections',
            element: <CollectionsPanel/>,
          },
          {
            path: 'albums',
            element: <AlbumsPanel/>,
          },
        ]
      },

      // Development
      {
        path: "development",
        element: <Development/>,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Suspense fallback={<div>Loading...</div>}>
     <RouterProvider router={router}/>
    </Suspense>
)
