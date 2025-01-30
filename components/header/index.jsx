const PageHeader = ({ text, buttonText, onButtonClick, icon }) => {
  return (
    <div
      className="text-[30px] capitalize font-medium"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span>{text}</span>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white  text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out "
        >
          {icon && <span>{icon}</span>}
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};
export default PageHeader
