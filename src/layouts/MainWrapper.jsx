import { useEffect, useState } from "react";
import { setUser } from "@/utils/auth";
import PropTypes from "prop-types";

const MainWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handler = async () => {
      setLoading(true);
      await setUser();
      setLoading(false);
    };
    handler();
  }, []);

  return <>{loading ? null : children}</>;
};

MainWrapper.propTypes = {
  children: PropTypes.node,
};

export default MainWrapper;
