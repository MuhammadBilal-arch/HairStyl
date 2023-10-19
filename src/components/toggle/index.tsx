export const ToggleButton = ({
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
      backgroundColor: backgroundUnchecked || 'bg-gray-extraLight',
      UnCheckedToggleButtonColor: UnCheckedToggleButtonColor || 'bg-gray-extraLight',
      // Add other styles for unchecked state as needed
    },
  };

  return (
    <div className=" mt-4 flex space-x-2">
      <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
        <input
          onChange={onChangeStatus}
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={status}
          className={`toggle-checkbox absolute top-1 bottom-1 block h-4 w-4 cursor-pointer appearance-none rounded-full ${
            status
              ? toggleStyles.checked.CheckedToggleButtonColor
              : toggleStyles.unchecked.UnCheckedToggleButtonColor
          }`}
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block h-6 cursor-pointer overflow-hidden rounded-full ${
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
