import React, { useState, useEffect } from "react";
import logo from "../../Images/logo s2y.svg";
import fbLogo from "../../Images/facebook.svg";
import googleLogo from "../../Images/google.svg";
import { useFormik, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { path_url } from "../../config/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

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
        const response = await axios.post(`${path_url}/login`, values, {withCredentials: true});

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
    <div className="content">
      <Link to={"/"}>
      <div className="content-header">
      
       <div className="logo-img">
        <img src={logo} alt="" />
       </div>
       <span className="logo-heading">Shop2Day</span>
       
      </div>
      </Link>
      <div className="content-body">
        <div className="card-wrapper">
          <div className="card-header">
            <div className="Login-heading">
              Login
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="card-body">
              <div className="self-stretch  flex-col justify-center items-start gap-4 flex form-content">
                {/* email */}
                <div className="self-stretch  flex-col justify-start items-start gap-1.5 flex ">
                  <div className="text-neutral-700 text-sm font-medium" style={{color: "var(--Black, #262626)",

fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
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
                    <div className="self-stretch grow shrink basis-0 text-neutral-700 text-sm font-medium"style={{color: "var(--Black, #262626)",

fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
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
                      <span className="text-neutral-700 text-xs font-normal"style={{color: "var(--Black, #262626)",

fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
                        Remember Me
                      </span>
                    </div>
                  </div>
                </div>
                {/* main login */}
                <button
                  className="self-stretch px-5 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300 rounded justify-center items-center gap-2.5 inline-flex"
                  type="submit"
                >
                  <div className="text-center text-white text-base font-medium" style={{color: "var(--color-shade-01, #FFF)",
textAlign: "center",

fontFamily: "Montserrat",
fontSize: "18px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
                    Login
                  </div>
                </button>
              </div>
              <div className="self-stretch grow shrink basis-0 justify-center items-center gap-[13px] inline-flex">
                <div className="grow shrink basis-0 h-[0px] border border-neutral-700 border-opacity-70" style={{    borderWidth: "0.1px",}}></div>
                <div className="text-center text-neutral-700 text-opacity-70 text-xs font-medium"style={{color: "var(--Black, #262626)",

fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
                  OR
                </div>
                <div className="grow shrink basis-0 h-[0px] border border-neutral-700 border-opacity-70" style={{    borderWidth: "0.1px",}}></div>
              </div>
              <div className="self-stretch  flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch px-5 py-3 rounded border border-black justify-center items-center gap-2 inline-flex">
                  <div className="w-5 h-5 relative">
                    <img
                      src={googleLogo}
                      className="w-[19.14px] h-[19.56px] left-[0.30px] top-[0.22px] absolute"
                    />
                  </div>
                  <div className="text-center text-neutral-800 text-base font-medium" style={{
fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
                    Login with Google
                  </div>
                </div>
                <div className="self-stretch px-5 py-3 bg-[#3B5998] rounded justify-center items-center gap-2 inline-flex">
                  <div className="w-5 h-5 relative">
                    <img
                      src={fbLogo}
                      className="w-[19.14px] h-[19.56px] left-[0.30px] top-[0.22px] absolute"
                    />
                  </div>
                  <div className="text-center text-white text-base font-medium" style={{color: "var(--color-shade-01, #FFF)",
textAlign: "center",

fontFamily: "Montserrat",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "normal"}}>
                    Login with Facebook
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="card-footer">
            <div className="container">
              <div className="addon">
              <span className="Addon">
                Don't have an account yet?{" "}
              </span>
              <Link to={"/signup"}>
                <span className="blue">
                  SignUp
                </span>
              </Link>
              </div>
              <div className="last-text">
                <span>
                Login signifies your acceptance of our  <span className="blue">Privacy Policy</span>  and <span className="blue"> Terms & Conditions.</span>
                </span>
             
              </div>
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
