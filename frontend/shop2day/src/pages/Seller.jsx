import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { path_url } from "../config/config";
import SellerTable from "./components/sellerTable";

export const PopupForm = ({ onClose }) => {

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
    summary: Yup.string().required("Summary is required"),
    description: Yup.string().required("Description is required"),
    // image: Yup.mixed()
    //   .required("Image is required")
    //   .test("fileSize", "Image size is too large", (value) => {
    //     if (!value) return false;
    //     return value.size <= 1024 * 1024; // Example: Max file size is 1 MB
    //   }),
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        formik.setFieldValue("image", file);
      };

      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      summary: "",
      description: "",
      image: null,
    },
    validationSchema,

    onSubmit: async (data, { setSubmitting }) => {
      data.price = data.price.toString();
      const token = localStorage.getItem("accessToken");

      // another way
      // const formData = new FormData();
      // formData.append("title", data.title);
      // formData.append("price", data.price);
      // formData.append("summary", data.summary);
      // formData.append("description", data.description);
      // formData.append("image", data.image);

      try {
        const response = await axios.post(`${path_url}/seller/products`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="my-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div>
              {formik.errors.title && formik.touched.title && (
                <div className="text-red-500 text-sm">
                  {" "}
                  {formik.errors.title}{" "}
                </div>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="my-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter Price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <div>
              {formik.errors.price && formik.touched.price && (
                <div className="text-red-500 text-sm">
                  {" "}
                  {formik.errors.price}{" "}
                </div>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <input
              type="text"
              name="summary"
              className="my-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter Summary"
              onChange={formik.handleChange}
              value={formik.values.summary}
            />
            <div>
              {formik.errors.summary && formik.touched.summary && (
                <div className="text-red-500 text-sm">
                  {" "}
                  {formik.errors.summary}{" "}
                </div>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="my-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Enter Description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <div>
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-500 text-sm">
                  {" "}
                  {formik.errors.description}{" "}
                </div>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="image"
              className="my-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Upload Image"
              onChange={handleImageChange}
              // value={formik.values.image}
            />
            <div>
              {formik.errors.image && formik.touched.image && (
                <div className="text-red-500 text-sm">
                  {" "}
                  {formik.errors.image}{" "}
                </div>
              )}
            </div>
            {image && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">
                  Image Preview:
                </p>
                <img
                  src={image}
                  alt="Preview"
                  className="w-32 h-32 mt-2 rounded"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Seller = () => {
  const [showPopup, setShowPopup] = useState(false);

  const popupHandler = (show) => {
    setShowPopup(show);
  };

  const[sellerData, setSellerData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  const fetchSellerProduct = async () => {
    try {
      const response = await axios.get(`${path_url}/seller/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSellerData(response?.data?.products);
      // console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(sellerData);

  return (
    <div className="sm:px-6 w-full">
      {/* heading */}
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p
            tabIndex="0"
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Your Product List
          </p>
          <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
            <p>Sort By:</p>
            <select
              aria-label="select"
              className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
            >
              <option className="text-sm text-indigo-800">Latest</option>
              <option className="text-sm text-indigo-800">Oldest</option>
              <option className="text-sm text-indigo-800">Latest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        {/* table head */}
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
            >
              <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                <p>All</p>
              </div>
            </div>
            <div
              className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
            >
              <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                <p>Done</p>
              </div>
            </div>
            <div
              className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
            >
              <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                <p>Pending</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => popupHandler(true)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Add Product
            </p>
          </button>
          {showPopup && <PopupForm onClose={popupHandler} />}
        </div>
        {/* table body */}
        <div className="mt-7 overflow-x-auto">
          {
            sellerData.map((res)=>(
              <SellerTable key={res.id} {...res} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Seller;
