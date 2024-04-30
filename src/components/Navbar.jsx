"use client";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const [showMenu, SetShowMenu] = useState(false);

  const handleShowMenu = () => {
    SetShowMenu(!showMenu);
  };

  const pathname = usePathname();

  return (
    <header>
      <Link href="/" className="title-link">
        Paladins Tracker
      </Link>
      <nav className={`navbar ${showMenu ? "showmenu" : "hidemenu"}`}>
        <ul className="navbar__content">
          <li>
            <Link
              href="/"
              className={pathname == "/" ? "active" : ""}
              onClick={handleShowMenu}
            >
              Accueil
            </Link>
          </li>
          {/* <li>
            <Link href="/updates" className="link" onClick={handleShowMenu}>
              Updates
            </Link>
          </li> */}
          <li>
            <Link href="/champions" className={pathname == "/champions" ? "active" : ""} onClick={handleShowMenu}>
              Champions
            </Link>
          </li>

          <li>
            <Link
              href="/tierlist"
              className={pathname == "/tierlist" ? "active" : ""}
              onClick={handleShowMenu}
            >
              TierList
            </Link>
          </li>
          <li>
            <Link href="/tracker" className={pathname == "/tracker" ? "active" : ""}onClick={handleShowMenu}>
              Tracker
            </Link>
          </li>
        </ul>
        <button className="navbar__burger" onClick={handleShowMenu}>
          <span className="navbar-bar"></span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
