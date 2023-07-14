import React, { useState } from "react";
import logo from "../Images/Group 3245.svg";
import { useFormik, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { path_url } from "..//../src/config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .min(10, "Number must be at least 10 Number")
      .max(10, "Number must be at least 10 Number"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),

    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });
  const [role, setRole] = useState("");
  const handleRoleChange = (event) => {
    console.log(event);
    const isChecked = event.target.checked;
    console.log(isChecked);
    setRole(isChecked ? "seller":"customer" );
    console.log(role);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      mobile: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      values.role = role;
      try {
        const response = await axios.post(`${path_url}/signup`, values);

        if (response.data.statusCodeValue === 200) {
          navigate("/log-in");
        } else {
          toast.error(response.data.body);
        }
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  return (
    <div className="w-screen px-[500px] pt-10 pb-[148.75px] bg-white flex-col justify-start items-center gap-12 inline-flex">
      <div className="w-[203.22px] h-9 relative">
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
      </div>
      <div className="w-screen flex justify-center items-center">
      <div className="self-stretch  px-12 py-10 bg-white rounded shadow flex-col justify-start items-start gap-4 inline-flex">
      <div className="overflow-visible">
      <div className="text-zinc-900 text-[28px] font-semibold tracking-wide">
          Sign Up
        </div>
      </div>
        
        <form onSubmit={formik.handleSubmit}>
        <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
            <div className="self-stretch  flex-col justify-center items-start gap-4 flex">
              {/* name */}
              <div className="self-stretch  flex-col justify-start items-start gap-1.5 flex ">
                <div className="text-neutral-700 text-sm font-medium">Name</div>
                <input
                  id="fullname"
                  name="fullname"
                  placeholder="First and Last Name"
                  className={`self-stretch p-2 bg-white rounded border border-zinc-500 justify-start items-center gap-2.5 inline-flex ${
                    formik.errors.fullname && formik.touched.fullname
                      ? "border-red-500"
                      : ""
                  }`}
                    
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                
                {/* <div></div> */}
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
    <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
  )}
              {/* mobile */}
              <div className="self-stretch  flex-col justify-start items-start gap-1.5 flex ">
                <div className="text-neutral-700 text-sm font-medium">
                  Mobile Number
                </div>
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  placeholder="Mobile Number"
                  className={`self-stretch p-2 bg-white rounded border border-zinc-500 justify-start items-center gap-2.5 inline-flex ${
                    formik.errors.mobile && formik.touched.mobile
                      ? "border-red-500"
                      : ""
                  }`}
                    
                  style={{
                    WebkitAppearance: "none", // For Chrome, Safari, and Opera
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                />
              </div>
               {formik.errors.mobile && formik.touched.mobile&& (
    <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
  )}
              {/* email */}
              <div className="self-stretch  flex-col justify-start items-start gap-1.5 flex ">
                <div className="text-neutral-700 text-sm font-medium">
                  Email
                </div>
                {/* <div className="self-stretch p-2 bg-white rounded border border-zinc-500 justify-start items-center gap-2.5 inline-flex">
                <div className="text-zinc-500 text-xs font-normal">
                  Email Address
                </div>
              </div> */}
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
    <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
              {formik.errors.password && formik.touched.password&& (
    <div className="text-red-500 text-sm">{formik.errors.password}</div>
  )}
              <div className="pr-px justify-center items-center inline-flex">
                <div className="self-stretch justify-start items-start gap-[9px] inline-flex">
                  <div className="w-[17px] h-[17px] relative">
                    {/* <div className="w-[17px] h-[17px] left-0 top-0 absolute rounded-md border border-zinc-500" /> */}
                    {/* checkbox */}
                    <label>
                      <input
                        type="checkbox"
                        name="toggle"
                        className="w-[17px] h-[17px] left-0 top-1 absolute rounded-md border border-zinc-500"
                        onChange={handleRoleChange}
                      />
                    </label>
                  </div>
                  <div>
                    <span className="text-neutral-700 text-xs font-normal">
                      If you are a{" "}
                    </span>
                    <span className="text-blue-600 text-xs font-medium">
                      Seller.
                    </span>
                    <span className="text-neutral-700 text-xs font-normal">
                      {" "}
                      Please{" "}
                    </span>
                    <span className="text-blue-600 text-xs font-medium">
                      check this box.
                    </span>
                  </div>
                </div>
              </div>
              {/* main signup */}
              <div className="self-stretch px-5 py-3 bg-orange-500 rounded justify-center items-center gap-2.5 inline-flex">
                <button className="text-center text-white text-base font-medium" type ="submit">
                  Sign Up
                </button>
              </div>
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
                  <div className="w-[19.14px] h-[19.56px] left-[0.30px] top-[0.22px] absolute"></div>
                </div>
                <div className="text-center text-neutral-800 text-base font-medium">
                  Sign up with Google
                </div>
              </div>
              <div className="self-stretch px-5 py-3 bg-indigo-800 rounded justify-center items-center gap-2 inline-flex">
                <div className="w-5 h-5 relative" />
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
              Do you already have an account?{" "}
            </span>
            <span className="text-blue-600 text-xs font-medium">Login</span>
          </div>
        </div>
      </div>
</div>
      
    </div>
  );
};

export default SignUp;
