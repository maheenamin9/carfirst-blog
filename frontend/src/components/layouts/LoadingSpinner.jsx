import FadeLoader from "react-spinners/FadeLoader";

const LoadingSpinner = () => {
    return(
        <div className="h-screen flex items-center justify-center">
            <FadeLoader className="flex justify-center items-center" color='#002F34' />
        </div>
    )
}

export default LoadingSpinner;