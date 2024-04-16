interface FormButtonProps {
  bgColor: string;
  labelText: string;
  clickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

const FormButton = (props: FormButtonProps) => {
  return (
    <button
      onClick={props.clickEvent}
      className={`text-center rounded-md text-white px-4 py-2 font-thin ${
        props.isDisabled ? "bg-gray-200" : props.bgColor
      }`}
      disabled={props.isDisabled}
    >
      <p>{props.labelText}</p>
    </button>
  );
};

export default FormButton;
