/* eslint-disable jsx-a11y/anchor-is-valid */
import * as axios from "axios";

import React, { useState } from "react";
import DropDown from "../UI/Dropdown";
import useToast from "../../helpers/hooks/use-toast";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const NewsSource = (props) => {
  const toast = useToast();

  const categories = props.categories;
  const languages = props.languages;
  const countries = props.countries;

  const defaultValues = {
    category: {
      value: "All",
      isAllowedAll: true,
    },
    language: {
      value: "All",
      isAllowedAll: true,
    },
    country: {
      value: "All",
      isAllowedAll: true,
    },
  };
  const [selectedCategory, setSelectedCategory] = useState(
    defaultValues.category.value
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    defaultValues.language.value
  );
  const [selectedCountry, setSelectedCountry] = useState(
    defaultValues.country.value
  );

  const onChangeLanguageHandler = (selectedLanguageValue) => {
    setSelectedLanguage(selectedLanguageValue);
  };

  const onChangeCategoryHandler = (selectedCategoryValue) => {
    setSelectedCategory(selectedCategoryValue);
  };

  const onChangeCountryHandler = (selectedCountryValue) => {
    setSelectedCountry(selectedCountryValue);
  };

  const clickHandler = () => {
    // used for the backend API
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
    };
    axios({
      method: "post",
      url: `${baseUrl}/api/news/news-search/sources`,
      data: searchFilterData,
    })
      .then((response) => {
        const sources = response?.data?.sources;
        setTimeout(() => {
          toast.info(
            `Found ${sources?.length} search results.`
          );
        }, 500);
        props.onNewsSourceFilterChange(sources);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(
            `Error: ${err?.response?.data?.message}. ${err?.response?.data?.error}`
          );
        }, 500);
      });

    // reset the fields to default values
    setSelectedLanguage(defaultValues.language.value);
    setSelectedCategory(defaultValues.category.value);
    setSelectedCountry(defaultValues.country.value);
  };

  return (
    <div>
      <input type="checkbox" id="news-sources-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change News Sources</h3>
          <div>
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
          </div>
          <div className="modal-action form-control mt-6">
            <label
              htmlFor="news-sources-modal"
              className="btn btn-primary"
              onClick={clickHandler}
            >
              Load Sources
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSource;
