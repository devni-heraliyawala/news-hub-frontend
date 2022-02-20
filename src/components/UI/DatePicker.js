import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = (props) => {
  const labelName = props.labelName;
  const selectedDate = props.selectedDate;

  const onDatePickerChange = (date) => {
    props.onDatePickerChange(date);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelName}</span>
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={onDatePickerChange}
        closeOnScroll={true}
        maxDate={new Date()}
        dateFormat="yyyy-MMM-dd"
        // openToDate={new Date()}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default DatePickerField;
