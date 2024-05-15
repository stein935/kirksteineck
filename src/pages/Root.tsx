import "@fontsource/ubuntu";
import "@fontsource/ubuntu-mono";
import "@fontsource/merriweather";
import "@fontsource/alfa-slab-one";
import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <>
      <div className="space-y-4">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
