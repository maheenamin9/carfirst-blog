import React from "react";
import Card from "../../components/UI/Card";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import { BsCheckLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';

const Blogs = () => {
  const token = useSelector((state) => state.token);
  const [blogs, setBlog] = useState([]);
  const [page, setPage] = useState(1);   // current page number
  const [pageCount, setPageCount] = useState(0);   // no of pages
  const [blogCount, setBlogCount] = useState(0);   // no of blogs present
  const [startingInd, setStartingInd] = useState(1);  // starting index for pages
  const paginationElements = 4;  // represents how many elements to show for pages in UI

  async function fetchBlog() {
    const itemsPerPage = 4;
    try {
      const response = await fetch(
        `http://localhost:3000/api/blogs?page=${page}&itemsPerPage=${itemsPerPage}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const data = await response.json();
      setBlog(data.blogs);
      setPageCount(data.totalPages);
      setBlogCount(data.count);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleStatus(obj) {
    try {
      await fetch(`http://localhost:3000/api/blogs/updateStatus/${obj._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ status: obj.status }),
      });
      fetchBlog();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handlePage(currentPage) {
    setPage(currentPage);
  }

  function handlePrev() {
    setPage((currentPage) => {
      console.log(currentPage, startingInd);
      if (currentPage === 1) return currentPage;
      if(currentPage === startingInd || currentPage === pageCount) {
        if(currentPage<=paginationElements){   // prevent starting index from 0 and negative value
          setStartingInd(1);
        }
        else{
          setStartingInd(currentPage - paginationElements);
        }
      }
      // if(currentPage === pageCount) {
      //   if(currentPage<=paginationElements){   // prevent starting index from 0 and negative value
      //     setStartingInd(1);
      //   }
      //   else{
      //     setStartingInd(currentPage - paginationElements);
      //   }
      // }
      return currentPage - 1;
    });
  }

  function handleNext() {
    setPage((currentPage) => {
      if (currentPage === pageCount) return div;
      if (currentPage%paginationElements === 0) {
        setStartingInd(currentPage + 1);
      }
      return currentPage + 1;
    });
  }

  useEffect(() => {
    fetchBlog();
  }, [page]);

  return (
    <React.Fragment>
      <Pagination 
        page={page} 
        pageCount={pageCount} 
        startingInd={startingInd}
        handlePage={handlePage}
        handlePrev={handlePrev} 
        handleNext={handleNext} 
      />
      {blogs.map((blogObj, index) => (
        <Card className="lg:m-8 xl:mx-40" key={index}>
          <div className="flex pl-5 pr-10 py-5 space-x-7">
            <div className="w-[13%]">
              <div className="flex items-center">
                <div
                  className="w-44 h-32 bg-cover"
                  style={{
                    backgroundImage: `url("http://localhost:3000/${blogObj.fileName}")`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-3/4">
              <h4 className="text-2xl font-bold">{blogObj.title}</h4>
              <div className="text-sm mb-4">
                {moment(blogObj.date).format("MMMM Do, YYYY")}
              </div>
              <div className="flex">
                <div className="font-bold mr-2">Category:</div>
                <div>{blogObj.category}</div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2">Description:</div>
                <div>{blogObj.description}</div>
              </div>
            </div>
            <div className="flex items-center">
              {blogObj.status === "pending" ? (
                <div className="flex flex-col space-y-3">
                  <button
                    className="bg-green-700 font-bold text-white p-3 w-32"
                    onClick={() =>
                      handleStatus({ status: "approved", _id: blogObj._id })
                    }
                  >Approve</button>
                  <button
                    className="bg-red-600 font-bold text-white p-3 w-32"
                    onClick={() =>
                      handleStatus({ status: "rejected", _id: blogObj._id })
                    }
                  >Reject</button>
                </div>
              ) : (
                <div className="flex items-center">
                  {blogObj.status === "approved" ? (
                    <div className="flex items-center bg-green-700 py-1 px-4 rounded-full">
                      <BsCheckLg className="mr-3 text-white" />
                      <div className="font-bold text-white">Approved</div>
                    </div>
                  ) : (
                    <div className="flex items-center bg-red-600 py-1 px-4 rounded-full">
                      <ImCross className="mr-3 text-white" />
                      <div className="font-bold text-white">Rejected</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
      <Pagination 
        page={page} 
        pageCount={pageCount} 
        startingInd={startingInd}
        handlePage={handlePage}
        handlePrev={handlePrev} 
        handleNext={handleNext}
      />

    </React.Fragment>
  );
};

export default Blogs;
