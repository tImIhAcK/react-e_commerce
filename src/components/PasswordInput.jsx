import PropTypes from "prop-types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

const PasswordInput = ({
  id,
  name,
  className,
  placeholder,
  spellCheck,
  value,
  onChange,
  showPassword,
  togglePassword,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="relative">
      <FiLock className="auth-icon" />
      <input
        id={id}
        name={name}
        className={className}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        spellCheck={spellCheck}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showPassword ? (
        <FiEye
          className="absolute right-3 top-3 text-gray-400 hover:cursor-pointer"
          onClick={togglePassword}
        />
      ) : (
        <FiEyeOff
          className="absolute right-3 top-3 text-gray-400 hover:cursor-pointer"
          onClick={togglePassword}
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showPassword: PropTypes.bool,
  togglePassword: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default PasswordInput;