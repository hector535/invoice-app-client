import { ReactComponent as MoonIcon } from "@/assets/icon-moon.svg";
import { ReactComponent as SunIcon } from "@/assets/icon-sun.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toggleTheme } from "@/store/ui/ui-slice";

import { classnames } from "@/utility/classnames";
import { useEffect, useState } from "react";
import style from "./navbar.module.scss";

type Props = {
  className?: string;
};

export const Navbar = ({ className }: Props) => {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();

  const navClasses = classnames(style.nav, className);

  const handleToggleClick = () => dispatch(toggleTheme());

  useEffect(() => {
    const lastTheme = theme === "theme-light" ? "theme-dark" : "theme-light";
    document.body.classList.remove(lastTheme);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <nav className={navClasses}>
      <div className={style.logo_container}>
        <img className={style.logo} src="/logo.svg" alt="" />
      </div>

      <div className={style.toggle_avatar_container}>
        {theme === "theme-light" ? (
          <MoonIcon
            className={style.icon_toggler}
            onClick={handleToggleClick}
          />
        ) : (
          <SunIcon className={style.icon_toggler} onClick={handleToggleClick} />
        )}

        <div className={style.divider}></div>
        <img className={style.avatar} src="/image-avatar.jpg" alt="" />
      </div>
    </nav>
  );
};
