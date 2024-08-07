// import PropTypes from "prop-types";
import heroImage from "@/assets/heroImage1.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="bg-red-200 h-[600px] py-24">
      <div className="container mx-auto flex justify-between h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>Latest
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            ELEVATE YOUR LIFESTYLE WITH
            <br />
            <span className="font-semibold">TECHNOLOGY</span>
          </h1>
          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 border-primary-950"
          >
            Get Your Gadgets
          </Link>
        </div>
        <div className="hidden lg:block justify-center w-[800px] h-auto object-cover">
          <img src={heroImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Header;
