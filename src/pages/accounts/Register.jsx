import { useEffect, useState } from "react";
import { register } from "@/utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/storage/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const Register = () => {
  const [strength, setStrength] = useState("");
  const strengthLabels = ["weak", "medium", "strong"];
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  //   check streggth
  const getStrength = (password) => {
    let strengthIndicator = -1,
      upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      const char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }
      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }
      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }
    setStrength(strengthLabels[strengthIndicator]);
  };

  // Form validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Your password is too short.")
      .required("Required"),
    re_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const onSubmit = async (values) => {
    setSubmitted(false);
    setLoading(true);

    try {
      const response = await register(
        values.email,
        values.password,
        values.re_password
      );

      if (response.status === 201) {
        toast.success("Your account has been created successfully!");

        navigate("/activate");
      }
    } catch(error) {
      if (error.response.status === 400) {
        Object.keys(error.response.data).forEach((field) => {
          error.response.data[field].forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Registration failed!");
      }
    }finally{
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      re_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handlePasswordChange = (event) => {
    formik.handleChange(event);
    getStrength(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:h-screen place-items-center px-6 py-8 bg-gradient-to-r from-red-500 to-red-600">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-500 py-4 mb-4">
          Create your account &#x1F44F;
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            formik.handleSubmit();
          }}
          className="space-y-4 md:space-y-6"
          method="post"
        >
          <div className="mb-4">
            <Input
              id="email"
              name="email"
              type="email"
              className="form-style"
              placeholder="example@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {submitted && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <PasswordInput
              id="password"
              name="password"
              className="form-style"
              placeholder="********"
              value={formik.values.password}
              onChange={handlePasswordChange}
              showPassword={showPassword}
              togglePassword={togglePassword}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />

            {focused && formik.values.password && (
              <div>
                <div className={`bars ${strength}`}>
                  <div></div>
                </div>
                <div className="strength">
                  {strength && <>{strength} password</>}
                </div>
              </div>
            )}

            {submitted && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-4">
            <PasswordInput
              id="re_password"
              name="re_password"
              className="form-style"
              placeholder="********"
              value={formik.values.re_password}
              onChange={formik.handleChange}
              showPassword={showPassword}
              togglePassword={togglePassword}
            />

            {submitted && formik.errors.re_password && (
              <div className="text-red-500 text-sm">
                {formik.errors.re_password}
              </div>
            )}
          </div>

          <Button text="Register" type="submit" disabled={loading} />

          <div className="flex justify-between">
            <Link to="/login">
              <p className="text-gray-600 text-sm">Have an account?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
