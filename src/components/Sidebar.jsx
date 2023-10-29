import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { SidebarContext } from "@/contexts/SidebarContext";

const CategoryLink = ({ to, name }) => (
  <li>
    <Link to={to} className="text-white flex items-center space-x-2">
      <IoMdArrowForward className="text-lg" />
      {name}
    </Link>
  </li>
);

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const [priceRange, setPriceRange] = useState(50);

  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home Decor" },
    // Add more categories here
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-full bg-red-500 fixed top-0 h-full shadow-lg md:w-[20vw] xl:w-[15vw] transition-transform duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="h-full flex flex-col justify-between pt-[40px]">
        <div className="overflow-y-auto flex-1 px-4 py-16">
          <div>
            <div className="text-white text-xl font-semibold mb-6 border-b">
              Product Categories
            </div>

            <ul className="space-y-3">
              {categories.map((category) => (
                <CategoryLink
                  key={category.id}
                  to={`/category/${category.name.toLowerCase()}`}
                  name={category.name}
                />
              ))}
            </ul>
          </div>

          <div className="pt-12">
            <div className="text-white text-xl font-semibold mb-6 border-b">
              Filters
            </div>

            <div className="mb-6">
              <label className="text-white">Price Range: ${priceRange}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Add more filter options here as needed */}
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 px-4 py-y">
        <button
          onClick={handleClose}
          className="text-white text-xl font-semibold hover:text-blue-500 focus:outline-none mb-6"
        >
          Close
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
