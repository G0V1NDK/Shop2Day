import React, { useState } from "react";
import { path_url } from "../../config/config";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

// update form
export const PopupForm = ({ onClose ,seller}) => {

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
  console.log(seller);

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
      title: seller.title,
      price: seller.price,
      summary: seller.summary,
      description: seller.description,
      image: null,
    },
    validationSchema,

    onSubmit: async (data, { setSubmitting }) => {
      data.price = data.price.toString();
      console.log(data);
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.post(`${path_url}/seller/products/${seller.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
          withCredentials: true
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

const SellerTable = ({
  id,
  title,
  imageUrl,
  price,
  summary,
  description,
  image,
}) => {
  const token = localStorage.getItem("accessToken");
const [seller,setSeller] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const popupHandler = (show) => {
    setShowPopup(show);
    setSeller({
      id,
      title,
      imageUrl,
      price,
      summary,
      description,
      image,
    });
  };

  const handleDelete = async () => {
    try {
      const deleteProduct = await axios.delete(
        `${path_url}/seller/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(deleteProduct);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <table className="w-full whitespace-nowrap">
      <tbody>
        <tr
          tabIndex="0"
          className="focus:outline-none h-16 border border-gray-100 rounded"
        >
          {/* image */}
          <td>
            <div className="ml-5">
              <div className="bg-gray-200 rounded-sm w-8 flex flex-shrink-0 justify-center items-center relative">
                <img src={path_url + imageUrl} />
              </div>
            </div>
          </td>
          {/* product name */}
          <td className="">
            <div className="flex items-center">
              <p className="text-base font-medium leading-none text-gray-700">
                {title}
              </p>
            </div>
          </td>
          {/* price */}
          <td className="">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                  stroke="#52525B"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="7.50004"
                  cy="7.49967"
                  r="1.66667"
                  stroke="#52525B"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
              <p className="text-sm leading-none text-gray-600 ml-2">
                ₹{price}
              </p>
            </div>
          </td>
          {/* in stock */}
          <td className="">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                  stroke="#52525B"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p className="text-sm leading-none text-gray-600 ml-2">
                In Stock
              </p>
            </div>
          </td>
          {/* delete */}
          <td className="">
            <button
              className="py-3 px-3 text-sm focus:ring-red-100  focus:ring-offset-2 focus:outline-none leading-none text-red-700 bg-red-100 hover:bg-red-300  rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
          {/* edit */}
          <td className="">
            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => popupHandler(true)}
            >
              Edit
            </button>
            {showPopup && <PopupForm onClose={popupHandler} seller= {seller} />}
          </td>
          {/* .... */}
          {/* <td>
              <div className="relative px-5 pt-2">
                <button
                  className="focus:ring-2 rounded-md focus:outline-none"
                  onclick="dropdownFunction(this)"
                  role="button"
                  aria-label="option"
                >
                  <svg
                    className="dropbtn"
                    onclick="dropdownFunction(this)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                      stroke="#9CA3AF"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                      stroke="#9CA3AF"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                      stroke="#9CA3AF"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                  <div
                    tabIndex="0"
                    className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                  >
                    <p>Edit</p>
                  </div>
                  <div
                    tabIndex="0"
                    className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                  >
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </td> */}
        </tr>
      </tbody>
    </table>
  );
};

export default SellerTable;
