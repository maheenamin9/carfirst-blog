import React, { useState } from "react";
import "./userForm.css";
import Button from "../UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import GoogleLoginCom from "./GoogleLogin";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  // formik form
  const formikObj = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // authenticating from database
      try {
        const response = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.status === 200) {
          dispatch(authActions.signin(await response.json())); // storing token that comes from res.send into redux store
          navigate("/");
        } else {
          // status == 400
          setError(await response.text());
        }
      } catch (err) {
        console.log(err.message);
      }
      resetForm({ values: "" });

      // authenticating from local storage
      // let array = JSON.parse(localStorage.getItem("userFormData"));
      // console.log(array);
      // let authStatus = false;
      // if (array !== null) {
      //   array.map((item) => {
      //     if (values.email === item.email && values.password === item.password) {
      //       dispatch(authActions.signin());
      //       navigate("/home");
      //       authStatus = true;
      //       return;
      //     }
      //   });
      // }
      // // notify();
      // setError(true);
      // resetForm({ values: "" });
    },
  });

  return (
    <div className="formContainer">
      <div className="formCard">
        <h3 className="heading">Sign In</h3>
        <form className="userForm" onSubmit={formikObj.handleSubmit}>
          <label className="userLabel" htmlFor="email">
            Email:
          </label>
          <input
            className="userInput"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formikObj.values.email}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
          />
          {formikObj.touched.email && formikObj.errors.email ? (
            <p className="errorPara">{formikObj.errors.email}</p>
          ) : null}
          <label className="userLabel" htmlFor="password">
            Password:
          </label>
          <input
            className="userInput"
            type="password"
            name="password"
            placeholder="Password"
            value={formikObj.values.password}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
          />
          {formikObj.touched.password && formikObj.errors.password ? (
            <p className="errorPara">{formikObj.errors.password}</p>
          ) : null}
          <div className={`text-[#ff0000] ${error ? "block" : "hidden"}`}>
            {error}
          </div>
          <Link to="/forgetPassword" className="w-full">
            <div className="font-bold text-right">
              Forgot password?
            </div>
          </Link>
          <Button className="w-full m-4" type="submit">
            Sign In
          </Button>
          <div>
            New User?{" "}
            <Link to="/signUp" className="font-bold">
              Create an account
            </Link>
          </div>
          <GoogleLoginCom />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
