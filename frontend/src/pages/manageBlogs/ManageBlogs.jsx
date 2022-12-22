import React from "react";
import Navbar from "../../components/layouts/NavBar";
import Footer from "../../components/layouts/Footer";
import Blogs from "./Blogs";

const ManageBlogs = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="h-14 bg-[#237C6B]"></div>
      <Blogs />
      <Footer />
    </React.Fragment>
  );
};

export default ManageBlogs;
