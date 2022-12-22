import React from "react";
import Navbar from "../../components/layouts/NavBar";
import Footer from "../../components/layouts/Footer";
import BlogForm from "./BlogForm";

const AddBlog = () => {
  return (
    <React.Fragment>
      <Navbar />
      <BlogForm />
      <Footer />
    </React.Fragment>
  );
};

export default AddBlog;
