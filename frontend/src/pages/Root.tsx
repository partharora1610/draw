import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="w-[1280px] m-auto">
      <Outlet />
    </main>
  );
};

export default Root;
