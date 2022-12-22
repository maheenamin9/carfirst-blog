import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import { useNavigate } from 'react-router-dom';

const GoogleLoginCom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                body: JSON.stringify({
                    token: credentialResponse.credential  // sending tokenId from client to server for server verification
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch(authActions.signin(await response.json()));
            navigate("/");  
            console.log("Login success, response: ", credentialResponse);
        } catch (err) {
            console.log(err.message);
        }
    }
    const handleFailure = (res) => {
        console.log("Login Failed, response: ", res);
    }

    return(
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
        />
    );
}

export default GoogleLoginCom;