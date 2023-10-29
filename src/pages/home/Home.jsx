// import { Link } from "react-router-dom";
import { useAuthStore } from "@/storage/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Product from "@/components/Product";
import Footer from "@/components/Footer";

const Home = () => {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar className="hidden md:block md:w-64" />
      <div className="flex-1 overflow-y-auto">
        <Navbar
          isLoggedIn={isLoggedIn()}
          user={user}
          bgColor={""}
          linkColor={"hover:text-red-500"}
        />
        <Header />
        <main className="container mx-auto px-4">
          <Product maxProductToShow={5} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
