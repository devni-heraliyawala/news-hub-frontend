import React, { useState } from "react";
import * as axios from "axios";
import moment from "moment";

import DropDown from "../UI/Dropdown";
import DatePicker from "../UI/DatePicker";
import MultiValueText from "../UI/MultiValueText";
import NewsSource from "../NewsSource/NewsSource";
import MultiSelect from "../UI/MultiSelect";
import MultiSelectWithButton from "../UI/MultiSelectWithButton";
import TextNumber from "../UI/TextNumber";

import useToast from "../../helpers/hooks/use-toast";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const NewsEverthing = (props) => {
  const toast = useToast();

  const sortingOptions = props.sortingOptions;
  const languages = props.languages;
  const categories = props.categories;
  const countries = props.countries;

  const defaultValues = {
    language: {
      value: "All",
      isAllowedAll: true,
    },
    searchInTypes: ["title", "description", "content"],
    sortingType: {
      value: "publishedAt",
      isAllowedAll: false,
    },
  };

  const [currentNewsSources, setNewsSources] = useState([]);

  const [selectedSources, setSelectedSources] = useState([]);

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(
    defaultValues.language.value
  );

  const [selectedSearchInTypes, setSelectedSearchInTypes] = useState(
    defaultValues.searchInTypes
  );

  const [selectedDomains, setSelectedDomains] = useState([]);

  const [selectedExcludedDomains, setSelectedExcludedDomains] = useState([]);

  const [selectedFromDate, setSelectedFromDate] = useState(new Date());

  const [selectedToDate, setSelectedToDate] = useState(new Date());

  const [selectedPageSize, setSelectedPageSize] = useState(100);

  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  const [selectedStortingType, setSelectedStortingType] = useState(
    defaultValues.sortingType.value
  );

  const newsSourceHandler = (newsSources) => {
    setNewsSources(newsSources);
  };

  const selectedNewsSourceHandler = (selectedNewsSources) => {
    setSelectedSources(selectedNewsSources);
  };

  const selectedKeywordsHandler = (selectedKeywordsValues) => {
    setSelectedKeywords(selectedKeywordsValues);
  };

  const onChangeLanguageHandler = (selectedLanguageValue) => {
    setSelectedLanguage(selectedLanguageValue);
  };

  const selectedSearchInTypesHandler = (selectedSearchInTypesValue) => {
    setSelectedSearchInTypes(selectedSearchInTypesValue);
  };

  const selectedDomainsHandler = (selectedDomainsValues) => {
    setSelectedDomains(selectedDomainsValues);
  };

  const selectedExcludedDomainsHandler = (selectedExcludedDomainsValues) => {
    setSelectedExcludedDomains(selectedExcludedDomainsValues);
  };

  const selectedFromDateHandler = (selectedFromDateValue) => {
    setSelectedFromDate(selectedFromDateValue);
  };

  const selectedToDateHandler = (selectedToDateValue) => {
    setSelectedToDate(selectedToDateValue);
  };

  const onChangePageSizeHandler = (selectedPageSizeValue) => {
    setSelectedPageSize(selectedPageSizeValue);
  };

  const onChangePageNumberHandler = (selectedPageNumberValue) => {
    setSelectedPageNumber(selectedPageNumberValue);
  };

  const onChangeSortTypeHandler = (selectedSortTypeValue) => {
    setSelectedStortingType(selectedSortTypeValue);
  };

  const onClickNewsSearchHandler = (e) => {
    e.preventDefault();

    //backend API to search everything news
    const searchFilterData = {
      keywords: selectedKeywords,
      searchIn: selectedSearchInTypes,
      sources: selectedSources,
      domains: selectedDomains,
      excludeDomains: selectedExcludedDomains,
      from: moment(selectedFromDate).format("YYYY-MM-DD"),
      to: moment(selectedToDate).format("YYYY-MM-DD"),
      language:
        selectedLanguage === defaultValues.language.value
          ? null
          : selectedLanguage,
      sortBy: selectedStortingType,
      pageSize: Number(selectedPageSize),
      page: Number(selectedPageNumber),
    };

    axios({
      method: "post",
      url: `${baseUrl}/api/news/news-search/everything`,
      data: searchFilterData,
    })
      .then((response) => {
        const data = response?.data;
        if (data) {
          setTimeout(() => {
            toast.info(
              `Found ${data?.totalResults} search results.`
            );
          }, 500);
          props.onNewsResultPopulate(data);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(
            `Error: ${err?.response?.data?.message}. ${err?.response?.data?.error}`
          );
        }, 500);
      });
    //reset form to default values
    setNewsSources([]);
    setSelectedSources([]);
    setSelectedKeywords([]);
    setSelectedLanguage(defaultValues.language.value);
    setSelectedSearchInTypes(defaultValues.searchInTypes);
    setSelectedDomains([]);
    setSelectedExcludedDomains([]);
    setSelectedFromDate(new Date());
    setSelectedToDate(new Date());
    setSelectedPageSize(100);
    setSelectedPageNumber(1);
    setSelectedStortingType(defaultValues.sortingType.value);
  };

  return (
    <div>
      <NewsSource
        categories={categories}
        languages={languages}
        countries={countries}
        onNewsSourceFilterChange={newsSourceHandler}
      />

      <MultiSelectWithButton
        labelName="News Sources"
        placeholder="news sources"
        options={currentNewsSources}
        selectedValues={selectedSources}
        onMultiSelectChange={selectedNewsSourceHandler}
      />

      <MultiValueText
        labelName="Keywords"
        placeholder="keywords"
        selectedValues={selectedKeywords}
        onMultiValueTextChange={selectedKeywordsHandler}
      />

      <DropDown
        labelName="Language"
        placeholder="language"
        dropdownValues={languages}
        isAllowedAllOption={defaultValues.language.isAllowedAll}
        onChangeDropdown={onChangeLanguageHandler}
        value={selectedLanguage}
      />

      <MultiSelect
        labelName="Search In"
        placeholder="search in"
        options={defaultValues.searchInTypes}
        selectedValues={selectedSearchInTypes}
        onMultiSelectChange={selectedSearchInTypesHandler}
      />

      <MultiValueText
        labelName="Domains"
        placeholder="domains"
        selectedValues={selectedDomains}
        onMultiValueTextChange={selectedDomainsHandler}
      />

      <MultiValueText
        labelName="Exclude Domains"
        placeholder="exclude domains"
        selectedValues={selectedExcludedDomains}
        onMultiValueTextChange={selectedExcludedDomainsHandler}
      />

      <DatePicker
        labelName="From"
        selectedDate={selectedFromDate}
        onDatePickerChange={selectedFromDateHandler}
      />

      <DatePicker
        labelName="To"
        selectedDate={selectedToDate}
        onDatePickerChange={selectedToDateHandler}
      />
      <DropDown
        labelName="Sort By"
        placeholder="sorting type"
        dropdownValues={sortingOptions}
        isAllowedAllOption={defaultValues.sortingType.isAllowedAll}
        onChangeDropdown={onChangeSortTypeHandler}
        value={selectedStortingType}
      />
      <TextNumber
        labelName="Page Size"
        placeholder="100"
        min="1"
        max="100"
        selectedValue={selectedPageSize}
        onTextNumberChange={onChangePageSizeHandler}
      />
      <TextNumber
        labelName="Page Number"
        placeholder="1"
        min="1"
        max="100000"
        selectedValue={selectedPageNumber}
        onTextNumberChange={onChangePageNumberHandler}
      />

      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={onClickNewsSearchHandler}>
          Search
        </button>
      </div>
    </div>
  );
};

export default NewsEverthing;
