import { Pagination } from "react-headless-pagination";

const ReactPagination = (props) => {
  const currentPage = props.page;
  const totalResultsCount = props.resultsCount;
  const limit = props.pageLimit;
  const totalPages = Math.ceil(totalResultsCount / limit);

  const handlePageChange = (page) => {
    props.onPageChange(page);
  };

  return (
    <>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        edgePageCount={3}
        middlePagesSiblingCount={2}
        className="btn-group"
        truncableText="..."
        truncableClassName="btn btn-disabled"
      >
        <Pagination.PrevButton className="btn">Previous</Pagination.PrevButton>

        <div className="btn-group">
          <Pagination.PageButton
            activeClassName="btn btn-active"
            inactiveClassName=""
            className="btn"
          />
        </div>

        <Pagination.NextButton className="btn">Next</Pagination.NextButton>
      </Pagination>
    </>
  );
};

export default ReactPagination;
