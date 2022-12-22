import Button from "../../components/UI/Button";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import React from "react";
import NoBlogFound from "./NoBlogFound";

const CompanyUpdatesBlog = (props) => {
  const isAdmin = useSelector((state) => state.isAdmin);
  return (
    <React.Fragment>
      {/* {isAdmin && } */}

      <NavLink to="/addBlog">
        <Button className="w-full">Post Blog</Button>
      </NavLink>

      {/* Company Updates section */}
      <div className="flex my-3">
        <div className="h-7 w-[6px] bg-yellow-400 mr-2"></div>
        <h3 className="font-bold text-xl">Company Updates</h3>
      </div>

      {props.companyUpdatesBlogs.length !== 0 ? 
        <div className="space-y-3">
        {props.companyUpdatesBlogs.map((blogObj, index) => {
          return (
            <div
              className={"bg-cover h-[236px] relative"}
              style={{
                backgroundImage: `url('http://localhost:3000/${blogObj.fileName}')`,
              }}
              key={index}
            >
              <div className="absolute bottom-2 left-2">
                <h4 className="text-white font-bold text-lg">
                  {blogObj.title}
                </h4>
                <p className="text-white">
                  {moment(blogObj.date).format("MMMM Do, YYYY")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      :
      <NoBlogFound />
      }
    </React.Fragment>
  );
}

export default CompanyUpdatesBlog;
