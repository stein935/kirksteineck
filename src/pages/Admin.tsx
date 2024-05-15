import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Page } from "../utilities/Loaders";
import firebase from "../utilities/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../components/Button";
import Icon from "../components/Icon";

const Admin = () => {
  const data = useLoaderData() as Page[];
  const params = useParams();
  const [user] = useAuthState(firebase.auth);
  return (
    <>
      <div>
        <div className="text-indigo-90 fixed min-h-screen w-44 overflow-hidden bg-indigo-500">
          {user && (
            <div className="bg-indigo-700 pb-6 pt-10 shadow-xl">
              <div className="px-4 pb-4 font-display text-lg text-white">
                {user.displayName}
              </div>
              <Button
                iconId="ArrowRightStartOnRectangleIcon"
                onClick={firebase.googleLogout}
                className="mx-4"
                size="sm"
              >
                Log out
              </Button>
            </div>
          )}
          {user && user.email === "stein935@gmail.com" && (
            <div className="pt-4">
              <div className="px-4 pb-4 pt-4 font-display text-2xl text-indigo-200">
                Pages
                <Icon
                  variant={"outline"}
                  id="ArrowLongDownIcon"
                  className="inline size-6"
                />
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
          )}
        </div>
        <div className="ml-44">
          <div className="space-y-4 p-10">
            {!user && (
              <>
                <h1>Is that you?</h1>
                <Button
                  iconId="ArrowRightEndOnRectangleIcon"
                  onClick={firebase.signInWithGoogle}
                  size="sm"
                >
                  Login
                </Button>
              </>
            )}
            {user && user.email !== "stein935@gmail.com" && (
              <h1>It ain't you babe ...</h1>
            )}
            {user && user.email === "stein935@gmail.com" && <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
