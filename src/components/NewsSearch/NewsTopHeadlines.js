import React, { useState } from "react";
import * as axios from "axios";

import DropDown from "../UI/Dropdown";
import MultiSelectWithButton from "../UI/MultiSelectWithButton";
import MultiValueText from "../UI/MultiValueText";
import NewsSource from "../NewsSource/NewsSource";
import TextNumber from "../UI/TextNumber";

import useToast from "../../helpers/hooks/use-toast";

const baseUrl = "http://localhost:3001";

const NewsTopHeadlines = (props) => {
  const toast = useToast();

  const languages = props.languages;
  const categories = props.categories;
  const countries = props.countries;

  const defaultValues = {
    language: {
      value: "Choose a language",
      isAllowedAll: false,
    },
    category: {
      value: "Choose a category",
      isAllowedAll: false,
    },
    country: {
      value: "Choose a country",
      isAllowedAll: false,
    },
  };

  const [selectedSources, setSelectedSources] = useState([]);

  const [currentNewsSources, setNewsSources] = useState([]);

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(
    defaultValues.language.value
  );

  const [selectedCategory, setSelectedCategory] = useState(
    defaultValues.category.value
  );

  const [selectedCountry, setSelectedCountry] = useState(
    defaultValues.country.value
  );

  const [selectedPageSize, setSelectedPageSize] = useState(100);

  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

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

  const onChangeCategoryHandler = (selectedCategoryValue) => {
    setSelectedCategory(selectedCategoryValue);
  };

  const onChangeCountryHandler = (selectedCountryValue) => {
    setSelectedCountry(selectedCountryValue);
  };

  const onChangePageSizeHandler = (selectedPageSizeValue) => {
    setSelectedPageSize(selectedPageSizeValue);
  };

  const onChangePageNumberHandler = (selectedPageNumberValue) => {
    setSelectedPageNumber(selectedPageNumberValue);
  };

  const onClickNewsSearchHandler = (e) => {
    e.preventDefault();
    //backend API to search top-headlines
    const searchFilterData = {
      language:
        selectedLanguage === defaultValues.language.value
          ? null
          : selectedLanguage,
      category:
        selectedCategory === defaultValues.category.value
          ? null
          : selectedCategory,
      country:
        selectedCountry === defaultValues.country.value
          ? null
          : selectedCountry,
      sources: selectedSources,
      keywords: selectedKeywords,
      pageSize: Number(selectedPageSize),
      page: Number(selectedPageNumber),
    };

    axios({
      method: "post",
      url: `${baseUrl}/api/news/news-search/top-headlines`,
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
    setSelectedSources([]);
    setNewsSources([]);
    setSelectedKeywords([]);
    setSelectedLanguage(defaultValues.language.value);
    setSelectedCategory(defaultValues.category.value);
    setSelectedCountry(defaultValues.country.value);
    setSelectedPageSize(100);
    setSelectedPageNumber(1);
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
      <DropDown
        labelName="Category"
        placeholder="category"
        dropdownValues={categories}
        isAllowedAllOption={defaultValues.category.isAllowedAll}
        onChangeDropdown={onChangeCategoryHandler}
        value={selectedCategory}
      />
      <DropDown
        labelName="Country"
        placeholder="country"
        dropdownValues={countries}
        isAllowedAllOption={defaultValues.country.isAllowedAll}
        onChangeDropdown={onChangeCountryHandler}
        value={selectedCountry}
      />

      <TextNumber
        labelName="Page Size"
        placeholder="100"
        min="20"
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

export default NewsTopHeadlines;
