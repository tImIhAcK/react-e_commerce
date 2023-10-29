import PropTypes from "prop-types";
import { FiUser, FiMail } from "react-icons/fi";

const Input = ({
  id,
  name,
  className,
  type = "text",
  placeholder,
  spellCheck,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      {name === "email" ? (
        <FiMail className="auth-icon" />
      ) : (
        <FiUser className="auth-icon" />
      )}

      <input
        id={id}
        name={name}
        className={className}
        type={type}
        placeholder={placeholder}
        spellCheck={spellCheck}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;