import NoBlogFound from "./NoBlogFound";
import React from "react";
import { useState } from "react";
import moment from "moment";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";

const MainStoriesBlog = (props) => {
  const [currentIndex, setIndex] = useState(0);
  function leftClickHandler() {
    currentIndex !== 0
      ? setIndex(currentIndex - 1)
      : setIndex(props.mainStoriesBlogs.length - 1);
  }
  function rightClickHandler() {
    currentIndex !== props.mainStoriesBlogs.length - 1
      ? setIndex(currentIndex + 1)
      : setIndex(0);
  }

  return (
    <React.Fragment>
      {/* Main Stories section */}
      <div className="flex justify-between my-2">
        <div className="flex">
          <div className="h-7 w-[6px] bg-yellow-400 mr-2"></div>
          <h3 className="font-bold text-2xl">Main Stories</h3>
        </div>
        <div className="flex">
          <button onClick={leftClickHandler} className="border-[1px]">
            <MdOutlineNavigateBefore className="text-2xl" />
          </button>
          <button onClick={rightClickHandler} className="border-[1px]">
            <MdOutlineNavigateNext className="text-2xl" />
          </button>
        </div>
      </div>
      {props.mainStoriesBlogs.length !== 0 ?
        <div
          className="h-[34rem] bg-cover relative"
          style={{
            backgroundImage: `url('http://localhost:3000/${props.mainStoriesBlogs[currentIndex].fileName}')`,
          }}
        >
          <div className="absolute bottom-5 left-5">
            <h4 className="text-white font-bold text-2xl">
              {props.mainStoriesBlogs[currentIndex].title}
            </h4>
            <p className="text-white">
              {moment(props.mainStoriesBlogs[currentIndex].date).format(
                "MMMM Do, YYYY"
              )}
            </p>
          </div>
        </div>
        : 
        <NoBlogFound />
      }
    </React.Fragment>
  );
};

export default MainStoriesBlog;
