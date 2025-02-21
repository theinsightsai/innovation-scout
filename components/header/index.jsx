"use client";
const PageHeader = ({
  text,
  buttonText,
  onButtonClick,
  icon,
  buttonArray = [],
  onArrayButtonClick = () => {},
}) => {
  return (
    <div
      className="text-[30px] capitalize font-medium"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span style={{ fontFamily: "Outfit, sans-serif" }}>{text}</span>
      {buttonText && buttonText !== "" && (
        <button
          onClick={onButtonClick}
          className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white  text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out "
        >
          {icon && <span>{icon}</span>}
          <span>{buttonText}</span>
        </button>
      )}
      <div className="flex gap-2">
        {buttonArray.length > 0 &&
          buttonArray.map((btnObj, i, arr) => {
            return (
              <button
                onClick={(event) => onArrayButtonClick(event, btnObj)}
                className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white  text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out "
              >
                {btnObj?.icon && <span className="mb-1">{btnObj?.icon}</span>}
                <span>{btnObj?.label}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default PageHeader;
