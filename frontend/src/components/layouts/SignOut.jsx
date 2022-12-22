import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { authActions } from '../../store/index';
import { googleLogout } from '@react-oauth/google';

const SignOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSuccess = async () => {
        googleLogout();
        dispatch(authActions.signout());
        navigate('/signIn');
        console.log("Sign out successfully");
    }

    return(
        <Button onClick={onSuccess} type="button" className="w-full" >Sign Out</Button>
    );
}

export default SignOut