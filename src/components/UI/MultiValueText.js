import MultipleValueTextInput from "react-multivalue-text-input";

const MultiValueText = (props) => {
  const labelName = props.labelName;
  const placeholder = props.placeholder;
  let multiTextValues = props.selectedValues;

  const onSelect = (textValue) => {
    multiTextValues.push(textValue);
    props.onMultiValueTextChange(multiTextValues);
  };

  const onRemove = (textValue) => {
    multiTextValues = multiTextValues.filter((item) => {
      return item !== textValue;
    });

    props.onMultiValueTextChange(multiTextValues);
  };
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelName}</span>
      </label>
      <MultipleValueTextInput
        onItemAdded={onSelect}
        onItemDeleted={onRemove}
        name="item-input"
        placeholder={
          "Enter " + placeholder + "; separate them with COMMA or ENTER."
        }
        className="input input-bordered"
      />
    </div>
  );
};

export default MultiValueText;
