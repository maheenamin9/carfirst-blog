import React, { useState } from "react";
import "./userForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../UI/Button";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  // formik form
  const formikObj = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(7, "Username must be between 7 and 20 characters")
        .max(20, "Username must be between 7 and 20 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .password()
        .required("Password is required")
        .min(
          7,
          "Password must contain 8 or more characters with atleast one of each: uppercase, lowercase, number and special character"
        )
        .minLowercase(1, "Password must contain 1 lowercase character")
        .minUppercase(1, "Password must contain 1 uppercase character")
        .minNumbers(1, "Password must contain 1 number")
        .minSymbol(1, "Password must contain 1 special character"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // storing data in database
      delete values.confirmPassword;
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values),
        });
        if(response.status === 200) {
          dispatch(authActions.signin(await response.json()));  // storing userData that comes from res.send into redux store
          navigate("/");
        }
        else {  // status == 400
          setError(await response.text());
        }
      } catch (err) {
        console.log(err.message);
      }
      resetForm({ values: "" });


      // storing data in local storage
      // let userArray = JSON.parse(localStorage.getItem("userFormData") || "[]");
      // console.log(userArray);
      // let isUserExist = false;
      // if (userArray !== null) {
      //   userArray.map((listItem) => {
      //     if (values.email === listItem.email) {
      //       // notify();
      //       setError(true);
      //       isUserExist = true;
      //       return;
      //     }
      //   });
      // }
      // if (userArray === null || !isUserExist) {
      //   console.log("Submitted");
      //   console.log(values);
      //   userArray.push(values);
      //   localStorage.setItem("userFormData", JSON.stringify(userArray));
      //   navigate("/signIn");
      // }
      // resetForm({ values: "" });
      
    },
  });

  return (
    <React.Fragment>
      <div className="formContainer">
        <div className="formCard">
          <h3 className="heading">Sign Up</h3>
          <form className="userForm" onSubmit={formikObj.handleSubmit}>
            <label className="userLabel" htmlFor="username">
              Username:
            </label>
            <input
              className="userInput"
              type="text"
              name="username"
              placeholder="Username"
              value={formikObj.values.username}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
              onClick={() => setError(false)}
            />
            {formikObj.touched.username && formikObj.errors.username ? (
              <p className="errorPara">{formikObj.errors.username}</p>
            ) : null}
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
            <label className="userLabel" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="userInput"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formikObj.values.confirmPassword}
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
            />
            {formikObj.touched.confirmPassword && formikObj.errors.confirmPassword ? (
              <p className="errorPara">{formikObj.errors.confirmPassword}</p>
            ) : null}
            <div className={`text-[#ff0000] ${error ? "block" : "hidden"}`}>User already exist try another email</div>
            <Button className="w-full m-4" type="submit">
              Sign Up
            </Button>
            <div>
              Already have a account?{" "}
              <Link to="/signIn" className="font-bold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignUp;