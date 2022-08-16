/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import * as axios from "axios";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer/Footer";
import useToast from "../src/helpers/hooks/use-toast";
import DropDown from "./components/UI/Dropdown";
import Text from "./components/UI/Text";

const App = () => {
  const toast = useToast();

  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5197";

  const calculationTypes = ["Equal monthly installment (EMI)"];
  const defaultValues = {
    calculationType: {
      value: 1,
      isAllowedAll: false,
    },
  };
  const [selectedCalculationType, setSelectedCalculationType] = useState(
    defaultValues.calculationType.value
  );
  const [selectedLoanAmount, setSelectedLoanAmount] = useState("");
  const [selectedInterestRate, setSelectedInterestRate] = useState("");
  const [selectedNoOfPayments, setSelectedNoOfPayments] = useState("");

  const onChangeCalculationTypeHandler = (value) => {
    setSelectedCalculationType(value);
  };

  const onChangeLoanAmountHandler = (value) => {
    setSelectedLoanAmount(value);
  };

  const onChangeInterestRateHandler = (value) => {
    setSelectedInterestRate(value);
  };

  const onChangeNoOfPaymentsHandler = (value) => {
    setSelectedNoOfPayments(value);
  };

  const onClickCalculateHandler = (e) => {
    e.preventDefault();

    // const calculateData = {
    //   calculationType: parseInt(selectedCalculationType),
    //   loanAmount: Number(selectedLoanAmount),
    //   interestRate: Number(selectedInterestRate),
    //   noOfPayments: parseInt(selectedNoOfPayments),
    // };

    const calculateData = {
      calculationType: 1,
      loanAmount: 3500,
      interestRate: 0.0067,
      noOfPayments: 36,
    };

    console.log("data", calculateData);

    // API call to calculate
    axios({
      method: "post",
      url: `${baseUrl}/api/LoanCalculate`,
      data: calculateData,
    })
      .then((response) => {
        const data = response?.data;
        console.log("received data");
        if (data) {
          setTimeout(() => {
            toast.info(`Monthly payemnt is ${data}`);
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

  const onClickClearHandler = (e) => {
    e.preventDefault();
    //reset form to default values
    setSelectedCalculationType(defaultValues.calculationType.value);
    setSelectedLoanAmount("");
    setSelectedInterestRate("");
    selectedNoOfPayments("");
  };

  return (
    <div id="container">
      <div className="card bg-base-100 search-panel">
        <div className="card-body">
          <h3 className="text-3xl font-bold">Loan Calculator</h3>
        </div>

        <DropDown
          labelName="Calculation Type"
          placeholder="Equal monthly installment (EMI)"
          dropdownValues={calculationTypes}
          value={selectedCalculationType}
          isAllowedAllOption={defaultValues.calculationType.isAllowedAll}
          onChangeDropdown={onChangeCalculationTypeHandler}
        />
        <Text
          labelName="Loan Amount (Principal)"
          placeholder="3,500"
          selectedValue={selectedLoanAmount}
          onTextChange={onChangeLoanAmountHandler}
        />
        <Text
          labelName="Interest Rate"
          placeholder="0.67"
          selectedValue={selectedInterestRate}
          onTextChange={onChangeInterestRateHandler}
        />
        <Text
          labelName="No of Payments"
          placeholder="36"
          selectedValue={selectedNoOfPayments}
          onTextChange={onChangeNoOfPaymentsHandler}
        />
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={onClickCalculateHandler}>
            Calculate
          </button>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={onClickClearHandler}>
            Clear
          </button>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
