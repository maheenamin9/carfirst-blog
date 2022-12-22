import "./userForm.css";
import Button from "../UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useParams } from "react-router-dom";
YupPassword(Yup);
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  // formik form
  const formikObj = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
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
      try {
        fetch(`http://localhost:3000/api/users/resetPassword/${id}/${token}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        navigate("/signIn")
      } catch (err) {
        console.log(err.message);
      }
      resetForm({ values: "" });
    },
  });

  return (
    <div className="formContainer">
      <div className="formCard">
        <h3 className="heading">Reset Password</h3>
        <form className="userForm" onSubmit={formikObj.handleSubmit}>
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
          {formikObj.touched.confirmPassword &&
          formikObj.errors.confirmPassword ? (
            <p className="errorPara">{formikObj.errors.confirmPassword}</p>
          ) : null}
          <Button className="w-full m-4" type="submit">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
