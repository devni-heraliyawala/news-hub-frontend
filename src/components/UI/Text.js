const Text = (props) => {
  const labelName = props.labelName;
  const placeholder = props.placeholder;
  const selectedValue = props.selectedValue;

  const onTextValueChange = (e) => {
    const { value } = e.target;
    props.onTextChange(value);

  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelName}</span>
      </label>
      <input
        type="text"
        value={selectedValue}
        placeholder={placeholder}
        className="input input-bordered"
        onChange={onTextValueChange}
      />
    </div>
  );
};

export default Text;
