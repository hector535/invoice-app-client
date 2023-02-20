import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/navbar";

import style from "./layout.module.scss";

export const Layout = () => {
  return (
    <>
      <Navbar className={style.nav} />
      <Outlet />
    </>
  );
};
