import React, { useState } from "react";

import NewsTopHeadlines from "./NewsTopHeadlines";
import NewsEverthing from "./NewsEverything";
import DropDown from "../UI/Dropdown";

/* eslint-disable jsx-a11y/anchor-is-valid */
const NewsSearch = (props) => {
  const categories = props.categories;
  const languages = props.languages;
  const countries = props.countries;
  const sortingOptions = props.sortingOptions;
  const searchTypes = props.searchTypes;
  const defaultValues = props.defaultValuesNewsSearch;

  const [selectedSearchType, setSelectedSearchType] = useState(
    defaultValues.searchType.value
  );

  const onChangeSearchTypeHandler = (selectedDropdownValue) => {
    setSelectedSearchType(selectedDropdownValue);
  };

  const onNewsSearchHandler = (newsResults) => {
    props.onNewsResultPopulateNewsSearch(newsResults);
  };

  return (
    <div className="card bg-base-100 search-panel">
      <div className="card-body">
        <h3 className="text-3xl font-bold">News Search</h3>

        <DropDown
          labelName="Search Type"
          placeholder="search type"
          dropdownValues={searchTypes}
          value={selectedSearchType}
          isAllowedAllOption={defaultValues.searchType.isAllowedAll}
          onChangeDropdown={onChangeSearchTypeHandler}
        />

        <div className="divider"></div>

        {selectedSearchType.toString().toLocaleLowerCase() === "everything" ? (
          <NewsEverthing
            sortingOptions={sortingOptions}
            languages={languages}
            categories={categories}
            countries={countries}
            onNewsResultPopulate={onNewsSearchHandler}
          />
        ) : (
          <NewsTopHeadlines
            languages={languages}
            categories={categories}
            countries={countries}
            onNewsResultPopulate={onNewsSearchHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NewsSearch;
