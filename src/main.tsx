import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import loaders from "./utilities/Loaders";
import Base from "./pages/Base.tsx";
import Root from "./pages/Root.tsx";
import Admin from "./pages/Admin.tsx";
// import Error from "./error.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import EditForm from "./components/EditForm.tsx";
import updateAction from "./utilities/actions/updateAction.tsx";
import EditForm from "./components/EditForm.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          return loaders.pageLoader({ coll: "pages", id: "home" });
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
        loader: async () => {
          return loaders.pagesLoader({ coll: "pages" });
        },
        children: [
          {
            path: "/admin/:page",
            element: <>Not found</>,
          },
          {
            path: "/admin/:page/:area",
            element: <EditForm />,
            loader: async ({ params }) => {
              return loaders.pageLoader({
                coll: "pages",
                id: params.page,
              });
            },
            action: updateAction,
          },
        ],
      },
      {
        path: "/:title",
        element: <Base />,
        loader: async ({ params }) => {
          return loaders.pageLoader({
            coll: "pages",
            id: params.title,
          });
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="prose-md prose prose-stone max-w-none antialiased prose-headings:mt-0 prose-headings:font-serif prose-headings:italic">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
