import Button from "../UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../layouts/userForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formikObj = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:3000/api/users/forgotPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })
        if(response.status === 200) {
          navigate("/emailSent");
        }
        else{
          setError(await response.text());
        }
      } catch (err) {
        console.log(err.message);
      }
      resetForm({ values: "" });
    },
  });
  
  return (
    <div className="formContainer">
      <div className="formCard">
        <h3 className="heading">Forgot Password</h3>
        <form className="userForm" onSubmit={formikObj.handleSubmit}>
          <p className="userLabel mb-6">Enter the registered email to receive reset password link</p>
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
          <div className={`text-[#ff0000] w-[360px] ${error ? "block" : "hidden"}`}>{error}</div>
          <Button className="w-full m-4" type="submit">
            Submit
          </Button>
          <div>
            Remember password?{" "}
            <Link to="/signIn" className="font-bold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
