import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Page } from "../utilities/Loaders";
// import * as Form from "../components/form";

const Admin = () => {
  const data = useLoaderData() as Page[];
  const params = useParams();
  return (
    <>
      <div>
        <div className="text-indigo-90 fixed min-h-screen w-44 bg-indigo-500 py-6">
          <div className="px-4 py-4 font-display text-3xl text-indigo-900">
            Admin
          </div>
          <div className="border-b border-indigo-400">
            {data.map((page) => {
              return (
                <NavLink
                  to={`${page.title}/main`}
                  className={() =>
                    params.page === page.title
                      ? "not-prose bg-indigo-700"
                      : "not-prose"
                  }
                  key={page.title}
                >
                  <div className="not-prose no-underlinev w-full border-t border-indigo-400 bg-inherit px-4 py-2 text-white">
                    {page.title}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="ml-44">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
