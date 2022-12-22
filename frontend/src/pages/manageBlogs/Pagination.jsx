import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdOutlineNavigateNext } from 'react-icons/md';

const Pagination = ({page, pageCount,startingInd, handlePage, handlePrev, handleNext}) => {
  let pageCounter = 0;
  let elements = [];
  for(let currentPage=startingInd; currentPage<=pageCount; currentPage++){
    if(pageCounter===4){
      elements.push(<button
        key={currentPage}
        className={"border-2 w-14 flex justify-center items-center text-xl"}
        >...
      </button>)
      elements.push(<button
        key={pageCount}
        onClick={() => handlePage(pageCount)}
        className={`border-2 w-14 flex justify-center items-center text-xl ${page === pageCount && "bg-green-700 text-white font-bold"}`}
        >{pageCount}
      </button>)
      break;
    }
    elements.push(<button
      key={currentPage}
      onClick={() => handlePage(currentPage)}
      className={`border-2 w-14 flex justify-center items-center text-xl ${currentPage===page && "bg-green-700 text-white font-bold"}`}
      >{currentPage}
    </button>)
    pageCounter++;
  }
  console.log(elements);

  return (
    <div className="flex justify-center my-8">
      <button
        className="p-2 border-2 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:text-gray-200 disabled:bg-white"
        onClick={handlePrev}
        disabled={page === 1}
      >
        <MdOutlineNavigateBefore className="text-3xl" />
      </button>
      <div className="flex">
        {elements}
      </div>
      <button
        className="p-2 border-2 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:text-gray-200 disabled:bg-white"
        onClick={handleNext}
        disabled={page === pageCount}
      >
        <MdOutlineNavigateNext className="text-3xl" />
      </button>
    </div>
  );
};

export default Pagination;
