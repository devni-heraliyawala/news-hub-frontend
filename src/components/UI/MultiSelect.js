import Multiselect from "multiselect-react-dropdown";

const MultiSelect = (props) => {
  const labelName = props.labelName;
  const placeholder = props.placeholder;
  const options = props.options;
  const selectedValues = props.selectedValues;

  const onSelect = (selectedMultiSelectValues) => {
    props.onMultiSelectChange(selectedMultiSelectValues);
  };

  const onRemove = (selectedMultiSelectValues) => {
    props.onMultiSelectChange(selectedMultiSelectValues);
  };

  const CloseIcon = () => (
    <span className="input-item-delete-button" role="button">
      <span>×</span>
    </span>
  );

  return (
    <div className="form-control multiselect-dropdown-wrapper">
      <label className="label">
        <span className="label-text">{labelName}</span>
      </label>
      <div className="relative">
        <Multiselect
          // options={options?.length === 0 ? defaultValues : options}
          options={options}
          displayValue="key"
          showCheckbox={true}
          className={"w-full input-bordered"}
          isObject={false}
          onSelect={onSelect}
          onRemove={onRemove}
          selectedValues={selectedValues}
          placeholder={placeholder}
          hidePlaceholder={true}
          customCloseIcon={<CloseIcon />}
          style={{ width: "calc(100% - 57.64px)" }}
        />
      </div>
    </div>
  );
};

export default MultiSelect;
