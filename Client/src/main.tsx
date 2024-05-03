import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root from "./routes/root";

// Routes
import Home from './routes/Home/Home';
import Photography from './routes/Photography/Photography';

// Admin Routes
import Admin from './routes/Admin/Admin/Admin.tsx';
import Dashboard from './routes/Admin/Dashboard/Dashboard.tsx';
import Upload from './routes/Admin/Upload/Upload.tsx';
import CollectionsPanel from './routes/Admin/Collections/CollectionsPanel.tsx';
import AlbumsPanel from './routes/Admin/Albums/AlbumsPanel.tsx';


// Error page
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "home",
        element: <Home/>,
      },
      {
        path: "photography",
        element: <Photography/>,
      },
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
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
