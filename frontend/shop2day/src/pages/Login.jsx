import React, { useState, useEffect } from "react";
import logo from "../Images/logo s2y.svg";
import fbLogo from "../Images/facebook.svg";
import googleLogo from "../Images/google.svg";
import { useFormik, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { path_url } from "..//../src/config/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),

    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const [isLogin, setIsLogin] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${path_url}/login`, values);

        if (response.status === 200) {
          console.log(response);
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("user", response.data.user._id);
          localStorage.setItem("role", response.data.user.role);

          toast.success("Login Succesfully");
          setIsLogin(true);
        } else {
          toast.error(error.response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isLogin) {
      const redirectTimer = setTimeout(() => {
        return (localStorage.getItem("role") == "seller") ? navigate("/seller", { replace: true }) : navigate("/", { replace: true });
      }, 3000);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [isLogin, navigate]);

  return (
    <div className="w-screen px-[500px] pt-10 pb-[148.75px] bg-slate-100 flex-col justify-start items-center gap-12 inline-flex">
      <div className="w-[203.22px] h-9 relative">
        <Link to={"/"}>
          <div className="origin-top-left w-[30.64px] h-9 top-0 absolute">
            <img src={logo} />
          </div>
          <div
            className="w-[159.88px] h-9 left-[43.34px] top-0 absolute text-[28px] font-semibold tracking-wide"
            style={{
              background:
                "linear-gradient(151deg, #7B61FF 0%, #2196F3 53.74%, #77CFFD 95.98%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shop2Day
          </div>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full self-stretch px-12 py-10 bg-white rounded shadow flex-col justify-start items-start gap-4 inline-flex">
          <div className="overflow-visible">
            <div className="text-zinc-900 text-[28px] font-semibold tracking-wide">
              Login
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch  flex-col justify-center items-start gap-4 flex">
                {/* email */}
                <div className="self-stretch  flex-col justify-start items-start gap-1.5 flex ">
                  <div className="text-neutral-700 text-sm font-medium">
                    Email
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className={`self-stretch p-2 bg-white rounded border border-zinc-500 justify-start items-center gap-2.5 inline-flex ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
                {/* password */}
                <div className="self-stretch  flex-col justify-center items-start flex ">
                  <div className="self-stretch  flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch grow shrink basis-0 text-neutral-700 text-sm font-medium">
                      Password
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="At Least 8 Characters"
                      className={`self-stretch p-2 bg-white rounded border border-zinc-500 justify-start items-center gap-2.5 inline-flex ${
                        formik.errors.password && formik.touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
                <div className="pr-px justify-center items-center inline-flex">
                  <div className="self-stretch justify-start items-start gap-[9px] inline-flex">
                    <div className="w-[17px] h-[17px] relative">
                      {/* checkbox */}
                      <label>
                        <input
                          type="checkbox"
                          name="toggle"
                          className="w-[17px] h-[17px] left-0 top-1 absolute rounded-md border border-zinc-500"
                        />
                      </label>
                    </div>
                    <div>
                      <span className="text-neutral-700 text-xs font-normal">
                        Remember Me
                      </span>
                    </div>
                  </div>
                </div>
                {/* main login */}
                <button
                  className="self-stretch px-5 py-3 bg-orange-500 rounded justify-center items-center gap-2.5 inline-flex"
                  type="submit"
                >
                  <div className="text-center text-white text-base font-medium">
                    Login
                  </div>
                </button>
              </div>
              <div className="self-stretch grow shrink basis-0 justify-center items-center gap-[13px] inline-flex">
                <div className="grow shrink basis-0 h-[0px] border border-neutral-700 border-opacity-70"></div>
                <div className="text-center text-neutral-700 text-opacity-70 text-xs font-medium">
                  OR
                </div>
                <div className="grow shrink basis-0 h-[0px] border border-neutral-700 border-opacity-70"></div>
              </div>
              <div className="self-stretch  flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch px-5 py-3 rounded border border-black justify-center items-center gap-2 inline-flex">
                  <div className="w-5 h-5 relative">
                    <img
                      src={googleLogo}
                      className="w-[19.14px] h-[19.56px] left-[0.30px] top-[0.22px] absolute"
                    />
                  </div>
                  <div className="text-center text-neutral-800 text-base font-medium">
                    Sign up with Google
                  </div>
                </div>
                <div className="self-stretch px-5 py-3 bg-[#3B5998] rounded justify-center items-center gap-2 inline-flex">
                  <div className="w-5 h-5 relative">
                    <img
                      src={fbLogo}
                      className="w-[19.14px] h-[19.56px] left-[0.30px] top-[0.22px] absolute"
                    />
                  </div>
                  <div className="text-center text-white text-base font-medium">
                    Sign up with Facebook
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="self-stretch  flex-col justify-center items-start gap-2 flex">
            <div className="text-center">
              <span className="text-neutral-700 text-xs font-normal">
                Don't have an account yet?{" "}
              </span>
              <Link to={"/signup"}>
                <span className="text-blue-600 text-xs font-medium">
                  SignUp
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
