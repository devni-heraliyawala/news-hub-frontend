import Multiselect from "multiselect-react-dropdown";

const MultiSelectWithButton = (props) => {
  const labelName = props.labelName;
  const placeholder = props.placeholder;
  let options = props.options;
  const selectedValues = props.selectedValues;
  const objectArr = [];

  options.map((item) => {
    return objectArr.push(item.id);
  });

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
      <div className="flex justify-between items-center">
        <label className="label">
          <span className="label-text">{labelName}</span>
        </label>

        <label
          htmlFor="news-sources-modal"
          className="btn btn-xs btn-outline btn-primary"
        >
          Edit
        </label>
      </div>
      <Multiselect
        // options={options?.length === 0 ? defaultValues : options}
        options={objectArr}
        displayValue="key"
        showCheckbox={true}
        className={"w-full input-bordered"}
        isObject={false}
        selectionLimit={20}
        onSelect={onSelect}
        onRemove={onRemove}
        selectedValues={selectedValues}
        placeholder={placeholder}
        hidePlaceholder={true}
        customCloseIcon={<CloseIcon />}
        style={{ width: "calc(100% - 57.64px)" }}
      />
    </div>
  );
};

export default MultiSelectWithButton;
