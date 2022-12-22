import React, { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/home/Home"));
const AboutUs = lazy(() => import("./pages/aboutUs/AboutUs")); 
const Location = lazy(() => import("./pages/location/Location"));
const ContactUs = lazy(() => import("./pages/contact/ContactUs"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const ManageBlogs = lazy(() => import("./pages/manageBlogs/ManageBlogs"));
const ErrorBoundary = lazy(() => import("./components/layouts/ErrorBoundary"));
const SignIn = lazy(() => import("./components/layouts/SignIn"));
const Signup = lazy(() => import("./components/layouts/SignUp"));
const ForgotPassword = lazy(() => import("./components/layouts/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/layouts/ResetPassword"));
const EmailSent = lazy(() => import("./components/layouts/EmailSent"));
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import LoadingSpinner from "./components/layouts/LoadingSpinner";
import ErrorPage from "./components/layouts/404ErrorPage";
import AddBlog from './pages/blog/AddBlog';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const isAuth = useSelector((state) => state.isAuthenticated);
  const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Suspense fallback={<LoadingSpinner />}>
      <div className='text-primary font-[Montserrat]'>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path='/' element={<ProtectedRoute user={isAuth}><Home /></ProtectedRoute>} />
              <Route path='/aboutUs' element={<ProtectedRoute user={isAuth}><AboutUs /></ProtectedRoute>} />
              <Route path='/location' element={<ProtectedRoute user={isAuth}><Location /></ProtectedRoute>} />
              <Route path='/blogs' element={<ProtectedRoute user={isAuth}><Blog /></ProtectedRoute>} />
              <Route path='/addBlog' element={<ProtectedRoute user={isAuth}><AddBlog /></ProtectedRoute>} />
              <Route path='/manageBlogs' element={<ProtectedRoute user={isAuth}><ManageBlogs /></ProtectedRoute>} />
              <Route path='/contactUs' element={<ProtectedRoute user={isAuth}><ContactUs /></ProtectedRoute>} />
              <Route path='/signIn' element={!isAuth ? <SignIn /> : <Navigate to='/' />} />
              <Route path='/signUp' element={!isAuth ? <Signup/> : <Navigate to='/' />} />
              <Route path='/forgetPassword' element={!isAuth && <ForgotPassword/>} />
              <Route path='/resetPassword/:id/:token' element={!isAuth && <ResetPassword/>} />
              <Route path='/emailSent' element={!isAuth && <EmailSent/>} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
      </Suspense>
    </GoogleOAuthProvider>
    
  );
}

export default App;
