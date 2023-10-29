import { useState, useEffect, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  // FaUser,
  // FaSignOutAlt,
} from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext";
import { SidebarContext } from "@/contexts/SidebarContext";
import PropTypes from "prop-types";

const Navbar = ({ isLoggedIn, user, bgColor, linkColor }) => {
  const [sticky, setSticky] = useState(false);
  const [nav, setNav] = useState(false);
  const { itemCount } = useContext(CartContext);
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const links = isLoggedIn
    ? [
        { id: 1, title: "Home", path: "home" },
        { id: 2, title: "Shop", path: "shop" },
        // { id: 3, title: "Profile", path: "profile" },
        { id: 4, title: "Logout", path: "logout" },
      ]
    : [
        { id: 1, title: "Home", path: "home" },
        { id: 2, title: "Shop", path: "shop" },
        { id: 3, title: "Login", path: "login" },
        { id: 4, title: "Register", path: "register" },
      ];

  return (
    <div
      className={`fixed top-0 z-50 w-full ${
        sticky ? "bg-red-500 text-white shadow-md" : `${bgColor}`
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-3">
        <Link to="/" className="flex items-center">
          <h2 className="text-2xl font-semibold ml-2">E-Commerce</h2>
        </Link>
        <nav className="md:flex hidden p-2 font-medium space-x-12">
          <ul className="flex items-center gap-4 text-lg">
            {links.map(({ id, title, path }) => (
              <li
                key={id}
                className={`"cursor-pointer capitalize ${
                  sticky ? "hover:text-black" : `${linkColor}`
                } hover:scale-105 transition duration-200"`}
              >
                <Link to={`/${path}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4 gap-6">
          {isLoggedIn && (
            <>
              <Link to="/profile">
                <img
                  src={user.email}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            </>
          )}
          <button className="relative cursor-pointer text-white hover:text-blue-500 transition">
            <Link to="/cart">
              <FaShoppingCart className="w-8 h-8" />
              {isLoggedIn && itemCount > 0 && (
                <span className="absolute -top-1 -right-5 bg-red-500 text-white rounded-full w-6 h-6 text-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-white hover:text-blue-500 transition"
          >
            <BsBag className="w-8 h-8" />
          </button>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className={`cursor-pointer z-50 ${
            nav ? "text-blue-500" : "text-white"
          } md:hidden text-3xl m-4`}
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <div
            className={`md:hidden w-2/3 h-screen p-4 bg-red-500 fixed top-0 right-0 duration-300 ${
              nav ? "right-0" : "right-[-100%]"
            }`}
          >
            <ul className="flex flex-col justify-center items-center gap-6 h-full">
              {links.map(({ id, title, path }) => (
                <li
                  key={id}
                  className="cursor-pointer capitalize text-3xl py-4 hover:text-blue-500"
                >
                  <Link to={`/${path}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.func,
  bgColor: PropTypes.string,
  linkColor: PropTypes.string,
};

export default Navbar;
