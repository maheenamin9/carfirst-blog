import React from "react";
import moment from "moment";
import NoBlogFound from "./NoBlogFound";

const LatestPostsBlog = (props) => {
  return (
    <React.Fragment>
      {/* Latest Posts section */}
      <div className="flex mt-7 mb-3">
        <div className="h-7 w-[6px] bg-yellow-400 mr-2"></div>
        <h3 className="font-bold text-xl">Latest Posts</h3>
      </div>
      {props.latestPostsBlogs.length !== 0 ?
        <div className="flex flex-wrap space-x-3 space-y-3">
          <div></div>
          {props.latestPostsBlogs.map((blogObj, index) => {
            return (
              <div className="w-[24%] border-1 shadow-3xl" key={index}>
                <img
                  src={`http://localhost:3000/${blogObj.fileName}`}
                  className="h-52"
                />
                <div className="p-4 mb-2">
                  <h4 className="font-bold text-lg">{blogObj.title}</h4>
                  <p className="text-gray-600 my-2">
                    {moment(blogObj.date).format("MMMM Do, YYYY")}
                  </p>
                  <p className="text-gray-600 break-words">
                    {blogObj.description}
                  </p>
                  <p>Posted by: {blogObj.postedBy.username}</p>
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

export default LatestPostsBlog;
