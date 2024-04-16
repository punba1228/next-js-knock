import React from "react";

export interface CounterButtonProps {
  clickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
  symbol: "+" | "-";
  isOutline?: boolean;
}

const CounterButton = (props: CounterButtonProps) => {
  return (
    <button onClick={props.clickEvent}>
      <div
        className={
          "flex table-cell align-middle text-center w-12 h-12 border-2 rounded-full border-blue-600" +
          `${
            props.isOutline
              ? " bg-white text-blue-600"
              : " bg-blue-600 text-white"
          }`
        }
      >
        <p>{props.symbol}</p>
      </div>
    </button>
  );
};

export default CounterButton;
