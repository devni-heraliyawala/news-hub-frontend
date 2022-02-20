/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as axios from "axios";

import ListItem from "../UI/ListItem";
import NewsArticle from "./NewsArticle";
import Pagination from "../UI/Pagination";
import useToast from "../../helpers/hooks/use-toast";

const TAB = Object.freeze({
  SEARCH: 1,
  FAVOURITES: 2,
});

const pageLimit = 10;

const NewsPanel = (props) => {
  const newsResults = props.newsSearchResults;
  const defaultTab = props.defaultTab;
  const baseUrl = props.baseUrl;
  const defaultImportedArticles = props.importedArticles;
  const defaultNewsResultsList = newsResults?.articles?.slice(0, pageLimit);

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isTabClicked, setIsTabClicked] = useState(false);
  const [page, setPage] = useState(0);
  const [importedArticles, setImportedArticles] = useState(
    defaultImportedArticles
  );
  const [selectedNewsResultList, setSelectedNewsResultList] = useState(
    defaultNewsResultsList
  );
  const [selectedArticle, setSelectedArticle] = useState({});
  const toast = useToast();

  // change the active tab on news search results found
  if (defaultTab !== activeTab && !isTabClicked) {
    setActiveTab(parseInt(defaultTab, 10));
  }

  if (defaultNewsResultsList?.length > 0 && !selectedNewsResultList) {
    setSelectedNewsResultList(defaultNewsResultsList);
  }

  const handleTabChange = (e) => {
    const tabId = e.target.getAttribute("tabid");
    setActiveTab(parseInt(tabId, 10));
    setIsTabClicked(true);
    setPage(0);
  };

  const importedNewsPageChangeHandlder = (selectedPage) => {
    setPage(selectedPage);
    loadImportedArticles(selectedPage);
  };

  const searchResultPageChangeHandlder = (selectedPage) => {
    const start = selectedPage * pageLimit;
    const end = start + pageLimit;
    const newsResultsArr = newsResults?.articles?.slice(start, end);
    setPage(selectedPage);
    setSelectedNewsResultList(newsResultsArr);
  };
  const onclickTabFavouriteHandler = (e) => {
    // e.preventDefault();
    const tabId = e.target.getAttribute("tabid");
    setActiveTab(parseInt(tabId, 10));
    setIsTabClicked(true);
    loadImportedArticles(page);
  };

  const loadImportedArticles = (page) => {
    const pageNo = page + 1; // start from 0

    //backend API to list imported articles
    axios({
      method: "get",
      url: `${baseUrl}/api/news/articles/all?page=${pageNo}&limit=${pageLimit}`,
    })
      .then((response) => {
        const data = response?.data;
        if (data) {
          setImportedArticles(data);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(
            `Error: ${err?.response?.data?.message}. ${err?.response?.data?.error}`
          );
        }, 500);
      });
  };

  const onImportArticleHandler = (selectedArticle) => {
    //backend API to import the news article
    axios({
      method: "post",
      url: `${baseUrl}/api/news/article`,
      data: selectedArticle,
    })
      .then((response) => {
        const data = response?.data;
        if (data) {
          setTimeout(() => {
            toast.success(`Article ${data?.title} imported successfully!`);
          }, 500);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(
            `Error: ${err?.response?.data?.message}. ${err?.response?.data?.error}`
          );
        }, 500);
      });
  };

  const onViewArticleHandler = (selectedNewsArticle) => {
    setSelectedArticle(selectedNewsArticle);
  };

  return (
    <div className="news-panel">
      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="text-3xl font-bold">News Panel</h3>

          <div className="tabs">
            <a
              tabid={TAB.SEARCH}
              className={`tab tab-lifted ${
                activeTab === TAB.SEARCH ? "tab-active" : ""
              }`}
              onClick={handleTabChange}
            >
              Search Results
            </a>
            <a
              tabid={TAB.FAVOURITES}
              className={`tab tab-lifted ${
                activeTab === TAB.FAVOURITES ? "tab-active" : ""
              }`}
              onClick={onclickTabFavouriteHandler}
            >
              Favourites
            </a>
          </div>

          <div className="content-wrapper">
            {activeTab === TAB.SEARCH ? (
              <div>
                {newsResults?.totalResults ? (
                  <h3>Found {newsResults?.totalResults} articles </h3>
                ) : (
                  <h3>Search for newsfeed... </h3>
                )}
                <br />
                {selectedNewsResultList?.map((item) => {
                  return (
                    <ListItem
                      key={Math.random().toString()}
                      item={item}
                      buttonLabel="Import"
                      onListItemButtonClick={onImportArticleHandler}
                    />
                  );
                })}
                {newsResults?.totalResults ? (
                  <Pagination
                    page={page}
                    resultsCount={newsResults?.totalResults}
                    pageLimit={pageLimit}
                    onPageChange={searchResultPageChangeHandlder}
                  />
                ) : null}
              </div>
            ) : (
              <div>
                {importedArticles?.count ? (
                  <h3>Found {importedArticles?.count} imported articles </h3>
                ) : (
                  <h3>Import some news from the newsfeed results... </h3>
                )}
                <br />
                {importedArticles?.articles?.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      buttonLabel="View"
                      onListItemButtonClick={onViewArticleHandler}
                    />
                  );
                })}
                {importedArticles?.count ? (
                  <Pagination
                    page={page}
                    resultsCount={importedArticles?.count}
                    pageLimit={pageLimit}
                    onPageChange={importedNewsPageChangeHandlder}
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
      <NewsArticle article={selectedArticle} />
    </div>
  );
};

export default NewsPanel;
