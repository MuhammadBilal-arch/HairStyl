export const ToggleButton = ({
  id,
  status,
  onChangeStatus,
  text,
  backgroundChecked,
  backgroundUnchecked,
  CheckedToggleButtonColor,
  UnCheckedToggleButtonColor,
}: any) => {
  const toggleStyles = {
    checked: {
      backgroundColor: backgroundChecked || 'bg-yellow-primary',
      CheckedToggleButtonColor: CheckedToggleButtonColor || 'bg-black-primary',
      // Add other styles for checked state as needed
    },
    unchecked: {
      backgroundColor: backgroundUnchecked || 'bg-black-primary',
      UnCheckedToggleButtonColor: UnCheckedToggleButtonColor || 'bg-yellow-primary',
      // Add other styles for unchecked state as needed
    },
  }; 

  return (
    <div className="flex items-center space-x-2">
      <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
        <input
          onChange={onChangeStatus}
          type="checkbox"
          name="toggle"
          id={id}
          checked={status}
          className={`toggle-checkbox absolute my-[3px] mx-0.5  block h-3.5 w-3.5 cursor-pointer appearance-none rounded-full ${
            status
              ? toggleStyles.checked.CheckedToggleButtonColor
              : toggleStyles.unchecked.UnCheckedToggleButtonColor
          }`}
        />
        <label
          htmlFor={id}
          className={`toggle-label block h-5 cursor-pointer overflow-hidden rounded-full ${
            status
              ? toggleStyles.checked.backgroundColor
              : toggleStyles.unchecked.backgroundColor
          }`}
        ></label>
      </div>
      <div className="text-black-primary">{text}</div>
    </div>
  );
};
