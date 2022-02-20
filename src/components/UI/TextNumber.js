const TextNumber = (props) => {
  const labelName = props.labelName;
  const placeholder = props.placeholder;
  const selectedValue = props.selectedValue;
  const max = props.max;
  const min = props.min;
  const onTextNumberValueChange = (e) => {
    const { value } = e.target;
    if (value <= Number(max) && value >= Number(min)) {
      props.onTextNumberChange(value);
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelName}</span>
      </label>
      <input
        type="number"
        value={selectedValue}
        placeholder={placeholder}
        min={min}
        max={max}
        className="input input-bordered"
        onChange={onTextNumberValueChange}
      />
    </div>
  );
};

export default TextNumber;
