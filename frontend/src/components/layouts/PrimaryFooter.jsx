import React from "react";
import PrimaryFooterList from "./PrimaryFooterList";
import PrimaryFooterBtns from "./PrimaryFooterBtns";
import BrandsFooter from "./BrandsFooter";

const PrimaryFooter = () => {
  return (
    <React.Fragment>
      <hr className="border-green-900" />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl pt-9 px-3 md:pl-6 lg:px-32 xl:px-4">
          <h3 className="font-bold">Any questions?</h3>
          <p className="">
            You'll find the answers to your questions in our{" "}
            <a href="#" className="font-bold underline">
              FAQ
            </a>{" "}
            section.
          </p>
          <div className="faq-footer flex flex-col space-y-2 py-2 md:flex-row md:space-y-0 md:space-x-16 md:py-9">
            <a href="#">
              <i className="fa fa-phone mr-2" aria-hidden="true" />
              111 111 CAR (227)
            </a>
            <a href="#" className="md:hidden">
              <i className="fa fa-commenting-o mr-2" aria-hidden="true" />
              Start a chat
            </a>
            <p>
              <i className="fa fa-clock-o mr-2" aria-hidden="true" />
              11:30am - 07:30pm
            </p>
            <p></p>
          </div>
          <hr />
          <div className="flex col-footer flex-col py-4 md:py-8 md:flex-row">
            <PrimaryFooterList />
            <PrimaryFooterBtns />
          </div>
          <hr />
          <BrandsFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrimaryFooter;
