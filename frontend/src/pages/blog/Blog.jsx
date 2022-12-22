import React from "react";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/NavBar";
import _ from "lodash";
import { useState, useEffect } from "react";
import MainStoriesBlog from "./MainStoriesBlog";
import LatestPostsBlog from "./LatestPostsBlog";
import CompanyUpdatesBlog from "./CompanyUpdatesBlog";
import { useSelector } from "react-redux";

const Blog = () => {
  const token = useSelector((state) => state.token);
  const [newBlogList, setNewBlogList] = useState({
    mainStories: [{ title: "", date: "", fileName: "" }],
    latestBlog: [],
    companyUpdates: [],
  });

  async function fetchBlog() {
    const blogList = {
      mainStories: [],
      latestBlog: [],
      companyUpdates: [],
    };
    try {
      let counter = 0;
      const response = await fetch("http://localhost:3000/api/blogs", {
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await response.json();
      const blogs = data.blogs;
      // console.log(blogs);

      blogs.map((blogObj) => {
        if (
          blogObj.category === "Main Stories" &&
          blogObj.status === "approved"
        ) {
          blogList.mainStories.push(
            _.pick(blogObj, ["title", "description", "date", "fileName"])
          );
        }
        if (
          blogObj.category === "Latest Posts" &&
          blogObj.status === "approved"
        ) {
          blogList.latestBlog.push(
            _.pick(blogObj, [
              "title",
              "description",
              "date",
              "fileName",
              "postedBy",
            ])
          );
        } else if (
          blogObj.category === "Company Updates" &&
          blogObj.status === "approved" &&
          counter < 2
        ) {
          counter++;
          blogList.companyUpdates.push(
            _.pick(blogObj, ["title", "description", "date", "fileName"])
          );
        }
      });
      // console.log(blogList);
      setNewBlogList(blogList);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="h-14 bg-[#237C6B]"></div>
      <div className="lg:m-9 xl:mx-32">
        <div className="flex space-x-3">
          <div className="w-[66%]">
            <MainStoriesBlog mainStoriesBlogs={newBlogList.mainStories} />
          </div>
          <div className="w-[34%]">
            <CompanyUpdatesBlog companyUpdatesBlogs={newBlogList.companyUpdates} />
          </div>
        </div>
        <LatestPostsBlog latestPostsBlogs={newBlogList.latestBlog} />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Blog;