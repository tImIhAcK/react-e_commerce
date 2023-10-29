import { useEffect, useState } from "react";
import { login, setAuthUser } from "@/utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/storage/auth";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Form validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setSubmitted(false);

    try {
      const response = await login(values.email, values.password);
      if (response.status === 200) {
        setAuthUser(response.data.access, response.data.refresh);
        console.log(user());
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        Object.keys(error.response.data).forEach((field) => {
          error.response.data[field].forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Login failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="grid grid-cols-1 gap-4 h-screen place-items-center px-6 py-8 bg-gradient-to-r from-red-500 to-red-600">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl py-4 font-bold text-red-500 mb-4">
          Welcome back
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
              placeholder="email"
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
              onChange={formik.handleChange}
              showPassword={showPassword}
              togglePassword={togglePassword}
            />

            {submitted && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <Button text="Login" type="submit" disabled={loading} />

          <div className="flex justify-between">
            <Link to="/forgot-password">
              <p className="text-gray-600 text-sm">Forgot Password?</p>
            </Link>

            <Link to="/register">
              <p className="text-gray-600 text-sm">Not Registered?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
