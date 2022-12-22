import "../layouts/userForm.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const EmailSent = () => {
  return (
    <div className="formContainer">
      <div className="formCard">
        <h3 className="heading">Email has been sent!</h3>
        <p className="userLabel my-6">Please check your mail inbox and click the link to reset password</p>
        <div className="w-full space-x-2">
            <a href="http://gmail.com">
                <Button className="w-[48%]">Open mail app</Button>
            </a>
            <Link to="/signIn">
              <Button className="w-[48%]">Sign In</Button>
            </Link>
        </div>
        {/* <div className="mt-6 text-center">
            Didn't receive the link?{" "}
            <button className="font-bold" onClick={resendLink}>Resend</button>
        </div> */}
      </div>
    </div>
  );
};

export default EmailSent;
