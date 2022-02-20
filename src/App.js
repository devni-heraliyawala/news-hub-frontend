/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import * as axios from "axios";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer/Footer";
import NewsPanel from "./components/NewsPanel/NewsPanel";
import NewsSearch from "./components/NewsSearch/NewsSearch";

import { countries } from "./constants/countries";
import { languages } from "./constants/languages";
import { categories } from "./constants/categories";

import useToast from "../src/helpers/hooks/use-toast";

const App = () => {
  const toast = useToast();

  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  const sortingOptions = ["relevancy", "popularity", "publishedAt"];
  const searchTypes = ["Everything", "Top-Heading"];
  const defaultValues = {
    searchType: {
      value: "Everything",
      isAllowedAll: false,
    },
    favouriteList: {
      page: 1,
      pageLimit: 10,
    },
  };

  const [resultedNewsData, setResultedNewsData] = useState([]);

  const TAB = Object.freeze({
    SEARCH: 1,
    FAVOURITES: 2,
  });

  const [activeTab, setActiveTab] = useState(TAB.FAVOURITES);
  const [importedArticles, setImportedArticles] = useState([]);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}/api/news/articles/all?page=${defaultValues.favouriteList.page}&limit=${defaultValues.favouriteList.pageLimit}`,
    })
      .then((response) => {
        const data = response?.data;
        if (data) {
          setImportedArticles(data);
          setIsInitialDataLoaded(true);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(
            `Error: ${err?.response?.data?.message}. ${err?.response?.data?.error}`
          );
        }, 500);
      });
  }, []);

  const onNewsSearchResultsHandler = (newsResults) => {
    setResultedNewsData(newsResults);
    setActiveTab(parseInt(TAB.SEARCH, 10));
  };

  return (
    <div id="container">
      <div className="bg-base-200 app-layout">
        <NewsSearch
          categories={categories}
          languages={languages}
          countries={countries}
          sortingOptions={sortingOptions}
          searchTypes={searchTypes}
          defaultValuesNewsSearch={defaultValues}
          onNewsResultPopulateNewsSearch={onNewsSearchResultsHandler}
        />
        {isInitialDataLoaded ? (
          <NewsPanel
            newsSearchResults={resultedNewsData}
            defaultTab={activeTab}
            baseUrl={baseUrl}
            importedArticles={importedArticles}
          />
        ) : null}
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
